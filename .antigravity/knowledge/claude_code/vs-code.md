# https://code.claude.com/docs/pt/vs-code

![Editor VS Code com o painel de extensão Claude Code aberto no lado direito, mostrando uma conversa com Claude](https://mintcdn.com/claude-code/-YhHHmtSxwr7W8gy/images/vs-code-extension-interface.jpg?fit=max&auto=format&n=-YhHHmtSxwr7W8gy&q=85&s=300652d5678c63905e6b0ea9e50835f8)
A extensão VS Code fornece uma interface gráfica nativa para Claude Code, integrada diretamente ao seu IDE. Esta é a forma recomendada de usar Claude Code no VS Code.
Com a extensão, você pode revisar e editar os planos do Claude antes de aceitá-los, aceitar automaticamente edições conforme são feitas, @-mencionar arquivos com intervalos de linhas específicas da sua seleção, acessar o histórico de conversas e abrir múltiplas conversas em abas separadas ou janelas.

[​](#pré-requisitos) Pré-requisitos
-----------------------------------

* VS Code 1.98.0 ou superior
* Uma conta Anthropic (você fará login quando abrir a extensão pela primeira vez). Se você estiver usando um provedor de terceiros como Amazon Bedrock ou Google Vertex AI, consulte [Use third-party providers](#use-third-party-providers) em vez disso.

Você não precisa instalar o Claude Code CLI primeiro. No entanto, alguns recursos como configuração de servidor MCP exigem o CLI. Consulte [VS Code extension vs. Claude Code CLI](#vs-code-extension-vs-claude-code-cli) para detalhes.

[​](#instale-a-extensão) Instale a extensão
-------------------------------------------

Clique no link do seu IDE para instalar diretamente:

* [Install for VS Code](vscode:extension/anthropic.claude-code)
* [Install for Cursor](cursor:extension/anthropic.claude-code)

Ou no VS Code, pressione `Cmd+Shift+X` (Mac) ou `Ctrl+Shift+X` (Windows/Linux) para abrir a visualização de Extensões, procure por “Claude Code” e clique em **Install**.

Você pode precisar reiniciar o VS Code ou executar “Developer: Reload Window” na Paleta de Comandos após a instalação.

[​](#comece-agora) Comece agora
-------------------------------

Depois de instalado, você pode começar a usar Claude Code através da interface VS Code:

1

Abra o painel Claude Code

Em todo o VS Code, o ícone Spark indica Claude Code: ![Spark icon](https://mintcdn.com/claude-code/mfM-EyoZGnQv8JTc/images/vs-code-spark-icon.svg?fit=max&auto=format&n=mfM-EyoZGnQv8JTc&q=85&s=a734d84e785140016672f08e0abb236c)A forma mais rápida de abrir Claude é clicar no ícone Spark na **Editor Toolbar** (canto superior direito do editor). O ícone só aparece quando você tem um arquivo aberto.![Editor VS Code mostrando o ícone Spark na Editor Toolbar](https://mintcdn.com/claude-code/mfM-EyoZGnQv8JTc/images/vs-code-editor-icon.png?fit=max&auto=format&n=mfM-EyoZGnQv8JTc&q=85&s=eb4540325d94664c51776dbbfec4cf02)Outras formas de abrir Claude Code:

* **Command Palette**: `Cmd+Shift+P` (Mac) ou `Ctrl+Shift+P` (Windows/Linux), digite “Claude Code” e selecione uma opção como “Open in New Tab”
* **Status Bar**: Clique em **✱ Claude Code** no canto inferior direito da janela. Isso funciona mesmo quando nenhum arquivo está aberto.

Você pode arrastar o painel Claude para reposicioná-lo em qualquer lugar no VS Code. Consulte [Customize your workflow](#customize-your-workflow) para detalhes.

2

Envie um prompt

Peça ao Claude para ajudar com seu código ou arquivos, seja explicando como algo funciona, depurando um problema ou fazendo alterações.

Selecione texto no editor e pressione `Alt+K` para inserir um @-mention com o caminho do arquivo e números de linha diretamente no seu prompt.

Aqui está um exemplo de pergunta sobre uma linha específica em um arquivo:![Editor VS Code com as linhas 2-3 selecionadas em um arquivo Python, e o painel Claude Code mostrando uma pergunta sobre essas linhas com uma referência @-mention](https://mintcdn.com/claude-code/FVYz38sRY-VuoGHA/images/vs-code-send-prompt.png?fit=max&auto=format&n=FVYz38sRY-VuoGHA&q=85&s=ede3ed8d8d5f940e01c5de636d009cfd)

3

Revise as alterações

Quando Claude quer editar um arquivo, ele mostra um diff e pede permissão. Você pode aceitar, rejeitar ou dizer ao Claude o que fazer em vez disso.![VS Code mostrando um diff das alterações propostas por Claude com um prompt de permissão perguntando se deve fazer a edição](https://mintcdn.com/claude-code/FVYz38sRY-VuoGHA/images/vs-code-edits.png?fit=max&auto=format&n=FVYz38sRY-VuoGHA&q=85&s=e005f9b41c541c5c7c59c082f7c4841c)

Para mais ideias sobre o que você pode fazer com Claude Code, consulte [Common workflows](/docs/pt/common-workflows).

[​](#customize-seu-fluxo-de-trabalho) Customize seu fluxo de trabalho
---------------------------------------------------------------------

Depois que você estiver funcionando, você pode reposicionar o painel Claude ou mudar para o modo terminal.

### [​](#altere-o-layout) Altere o layout

Você pode arrastar o painel Claude para reposicioná-lo em qualquer lugar no VS Code. Pegue a aba ou barra de título do painel e arraste para:

* **Secondary sidebar** (padrão): O lado direito da janela
* **Primary sidebar**: A barra lateral esquerda com ícones para Explorer, Search, etc.
* **Editor area**: Abre Claude como uma aba ao lado de seus arquivos

O ícone Spark só aparece na Activity Bar (ícones da barra lateral esquerda) quando o painel Claude está encaixado à esquerda. Como Claude é padrão no lado direito, use o ícone da Editor Toolbar para abrir Claude.

### [​](#mude-para-o-modo-terminal) Mude para o modo terminal

Por padrão, a extensão abre um painel de chat gráfico. Se você preferir a interface estilo CLI, abra a [Use Terminal setting](vscode://settings/claudeCode.useTerminal) e marque a caixa.
Você também pode abrir as configurações do VS Code (`Cmd+,` no Mac ou `Ctrl+,` no Windows/Linux), ir para Extensions → Claude Code e marcar **Use Terminal**.

[​](#comandos-e-atalhos-do-vs-code) Comandos e atalhos do VS Code
-----------------------------------------------------------------

Abra a Command Palette (`Cmd+Shift+P` no Mac ou `Ctrl+Shift+P` no Windows/Linux) e digite “Claude Code” para ver todos os comandos VS Code disponíveis para a extensão Claude Code:

Estes são comandos VS Code para controlar a extensão. Para comandos slash do Claude Code (como `/help` ou `/compact`), nem todos os comandos CLI estão disponíveis na extensão ainda. Consulte [VS Code extension vs. Claude Code CLI](#vs-code-extension-vs-claude-code-cli) para detalhes.

| Command | Shortcut | Description |
| --- | --- | --- |
| Focus Input | `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux) | Alterne o foco entre o editor e Claude |
| Open in Side Bar | — | Abra Claude na barra lateral esquerda |
| Open in Terminal | — | Abra Claude no modo terminal |
| Open in New Tab | `Cmd+Shift+Esc` (Mac) / `Ctrl+Shift+Esc` (Windows/Linux) | Abra uma nova conversa como uma aba do editor |
| Open in New Window | — | Abra uma nova conversa em uma janela separada |
| New Conversation | `Cmd+N` (Mac) / `Ctrl+N` (Windows/Linux) | Inicie uma nova conversa (quando Claude está em foco) |
| Insert @-Mention Reference | `Alt+K` | Insira uma referência ao arquivo atual (inclui números de linha se o texto estiver selecionado) |
| Show Logs | — | Visualize logs de depuração da extensão |
| Logout | — | Saia de sua conta Anthropic |

Use **Open in New Tab** ou **Open in New Window** para executar múltiplas conversas simultaneamente. Cada aba ou janela mantém seu próprio histórico de conversa e contexto.

[​](#configure-as-configurações) Configure as configurações
-----------------------------------------------------------

A extensão tem dois tipos de configurações:

* **Extension settings**: Abra com `Cmd+,` (Mac) ou `Ctrl+,` (Windows/Linux), depois vá para Extensions → Claude Code.

  | Setting | Description |
  | --- | --- |
  | Selected Model | Modelo padrão para novas conversas. Altere por sessão com `/model`. |
  | Use Terminal | Inicie Claude no modo terminal em vez do painel gráfico |
  | Initial Permission Mode | Controla prompts de aprovação para edições de arquivo e comandos. Padrão é `default` (pergunte antes de cada ação). |
  | Preferred Location | Localização padrão: barra lateral (direita) ou painel (nova aba) |
  | Autosave | Salve automaticamente os arquivos antes de Claude lê-los ou escrevê-los |
  | Use Ctrl+Enter to Send | Use Ctrl/Cmd+Enter em vez de Enter para enviar prompts |
  | Enable New Conversation Shortcut | Ative Cmd/Ctrl+N para iniciar uma nova conversa |
  | Respect Git Ignore | Exclua padrões .gitignore das buscas de arquivo |
  | Environment Variables | Defina variáveis de ambiente para o processo Claude. **Não recomendado**—use [Claude Code settings](/docs/pt/settings) em vez disso para que a configuração seja compartilhada entre extensão e CLI. |
  | Disable Login Prompt | Pule prompts de autenticação (para configurações de provedor de terceiros) |
  | Allow Dangerously Skip Permissions | Ignore todos os prompts de permissão. **Use com extrema cautela**—recomendado apenas para sandboxes isoladas sem acesso à internet. |
  | Claude Process Wrapper | Caminho executável usado para iniciar o processo Claude |
* **Claude Code settings** (`~/.claude/settings.json`): Essas configurações são compartilhadas entre a extensão VS Code e o CLI. Use este arquivo para comandos e diretórios permitidos, variáveis de ambiente, hooks e servidores MCP. Consulte a [settings documentation](/docs/pt/settings) para detalhes.

[​](#use-provedores-de-terceiros) Use provedores de terceiros
-------------------------------------------------------------

Por padrão, Claude Code se conecta diretamente à API da Anthropic. Se sua organização usa Amazon Bedrock, Google Vertex AI ou Microsoft Foundry para acessar Claude, configure a extensão para usar seu provedor em vez disso:

1

Desabilite o prompt de login

Abra a [Disable Login Prompt setting](vscode://settings/claudeCode.disableLoginPrompt) e marque a caixa.Você também pode abrir as configurações do VS Code (`Cmd+,` no Mac ou `Ctrl+,` no Windows/Linux), procurar por “Claude Code login” e marcar **Disable Login Prompt**.

2

Configure seu provedor

Siga o guia de configuração para seu provedor:

* [Claude Code on Amazon Bedrock](/docs/pt/amazon-bedrock)
* [Claude Code on Google Vertex AI](/docs/pt/google-vertex-ai)
* [Claude Code on Microsoft Foundry](/docs/pt/microsoft-foundry)

Esses guias cobrem a configuração de seu provedor em `~/.claude/settings.json`, o que garante que suas configurações sejam compartilhadas entre a extensão VS Code e o CLI.

[​](#vs-code-extension-vs-claude-code-cli) VS Code extension vs. Claude Code CLI
--------------------------------------------------------------------------------

A extensão ainda não tem paridade total de recursos com o CLI. Se você precisar de recursos apenas do CLI, você pode executar `claude` diretamente no terminal integrado do VS Code.

| Feature | CLI | VS Code Extension |
| --- | --- | --- |
| Slash commands | [Full set](/docs/pt/slash-commands) | Subset (digite `/` para ver disponíveis) |
| MCP server config | Yes | No (configure via CLI, use na extensão) |
| Checkpoints | Yes | Coming soon |
| `!` bash shortcut | Yes | No |
| Tab completion | Yes | No |

### [​](#execute-cli-no-vs-code) Execute CLI no VS Code

Para usar o CLI enquanto permanece no VS Code, abra o terminal integrado (`` Ctrl+` `` no Windows/Linux ou `` Cmd+` `` no Mac) e execute `claude`. O CLI se integra automaticamente com seu IDE para recursos como visualização de diff e compartilhamento de diagnóstico.
Se usar um terminal externo, execute `/ide` dentro do Claude Code para conectá-lo ao VS Code.

### [​](#alterne-entre-extensão-e-cli) Alterne entre extensão e CLI

A extensão e o CLI compartilham o mesmo histórico de conversa. Para continuar uma conversa de extensão no CLI, execute `claude --resume` no terminal. Isso abre um seletor interativo onde você pode procurar e selecionar sua conversa.

[​](#considerações-de-segurança) Considerações de segurança
-----------------------------------------------------------

Com permissões de auto-edição ativadas, Claude Code pode modificar arquivos de configuração do VS Code (como `settings.json` ou `tasks.json`) que o VS Code pode executar automaticamente. Isso pode potencialmente contornar os prompts de permissão normais do Claude Code.
Para reduzir o risco ao trabalhar com código não confiável:

* Ative [VS Code Restricted Mode](https://code.visualstudio.com/docs/editor/workspace-trust#_restricted-mode) para espaços de trabalho não confiáveis
* Use o modo de aprovação manual em vez de auto-aceitar para edições
* Revise as alterações cuidadosamente antes de aceitá-las

[​](#corrija-problemas-comuns) Corrija problemas comuns
-------------------------------------------------------

### [​](#a-extensão-não-será-instalada) A extensão não será instalada

* Certifique-se de ter uma versão compatível do VS Code (1.98.0 ou posterior)
* Verifique se o VS Code tem permissão para instalar extensões
* Tente instalar diretamente do site do Marketplace

### [​](#ícone-spark-não-visível) Ícone Spark não visível

O ícone Spark aparece na **Editor Toolbar** (canto superior direito do editor) quando você tem um arquivo aberto. Se você não o vir:

1. **Abra um arquivo**: O ícone requer um arquivo aberto—apenas ter uma pasta aberta não é suficiente
2. **Verifique a versão do VS Code**: Requer 1.98.0 ou superior (Help → About)
3. **Reinicie o VS Code**: Execute “Developer: Reload Window” na Command Palette
4. **Desabilite extensões conflitantes**: Desabilite temporariamente outras extensões de IA (Cline, Continue, etc.)
5. **Verifique a confiança do espaço de trabalho**: A extensão não funciona no Restricted Mode

Alternativamente, clique em ”✱ Claude Code” na **Status Bar** (canto inferior direito)—isso funciona mesmo sem um arquivo aberto. Você também pode usar a **Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`) e digitar “Claude Code”.

### [​](#claude-code-nunca-responde) Claude Code nunca responde

Se Claude Code não estiver respondendo aos seus prompts:

1. **Verifique sua conexão com a internet**: Certifique-se de ter uma conexão com a internet estável
2. **Inicie uma nova conversa**: Tente iniciar uma conversa nova para ver se o problema persiste
3. **Tente o CLI**: Execute `claude` do terminal para ver se você obtém mensagens de erro mais detalhadas
4. **Registre um relatório de bug**: Se o problema continuar, [file an issue on GitHub](https://github.com/anthropics/claude-code/issues) com detalhes sobre o erro

### [​](#cli-autônomo-não-se-conectando-ao-ide) CLI autônomo não se conectando ao IDE

* Certifique-se de estar executando Claude Code do terminal integrado do VS Code (não de um terminal externo)
* Certifique-se de que o CLI para sua variante de IDE está instalado:
  + VS Code: o comando `code` deve estar disponível
  + Cursor: o comando `cursor` deve estar disponível
  + Windsurf: o comando `windsurf` deve estar disponível
  + VSCodium: o comando `codium` deve estar disponível
* Se o comando não estiver disponível, instale-o na Command Palette → “Shell Command: Install ‘code’ command in PATH”

[​](#desinstale-a-extensão) Desinstale a extensão
-------------------------------------------------

Para desinstalar a extensão Claude Code:

1. Abra a visualização de Extensões (`Cmd+Shift+X` no Mac ou `Ctrl+Shift+X` no Windows/Linux)
2. Procure por “Claude Code”
3. Clique em **Uninstall**

Para também remover dados de extensão e redefinir todas as configurações:

Copiar

Perguntar à IA

```
rm -rf ~/.vscode/globalStorage/anthropic.claude-code
```

Para ajuda adicional, consulte o [troubleshooting guide](/docs/pt/troubleshooting).

[​](#próximos-passos) Próximos passos
-------------------------------------

Agora que você tem Claude Code configurado no VS Code:

* [Explore common workflows](/docs/pt/common-workflows) para aproveitar ao máximo Claude Code
* [Set up MCP servers](/docs/pt/mcp) para estender os recursos do Claude com ferramentas externas. Configure servidores usando o CLI, depois use-os na extensão.
* [Configure Claude Code settings](/docs/pt/settings) para personalizar comandos permitidos, hooks e muito mais. Essas configurações são compartilhadas entre a extensão e o CLI.