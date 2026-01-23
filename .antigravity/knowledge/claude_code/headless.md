# https://code.claude.com/docs/pt/headless

O [Agent SDK](https://platform.claude.com/docs/pt/agent-sdk/overview) oferece as mesmas ferramentas, loop de agente e gerenciamento de contexto que alimentam Claude Code. Está disponível como uma CLI para scripts e CI/CD, ou como pacotes [Python](https://platform.claude.com/docs/pt/agent-sdk/python) e [TypeScript](https://platform.claude.com/docs/pt/agent-sdk/typescript) para controle programático completo.

A CLI era anteriormente chamada de “modo headless”. O sinalizador `-p` e todas as opções de CLI funcionam da mesma forma.

Para executar Claude Code programaticamente a partir da CLI, passe `-p` com seu prompt e qualquer [opção de CLI](/docs/pt/cli-reference):

Copiar

Perguntar à IA

```
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"
```

Esta página cobre o uso do Agent SDK via CLI (`claude -p`). Para os pacotes SDK Python e TypeScript com saídas estruturadas, callbacks de aprovação de ferramentas e objetos de mensagem nativos, consulte a [documentação completa do Agent SDK](https://platform.claude.com/docs/pt/agent-sdk/overview).

[​](#uso-básico) Uso básico
---------------------------

Adicione o sinalizador `-p` (ou `--print`) a qualquer comando `claude` para executá-lo de forma não interativa. Todas as [opções de CLI](/docs/pt/cli-reference) funcionam com `-p`, incluindo:

* `--continue` para [continuar conversas](#continue-conversations)
* `--allowedTools` para [aprovar ferramentas automaticamente](#auto-approve-tools)
* `--output-format` para [saída estruturada](#get-structured-output)

Este exemplo faz uma pergunta ao Claude sobre sua base de código e imprime a resposta:

Copiar

Perguntar à IA

```
claude -p "What does the auth module do?"
```

[​](#exemplos) Exemplos
-----------------------

Estes exemplos destacam padrões comuns de CLI.

### [​](#obter-saída-estruturada) Obter saída estruturada

Use `--output-format` para controlar como as respostas são retornadas:

* `text` (padrão): saída de texto simples
* `json`: JSON estruturado com resultado, ID de sessão e metadados
* `stream-json`: JSON delimitado por nova linha para streaming em tempo real

Este exemplo retorna um resumo do projeto como JSON com metadados de sessão, com o resultado de texto no campo `result`:

Copiar

Perguntar à IA

```
claude -p "Summarize this project" --output-format json
```

Para obter saída em conformidade com um esquema específico, use `--output-format json` com `--json-schema` e uma definição de [JSON Schema](https://json-schema.org/). A resposta inclui metadados sobre a solicitação (ID de sessão, uso, etc.) com a saída estruturada no campo `structured_output`.
Este exemplo extrai nomes de funções e os retorna como uma matriz de strings:

Copiar

Perguntar à IA

```
claude -p "Extract the main function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'
```

Use uma ferramenta como [jq](https://jqlang.github.io/jq/) para analisar a resposta e extrair campos específicos:

Copiar

Perguntar à IA

```
# Extract the text result
claude -p "Summarize this project" --output-format json | jq -r '.result'

# Extract structured output
claude -p "Extract function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}' \
  | jq '.structured_output'
```

### [​](#aprovar-ferramentas-automaticamente) Aprovar ferramentas automaticamente

Use `--allowedTools` para permitir que Claude use certas ferramentas sem solicitar. Este exemplo executa um conjunto de testes e corrige falhas, permitindo que Claude execute comandos Bash e leia/edite arquivos sem pedir permissão:

Copiar

Perguntar à IA

```
claude -p "Run the test suite and fix any failures" \
  --allowedTools "Bash,Read,Edit"
```

### [​](#criar-um-commit) Criar um commit

Este exemplo revisa as alterações preparadas e cria um commit com uma mensagem apropriada:

Copiar

Perguntar à IA

```
claude -p "Look at my staged changes and create an appropriate commit" \
  --allowedTools "Bash(git diff:*),Bash(git log:*),Bash(git status:*),Bash(git commit:*)"
```

O sinalizador `--allowedTools` usa [sintaxe de regra de permissão](/docs/pt/settings#permission-rule-syntax). O sufixo `:*` ativa correspondência de prefixo, então `Bash(git diff:*)` permite qualquer comando começando com `git diff`.

[Comandos de barra](/docs/pt/slash-commands) como `/commit` estão disponíveis apenas no modo interativo. No modo `-p`, descreva a tarefa que deseja realizar.

### [​](#personalizar-o-prompt-do-sistema) Personalizar o prompt do sistema

Use `--append-system-prompt` para adicionar instruções mantendo o comportamento padrão do Claude Code. Este exemplo envia um diff de PR para Claude e o instrui a revisar vulnerabilidades de segurança:

Copiar

Perguntar à IA

```
gh pr diff "$1" | claude -p \
  --append-system-prompt "You are a security engineer. Review for vulnerabilities." \
  --output-format json
```

Consulte [sinalizadores de prompt do sistema](/docs/pt/cli-reference#system-prompt-flags) para mais opções, incluindo `--system-prompt` para substituir completamente o prompt padrão.

### [​](#continuar-conversas) Continuar conversas

Use `--continue` para continuar a conversa mais recente, ou `--resume` com um ID de sessão para continuar uma conversa específica. Este exemplo executa uma revisão e envia prompts de acompanhamento:

Copiar

Perguntar à IA

```
# First request
claude -p "Review this codebase for performance issues"

# Continue the most recent conversation
claude -p "Now focus on the database queries" --continue
claude -p "Generate a summary of all issues found" --continue
```

Se você estiver executando várias conversas, capture o ID da sessão para retomar uma específica:

Copiar

Perguntar à IA

```
session_id=$(claude -p "Start a review" --output-format json | jq -r '.session_id')
claude -p "Continue that review" --resume "$session_id"
```

[​](#próximas-etapas) Próximas etapas
-------------------------------------

[Início rápido do Agent SDK
--------------------------

Crie seu primeiro agente com Python ou TypeScript](https://platform.claude.com/docs/pt/agent-sdk/quickstart)[Referência de CLI
-----------------

Explore todos os sinalizadores e opções de CLI](/docs/pt/cli-reference)[GitHub Actions
--------------

Use o Agent SDK em fluxos de trabalho do GitHub](/docs/pt/github-actions)[GitLab CI/CD
------------

Use o Agent SDK em pipelines do GitLab](/docs/pt/gitlab-ci-cd)