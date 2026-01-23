# https://code.claude.com/docs/pt/quickstart

Este guia de início rápido o colocará usando assistência de codificação alimentada por IA em apenas alguns minutos. Ao final, você entenderá como usar Claude Code para tarefas comuns de desenvolvimento.

[​](#antes-de-começar) Antes de começar
---------------------------------------

Certifique-se de que você tem:

* Um terminal ou prompt de comando aberto
* Um projeto de código para trabalhar
* Uma conta [Claude.ai](https://claude.ai) (recomendado) ou [Claude Console](https://console.anthropic.com/)

[​](#etapa-1:-instalar-claude-code) Etapa 1: Instalar Claude Code
-----------------------------------------------------------------

To install Claude Code, use one of the following methods:

* Native Install (Recommended)
* Homebrew
* WinGet

**macOS, Linux, WSL:**

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**

Copiar

Perguntar à IA

```
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD:**

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Native installations automatically update in the background to keep you on the latest version.

Copiar

Perguntar à IA

```
brew install --cask claude-code
```

Homebrew installations do not auto-update. Run `brew upgrade claude-code` periodically to get the latest features and security fixes.

Copiar

Perguntar à IA

```
winget install Anthropic.ClaudeCode
```

WinGet installations do not auto-update. Run `winget upgrade Anthropic.ClaudeCode` periodically to get the latest features and security fixes.

[​](#etapa-2:-faça-login-em-sua-conta) Etapa 2: Faça login em sua conta
-----------------------------------------------------------------------

Claude Code requer uma conta para usar. Quando você inicia uma sessão interativa com o comando `claude`, você precisará fazer login:

Copiar

Perguntar à IA

```
claude
# Você será solicitado a fazer login no primeiro uso
```

Copiar

Perguntar à IA

```
/login
# Siga os prompts para fazer login com sua conta
```

Você pode fazer login usando qualquer tipo de conta:

* [Claude.ai](https://claude.ai) (planos de assinatura - recomendado)
* [Claude Console](https://console.anthropic.com/) (acesso à API com créditos pré-pagos)

Depois de fazer login, suas credenciais são armazenadas e você não precisará fazer login novamente.

Quando você autentica Claude Code com sua conta Claude Console pela primeira vez, um workspace chamado “Claude Code” é criado automaticamente para você. Este workspace fornece rastreamento centralizado de custos e gerenciamento para todo o uso de Claude Code em sua organização.

Você pode ter ambos os tipos de conta sob o mesmo endereço de email. Se você precisar fazer login novamente ou trocar de contas, use o comando `/login` dentro do Claude Code.

[​](#etapa-3:-inicie-sua-primeira-sessão) Etapa 3: Inicie sua primeira sessão
-----------------------------------------------------------------------------

Abra seu terminal em qualquer diretório de projeto e inicie Claude Code:

Copiar

Perguntar à IA

```
cd /path/to/your/project
claude
```

Você verá a tela de boas-vindas do Claude Code com suas informações de sessão, conversas recentes e atualizações mais recentes. Digite `/help` para comandos disponíveis ou `/resume` para continuar uma conversa anterior.

Depois de fazer login (Etapa 2), suas credenciais são armazenadas em seu sistema. Saiba mais em [Gerenciamento de Credenciais](/docs/pt/iam#credential-management).

[​](#etapa-4:-faça-sua-primeira-pergunta) Etapa 4: Faça sua primeira pergunta
-----------------------------------------------------------------------------

Vamos começar entendendo sua base de código. Tente um destes comandos:

Copiar

Perguntar à IA

```
> what does this project do?
```

Claude analisará seus arquivos e fornecerá um resumo. Você também pode fazer perguntas mais específicas:

Copiar

Perguntar à IA

```
> what technologies does this project use?
```

Copiar

Perguntar à IA

```
> where is the main entry point?
```

Copiar

Perguntar à IA

```
> explain the folder structure
```

Você também pode perguntar ao Claude sobre suas próprias capacidades:

Copiar

Perguntar à IA

```
> what can Claude Code do?
```

Copiar

Perguntar à IA

```
> how do I use slash commands in Claude Code?
```

Copiar

Perguntar à IA

```
> can Claude Code work with Docker?
```

Claude Code lê seus arquivos conforme necessário - você não precisa adicionar contexto manualmente. Claude também tem acesso à sua própria documentação e pode responder perguntas sobre seus recursos e capacidades.

[​](#etapa-5:-faça-sua-primeira-mudança-de-código) Etapa 5: Faça sua primeira mudança de código
-----------------------------------------------------------------------------------------------

Agora vamos fazer Claude Code fazer alguma codificação real. Tente uma tarefa simples:

Copiar

Perguntar à IA

```
> add a hello world function to the main file
```

Claude Code irá:

1. Encontrar o arquivo apropriado
2. Mostrar as mudanças propostas
3. Pedir sua aprovação
4. Fazer a edição

Claude Code sempre pede permissão antes de modificar arquivos. Você pode aprovar mudanças individuais ou ativar o modo “Aceitar tudo” para uma sessão.

[​](#etapa-6:-use-git-com-claude-code) Etapa 6: Use Git com Claude Code
-----------------------------------------------------------------------

Claude Code torna as operações Git conversacionais:

Copiar

Perguntar à IA

```
> what files have I changed?
```

Copiar

Perguntar à IA

```
> commit my changes with a descriptive message
```

Você também pode solicitar operações Git mais complexas:

Copiar

Perguntar à IA

```
> create a new branch called feature/quickstart
```

Copiar

Perguntar à IA

```
> show me the last 5 commits
```

Copiar

Perguntar à IA

```
> help me resolve merge conflicts
```

[​](#etapa-7:-corrija-um-bug-ou-adicione-um-recurso) Etapa 7: Corrija um bug ou adicione um recurso
---------------------------------------------------------------------------------------------------

Claude é proficiente em depuração e implementação de recursos.
Descreva o que você quer em linguagem natural:

Copiar

Perguntar à IA

```
> add input validation to the user registration form
```

Ou corrija problemas existentes:

Copiar

Perguntar à IA

```
> there's a bug where users can submit empty forms - fix it
```

Claude Code irá:

* Localizar o código relevante
* Entender o contexto
* Implementar uma solução
* Executar testes se disponível

[​](#etapa-8:-teste-outros-fluxos-de-trabalho-comuns) Etapa 8: Teste outros fluxos de trabalho comuns
-----------------------------------------------------------------------------------------------------

Existem várias maneiras de trabalhar com Claude:
**Refatorar código**

Copiar

Perguntar à IA

```
> refactor the authentication module to use async/await instead of callbacks
```

**Escrever testes**

Copiar

Perguntar à IA

```
> write unit tests for the calculator functions
```

**Atualizar documentação**

Copiar

Perguntar à IA

```
> update the README with installation instructions
```

**Revisão de código**

Copiar

Perguntar à IA

```
> review my changes and suggest improvements
```

**Lembre-se**: Claude Code é seu programador de par de IA. Fale com ele como você falaria com um colega útil - descreva o que você quer alcançar, e ele o ajudará a chegar lá.

[​](#comandos-essenciais) Comandos essenciais
---------------------------------------------

Aqui estão os comandos mais importantes para uso diário:

| Comando | O que faz | Exemplo |
| --- | --- | --- |
| `claude` | Iniciar modo interativo | `claude` |
| `claude "task"` | Executar uma tarefa única | `claude "fix the build error"` |
| `claude -p "query"` | Executar consulta única, depois sair | `claude -p "explain this function"` |
| `claude -c` | Continuar conversa mais recente no diretório atual | `claude -c` |
| `claude -r` | Retomar uma conversa anterior | `claude -r` |
| `claude commit` | Criar um commit Git | `claude commit` |
| `/clear` | Limpar histórico de conversa | `> /clear` |
| `/help` | Mostrar comandos disponíveis | `> /help` |
| `exit` ou Ctrl+C | Sair do Claude Code | `> exit` |

Veja a [referência CLI](/docs/pt/cli-reference) para uma lista completa de comandos.

[​](#dicas-profissionais-para-iniciantes) Dicas profissionais para iniciantes
-----------------------------------------------------------------------------

Seja específico com suas solicitações

Em vez de: “fix the bug”Tente: “fix the login bug where users see a blank screen after entering wrong credentials”

Use instruções passo a passo

Divida tarefas complexas em etapas:

Copiar

Perguntar à IA

```
> 1. create a new database table for user profiles
```

Copiar

Perguntar à IA

```
> 2. create an API endpoint to get and update user profiles
```

Copiar

Perguntar à IA

```
> 3. build a webpage that allows users to see and edit their information
```

Deixe Claude explorar primeiro

Antes de fazer mudanças, deixe Claude entender seu código:

Copiar

Perguntar à IA

```
> analyze the database schema
```

Copiar

Perguntar à IA

```
> build a dashboard showing products that are most frequently returned by our UK customers
```

Economize tempo com atalhos

* Pressione `?` para ver todos os atalhos de teclado disponíveis
* Use Tab para conclusão de comando
* Pressione ↑ para histórico de comando
* Digite `/` para ver todos os comandos de barra

[​](#próximos-passos) Próximos passos?
--------------------------------------

Agora que você aprendeu o básico, explore recursos mais avançados:

[Fluxos de trabalho comuns
-------------------------

Guias passo a passo para tarefas comuns](/docs/pt/common-workflows)[Referência CLI
--------------

Domine todos os comandos e opções](/docs/pt/cli-reference)[Configuração
------------

Personalize Claude Code para seu fluxo de trabalho](/docs/pt/settings)[Claude Code na web
------------------

Execute tarefas de forma assíncrona na nuvem](/docs/pt/claude-code-on-the-web)[Sobre Claude Code
-----------------

Saiba mais em claude.com](https://claude.com/product/claude-code)

[​](#obtendo-ajuda) Obtendo ajuda
---------------------------------

* **Em Claude Code**: Digite `/help` ou pergunte “how do I…”
* **Documentação**: Você está aqui! Navegue por outros guias
* **Comunidade**: Junte-se ao nosso [Discord](https://www.anthropic.com/discord) para dicas e suporte