# https://code.claude.com/docs/pt/sub-agents#próximos-passos

Suagentes são assistentes de IA especializados que lidam com tipos específicos de tarefas. Cada suagente é executado em sua própria janela de contexto com um prompt de sistema personalizado, acesso a ferramentas específicas e permissões independentes. Quando Claude encontra uma tarefa que corresponde à descrição de um suagente, ele a delega para esse suagente, que funciona independentemente e retorna resultados.
Os suagentes ajudam você a:

* **Preservar contexto** mantendo exploração e implementação fora de sua conversa principal
* **Aplicar restrições** limitando quais ferramentas um suagente pode usar
* **Reutilizar configurações** em projetos com suagentes de nível de usuário
* **Especializar comportamento** com prompts de sistema focados para domínios específicos
* **Controlar custos** roteando tarefas para modelos mais rápidos e baratos como Haiku

Claude usa a descrição de cada suagente para decidir quando delegar tarefas. Quando você cria um suagente, escreva uma descrição clara para que Claude saiba quando usá-lo.
Claude Code inclui vários suagentes integrados como **Explore**, **Plan** e **general-purpose**. Você também pode criar suagentes personalizados para lidar com tarefas específicas. Esta página cobre os [suagentes integrados](#built-in-subagents), [como criar o seu próprio](#quickstart-create-your-first-subagent), [opções de configuração completas](#configure-subagents), [padrões para trabalhar com suagentes](#work-with-subagents) e [suagentes de exemplo](#example-subagents).

[​](#suagentes-integrados) Suagentes integrados
-----------------------------------------------

Claude Code inclui suagentes integrados que Claude usa automaticamente quando apropriado. Cada um herda as permissões da conversa pai com restrições de ferramentas adicionais.

* Explore
* Plan
* General-purpose
* Other

Um agente rápido e somente leitura otimizado para pesquisar e analisar bases de código.

* **Modelo**: Haiku (rápido, baixa latência)
* **Ferramentas**: Ferramentas somente leitura (acesso negado a ferramentas Write e Edit)
* **Propósito**: Descoberta de arquivos, pesquisa de código, exploração de base de código

Claude delega para Explore quando precisa pesquisar ou entender uma base de código sem fazer alterações. Isso mantém os resultados da exploração fora do contexto da sua conversa principal.Ao invocar Explore, Claude especifica um nível de minuciosidade: **quick** para pesquisas direcionadas, **medium** para exploração equilibrada, ou **very thorough** para análise abrangente.

Um agente de pesquisa usado durante o [modo de plano](/docs/pt/common-workflows#use-plan-mode-for-safe-code-analysis) para reunir contexto antes de apresentar um plano.

* **Modelo**: Herda da conversa principal
* **Ferramentas**: Ferramentas somente leitura (acesso negado a ferramentas Write e Edit)
* **Propósito**: Pesquisa de base de código para planejamento

Quando você está no modo de plano e Claude precisa entender sua base de código, ele delega a pesquisa para o suagente Plan. Isso evita aninhamento infinito (suagentes não podem gerar outros suagentes) enquanto ainda reúne o contexto necessário.

Um agente capaz para tarefas complexas e multi-etapas que requerem exploração e ação.

* **Modelo**: Herda da conversa principal
* **Ferramentas**: Todas as ferramentas
* **Propósito**: Pesquisa complexa, operações multi-etapas, modificações de código

Claude delega para general-purpose quando a tarefa requer exploração e modificação, raciocínio complexo para interpretar resultados, ou múltiplas etapas dependentes.

Claude Code inclui agentes auxiliares adicionais para tarefas específicas. Estes são normalmente invocados automaticamente, então você não precisa usá-los diretamente.

| Agente | Modelo | Quando Claude o usa |
| --- | --- | --- |
| Bash | Herda | Executando comandos de terminal em um contexto separado |
| statusline-setup | Sonnet | Quando você executa `/statusline` para configurar sua linha de status |
| Claude Code Guide | Haiku | Quando você faz perguntas sobre recursos do Claude Code |

Além desses suagentes integrados, você pode criar os seus próprios com prompts personalizados, restrições de ferramentas, modos de permissão, hooks e skills. As seções a seguir mostram como começar e personalizar suagentes.

[​](#início-rápido:-crie-seu-primeiro-suagente) Início rápido: crie seu primeiro suagente
-----------------------------------------------------------------------------------------

Suagentes são definidos em arquivos Markdown com frontmatter YAML. Você pode [criá-los manualmente](#write-subagent-files) ou usar o comando `/agents`.
Este passo a passo o guia através da criação de um suagente de nível de usuário com o comando `/agent`. O suagente revisa código e sugere melhorias para a base de código.

1

Abra a interface de suagentes

No Claude Code, execute:

Copiar

Perguntar à IA

```
/agents
```

2

Crie um novo agente de nível de usuário

Selecione **Create new agent**, depois escolha **User-level**. Isso salva o suagente em `~/.claude/agents/` para que esteja disponível em todos os seus projetos.

3

Gere com Claude

Selecione **Generate with Claude**. Quando solicitado, descreva o suagente:

Copiar

Perguntar à IA

```
A code improvement agent that scans files and suggests improvements
for readability, performance, and best practices. It should explain
each issue, show the current code, and provide an improved version.
```

Claude gera o prompt de sistema e a configuração. Pressione `e` para abri-lo no seu editor se quiser personalizá-lo.

4

Selecione ferramentas

Para um revisor somente leitura, desselecione tudo exceto **Read-only tools**. Se você manter todas as ferramentas selecionadas, o suagente herda todas as ferramentas disponíveis para a conversa principal.

5

Selecione modelo

Escolha qual modelo o suagente usa. Para este agente de exemplo, selecione **Sonnet**, que equilibra capacidade e velocidade para analisar padrões de código.

6

Escolha uma cor

Escolha uma cor de fundo para o suagente. Isso ajuda você a identificar qual suagente está em execução na interface.

7

Salve e teste

Salve o suagente. Está disponível imediatamente (sem necessidade de reiniciar). Teste:

Copiar

Perguntar à IA

```
Use the code-improver agent to suggest improvements in this project
```

Claude delega para seu novo suagente, que verifica a base de código e retorna sugestões de melhoria.

Agora você tem um suagente que pode usar em qualquer projeto em sua máquina para analisar bases de código e sugerir melhorias.
Você também pode criar suagentes manualmente como arquivos Markdown, defini-los via flags CLI, ou distribuí-los através de plugins. As seções a seguir cobrem todas as opções de configuração.

[​](#configurar-suagentes) Configurar suagentes
-----------------------------------------------

### [​](#use-o-comando-/agents) Use o comando /agents

O comando `/agents` fornece uma interface interativa para gerenciar suagentes. Execute `/agents` para:

* Visualizar todos os suagentes disponíveis (integrados, usuário, projeto e plugin)
* Criar novos suagentes com configuração guiada ou geração Claude
* Editar configuração de suagente existente e acesso a ferramentas
* Excluir suagentes personalizados
* Ver quais suagentes estão ativos quando duplicatas existem

Esta é a forma recomendada de criar e gerenciar suagentes. Para criação manual ou automação, você também pode adicionar arquivos de suagente diretamente.

### [​](#escolha-o-escopo-do-suagente) Escolha o escopo do suagente

Suagentes são arquivos Markdown com frontmatter YAML. Armazene-os em locais diferentes dependendo do escopo. Quando múltiplos suagentes compartilham o mesmo nome, o local de prioridade mais alta vence.

| Localização | Escopo | Prioridade | Como criar |
| --- | --- | --- | --- |
| Flag CLI `--agents` | Sessão atual | 1 (mais alta) | Passar JSON ao iniciar Claude Code |
| `.claude/agents/` | Projeto atual | 2 | Interativo ou manual |
| `~/.claude/agents/` | Todos os seus projetos | 3 | Interativo ou manual |
| Diretório `agents/` do Plugin | Onde o plugin está ativado | 4 (mais baixa) | Instalado com [plugins](/docs/pt/plugins) |

**Suagentes de projeto** (`.claude/agents/`) são ideais para suagentes específicos de uma base de código. Verifique-os no controle de versão para que sua equipe possa usá-los e melhorá-los colaborativamente.
**Suagentes de usuário** (`~/.claude/agents/`) são suagentes pessoais disponíveis em todos os seus projetos.
**Suagentes definidos por CLI** são passados como JSON ao iniciar Claude Code. Existem apenas para essa sessão e não são salvos em disco, tornando-os úteis para testes rápidos ou scripts de automação:

Copiar

Perguntar à IA

```
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

A flag `--agents` aceita JSON com os mesmos campos que [frontmatter](#supported-frontmatter-fields). Use `prompt` para o prompt de sistema (equivalente ao corpo markdown em suagentes baseados em arquivo). Veja a [referência CLI](/docs/pt/cli-reference#agents-flag-format) para o formato JSON completo.
**Suagentes de plugin** vêm de [plugins](/docs/pt/plugins) que você instalou. Eles aparecem em `/agents` junto com seus suagentes personalizados. Veja a [referência de componentes de plugin](/docs/pt/plugins-reference#agents) para detalhes sobre como criar suagentes de plugin.

### [​](#escreva-arquivos-de-suagente) Escreva arquivos de suagente

Arquivos de suagente usam frontmatter YAML para configuração, seguido pelo prompt de sistema em Markdown:

Suagentes são carregados no início da sessão. Se você criar um suagente adicionando manualmente um arquivo, reinicie sua sessão ou use `/agents` para carregá-lo imediatamente.

Copiar

Perguntar à IA

```
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

O frontmatter define os metadados e configuração do suagente. O corpo se torna o prompt de sistema que guia o comportamento do suagente. Suagentes recebem apenas este prompt de sistema (mais detalhes básicos de ambiente como diretório de trabalho), não o prompt de sistema completo do Claude Code.

#### [​](#campos-de-frontmatter-suportados) Campos de frontmatter suportados

Os seguintes campos podem ser usados no frontmatter YAML. Apenas `name` e `description` são obrigatórios.

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `name` | Sim | Identificador único usando letras minúsculas e hífens |
| `description` | Sim | Quando Claude deve delegar para este suagente |
| `tools` | Não | [Ferramentas](#available-tools) que o suagente pode usar. Herda todas as ferramentas se omitido |
| `disallowedTools` | Não | Ferramentas a negar, removidas da lista herdada ou especificada |
| `model` | Não | [Modelo](#choose-a-model) a usar: `sonnet`, `opus`, `haiku`, ou `inherit`. Padrão é `sonnet` |
| `permissionMode` | Não | [Modo de permissão](#permission-modes): `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, ou `plan` |
| `skills` | Não | [Skills](/docs/pt/skills) a carregar no contexto do suagente na inicialização. O conteúdo completo da skill é injetado, não apenas disponibilizado para invocação. Suagentes não herdam skills da conversa pai |
| `hooks` | Não | [Hooks de ciclo de vida](#define-hooks-for-subagents) escopo para este suagente |

### [​](#escolha-um-modelo) Escolha um modelo

O campo `model` controla qual [modelo de IA](/docs/pt/model-config) o suagente usa:

* **Alias de modelo**: Use um dos aliases disponíveis: `sonnet`, `opus`, ou `haiku`
* **inherit**: Use o mesmo modelo que a conversa principal (útil para consistência)
* **Omitido**: Se não especificado, usa o modelo padrão configurado para suagentes (`sonnet`)

### [​](#controle-as-capacidades-do-suagente) Controle as capacidades do suagente

Você pode controlar o que os suagentes podem fazer através de acesso a ferramentas, modos de permissão e regras condicionais.

#### [​](#ferramentas-disponíveis) Ferramentas disponíveis

Suagentes podem usar qualquer uma das [ferramentas internas](/docs/pt/settings#tools-available-to-claude) do Claude Code. Por padrão, suagentes herdam todas as ferramentas da conversa principal, incluindo ferramentas MCP.
Para restringir ferramentas, use o campo `tools` (lista de permissões) ou o campo `disallowedTools` (lista de negação):

Copiar

Perguntar à IA

```
---
name: safe-researcher
description: Research agent with restricted capabilities
tools: Read, Grep, Glob, Bash
disallowedTools: Write, Edit
---
```

#### [​](#modos-de-permissão) Modos de permissão

O campo `permissionMode` controla como o suagente lida com prompts de permissão. Suagentes herdam o contexto de permissão da conversa principal, mas podem sobrescrever o modo.

| Modo | Comportamento |
| --- | --- |
| `default` | Verificação de permissão padrão com prompts |
| `acceptEdits` | Auto-aceitar edições de arquivo |
| `dontAsk` | Auto-negar prompts de permissão (ferramentas explicitamente permitidas ainda funcionam) |
| `bypassPermissions` | Pular todas as verificações de permissão |
| `plan` | Modo de plano (exploração somente leitura) |

Use `bypassPermissions` com cuidado. Ele pula todas as verificações de permissão, permitindo que o suagente execute qualquer operação sem aprovação.

Se o pai usar `bypassPermissions`, isso tem precedência e não pode ser sobrescrito.

#### [​](#pré-carregue-skills-em-suagentes) Pré-carregue skills em suagentes

Use o campo `skills` para injetar conteúdo de skill no contexto de um suagente na inicialização. Isso dá ao suagente conhecimento de domínio sem exigir que ele descubra e carregue skills durante a execução.

Copiar

Perguntar à IA

```
---
name: api-developer
description: Implement API endpoints following team conventions
skills:
  - api-conventions
  - error-handling-patterns
---

Implement API endpoints. Follow the conventions and patterns from the preloaded skills.
```

O conteúdo completo de cada skill é injetado no contexto do suagente, não apenas disponibilizado para invocação. Suagentes não herdam skills da conversa pai; você deve listá-las explicitamente.

Isto é o inverso de [executar uma skill em um suagente](/docs/pt/skills#run-skills-in-a-subagent). Com `skills` em um suagente, o suagente controla o prompt de sistema e carrega conteúdo de skill. Com `context: fork` em uma skill, o conteúdo de skill é injetado no agente que você especificar. Ambos usam o mesmo sistema subjacente.

#### [​](#regras-condicionais-com-hooks) Regras condicionais com hooks

Para controle mais dinâmico sobre o uso de ferramentas, use hooks `PreToolUse` para validar operações antes de serem executadas. Isso é útil quando você precisa permitir algumas operações de uma ferramenta enquanto bloqueia outras.
Este exemplo cria um suagente que apenas permite consultas de banco de dados somente leitura. O hook `PreToolUse` executa o script especificado em `command` antes de cada comando Bash ser executado:

Copiar

Perguntar à IA

```
---
name: db-reader
description: Execute read-only database queries
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---
```

Claude Code [passa entrada de hook como JSON](/docs/pt/hooks#pretooluse-input) via stdin para comandos de hook. O script de validação lê este JSON, extrai o comando Bash, e [sai com código 2](/docs/pt/hooks#exit-code-2-behavior) para bloquear operações de escrita:

Copiar

Perguntar à IA

```
#!/bin/bash
# ./scripts/validate-readonly-query.sh

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block SQL write operations (case-insensitive)
if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b' > /dev/null; then
  echo "Blocked: Only SELECT queries are allowed" >&2
  exit 2
fi

exit 0
```

Veja [Entrada de Hook](/docs/pt/hooks#pretooluse-input) para o esquema de entrada completo e [códigos de saída](/docs/pt/hooks#simple-exit-code) para como códigos de saída afetam o comportamento.

#### [​](#desabilite-suagentes-específicos) Desabilite suagentes específicos

Você pode impedir que Claude use suagentes específicos adicionando-os ao array `deny` em suas [configurações](/docs/pt/settings#permission-settings). Use o formato `Task(subagent-name)` onde `subagent-name` corresponde ao campo name do suagente.

Copiar

Perguntar à IA

```
{
  "permissions": {
    "deny": ["Task(Explore)", "Task(my-custom-agent)"]
  }
}
```

Isso funciona para suagentes integrados e personalizados. Você também pode usar a flag CLI `--disallowedTools`:

Copiar

Perguntar à IA

```
claude --disallowedTools "Task(Explore)"
```

Veja [documentação IAM](/docs/pt/iam#tool-specific-permission-rules) para mais detalhes sobre regras de permissão.

### [​](#defina-hooks-para-suagentes) Defina hooks para suagentes

Suagentes podem definir [hooks](/docs/pt/hooks) que são executados durante o ciclo de vida do suagente. Existem duas formas de configurar hooks:

1. **No frontmatter do suagente**: Defina hooks que são executados apenas enquanto esse suagente está ativo
2. **Em `settings.json`**: Defina hooks que são executados na sessão principal quando suagentes iniciam ou param

#### [​](#hooks-no-frontmatter-do-suagente) Hooks no frontmatter do suagente

Defina hooks diretamente no arquivo markdown do suagente. Estes hooks são executados apenas enquanto esse suagente específico está ativo e são limpos quando ele termina.

| Evento | Entrada do Matcher | Quando é acionado |
| --- | --- | --- |
| `PreToolUse` | Nome da ferramenta | Antes do suagente usar uma ferramenta |
| `PostToolUse` | Nome da ferramenta | Depois do suagente usar uma ferramenta |
| `Stop` | (nenhum) | Quando o suagente termina |

Este exemplo valida comandos Bash com o hook `PreToolUse` e executa um linter após edições de arquivo com `PostToolUse`:

Copiar

Perguntar à IA

```
---
name: code-reviewer
description: Review code changes with automatic linting
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-command.sh $TOOL_INPUT"
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-linter.sh"
---
```

Hooks `Stop` no frontmatter são automaticamente convertidos para eventos `SubagentStop`.

#### [​](#hooks-de-nível-de-projeto-para-eventos-de-suagente) Hooks de nível de projeto para eventos de suagente

Configure hooks em `settings.json` que respondem a eventos de ciclo de vida de suagente na sessão principal. Use o campo `matcher` para direcionar tipos de agente específicos por nome.

| Evento | Entrada do Matcher | Quando é acionado |
| --- | --- | --- |
| `SubagentStart` | Nome do tipo de agente | Quando um suagente começa a execução |
| `SubagentStop` | Nome do tipo de agente | Quando um suagente completa |

Este exemplo executa scripts de configuração e limpeza apenas quando o suagente `db-agent` inicia e para:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "SubagentStart": [
      {
        "matcher": "db-agent",
        "hooks": [
          { "type": "command", "command": "./scripts/setup-db-connection.sh" }
        ]
      }
    ],
    "SubagentStop": [
      {
        "matcher": "db-agent",
        "hooks": [
          { "type": "command", "command": "./scripts/cleanup-db-connection.sh" }
        ]
      }
    ]
  }
}
```

Veja [Hooks](/docs/pt/hooks) para o formato de configuração de hook completo.

[​](#trabalhe-com-suagentes) Trabalhe com suagentes
---------------------------------------------------

### [​](#entenda-a-delegação-automática) Entenda a delegação automática

Claude delega tarefas automaticamente com base na descrição da tarefa em sua solicitação, no campo `description` nas configurações de suagente, e no contexto atual. Para encorajar delegação proativa, inclua frases como “use proactively” no campo description do seu suagente.
Você também pode solicitar um suagente específico explicitamente:

Copiar

Perguntar à IA

```
Use the test-runner subagent to fix failing tests
Have the code-reviewer subagent look at my recent changes
```

### [​](#execute-suagentes-em-primeiro-plano-ou-segundo-plano) Execute suagentes em primeiro plano ou segundo plano

Suagentes podem ser executados em primeiro plano (bloqueante) ou segundo plano (concorrente):

* **Suagentes em primeiro plano** bloqueiam a conversa principal até completar. Prompts de permissão e perguntas de esclarecimento (como [`AskUserQuestion`](/docs/pt/settings#tools-available-to-claude)) são passados para você.
* **Suagentes em segundo plano** são executados concorrentemente enquanto você continua trabalhando. Eles herdam as permissões do pai e auto-negam qualquer coisa não pré-aprovada. Se um suagente em segundo plano precisar de uma permissão que não tem ou precisar fazer perguntas de esclarecimento, essa chamada de ferramenta falha, mas o suagente continua. Ferramentas MCP não estão disponíveis em suagentes em segundo plano.

Se um suagente em segundo plano falhar devido a permissões ausentes, você pode [retomá-lo](#resume-subagents) em primeiro plano para tentar novamente com prompts interativos.
Claude decide se deve executar suagentes em primeiro plano ou segundo plano com base na tarefa. Você também pode:

* Pedir a Claude para “run this in the background”
* Pressionar **Ctrl+B** para colocar uma tarefa em execução em segundo plano

Para desabilitar toda a funcionalidade de tarefa em segundo plano, defina a variável de ambiente `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` para `1`. Veja [Variáveis de ambiente](/docs/pt/settings#environment-variables).

### [​](#padrões-comuns) Padrões comuns

#### [​](#isole-operações-de-alto-volume) Isole operações de alto volume

Um dos usos mais eficazes para suagentes é isolar operações que produzem grandes quantidades de saída. Executar testes, buscar documentação ou processar arquivos de log pode consumir contexto significativo. Ao delegar esses para um suagente, a saída detalhada fica no contexto do suagente enquanto apenas o resumo relevante retorna para sua conversa principal.

Copiar

Perguntar à IA

```
Use a subagent to run the test suite and report only the failing tests with their error messages
```

#### [​](#execute-pesquisa-paralela) Execute pesquisa paralela

Para investigações independentes, gere múltiplos suagentes para trabalhar simultaneamente:

Copiar

Perguntar à IA

```
Research the authentication, database, and API modules in parallel using separate subagents
```

Cada suagente explora sua área independentemente, depois Claude sintetiza os achados. Isso funciona melhor quando os caminhos de pesquisa não dependem um do outro.

Quando suagentes completam, seus resultados retornam para sua conversa principal. Executar muitos suagentes que cada um retorna resultados detalhados pode consumir contexto significativo.

#### [​](#encadeie-suagentes) Encadeie suagentes

Para fluxos de trabalho multi-etapas, peça a Claude para usar suagentes em sequência. Cada suagente completa sua tarefa e retorna resultados para Claude, que então passa contexto relevante para o próximo suagente.

Copiar

Perguntar à IA

```
Use the code-reviewer subagent to find performance issues, then use the optimizer subagent to fix them
```

### [​](#escolha-entre-suagentes-e-conversa-principal) Escolha entre suagentes e conversa principal

Use a **conversa principal** quando:

* A tarefa precisa de frequente ida e volta ou refinamento iterativo
* Múltiplas fases compartilham contexto significativo (planejamento → implementação → teste)
* Você está fazendo uma mudança rápida e direcionada
* Latência importa. Suagentes começam do zero e podem precisar de tempo para reunir contexto

Use **suagentes** quando:

* A tarefa produz saída detalhada que você não precisa em seu contexto principal
* Você quer aplicar restrições de ferramentas específicas ou permissões
* O trabalho é auto-contido e pode retornar um resumo

Considere [Skills](/docs/pt/skills) em vez disso quando você quer prompts reutilizáveis ou fluxos de trabalho que são executados no contexto da conversa principal em vez de contexto de suagente isolado.

Suagentes não podem gerar outros suagentes. Se seu fluxo de trabalho requer delegação aninhada, use [Skills](/docs/pt/skills) ou [encadeie suagentes](#chain-subagents) da conversa principal.

### [​](#gerencie-o-contexto-do-suagente) Gerencie o contexto do suagente

#### [​](#retome-suagentes) Retome suagentes

Cada invocação de suagente cria uma nova instância com contexto fresco. Para continuar o trabalho de um suagente existente em vez de começar do zero, peça a Claude para retomá-lo.
Suagentes retomados retêm seu histórico de conversa completo, incluindo todas as chamadas de ferramenta anteriores, resultados e raciocínio. O suagente continua exatamente de onde parou em vez de começar do zero.
Quando um suagente completa, Claude recebe seu ID de agente. Para retomar um suagente, peça a Claude para continuar o trabalho anterior:

Copiar

Perguntar à IA

```
Use the code-reviewer subagent to review the authentication module
[Agent completes]

Continue that code review and now analyze the authorization logic
[Claude resumes the subagent with full context from previous conversation]
```

Você também pode pedir a Claude pelo ID do agente se quiser referenciá-lo explicitamente, ou encontrar IDs nos arquivos de transcrição em `~/.claude/projects/{project}/{sessionId}/subagents/`. Cada transcrição é armazenada como `agent-{agentId}.jsonl`.
Transcrições de suagente persistem independentemente da conversa principal:

* **Compactação da conversa principal**: Quando a conversa principal se compacta, transcrições de suagente não são afetadas. Elas são armazenadas em arquivos separados.
* **Persistência de sessão**: Transcrições de suagente persistem dentro de sua sessão. Você pode [retomar um suagente](#resume-subagents) após reiniciar Claude Code retomando a mesma sessão.
* **Limpeza automática**: Transcrições são limpas com base na configuração `cleanupPeriodDays` (padrão: 30 dias).

#### [​](#auto-compactação) Auto-compactação

Suagentes suportam compactação automática usando a mesma lógica que a conversa principal. Por padrão, auto-compactação é acionada em aproximadamente 95% de capacidade. Para acionar compactação mais cedo, defina `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` para uma porcentagem mais baixa (por exemplo, `50`). Veja [variáveis de ambiente](/docs/pt/settings#environment-variables) para detalhes.
Eventos de compactação são registrados em arquivos de transcrição de suagente:

Copiar

Perguntar à IA

```
{
  "type": "system",
  "subtype": "compact_boundary",
  "compactMetadata": {
    "trigger": "auto",
    "preTokens": 167189
  }
}
```

O valor `preTokens` mostra quantos tokens foram usados antes da compactação ocorrer.

[​](#suagentes-de-exemplo) Suagentes de exemplo
-----------------------------------------------

Estes exemplos demonstram padrões eficazes para construir suagentes. Use-os como pontos de partida, ou gere uma versão personalizada com Claude.

**Melhores práticas:**

* **Projete suagentes focados:** cada suagente deve se destacar em uma tarefa específica
* **Escreva descrições detalhadas:** Claude usa a descrição para decidir quando delegar
* **Limite acesso a ferramentas:** conceda apenas permissões necessárias para segurança e foco
* **Verifique no controle de versão:** compartilhe suagentes de projeto com sua equipe

### [​](#revisor-de-código) Revisor de código

Um suagente somente leitura que revisa código sem modificá-lo. Este exemplo mostra como projetar um suagente focado com acesso limitado a ferramentas (sem Edit ou Write) e um prompt detalhado que especifica exatamente o que procurar e como formatar a saída.

Copiar

Perguntar à IA

```
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code is clear and readable
- Functions and variables are well-named
- No duplicated code
- Proper error handling
- No exposed secrets or API keys
- Input validation implemented
- Good test coverage
- Performance considerations addressed

Provide feedback organized by priority:
- Critical issues (must fix)
- Warnings (should fix)
- Suggestions (consider improving)

Include specific examples of how to fix issues.
```

### [​](#debugger) Debugger

Um suagente que pode analisar e corrigir problemas. Diferentemente do revisor de código, este inclui Edit porque corrigir bugs requer modificar código. O prompt fornece um fluxo de trabalho claro de diagnóstico para verificação.

Copiar

Perguntar à IA

```
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

Debugging process:
- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states

For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not the symptoms.
```

### [​](#cientista-de-dados) Cientista de dados

Um suagente específico de domínio para trabalho de análise de dados. Este exemplo mostra como criar suagentes para fluxos de trabalho especializados fora de tarefas típicas de codificação. Ele explicitamente define `model: sonnet` para análise mais capaz.

Copiar

Perguntar à IA

```
---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights. Use proactively for data analysis tasks and queries.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery analysis.

When invoked:
1. Understand the data analysis requirement
2. Write efficient SQL queries
3. Use BigQuery command line tools (bq) when appropriate
4. Analyze and summarize results
5. Present findings clearly

Key practices:
- Write optimized SQL queries with proper filters
- Use appropriate aggregations and joins
- Include comments explaining complex logic
- Format results for readability
- Provide data-driven recommendations

For each analysis:
- Explain the query approach
- Document any assumptions
- Highlight key findings
- Suggest next steps based on data

Always ensure queries are efficient and cost-effective.
```

### [​](#validador-de-consulta-de-banco-de-dados) Validador de consulta de banco de dados

Um suagente que permite acesso Bash, mas valida comandos para permitir apenas consultas SQL somente leitura. Este exemplo mostra como usar hooks `PreToolUse` para validação condicional quando você precisa de controle mais fino do que o campo `tools` fornece.

Copiar

Perguntar à IA

```
---
name: db-reader
description: Execute read-only database queries. Use when analyzing data or generating reports.
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---

You are a database analyst with read-only access. Execute SELECT queries to answer questions about the data.

When asked to analyze data:
1. Identify which tables contain the relevant data
2. Write efficient SELECT queries with appropriate filters
3. Present results clearly with context

You cannot modify data. If asked to INSERT, UPDATE, DELETE, or modify schema, explain that you only have read access.
```

Claude Code [passa entrada de hook como JSON](/docs/pt/hooks#pretooluse-input) via stdin para comandos de hook. O script de validação lê este JSON, extrai o comando sendo executado, e o verifica contra uma lista de operações de escrita SQL. Se uma operação de escrita é detectada, o script [sai com código 2](/docs/pt/hooks#exit-code-2-behavior) para bloquear a execução e retorna uma mensagem de erro para Claude via stderr.
Crie o script de validação em qualquer lugar em seu projeto. O caminho deve corresponder ao campo `command` em sua configuração de hook:

Copiar

Perguntar à IA

```
#!/bin/bash
# Blocks SQL write operations, allows SELECT queries

# Read JSON input from stdin
INPUT=$(cat)

# Extract the command field from tool_input using jq
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Block write operations (case-insensitive)
if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|MERGE)\b' > /dev/null; then
  echo "Blocked: Write operations not allowed. Use SELECT queries only." >&2
  exit 2
fi

exit 0
```

Torne o script executável:

Copiar

Perguntar à IA

```
chmod +x ./scripts/validate-readonly-query.sh
```

O hook recebe JSON via stdin com o comando Bash em `tool_input.command`. Código de saída 2 bloqueia a operação e alimenta a mensagem de erro de volta para Claude. Veja [Hooks](/docs/pt/hooks#simple-exit-code) para detalhes sobre códigos de saída e [Entrada de Hook](/docs/pt/hooks#pretooluse-input) para o esquema de entrada completo.

[​](#próximos-passos) Próximos passos
-------------------------------------

Agora que você entende suagentes, explore esses recursos relacionados:

* [Distribua suagentes com plugins](/docs/pt/plugins) para compartilhar suagentes entre equipes ou projetos
* [Execute Claude Code programaticamente](/docs/pt/headless) com o Agent SDK para CI/CD e automação
* [Use servidores MCP](/docs/pt/mcp) para dar aos suagentes acesso a ferramentas externas e dados