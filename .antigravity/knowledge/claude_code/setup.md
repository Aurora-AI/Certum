# https://code.claude.com/docs/pt/setup

[​](#requisitos-do-sistema) Requisitos do sistema
-------------------------------------------------

* **Sistemas Operacionais**: macOS 13.0+, Ubuntu 20.04+/Debian 10+, ou Windows 10+ (com WSL 1, WSL 2, ou Git para Windows)
* **Hardware**: 4 GB+ de RAM
* **Rede**: Conexão com a internet necessária (veja [configuração de rede](/docs/pt/network-config#network-access-requirements))
* **Shell**: Funciona melhor em Bash ou Zsh
* **Localização**: [Países suportados pela Anthropic](https://www.anthropic.com/supported-countries)

### [​](#dependências-adicionais) Dependências adicionais

* **ripgrep**: Geralmente incluído com Claude Code. Se a busca falhar, veja [solução de problemas de busca](/docs/pt/troubleshooting#search-and-discovery-issues).
* **[Node.js 18+](https://nodejs.org/en/download)**: Necessário apenas para [instalação npm descontinuada](#npm-installation-deprecated)

[​](#instalação) Instalação
---------------------------

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

Após a conclusão do processo de instalação, navegue até seu projeto e inicie Claude Code:

Copiar

Perguntar à IA

```
cd your-awesome-project
claude
```

Se você encontrar algum problema durante a instalação, consulte o [guia de solução de problemas](/docs/pt/troubleshooting).

Execute `claude doctor` após a instalação para verificar seu tipo de instalação e versão.

**Alpine Linux e outras distribuições baseadas em musl/uClibc**: O instalador nativo requer `libgcc`, `libstdc++` e `ripgrep`. Para Alpine: `apk add libgcc libstdc++ ripgrep`. Defina `USE_BUILTIN_RIPGREP=0`.

### [​](#autenticação) Autenticação

#### [​](#para-indivíduos) Para indivíduos

1. **Plano Claude Pro ou Max** (recomendado): Inscreva-se no [plano Pro ou Max](https://claude.ai/pricing) do Claude para uma assinatura unificada que inclui Claude Code e Claude na web. Gerencie sua conta em um único lugar e faça login com sua conta Claude.ai.
2. **Claude Console**: Conecte-se através do [Claude Console](https://console.anthropic.com) e conclua o processo OAuth. Requer faturamento ativo no Console Anthropic. Um espaço de trabalho “Claude Code” é criado automaticamente para rastreamento de uso e gerenciamento de custos. Você não pode criar chaves de API para o espaço de trabalho Claude Code; é dedicado exclusivamente para uso do Claude Code.

#### [​](#para-equipes-e-organizações) Para equipes e organizações

1. **Claude para Equipes ou Empresas** (recomendado): Inscreva-se em [Claude para Equipes](https://claude.com/pricing#team-&-enterprise) ou [Claude para Empresas](https://anthropic.com/contact-sales) para faturamento centralizado, gerenciamento de equipe e acesso a Claude Code e Claude na web. Os membros da equipe fazem login com suas contas Claude.ai.
2. **Claude Console com faturamento de equipe**: Configure uma [Claude Console](https://console.anthropic.com) compartilhada com faturamento de equipe. Convide membros da equipe e atribua funções para rastreamento de uso.
3. **Provedores de nuvem**: Configure Claude Code para usar [Amazon Bedrock, Google Vertex AI ou Microsoft Foundry](/docs/pt/third-party-integrations) para implantações com sua infraestrutura de nuvem existente.

### [​](#instalar-uma-versão-específica) Instalar uma versão específica

O instalador nativo aceita um número de versão específico ou um canal de lançamento (`latest` ou `stable`). O canal que você escolhe no momento da instalação se torna seu padrão para atualizações automáticas. Veja [Configurar canal de lançamento](#configure-release-channel) para mais informações.
Para instalar a versão mais recente (padrão):

* macOS, Linux, WSL
* Windows PowerShell
* Windows CMD

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.sh | bash
```

Copiar

Perguntar à IA

```
irm https://claude.ai/install.ps1 | iex
```

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Para instalar a versão estável:

* macOS, Linux, WSL
* Windows PowerShell
* Windows CMD

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.sh | bash -s stable
```

Copiar

Perguntar à IA

```
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) stable
```

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd stable && del install.cmd
```

Para instalar um número de versão específico:

* macOS, Linux, WSL
* Windows PowerShell
* Windows CMD

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.sh | bash -s 1.0.58
```

Copiar

Perguntar à IA

```
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) 1.0.58
```

Copiar

Perguntar à IA

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd 1.0.58 && del install.cmd
```

### [​](#integridade-binária-e-assinatura-de-código) Integridade binária e assinatura de código

* Somas de verificação SHA256 para todas as plataformas são publicadas nos manifestos de lançamento, atualmente localizados em `https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/claude-code-releases/{VERSION}/manifest.json` (exemplo: substitua `{VERSION}` por `2.0.30`)
* Binários assinados são distribuídos para as seguintes plataformas:
  + macOS: Assinado por “Anthropic PBC” e notarizado pela Apple
  + Windows: Assinado por “Anthropic, PBC”

[​](#instalação-npm-descontinuada) Instalação NPM (descontinuada)
-----------------------------------------------------------------

A instalação NPM está descontinuada. Use o método de [instalação nativa](#installation) quando possível. Para migrar uma instalação npm existente para nativa, execute `claude install`.
**Instalação global npm**

Copiar

Perguntar à IA

```
npm install -g @anthropic-ai/claude-code
```

NÃO use `sudo npm install -g` pois isso pode levar a problemas de permissão e riscos de segurança.
Se você encontrar erros de permissão, veja [solução de problemas de permissão](/docs/pt/troubleshooting#command-not-found-claude-or-permission-errors) para soluções recomendadas.

[​](#configuração-do-windows) Configuração do Windows
-----------------------------------------------------

**Opção 1: Claude Code dentro do WSL**

* Tanto WSL 1 quanto WSL 2 são suportados

**Opção 2: Claude Code no Windows nativo com Git Bash**

* Requer [Git para Windows](https://git-scm.com/downloads/win)
* Para instalações portáteis do Git, especifique o caminho para seu `bash.exe`:

  Copiar

  Perguntar à IA

  ```
  $env:CLAUDE_CODE_GIT_BASH_PATH="C:\Program Files\Git\bin\bash.exe"
  ```

[​](#atualizar-claude-code) Atualizar Claude Code
-------------------------------------------------

### [​](#atualizações-automáticas) Atualizações automáticas

Claude Code se atualiza automaticamente para garantir que você tenha os recursos mais recentes e correções de segurança.

* **Verificações de atualização**: Realizadas na inicialização e periodicamente durante a execução
* **Processo de atualização**: Baixa e instala automaticamente em segundo plano
* **Notificações**: Você verá uma notificação quando as atualizações forem instaladas
* **Aplicando atualizações**: As atualizações entram em vigor na próxima vez que você iniciar Claude Code

Instalações do Homebrew e WinGet não se atualizam automaticamente. Use `brew upgrade claude-code` ou `winget upgrade Anthropic.ClaudeCode` para atualizar manualmente.**Problema conhecido:** Claude Code pode notificá-lo sobre atualizações antes que a nova versão esteja disponível nesses gerenciadores de pacotes. Se uma atualização falhar, aguarde e tente novamente mais tarde.

### [​](#configurar-canal-de-lançamento) Configurar canal de lançamento

Configure qual canal de lançamento Claude Code segue para atualizações automáticas e `claude update` com a configuração `autoUpdatesChannel`:

* `"latest"` (padrão): Receba novos recursos assim que forem lançados
* `"stable"`: Use uma versão que normalmente tem cerca de uma semana de idade, pulando lançamentos com regressões importantes

Configure isso via `/config` → **Auto-update channel**, ou adicione ao seu [arquivo settings.json](/docs/pt/settings):

Copiar

Perguntar à IA

```
{
  "autoUpdatesChannel": "stable"
}
```

Para implantações empresariais, você pode impor um canal de lançamento consistente em toda sua organização usando [configurações gerenciadas](/docs/pt/iam#managed-settings).

### [​](#desabilitar-atualizações-automáticas) Desabilitar atualizações automáticas

Defina a variável de ambiente `DISABLE_AUTOUPDATER` em seu shell ou [arquivo settings.json](/docs/pt/settings):

Copiar

Perguntar à IA

```
export DISABLE_AUTOUPDATER=1
```

### [​](#atualizar-manualmente) Atualizar manualmente

Copiar

Perguntar à IA

```
claude update
```

[​](#desinstalar-claude-code) Desinstalar Claude Code
-----------------------------------------------------

Se você precisar desinstalar Claude Code, siga as instruções para seu método de instalação.

### [​](#instalação-nativa) Instalação nativa

Remova o binário Claude Code e os arquivos de versão:
**macOS, Linux, WSL:**

Copiar

Perguntar à IA

```
rm -f ~/.local/bin/claude
rm -rf ~/.local/share/claude
```

**Windows PowerShell:**

Copiar

Perguntar à IA

```
Remove-Item -Path "$env:USERPROFILE\.local\bin\claude.exe" -Force
Remove-Item -Path "$env:USERPROFILE\.local\share\claude" -Recurse -Force
```

**Windows CMD:**

Copiar

Perguntar à IA

```
del "%USERPROFILE%\.local\bin\claude.exe"
rmdir /s /q "%USERPROFILE%\.local\share\claude"
```

### [​](#instalação-homebrew) Instalação Homebrew

Copiar

Perguntar à IA

```
brew uninstall --cask claude-code
```

### [​](#instalação-winget) Instalação WinGet

Copiar

Perguntar à IA

```
winget uninstall Anthropic.ClaudeCode
```

### [​](#instalação-npm) Instalação NPM

Copiar

Perguntar à IA

```
npm uninstall -g @anthropic-ai/claude-code
```

### [​](#limpar-arquivos-de-configuração-opcional) Limpar arquivos de configuração (opcional)

Remover arquivos de configuração excluirá todas as suas configurações, ferramentas permitidas, configurações do servidor MCP e histórico de sessão.

Para remover as configurações e dados em cache do Claude Code:
**macOS, Linux, WSL:**

Copiar

Perguntar à IA

```
# Remover configurações de usuário e estado
rm -rf ~/.claude
rm ~/.claude.json

# Remover configurações específicas do projeto (execute do diretório do seu projeto)
rm -rf .claude
rm -f .mcp.json
```

**Windows PowerShell:**

Copiar

Perguntar à IA

```
# Remover configurações de usuário e estado
Remove-Item -Path "$env:USERPROFILE\.claude" -Recurse -Force
Remove-Item -Path "$env:USERPROFILE\.claude.json" -Force

# Remover configurações específicas do projeto (execute do diretório do seu projeto)
Remove-Item -Path ".claude" -Recurse -Force
Remove-Item -Path ".mcp.json" -Force
```

**Windows CMD:**

Copiar

Perguntar à IA

```
REM Remover configurações de usuário e estado
rmdir /s /q "%USERPROFILE%\.claude"
del "%USERPROFILE%\.claude.json"

REM Remover configurações específicas do projeto (execute do diretório do seu projeto)
rmdir /s /q ".claude"
del ".mcp.json"
```