# https://code.claude.com/docs/pt/hooks

Para um guia de início rápido com exemplos, consulte [Começar com hooks do Claude Code](/docs/pt/hooks-guide).

[​](#configuração) Configuração
-------------------------------

Os hooks do Claude Code são configurados em seus [arquivos de configurações](/docs/pt/settings):

* `~/.claude/settings.json` - Configurações do usuário
* `.claude/settings.json` - Configurações do projeto
* `.claude/settings.local.json` - Configurações locais do projeto (não confirmadas)
* Configurações de política gerenciada

Os administradores corporativos podem usar `allowManagedHooksOnly` para bloquear hooks de usuário, projeto e plugin. Consulte [Configuração de Hook](/docs/pt/settings#hook-configuration).

### [​](#estrutura) Estrutura

Os hooks são organizados por matchers, onde cada matcher pode ter vários hooks:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

* **matcher**: Padrão para corresponder nomes de ferramentas, sensível a maiúsculas e minúsculas (aplicável apenas para
  `PreToolUse`, `PermissionRequest` e `PostToolUse`)
  + Strings simples correspondem exatamente: `Write` corresponde apenas à ferramenta Write
  + Suporta regex: `Edit|Write` ou `Notebook.*`
  + Use `*` para corresponder a todas as ferramentas. Você também pode usar uma string vazia (`""`) ou deixar
    `matcher` em branco.
* **hooks**: Array de hooks a executar quando o padrão corresponde
  + `type`: Tipo de execução do hook - `"command"` para comandos bash ou `"prompt"` para avaliação baseada em LLM
  + `command`: (Para `type: "command"`) O comando bash a executar (pode usar a variável de ambiente `$CLAUDE_PROJECT_DIR`)
  + `prompt`: (Para `type: "prompt"`) O prompt a enviar para o LLM para avaliação
  + `timeout`: (Opcional) Quanto tempo um hook deve executar, em segundos, antes de cancelar esse hook específico

Para eventos como `UserPromptSubmit`, `Stop` e `SubagentStop`
que não usam matchers, você pode omitir o campo matcher:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/prompt-validator.py"
          }
        ]
      }
    ]
  }
}
```

### [​](#scripts-de-hook-específicos-do-projeto) Scripts de Hook Específicos do Projeto

Você pode usar a variável de ambiente `CLAUDE_PROJECT_DIR` (disponível apenas quando
Claude Code executa o comando hook) para referenciar scripts armazenados em seu projeto,
garantindo que funcionem independentemente do diretório atual do Claude:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/check-style.sh"
          }
        ]
      }
    ]
  }
}
```

### [​](#hooks-de-plugin) Hooks de plugin

[Plugins](/docs/pt/plugins) podem fornecer hooks que se integram perfeitamente com seus hooks de usuário e projeto. Os hooks de plugin são automaticamente mesclados com sua configuração quando os plugins estão habilitados.
**Como os hooks de plugin funcionam**:

* Os hooks de plugin são definidos no arquivo `hooks/hooks.json` do plugin ou em um arquivo fornecido por um caminho personalizado para o campo `hooks`.
* Quando um plugin é habilitado, seus hooks são mesclados com hooks de usuário e projeto
* Vários hooks de diferentes fontes podem responder ao mesmo evento
* Os hooks de plugin usam a variável de ambiente `${CLAUDE_PLUGIN_ROOT}` para referenciar arquivos de plugin

**Exemplo de configuração de hook de plugin**:

Copiar

Perguntar à IA

```
{
  "description": "Automatic code formatting",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

Os hooks de plugin usam o mesmo formato que os hooks regulares com um campo `description` opcional para explicar o propósito do hook.

Os hooks de plugin são executados junto com seus hooks personalizados. Se vários hooks corresponderem a um evento, todos serão executados em paralelo.

**Variáveis de ambiente para plugins**:

* `${CLAUDE_PLUGIN_ROOT}`: Caminho absoluto para o diretório do plugin
* `${CLAUDE_PROJECT_DIR}`: Diretório raiz do projeto (igual ao dos hooks de projeto)
* Todas as variáveis de ambiente padrão estão disponíveis

Consulte a [referência de componentes de plugin](/docs/pt/plugins-reference#hooks) para detalhes sobre como criar hooks de plugin.

### [​](#hooks-em-skills,-agents-e-slash-commands) Hooks em Skills, Agents e Slash Commands

Além dos arquivos de configurações e plugins, os hooks podem ser definidos diretamente em [Skills](/docs/pt/skills), [subagents](/docs/pt/sub-agents) e [slash commands](/docs/pt/slash-commands) usando frontmatter. Esses hooks são limitados ao ciclo de vida do componente e só são executados quando esse componente está ativo.
**Eventos suportados**: `PreToolUse`, `PostToolUse` e `Stop`
**Exemplo em uma Skill**:

Copiar

Perguntar à IA

```
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/security-check.sh"
---
```

**Exemplo em um agent**:

Copiar

Perguntar à IA

```
---
name: code-reviewer
description: Review code changes
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-linter.sh"
---
```

Os hooks com escopo de componente seguem o mesmo formato de configuração que os hooks baseados em configurações, mas são automaticamente limpos quando a execução do componente termina.
**Opção adicional para skills e slash commands:**

* `once`: Defina como `true` para executar o hook apenas uma vez por sessão. Após a primeira execução bem-sucedida, o hook é removido. Nota: Esta opção atualmente é suportada apenas para skills e slash commands, não para agents.

[​](#hooks-baseados-em-prompt) Hooks Baseados em Prompt
-------------------------------------------------------

Além dos hooks de comando bash (`type: "command"`), Claude Code suporta hooks baseados em prompt (`type: "prompt"`) que usam um LLM para avaliar se deve permitir ou bloquear uma ação. Os hooks baseados em prompt atualmente são suportados apenas para hooks `Stop` e `SubagentStop`, onde permitem decisões inteligentes e conscientes do contexto.

### [​](#como-os-hooks-baseados-em-prompt-funcionam) Como os hooks baseados em prompt funcionam

Em vez de executar um comando bash, os hooks baseados em prompt:

1. Enviam a entrada do hook e seu prompt para um LLM rápido (Haiku)
2. O LLM responde com JSON estruturado contendo uma decisão
3. Claude Code processa a decisão automaticamente

### [​](#configuração-2) Configuração

Copiar

Perguntar à IA

```
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if Claude should stop: $ARGUMENTS. Check if all tasks are complete."
          }
        ]
      }
    ]
  }
}
```

**Campos:**

* `type`: Deve ser `"prompt"`
* `prompt`: O texto do prompt a enviar para o LLM
  + Use `$ARGUMENTS` como um placeholder para a entrada do hook JSON
  + Se `$ARGUMENTS` não estiver presente, o JSON de entrada é anexado ao prompt
* `timeout`: (Opcional) Timeout em segundos (padrão: 30 segundos)

### [​](#schema-de-resposta) Schema de resposta

O LLM deve responder com JSON contendo:

Copiar

Perguntar à IA

```
{
  "ok": true | false,
  "reason": "Explanation for the decision"
}
```

**Campos de resposta:**

* `ok`: `true` permite a ação, `false` a previne
* `reason`: Obrigatório quando `ok` é `false`. Explicação mostrada para Claude

### [​](#eventos-de-hook-suportados) Eventos de hook suportados

Os hooks baseados em prompt funcionam com qualquer evento de hook, mas são mais úteis para:

* **Stop**: Decidir inteligentemente se Claude deve continuar trabalhando
* **SubagentStop**: Avaliar se um subagent completou sua tarefa
* **UserPromptSubmit**: Validar prompts de usuário com assistência de LLM
* **PreToolUse**: Tomar decisões de permissão conscientes do contexto
* **PermissionRequest**: Permitir ou negar inteligentemente diálogos de permissão

### [​](#exemplo:-hook-stop-inteligente) Exemplo: Hook Stop inteligente

Copiar

Perguntar à IA

```
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "You are evaluating whether Claude should stop working. Context: $ARGUMENTS\n\nAnalyze the conversation and determine if:\n1. All user-requested tasks are complete\n2. Any errors need to be addressed\n3. Follow-up work is needed\n\nRespond with JSON: {\"ok\": true} to allow stopping, or {\"ok\": false, \"reason\": \"your explanation\"} to continue working.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### [​](#exemplo:-subagentstop-com-lógica-personalizada) Exemplo: SubagentStop com lógica personalizada

Copiar

Perguntar à IA

```
{
  "hooks": {
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if this subagent should stop. Input: $ARGUMENTS\n\nCheck if:\n- The subagent completed its assigned task\n- Any errors occurred that need fixing\n- Additional context gathering is needed\n\nReturn: {\"ok\": true} to allow stopping, or {\"ok\": false, \"reason\": \"explanation\"} to continue."
          }
        ]
      }
    ]
  }
}
```

### [​](#comparação-com-hooks-de-comando-bash) Comparação com hooks de comando bash

| Recurso | Hooks de Comando Bash | Hooks Baseados em Prompt |
| --- | --- | --- |
| **Execução** | Executa script bash | Consulta LLM |
| **Lógica de decisão** | Você implementa em código | LLM avalia contexto |
| **Complexidade de configuração** | Requer arquivo de script | Configurar prompt |
| **Consciência de contexto** | Limitada à lógica do script | Compreensão de linguagem natural |
| **Desempenho** | Rápido (execução local) | Mais lento (chamada de API) |
| **Caso de uso** | Regras determinísticas | Decisões conscientes do contexto |

### [​](#melhores-práticas) Melhores práticas

* **Seja específico em prompts**: Declare claramente o que você quer que o LLM avalie
* **Inclua critérios de decisão**: Liste os fatores que o LLM deve considerar
* **Teste seus prompts**: Verifique se o LLM toma decisões corretas para seus casos de uso
* **Defina timeouts apropriados**: O padrão é 30 segundos, ajuste conforme necessário
* **Use para decisões complexas**: Hooks bash são melhores para regras simples e determinísticas

Consulte a [referência de componentes de plugin](/docs/pt/plugins-reference#hooks) para detalhes sobre como criar hooks de plugin.

[​](#eventos-de-hook) Eventos de Hook
-------------------------------------

### [​](#pretooluse) PreToolUse

Executa após Claude criar parâmetros de ferramenta e antes de processar a chamada de ferramenta.
**Matchers comuns:**

* `Task` - Tarefas de subagent (consulte [documentação de subagents](/docs/pt/sub-agents))
* `Bash` - Comandos de shell
* `Glob` - Correspondência de padrão de arquivo
* `Grep` - Busca de conteúdo
* `Read` - Leitura de arquivo
* `Edit` - Edição de arquivo
* `Write` - Escrita de arquivo
* `WebFetch`, `WebSearch` - Operações web

Use [controle de decisão PreToolUse](#pretooluse-decision-control) para permitir, negar ou pedir permissão para usar a ferramenta.

### [​](#permissionrequest) PermissionRequest

Executa quando o usuário é mostrado um diálogo de permissão.
Use [controle de decisão PermissionRequest](#permissionrequest-decision-control) para permitir ou negar em nome do usuário.
Reconhece os mesmos valores de matcher que PreToolUse.

### [​](#posttooluse) PostToolUse

Executa imediatamente após uma ferramenta ser concluída com sucesso.
Reconhece os mesmos valores de matcher que PreToolUse.

### [​](#notification) Notification

Executa quando Claude Code envia notificações. Suporta matchers para filtrar por tipo de notificação.
**Matchers comuns:**

* `permission_prompt` - Solicitações de permissão do Claude Code
* `idle_prompt` - Quando Claude está aguardando entrada do usuário (após 60+ segundos de tempo ocioso)
* `auth_success` - Notificações de sucesso de autenticação
* `elicitation_dialog` - Quando Claude Code precisa de entrada para elicitação de ferramenta MCP

Você pode usar matchers para executar diferentes hooks para diferentes tipos de notificação, ou omitir o matcher para executar hooks para todas as notificações.
**Exemplo: Diferentes notificações para diferentes tipos**

Copiar

Perguntar à IA

```
{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/permission-alert.sh"
          }
        ]
      },
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/idle-notification.sh"
          }
        ]
      }
    ]
  }
}
```

### [​](#userpromptsubmit) UserPromptSubmit

Executa quando o usuário envia um prompt, antes de Claude processá-lo. Isso permite que você
adicione contexto adicional com base no prompt/conversa, valide prompts ou
bloqueie certos tipos de prompts.

### [​](#stop) Stop

Executa quando o agent principal do Claude Code terminou de responder. Não executa se
a parada ocorreu devido a uma interrupção do usuário.

### [​](#subagentstop) SubagentStop

Executa quando um subagent do Claude Code (chamada de ferramenta Task) terminou de responder.

### [​](#precompact) PreCompact

Executa antes de Claude Code estar prestes a executar uma operação de compactação.
**Matchers:**

* `manual` - Invocado de `/compact`
* `auto` - Invocado de auto-compact (devido à janela de contexto cheia)

### [​](#sessionstart) SessionStart

Executa quando Claude Code inicia uma nova sessão ou retoma uma sessão existente (que
atualmente inicia uma nova sessão internamente). Útil para carregar contexto de desenvolvimento como problemas existentes ou mudanças recentes em sua base de código, instalar dependências ou configurar variáveis de ambiente.
**Matchers:**

* `startup` - Invocado de startup
* `resume` - Invocado de `--resume`, `--continue` ou `/resume`
* `clear` - Invocado de `/clear`
* `compact` - Invocado de auto ou manual compact.

#### [​](#persistindo-variáveis-de-ambiente) Persistindo variáveis de ambiente

Os hooks SessionStart têm acesso à variável de ambiente `CLAUDE_ENV_FILE`, que fornece um caminho de arquivo onde você pode persistir variáveis de ambiente para comandos bash subsequentes.
**Exemplo: Definindo variáveis de ambiente individuais**

Copiar

Perguntar à IA

```
#!/bin/bash

if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
  echo 'export API_KEY=your-api-key' >> "$CLAUDE_ENV_FILE"
  echo 'export PATH="$PATH:./node_modules/.bin"' >> "$CLAUDE_ENV_FILE"
fi

exit 0
```

**Exemplo: Persistindo todas as mudanças de ambiente do hook**
Quando sua configuração modifica o ambiente (por exemplo, `nvm use`), capture e persista todas as mudanças comparando o ambiente:

Copiar

Perguntar à IA

```
#!/bin/bash

ENV_BEFORE=$(export -p | sort)

# Run your setup commands that modify the environment
source ~/.nvm/nvm.sh
nvm use 20

if [ -n "$CLAUDE_ENV_FILE" ]; then
  ENV_AFTER=$(export -p | sort)
  comm -13 <(echo "$ENV_BEFORE") <(echo "$ENV_AFTER") >> "$CLAUDE_ENV_FILE"
fi

exit 0
```

Qualquer variável escrita neste arquivo estará disponível em todos os comandos bash subsequentes que Claude Code executa durante a sessão.

`CLAUDE_ENV_FILE` está disponível apenas para hooks SessionStart. Outros tipos de hook não têm acesso a esta variável.

### [​](#sessionend) SessionEnd

Executa quando uma sessão do Claude Code termina. Útil para tarefas de limpeza, registro de
estatísticas de sessão ou salvamento de estado de sessão.
O campo `reason` na entrada do hook será um de:

* `clear` - Sessão limpa com comando /clear
* `logout` - Usuário fez logout
* `prompt_input_exit` - Usuário saiu enquanto a entrada de prompt estava visível
* `other` - Outros motivos de saída

[​](#entrada-de-hook) Entrada de Hook
-------------------------------------

Os hooks recebem dados JSON via stdin contendo informações de sessão e
dados específicos do evento:

Copiar

Perguntar à IA

```
{
  // Common fields
  session_id: string
  transcript_path: string  // Path to conversation JSON
  cwd: string              // The current working directory when the hook is invoked
  permission_mode: string  // Current permission mode: "default", "plan", "acceptEdits", "dontAsk", or "bypassPermissions"

  // Event-specific fields
  hook_event_name: string
  ...
}
```

### [​](#entrada-pretooluse) Entrada PreToolUse

O schema exato para `tool_input` depende da ferramenta.

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_use_id": "toolu_01ABC123..."
}
```

### [​](#entrada-posttooluse) Entrada PostToolUse

O schema exato para `tool_input` e `tool_response` depende da ferramenta.

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  },
  "tool_use_id": "toolu_01ABC123..."
}
```

### [​](#entrada-notification) Entrada Notification

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "Notification",
  "message": "Claude needs your permission to use Bash",
  "notification_type": "permission_prompt"
}
```

### [​](#entrada-userpromptsubmit) Entrada UserPromptSubmit

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate the factorial of a number"
}
```

### [​](#entrada-stop-e-subagentstop) Entrada Stop e SubagentStop

`stop_hook_active` é true quando Claude Code já está continuando como resultado de
um hook stop. Verifique este valor ou processe a transcrição para evitar que Claude Code
execute indefinidamente.

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "permission_mode": "default",
  "hook_event_name": "Stop",
  "stop_hook_active": true
}
```

### [​](#entrada-precompact) Entrada PreCompact

Para `manual`, `custom_instructions` vem do que o usuário passa para
`/compact`. Para `auto`, `custom_instructions` está vazio.

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "permission_mode": "default",
  "hook_event_name": "PreCompact",
  "trigger": "manual",
  "custom_instructions": ""
}
```

### [​](#entrada-sessionstart) Entrada SessionStart

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "permission_mode": "default",
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```

### [​](#entrada-sessionend) Entrada SessionEnd

Copiar

Perguntar à IA

```
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "SessionEnd",
  "reason": "exit"
}
```

[​](#saída-de-hook) Saída de Hook
---------------------------------

Existem duas maneiras mutuamente exclusivas para hooks retornarem saída de volta para Claude Code. A saída
comunica se deve bloquear e qualquer feedback que deve ser mostrado para Claude
e o usuário.

### [​](#simples:-código-de-saída) Simples: Código de Saída

Os hooks comunicam status através de códigos de saída, stdout e stderr:

* **Código de saída 0**: Sucesso. `stdout` é mostrado ao usuário em modo verbose
  (ctrl+o), exceto para `UserPromptSubmit` e `SessionStart`, onde stdout é
  adicionado ao contexto. Saída JSON em `stdout` é analisada para controle estruturado
  (consulte [Avançado: Saída JSON](#advanced-json-output)).
* **Código de saída 2**: Erro de bloqueio. Apenas `stderr` é usado como mensagem de erro
  e alimentado de volta para Claude. O formato é `[command]: {stderr}`. JSON em `stdout`
  é **não** processado para código de saída 2. Consulte comportamento por evento de hook abaixo.
* **Outros códigos de saída**: Erro não bloqueante. `stderr` é mostrado ao usuário em modo verbose (ctrl+o) com
  formato `Failed with non-blocking status code: {stderr}`. Se `stderr` estiver vazio,
  mostra `No stderr output`. A execução continua.

Lembrete: Claude Code não vê stdout se o código de saída for 0, exceto para
o hook `UserPromptSubmit` onde stdout é injetado como contexto.

#### [​](#comportamento-do-código-de-saída-2) Comportamento do Código de Saída 2

| Evento de Hook | Comportamento |
| --- | --- |
| `PreToolUse` | Bloqueia a chamada de ferramenta, mostra stderr para Claude |
| `PermissionRequest` | Nega a permissão, mostra stderr para Claude |
| `PostToolUse` | Mostra stderr para Claude (ferramenta já foi executada) |
| `Notification` | N/A, mostra stderr apenas para o usuário |
| `UserPromptSubmit` | Bloqueia processamento de prompt, apaga prompt, mostra stderr apenas para o usuário |
| `Stop` | Bloqueia parada, mostra stderr para Claude |
| `SubagentStop` | Bloqueia parada, mostra stderr para subagent Claude |
| `PreCompact` | N/A, mostra stderr apenas para o usuário |
| `SessionStart` | N/A, mostra stderr apenas para o usuário |
| `SessionEnd` | N/A, mostra stderr apenas para o usuário |

### [​](#avançado:-saída-json) Avançado: Saída JSON

Os hooks podem retornar JSON estruturado em `stdout` para controle mais sofisticado.

A saída JSON é processada apenas quando o hook sai com código 0. Se seu hook
sair com código 2 (erro de bloqueio), o texto `stderr` é usado diretamente—qualquer JSON em `stdout`
é ignorado. Para outros códigos de saída diferentes de zero, apenas `stderr` é mostrado ao usuário em modo verbose (ctrl+o).

#### [​](#campos-json-comuns) Campos JSON Comuns

Todos os tipos de hook podem incluir estes campos opcionais:

Copiar

Perguntar à IA

```
{
  "continue": true, // Whether Claude should continue after hook execution (default: true)
  "stopReason": "string", // Message shown when continue is false

  "suppressOutput": true, // Hide stdout from transcript mode (default: false)
  "systemMessage": "string" // Optional warning message shown to the user
}
```

Se `continue` for false, Claude para o processamento após a execução dos hooks.

* Para `PreToolUse`, isso é diferente de `"permissionDecision": "deny"`, que
  apenas bloqueia uma chamada de ferramenta específica e fornece feedback automático para Claude.
* Para `PostToolUse`, isso é diferente de `"decision": "block"`, que
  fornece feedback automatizado para Claude.
* Para `UserPromptSubmit`, isso impede que o prompt seja processado.
* Para `Stop` e `SubagentStop`, isso tem precedência sobre qualquer
  saída `"decision": "block"`.
* Em todos os casos, `"continue" = false` tem precedência sobre qualquer
  saída `"decision": "block"`.

`stopReason` acompanha `continue` com um motivo mostrado ao usuário, não mostrado
para Claude.

#### [​](#controle-de-decisão-pretooluse) Controle de Decisão `PreToolUse`

Os hooks `PreToolUse` podem controlar se uma chamada de ferramenta prossegue.

* `"allow"` ignora o sistema de permissão. `permissionDecisionReason` é mostrado
  ao usuário mas não para Claude.
* `"deny"` impede que a chamada de ferramenta seja executada. `permissionDecisionReason` é
  mostrado para Claude.
* `"ask"` pede ao usuário para confirmar a chamada de ferramenta na UI.
  `permissionDecisionReason` é mostrado ao usuário mas não para Claude.

Além disso, os hooks podem modificar entradas de ferramenta antes da execução usando `updatedInput`:

* `updatedInput` modifica os parâmetros de entrada da ferramenta antes da ferramenta ser executada
* Combine com `"permissionDecision": "allow"` para modificar a entrada e auto-aprovar a chamada de ferramenta
* Combine com `"permissionDecision": "ask"` para modificar a entrada e mostrá-la ao usuário para confirmação

Copiar

Perguntar à IA

```
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "My reason here",
    "updatedInput": {
      "field_to_modify": "new value"
    }
  }
}
```

Os campos `decision` e `reason` estão deprecados para hooks PreToolUse.
Use `hookSpecificOutput.permissionDecision` e
`hookSpecificOutput.permissionDecisionReason` em vez disso. Os campos deprecados
`"approve"` e `"block"` mapeiam para `"allow"` e `"deny"` respectivamente.

#### [​](#controle-de-decisão-permissionrequest) Controle de Decisão `PermissionRequest`

Os hooks `PermissionRequest` podem permitir ou negar solicitações de permissão mostradas ao usuário.

* Para `"behavior": "allow"` você também pode opcionalmente passar um `"updatedInput"` que modifica os parâmetros de entrada da ferramenta antes da ferramenta ser executada.
* Para `"behavior": "deny"` você também pode opcionalmente passar uma string `"message"` que diz ao modelo por que a permissão foi negada, e um booleano `"interrupt"` que interromperá Claude.

Copiar

Perguntar à IA

```
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow",
      "updatedInput": {
        "command": "npm run lint"
      }
    }
  }
}
```

#### [​](#controle-de-decisão-posttooluse) Controle de Decisão `PostToolUse`

Os hooks `PostToolUse` podem fornecer feedback para Claude após a execução da ferramenta.

* `"block"` automaticamente solicita Claude com `reason`.
* `undefined` não faz nada. `reason` é ignorado.
* `"hookSpecificOutput.additionalContext"` adiciona contexto para Claude considerar.

Copiar

Perguntar à IA

```
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Additional information for Claude"
  }
}
```

#### [​](#controle-de-decisão-userpromptsubmit) Controle de Decisão `UserPromptSubmit`

Os hooks `UserPromptSubmit` podem controlar se um prompt de usuário é processado e adicionar contexto.
**Adicionando contexto (código de saída 0):**
Existem duas maneiras de adicionar contexto à conversa:

1. **Stdout de texto simples** (mais simples): Qualquer texto não-JSON escrito em stdout é adicionado
   como contexto. Esta é a maneira mais fácil de injetar informações.
2. **JSON com `additionalContext`** (estruturado): Use o formato JSON abaixo para
   mais controle. O campo `additionalContext` é adicionado como contexto.

Ambos os métodos funcionam com código de saída 0. O stdout simples é mostrado como saída de hook na
transcrição; `additionalContext` é adicionado mais discretamente.
**Bloqueando prompts:**

* `"decision": "block"` impede que o prompt seja processado. O prompt enviado
  é apagado do contexto. `"reason"` é mostrado ao usuário mas não adicionado
  ao contexto.
* `"decision": undefined` (ou omitido) permite que o prompt prossiga normalmente.

Copiar

Perguntar à IA

```
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "My additional context here"
  }
}
```

O formato JSON não é obrigatório para casos de uso simples. Para adicionar contexto, você pode imprimir texto simples em stdout com código de saída 0. Use JSON quando precisar
bloquear prompts ou quiser controle mais estruturado.

#### [​](#controle-de-decisão-stop/subagentstop) Controle de Decisão `Stop`/`SubagentStop`

Os hooks `Stop` e `SubagentStop` podem controlar se Claude deve continuar.

* `"block"` impede que Claude pare. Você deve preencher `reason` para Claude
  saber como proceder.
* `undefined` permite que Claude pare. `reason` é ignorado.

Copiar

Perguntar à IA

```
{
  "decision": "block" | undefined,
  "reason": "Must be provided when Claude is blocked from stopping"
}
```

#### [​](#controle-de-decisão-sessionstart) Controle de Decisão `SessionStart`

Os hooks `SessionStart` permitem que você carregue contexto no início de uma sessão.

* `"hookSpecificOutput.additionalContext"` adiciona a string ao contexto.
* Os valores `additionalContext` de vários hooks são concatenados.

Copiar

Perguntar à IA

```
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "My additional context here"
  }
}
```

#### [​](#controle-de-decisão-sessionend) Controle de Decisão `SessionEnd`

Os hooks `SessionEnd` são executados quando uma sessão termina. Eles não podem bloquear o término da sessão
mas podem executar tarefas de limpeza.

#### [​](#exemplo-de-código-de-saída:-validação-de-comando-bash) Exemplo de Código de Saída: Validação de Comando Bash

Copiar

Perguntar à IA

```
#!/usr/bin/env python3
import json
import re
import sys

# Define validation rules as a list of (regex pattern, message) tuples
VALIDATION_RULES = [
    (
        r"\bgrep\b(?!.*\|)",
        "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
    ),
    (
        r"\bfind\s+\S+\s+-name\b",
        "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
    ),
]


def validate_command(command: str) -> list[str]:
    issues = []
    for pattern, message in VALIDATION_RULES:
        if re.search(pattern, command):
            issues.append(message)
    return issues


try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

if tool_name != "Bash" or not command:
    sys.exit(1)

# Validate the command
issues = validate_command(command)

if issues:
    for message in issues:
        print(f"• {message}", file=sys.stderr)
    # Exit code 2 blocks tool call and shows stderr to Claude
    sys.exit(2)
```

#### [​](#exemplo-de-saída-json:-userpromptsubmit-para-adicionar-contexto-e-validação) Exemplo de Saída JSON: UserPromptSubmit para Adicionar Contexto e Validação

Para hooks `UserPromptSubmit`, você pode injetar contexto usando qualquer método:

* **Stdout de texto simples** com código de saída 0: Abordagem mais simples, imprime texto
* **Saída JSON** com código de saída 0: Use `"decision": "block"` para rejeitar prompts,
  ou `additionalContext` para injeção de contexto estruturada

Lembre-se: Código de saída 2 apenas usa `stderr` para a mensagem de erro. Para bloquear usando
JSON (com um motivo personalizado), use `"decision": "block"` com código de saída 0.

Copiar

Perguntar à IA

```
#!/usr/bin/env python3
import json
import sys
import re
import datetime

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

prompt = input_data.get("prompt", "")

# Check for sensitive patterns
sensitive_patterns = [
    (r"(?i)\b(password|secret|key|token)\s*[:=]", "Prompt contains potential secrets"),
]

for pattern, message in sensitive_patterns:
    if re.search(pattern, prompt):
        # Use JSON output to block with a specific reason
        output = {
            "decision": "block",
            "reason": f"Security policy violation: {message}. Please rephrase your request without sensitive information."
        }
        print(json.dumps(output))
        sys.exit(0)

# Add current time to context
context = f"Current time: {datetime.datetime.now()}"
print(context)

"""
The following is also equivalent:
print(json.dumps({
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": context,
  },
}))
"""

# Allow the prompt to proceed with the additional context
sys.exit(0)
```

#### [​](#exemplo-de-saída-json:-pretooluse-com-aprovação) Exemplo de Saída JSON: PreToolUse com Aprovação

Copiar

Perguntar à IA

```
#!/usr/bin/env python3
import json
import sys

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})

# Example: Auto-approve file reads for documentation files
if tool_name == "Read":
    file_path = tool_input.get("file_path", "")
    if file_path.endswith((".md", ".mdx", ".txt", ".json")):
        # Use JSON output to auto-approve the tool call
        output = {
            "decision": "approve",
            "reason": "Documentation file auto-approved",
            "suppressOutput": True  # Don't show in verbose mode
        }
        print(json.dumps(output))
        sys.exit(0)

# For other cases, let the normal permission flow proceed
sys.exit(0)
```

[​](#trabalhando-com-ferramentas-mcp) Trabalhando com Ferramentas MCP
---------------------------------------------------------------------

Os hooks do Claude Code funcionam perfeitamente com
[ferramentas do Model Context Protocol (MCP)](/docs/pt/mcp). Quando servidores MCP
fornecem ferramentas, elas aparecem com um padrão de nomenclatura especial que você pode corresponder em
seus hooks.

### [​](#nomenclatura-de-ferramenta-mcp) Nomenclatura de Ferramenta MCP

As ferramentas MCP seguem o padrão `mcp__<server>__<tool>`, por exemplo:

* `mcp__memory__create_entities` - Ferramenta create entities do servidor Memory
* `mcp__filesystem__read_file` - Ferramenta read file do servidor Filesystem
* `mcp__github__search_repositories` - Ferramenta search do servidor GitHub

### [​](#configurando-hooks-para-ferramentas-mcp) Configurando Hooks para Ferramentas MCP

Você pode direcionar ferramentas MCP específicas ou servidores MCP inteiros:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Memory operation initiated' >> ~/mcp-operations.log"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/validate-mcp-write.py"
          }
        ]
      }
    ]
  }
}
```

[​](#exemplos) Exemplos
-----------------------

Para exemplos práticos incluindo formatação de código, notificações e proteção de arquivo, consulte [Mais Exemplos](/docs/pt/hooks-guide#more-examples) no guia de início.

[​](#considerações-de-segurança) Considerações de Segurança
-----------------------------------------------------------

### [​](#aviso-de-isenção) Aviso de Isenção

**USE POR SUA CONTA E RISCO**: Os hooks do Claude Code executam comandos shell arbitrários em
seu sistema automaticamente. Ao usar hooks, você reconhece que:

* Você é o único responsável pelos comandos que configura
* Os hooks podem modificar, deletar ou acessar qualquer arquivo que sua conta de usuário possa acessar
* Hooks maliciosos ou mal escritos podem causar perda de dados ou danos ao sistema
* Anthropic não fornece garantia e não assume responsabilidade por quaisquer danos
  resultantes do uso de hooks
* Você deve testar completamente os hooks em um ambiente seguro antes do uso em produção

Sempre revise e compreenda qualquer comando de hook antes de adicioná-lo à sua
configuração.

### [​](#melhores-práticas-de-segurança) Melhores Práticas de Segurança

Aqui estão algumas práticas-chave para escrever hooks mais seguros:

1. **Valide e sanitize entradas** - Nunca confie em dados de entrada cegamente
2. **Sempre cite variáveis de shell** - Use `"$VAR"` não `$VAR`
3. **Bloqueie traversal de caminho** - Verifique se há `..` em caminhos de arquivo
4. **Use caminhos absolutos** - Especifique caminhos completos para scripts (use
   “$CLAUDE\_PROJECT\_DIR” para o caminho do projeto)
5. **Pule arquivos sensíveis** - Evite `.env`, `.git/`, chaves, etc.

### [​](#segurança-de-configuração) Segurança de Configuração

Edições diretas de hooks em arquivos de configurações não entram em efeito imediatamente. Claude
Code:

1. Captura um snapshot de hooks na inicialização
2. Usa este snapshot durante toda a sessão
3. Avisa se hooks forem modificados externamente
4. Requer revisão no menu `/hooks` para que as mudanças entrem em efeito

Isso impede que modificações maliciosas de hooks afetem sua sessão atual.

[​](#detalhes-de-execução-de-hook) Detalhes de Execução de Hook
---------------------------------------------------------------

* **Timeout**: Limite de execução de 60 segundos por padrão, configurável por comando.
  + Um timeout para um comando individual não afeta os outros comandos.
* **Paralelização**: Todos os hooks correspondentes são executados em paralelo
* **Deduplicação**: Múltiplos comandos de hook idênticos são automaticamente deduplicated
* **Ambiente**: Executa no diretório atual com o ambiente do Claude Code
  + A variável de ambiente `CLAUDE_PROJECT_DIR` está disponível e contém o
    caminho absoluto para o diretório raiz do projeto (onde Claude Code foi iniciado)
  + A variável de ambiente `CLAUDE_CODE_REMOTE` indica se o hook está sendo executado em um ambiente remoto (web) (`"true"`) ou ambiente CLI local (não definido ou vazio). Use isso para executar lógica diferente com base no contexto de execução.
* **Entrada**: JSON via stdin
* **Saída**:
  + PreToolUse/PermissionRequest/PostToolUse/Stop/SubagentStop: Progresso mostrado em modo verbose (ctrl+o)
  + Notification/SessionEnd: Registrado apenas em debug (`--debug`)
  + UserPromptSubmit/SessionStart: stdout adicionado como contexto para Claude

[​](#depuração) Depuração
-------------------------

### [​](#solução-de-problemas-básica) Solução de Problemas Básica

Se seus hooks não estão funcionando:

1. **Verifique configuração** - Execute `/hooks` para ver se seu hook está registrado
2. **Verifique sintaxe** - Certifique-se de que suas configurações JSON são válidas
3. **Teste comandos** - Execute comandos de hook manualmente primeiro
4. **Verifique permissões** - Certifique-se de que scripts são executáveis
5. **Revise logs** - Use `claude --debug` para ver detalhes de execução de hook

Problemas comuns:

* **Aspas não escapadas** - Use `\"` dentro de strings JSON
* **Matcher errado** - Verifique se nomes de ferramentas correspondem exatamente (sensível a maiúsculas e minúsculas)
* **Comando não encontrado** - Use caminhos completos para scripts

### [​](#depuração-avançada) Depuração Avançada

Para problemas de hook complexos:

1. **Inspecione execução de hook** - Use `claude --debug` para ver detalhes de execução de hook
2. **Valide schemas JSON** - Teste entrada/saída de hook com ferramentas externas
3. **Verifique variáveis de ambiente** - Verifique se o ambiente do Claude Code está correto
4. **Teste casos extremos** - Tente hooks com caminhos de arquivo ou entradas incomuns
5. **Monitore recursos do sistema** - Verifique se há esgotamento de recursos durante execução de hook
6. **Use logging estruturado** - Implemente logging em seus scripts de hook

### [​](#exemplo-de-saída-de-debug) Exemplo de Saída de Debug

Use `claude --debug` para ver detalhes de execução de hook:

Copiar

Perguntar à IA

```
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Getting matching hook commands for PostToolUse with query: Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Found 1 hook commands to execute
[DEBUG] Executing hook command: <Your command> with timeout 60000ms
[DEBUG] Hook command completed with status 0: <Your stdout>
```

Mensagens de progresso aparecem em modo verbose (ctrl+o) mostrando:

* Qual hook está sendo executado
* Comando sendo executado
* Status de sucesso/falha
* Mensagens de saída ou erro