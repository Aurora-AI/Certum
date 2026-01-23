# https://code.claude.com/docs/pt/cli-reference#agents-flag-format

[​](#comandos-da-cli) Comandos da CLI
-------------------------------------

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `claude` | Iniciar REPL interativo | `claude` |
| `claude "query"` | Iniciar REPL com prompt inicial | `claude "explain this project"` |
| `claude -p "query"` | Consultar via SDK e sair | `claude -p "explain this function"` |
| `cat file | claude -p "query"` | Processar conteúdo canalizado | `cat logs.txt | claude -p "explain"` |
| `claude -c` | Continuar conversa mais recente no diretório atual | `claude -c` |
| `claude -c -p "query"` | Continuar via SDK | `claude -c -p "Check for type errors"` |
| `claude -r "<session>" "query"` | Retomar sessão por ID ou nome | `claude -r "auth-refactor" "Finish this PR"` |
| `claude update` | Atualizar para a versão mais recente | `claude update` |
| `claude mcp` | Configurar servidores Model Context Protocol (MCP) | Veja a [documentação Claude Code MCP](/docs/pt/mcp). |

[​](#sinalizadores-da-cli) Sinalizadores da CLI
-----------------------------------------------

Personalize o comportamento do Claude Code com estes sinalizadores de linha de comando:

| Sinalizador | Descrição | Exemplo |
| --- | --- | --- |
| `--add-dir` | Adicionar diretórios de trabalho adicionais para Claude acessar (valida se cada caminho existe como um diretório) | `claude --add-dir ../apps ../lib` |
| `--agent` | Especificar um agente para a sessão atual (substitui a configuração `agent`) | `claude --agent my-custom-agent` |
| `--agents` | Definir [subagentes](/docs/pt/sub-agents) personalizados dinamicamente via JSON (veja abaixo o formato) | `claude --agents '{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}'` |
| `--allow-dangerously-skip-permissions` | Ativar bypass de permissão como uma opção sem ativá-la imediatamente. Permite compor com `--permission-mode` (use com cuidado) | `claude --permission-mode plan --allow-dangerously-skip-permissions` |
| `--allowedTools` | Ferramentas que executam sem solicitar permissão. Veja [sintaxe de regra de permissão](/docs/pt/settings#permission-rule-syntax) para correspondência de padrões. Para restringir quais ferramentas estão disponíveis, use `--tools` em vez disso | `"Bash(git log:*)" "Bash(git diff:*)" "Read"` |
| `--append-system-prompt` | Anexar texto personalizado ao final do prompt do sistema padrão (funciona em modos interativo e de impressão) | `claude --append-system-prompt "Always use TypeScript"` |
| `--append-system-prompt-file` | Carregar texto de prompt do sistema adicional de um arquivo e anexar ao prompt padrão (apenas modo de impressão) | `claude -p --append-system-prompt-file ./extra-rules.txt "query"` |
| `--betas` | Cabeçalhos beta para incluir em solicitações de API (apenas usuários com chave de API) | `claude --betas interleaved-thinking` |
| `--chrome` | Ativar [integração do navegador Chrome](/docs/pt/chrome) para automação web e testes | `claude --chrome` |
| `--continue`, `-c` | Carregar a conversa mais recente no diretório atual | `claude --continue` |
| `--dangerously-skip-permissions` | Pular todos os prompts de permissão (use com cuidado) | `claude --dangerously-skip-permissions` |
| `--debug` | Ativar modo de depuração com filtragem de categoria opcional (por exemplo, `"api,hooks"` ou `"!statsig,!file"`) | `claude --debug "api,mcp"` |
| `--disable-slash-commands` | Desativar todas as habilidades e comandos de barra para esta sessão | `claude --disable-slash-commands` |
| `--disallowedTools` | Ferramentas que são removidas do contexto do modelo e não podem ser usadas | `"Bash(git log:*)" "Bash(git diff:*)" "Edit"` |
| `--fallback-model` | Ativar fallback automático para modelo especificado quando o modelo padrão está sobrecarregado (apenas modo de impressão) | `claude -p --fallback-model sonnet "query"` |
| `--fork-session` | Ao retomar, criar um novo ID de sessão em vez de reutilizar o original (use com `--resume` ou `--continue`) | `claude --resume abc123 --fork-session` |
| `--ide` | Conectar automaticamente ao IDE na inicialização se exatamente um IDE válido estiver disponível | `claude --ide` |
| `--include-partial-messages` | Incluir eventos de streaming parcial na saída (requer `--print` e `--output-format=stream-json`) | `claude -p --output-format stream-json --include-partial-messages "query"` |
| `--input-format` | Especificar formato de entrada para modo de impressão (opções: `text`, `stream-json`) | `claude -p --output-format json --input-format stream-json` |
| `--json-schema` | Obter saída JSON validada correspondendo a um JSON Schema após o agente concluir seu fluxo de trabalho (apenas modo de impressão, veja [Agent SDK Structured Outputs](https://docs.claude.com/en/docs/agent-sdk/structured-outputs)) | `claude -p --json-schema '{"type":"object","properties":{...}}' "query"` |
| `--max-budget-usd` | Valor máximo em dólares a gastar em chamadas de API antes de parar (apenas modo de impressão) | `claude -p --max-budget-usd 5.00 "query"` |
| `--max-turns` | Limitar o número de turnos de agente (apenas modo de impressão). Sai com um erro quando o limite é atingido. Sem limite por padrão | `claude -p --max-turns 3 "query"` |
| `--mcp-config` | Carregar servidores MCP de arquivos ou strings JSON (separados por espaço) | `claude --mcp-config ./mcp.json` |
| `--model` | Define o modelo para a sessão atual com um alias para o modelo mais recente (`sonnet` ou `opus`) ou nome completo do modelo | `claude --model claude-sonnet-4-5-20250929` |
| `--no-chrome` | Desativar [integração do navegador Chrome](/docs/pt/chrome) para esta sessão | `claude --no-chrome` |
| `--no-session-persistence` | Desativar persistência de sessão para que as sessões não sejam salvas em disco e não possam ser retomadas (apenas modo de impressão) | `claude -p --no-session-persistence "query"` |
| `--output-format` | Especificar formato de saída para modo de impressão (opções: `text`, `json`, `stream-json`) | `claude -p "query" --output-format json` |
| `--permission-mode` | Começar em um [modo de permissão](/docs/pt/iam#permission-modes) especificado | `claude --permission-mode plan` |
| `--permission-prompt-tool` | Especificar uma ferramenta MCP para lidar com prompts de permissão em modo não interativo | `claude -p --permission-prompt-tool mcp_auth_tool "query"` |
| `--plugin-dir` | Carregar plugins de diretórios apenas para esta sessão (repetível) | `claude --plugin-dir ./my-plugins` |
| `--print`, `-p` | Imprimir resposta sem modo interativo (veja [documentação SDK](https://docs.claude.com/en/docs/agent-sdk) para detalhes de uso programático) | `claude -p "query"` |
| `--remote` | Criar uma nova [sessão web](/docs/pt/claude-code-on-the-web) em claude.ai com a descrição da tarefa fornecida | `claude --remote "Fix the login bug"` |
| `--resume`, `-r` | Retomar uma sessão específica por ID ou nome, ou mostrar um seletor interativo para escolher uma sessão | `claude --resume auth-refactor` |
| `--session-id` | Usar um ID de sessão específico para a conversa (deve ser um UUID válido) | `claude --session-id "550e8400-e29b-41d4-a716-446655440000"` |
| `--setting-sources` | Lista separada por vírgula de fontes de configuração a carregar (`user`, `project`, `local`) | `claude --setting-sources user,project` |
| `--settings` | Caminho para um arquivo JSON de configurações ou uma string JSON para carregar configurações adicionais | `claude --settings ./settings.json` |
| `--strict-mcp-config` | Usar apenas servidores MCP de `--mcp-config`, ignorando todas as outras configurações MCP | `claude --strict-mcp-config --mcp-config ./mcp.json` |
| `--system-prompt` | Substituir todo o prompt do sistema por texto personalizado (funciona em modos interativo e de impressão) | `claude --system-prompt "You are a Python expert"` |
| `--system-prompt-file` | Carregar prompt do sistema de um arquivo, substituindo o prompt padrão (apenas modo de impressão) | `claude -p --system-prompt-file ./custom-prompt.txt "query"` |
| `--teleport` | Retomar uma [sessão web](/docs/pt/claude-code-on-the-web) em seu terminal local | `claude --teleport` |
| `--tools` | Restringir quais ferramentas integradas Claude pode usar (funciona em modos interativo e de impressão). Use `""` para desativar todas, `"default"` para todas, ou nomes de ferramentas como `"Bash,Edit,Read"` | `claude --tools "Bash,Edit,Read"` |
| `--verbose` | Ativar log detalhado, mostra saída completa turno a turno (útil para depuração em modos de impressão e interativo) | `claude --verbose` |
| `--version`, `-v` | Exibir o número da versão | `claude -v` |

O sinalizador `--output-format json` é particularmente útil para scripts e
automação, permitindo que você analise as respostas do Claude programaticamente.

### [​](#formato-do-sinalizador-de-agentes) Formato do sinalizador de agentes

O sinalizador `--agents` aceita um objeto JSON que define um ou mais subagentes personalizados. Cada subagente requer um nome único (como a chave) e um objeto de definição com os seguintes campos:

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `description` | Sim | Descrição em linguagem natural de quando o subagente deve ser invocado |
| `prompt` | Sim | O prompt do sistema que guia o comportamento do subagente |
| `tools` | Não | Array de ferramentas específicas que o subagente pode usar (por exemplo, `["Read", "Edit", "Bash"]`). Se omitido, herda todas as ferramentas |
| `model` | Não | Alias do modelo a usar: `sonnet`, `opus`, ou `haiku`. Se omitido, usa o modelo de subagente padrão |

Exemplo:

Copiar

Perguntar à IA

```
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  },
  "debugger": {
    "description": "Debugging specialist for errors and test failures.",
    "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes."
  }
}'
```

Para mais detalhes sobre como criar e usar subagentes, veja a [documentação de subagentes](/docs/pt/sub-agents).

### [​](#sinalizadores-de-prompt-do-sistema) Sinalizadores de prompt do sistema

Claude Code fornece quatro sinalizadores para personalizar o prompt do sistema, cada um servindo a um propósito diferente:

| Sinalizador | Comportamento | Modos | Caso de Uso |
| --- | --- | --- | --- |
| `--system-prompt` | **Substitui** todo o prompt padrão | Interativo + Impressão | Controle completo sobre o comportamento e instruções do Claude |
| `--system-prompt-file` | **Substitui** com conteúdo do arquivo | Apenas impressão | Carregar prompts de arquivos para reprodutibilidade e controle de versão |
| `--append-system-prompt` | **Anexa** ao prompt padrão | Interativo + Impressão | Adicionar instruções específicas mantendo o comportamento padrão do Claude Code |
| `--append-system-prompt-file` | **Anexa** conteúdo do arquivo ao prompt padrão | Apenas impressão | Carregar instruções adicionais de arquivos mantendo os padrões |

**Quando usar cada um:**

* **`--system-prompt`**: Use quando você precisa de controle completo sobre o prompt do sistema do Claude. Isso remove todas as instruções padrão do Claude Code, dando a você uma folha em branco.

  Copiar

  Perguntar à IA

  ```
  claude --system-prompt "You are a Python expert who only writes type-annotated code"
  ```
* **`--system-prompt-file`**: Use quando você quer carregar um prompt personalizado de um arquivo, útil para consistência de equipe ou modelos de prompt controlados por versão.

  Copiar

  Perguntar à IA

  ```
  claude -p --system-prompt-file ./prompts/code-review.txt "Review this PR"
  ```
* **`--append-system-prompt`**: Use quando você quer adicionar instruções específicas mantendo as capacidades padrão do Claude Code intactas. Esta é a opção mais segura para a maioria dos casos de uso.

  Copiar

  Perguntar à IA

  ```
  claude --append-system-prompt "Always use TypeScript and include JSDoc comments"
  ```
* **`--append-system-prompt-file`**: Use quando você quer anexar instruções de um arquivo mantendo os padrões do Claude Code. Útil para adições controladas por versão.

  Copiar

  Perguntar à IA

  ```
  claude -p --append-system-prompt-file ./prompts/style-rules.txt "Review this PR"
  ```

`--system-prompt` e `--system-prompt-file` são mutuamente exclusivos. Os sinalizadores de anexação podem ser usados juntos com qualquer sinalizador de substituição.
Para a maioria dos casos de uso, `--append-system-prompt` ou `--append-system-prompt-file` é recomendado, pois preservam as capacidades integradas do Claude Code enquanto adicionam seus requisitos personalizados. Use `--system-prompt` ou `--system-prompt-file` apenas quando você precisar de controle completo sobre o prompt do sistema.

[​](#veja-também) Veja também
-----------------------------

* [Extensão Chrome](/docs/pt/chrome) - Automação de navegador e testes web
* [Modo interativo](/docs/pt/interactive-mode) - Atalhos, modos de entrada e recursos interativos
* [Comandos de barra](/docs/pt/slash-commands) - Comandos de sessão interativa
* [Guia de início rápido](/docs/pt/quickstart) - Começar com Claude Code
* [Fluxos de trabalho comuns](/docs/pt/common-workflows) - Fluxos de trabalho e padrões avançados
* [Configurações](/docs/pt/settings) - Opções de configuração
* [Documentação SDK](https://docs.claude.com/en/docs/agent-sdk) - Uso programático e integrações