# https://code.claude.com/docs/pt/overview#recursos-adicionais

[​](#comece-em-30-segundos) Comece em 30 segundos
-------------------------------------------------

Pré-requisitos:

* Uma conta [Claude.ai](https://claude.ai) (recomendado) ou [Claude Console](https://console.anthropic.com/)

**Instale Claude Code:**
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

**Comece a usar Claude Code:**

Copiar

Perguntar à IA

```
cd your-project
claude
```

Você será solicitado a fazer login no primeiro uso. É isso! [Continue com Quickstart (5 minutos) →](/docs/pt/quickstart)

Claude Code se mantém automaticamente atualizado. Veja [configuração avançada](/docs/pt/setup) para opções de instalação, atualizações manuais ou instruções de desinstalação. Visite [solução de problemas](/docs/pt/troubleshooting) se você encontrar problemas.

[​](#o-que-claude-code-faz-por-você) O que Claude Code faz por você
-------------------------------------------------------------------

* **Construa recursos a partir de descrições**: Diga ao Claude o que você quer construir em inglês simples. Ele fará um plano, escreverá o código e garantirá que funcione.
* **Depure e corrija problemas**: Descreva um bug ou cole uma mensagem de erro. Claude Code analisará sua base de código, identificará o problema e implementará uma correção.
* **Navegue por qualquer base de código**: Pergunte qualquer coisa sobre a base de código da sua equipe e obtenha uma resposta bem pensada. Claude Code mantém consciência de toda a estrutura do seu projeto, pode encontrar informações atualizadas da web e, com [MCP](/docs/pt/mcp), pode extrair de fontes de dados externas como Google Drive, Figma e Slack.
* **Automatize tarefas tediosas**: Corrija problemas complicados de lint, resolva conflitos de mesclagem e escreva notas de lançamento. Faça tudo isso em um único comando de suas máquinas de desenvolvedor ou automaticamente em CI.

[​](#por-que-os-desenvolvedores-amam-claude-code) Por que os desenvolvedores amam Claude Code
---------------------------------------------------------------------------------------------

* **Funciona em seu terminal**: Não é outra janela de chat. Não é outra IDE. Claude Code o encontra onde você já trabalha, com as ferramentas que você já ama.
* **Toma ação**: Claude Code pode editar arquivos diretamente, executar comandos e criar commits. Precisa de mais? [MCP](/docs/pt/mcp) permite que Claude leia seus documentos de design no Google Drive, atualize seus tickets no Jira ou use *sua* ferramenta de desenvolvedor personalizada.
* **Filosofia Unix**: Claude Code é composável e scriptável. `tail -f app.log | claude -p "Slack me if you see any anomalies appear in this log stream"` *funciona*. Seu CI pode executar `claude -p "If there are new text strings, translate them into French and raise a PR for @lang-fr-team to review"`.
* **Pronto para empresas**: Use a Claude API ou hospede na AWS ou GCP. [Segurança](/docs/pt/security), [privacidade](/docs/pt/data-usage) e [conformidade](https://trust.anthropic.com/) de nível empresarial estão integradas.

[​](#próximos-passos) Próximos passos
-------------------------------------

[Quickstart
----------

Veja Claude Code em ação com exemplos práticos](/docs/pt/quickstart)[Fluxos de trabalho comuns
-------------------------

Guias passo a passo para fluxos de trabalho comuns](/docs/pt/common-workflows)[Solução de problemas
--------------------

Soluções para problemas comuns com Claude Code](/docs/pt/troubleshooting)[Configuração de IDE
-------------------

Adicione Claude Code à sua IDE](/docs/pt/vs-code)

[​](#recursos-adicionais) Recursos adicionais
---------------------------------------------

[Sobre Claude Code
-----------------

Saiba mais sobre Claude Code em claude.com](https://claude.com/product/claude-code)[Construa com o Agent SDK
------------------------

Crie agentes de IA personalizados com o Claude Agent SDK](https://docs.claude.com/en/docs/agent-sdk/overview)[Hospede na AWS ou GCP
---------------------

Configure Claude Code com Amazon Bedrock ou Google Vertex AI](/docs/pt/third-party-integrations)[Configurações
-------------

Personalize Claude Code para seu fluxo de trabalho](/docs/pt/settings)[Comandos
--------

Aprenda sobre comandos e controles CLI](/docs/pt/cli-reference)[Implementação de referência
---------------------------

Clone nossa implementação de referência de contêiner de desenvolvimento](https://github.com/anthropics/claude-code/tree/main/.devcontainer)[Segurança
---------

Descubra as proteções do Claude Code e as melhores práticas para uso seguro](/docs/pt/security)[Privacidade e uso de dados
--------------------------

Entenda como Claude Code lida com seus dados](/docs/pt/data-usage)