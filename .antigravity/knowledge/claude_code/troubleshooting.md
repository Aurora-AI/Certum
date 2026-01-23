# https://code.claude.com/docs/pt/troubleshooting

[​](#problemas-comuns-de-instalação) Problemas comuns de instalação
-------------------------------------------------------------------

### [​](#problemas-de-instalação-no-windows:-erros-no-wsl) Problemas de instalação no Windows: erros no WSL

Você pode encontrar os seguintes problemas no WSL:
**Problemas de detecção de SO/plataforma**: Se você receber um erro durante a instalação, o WSL pode estar usando o `npm` do Windows. Tente:

* Execute `npm config set os linux` antes da instalação
* Instale com `npm install -g @anthropic-ai/claude-code --force --no-os-check` (NÃO use `sudo`)

**Erros de Node não encontrado**: Se você vir `exec: node: not found` ao executar `claude`, seu ambiente WSL pode estar usando uma instalação do Node.js do Windows. Você pode confirmar isso com `which npm` e `which node`, que devem apontar para caminhos Linux começando com `/usr/` em vez de `/mnt/c/`. Para corrigir isso, tente instalar o Node através do gerenciador de pacotes da sua distribuição Linux ou através de [`nvm`](https://github.com/nvm-sh/nvm).
**Conflitos de versão do nvm**: Se você tiver o nvm instalado tanto no WSL quanto no Windows, você pode experimentar conflitos de versão ao alternar versões do Node no WSL. Isso acontece porque o WSL importa o PATH do Windows por padrão, fazendo com que o nvm/npm do Windows tenha prioridade sobre a instalação do WSL.
Você pode identificar este problema por:

* Executar `which npm` e `which node` - se apontarem para caminhos do Windows (começando com `/mnt/c/`), as versões do Windows estão sendo usadas
* Experimentar funcionalidade quebrada após alternar versões do Node com nvm no WSL

Para resolver este problema, corrija seu PATH do Linux para garantir que as versões do node/npm do Linux tenham prioridade:
**Solução principal: Certifique-se de que o nvm está carregado corretamente no seu shell**
A causa mais comum é que o nvm não está carregado em shells não interativos. Adicione o seguinte ao seu arquivo de configuração do shell (`~/.bashrc`, `~/.zshrc`, etc.):

Copiar

Perguntar à IA

```
# Load nvm if it exists
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

Ou execute diretamente em sua sessão atual:

Copiar

Perguntar à IA

```
source ~/.nvm/nvm.sh
```

**Alternativa: Ajuste a ordem do PATH**
Se o nvm está carregado corretamente, mas os caminhos do Windows ainda têm prioridade, você pode explicitamente adicionar seus caminhos do Linux ao PATH na configuração do seu shell:

Copiar

Perguntar à IA

```
export PATH="$HOME/.nvm/versions/node/$(node -v)/bin:$PATH"
```

Evite desabilitar a importação do PATH do Windows (`appendWindowsPath = false`), pois isso quebra a capacidade de chamar executáveis do Windows a partir do WSL. Da mesma forma, evite desinstalar o Node.js do Windows se você o usa para desenvolvimento do Windows.

### [​](#problemas-de-instalação-no-linux-e-mac:-erros-de-permissão-ou-comando-não-encontrado) Problemas de instalação no Linux e Mac: erros de permissão ou comando não encontrado

Ao instalar o Claude Code com npm, problemas de `PATH` podem impedir o acesso a `claude`.
Você também pode encontrar erros de permissão se seu prefixo global do npm não for gravável pelo usuário (por exemplo, `/usr`, ou `/usr/local`).

#### [​](#solução-recomendada:-instalação-nativa-do-claude-code) Solução recomendada: Instalação nativa do Claude Code

O Claude Code tem uma instalação nativa que não depende do npm ou Node.js.
Use o seguinte comando para executar o instalador nativo.
**macOS, Linux, WSL:**

Copiar

Perguntar à IA

```
# Install stable version (default)
curl -fsSL https://claude.ai/install.sh | bash

# Install latest version
curl -fsSL https://claude.ai/install.sh | bash -s latest

# Install specific version number
curl -fsSL https://claude.ai/install.sh | bash -s 1.0.58
```

**Windows PowerShell:**

Copiar

Perguntar à IA

```
# Install stable version (default)
irm https://claude.ai/install.ps1 | iex

# Install latest version
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) latest

# Install specific version number
& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) 1.0.58
```

Este comando instala a compilação apropriada do Claude Code para seu sistema operacional e arquitetura e adiciona um symlink para a instalação em `~/.local/bin/claude` (ou `%USERPROFILE%\.local\bin\claude.exe` no Windows).

Certifique-se de que você tem o diretório de instalação no seu PATH do sistema.

### [​](#windows:-“claude-code-no-windows-requer-git-bash”) Windows: “Claude Code no Windows requer git-bash”

O Claude Code no Windows nativo requer [Git for Windows](https://git-scm.com/downloads/win), que inclui Git Bash. Se o Git está instalado mas não é detectado:

1. Defina o caminho explicitamente no PowerShell antes de executar o Claude:

   Copiar

   Perguntar à IA

   ```
   $env:CLAUDE_CODE_GIT_BASH_PATH="C:\Program Files\Git\bin\bash.exe"
   ```
2. Ou adicione-o às suas variáveis de ambiente do sistema permanentemente através de Propriedades do Sistema → Variáveis de Ambiente.

Se o Git está instalado em um local não padrão, ajuste o caminho de acordo.

### [​](#windows:-“installmethod-é-nativo,-mas-comando-claude-não-encontrado”) Windows: “installMethod é nativo, mas comando claude não encontrado”

Se você vir este erro após a instalação, o comando `claude` não está no seu PATH. Adicione-o manualmente:

1

Abrir Variáveis de Ambiente

Pressione `Win + R`, digite `sysdm.cpl` e pressione Enter. Clique em **Avançado** → **Variáveis de Ambiente**.

2

Editar PATH do Usuário

Em “Variáveis do usuário”, selecione **Path** e clique em **Editar**. Clique em **Novo** e adicione:

Copiar

Perguntar à IA

```
%USERPROFILE%\.local\bin
```

3

Reinicie seu terminal

Feche e reabra o PowerShell ou CMD para que as alterações entrem em vigor.

Verifique a instalação:

Copiar

Perguntar à IA

```
claude doctor # Check installation health
```

[​](#permissões-e-autenticação) Permissões e autenticação
---------------------------------------------------------

### [​](#prompts-de-permissão-repetidos) Prompts de permissão repetidos

Se você se encontra repetidamente aprovando os mesmos comandos, você pode permitir que ferramentas específicas sejam executadas sem aprovação usando o comando `/permissions`. Veja [Documentação de Permissões](/docs/pt/iam#configuring-permissions).

### [​](#problemas-de-autenticação) Problemas de autenticação

Se você está experimentando problemas de autenticação:

1. Execute `/logout` para sair completamente
2. Feche o Claude Code
3. Reinicie com `claude` e complete o processo de autenticação novamente

Se os problemas persistirem, tente:

Copiar

Perguntar à IA

```
rm -rf ~/.config/claude-code/auth.json
claude
```

Isso remove suas informações de autenticação armazenadas e força um login limpo.

[​](#localizações-de-arquivos-de-configuração) Localizações de arquivos de configuração
---------------------------------------------------------------------------------------

O Claude Code armazena configuração em vários locais:

| Arquivo | Propósito |
| --- | --- |
| `~/.claude/settings.json` | Configurações do usuário (permissões, hooks, substituições de modelo) |
| `.claude/settings.json` | Configurações do projeto (verificadas no controle de origem) |
| `.claude/settings.local.json` | Configurações do projeto local (não confirmadas) |
| `~/.claude.json` | Estado global (tema, OAuth, servidores MCP, ferramentas permitidas) |
| `.mcp.json` | Servidores MCP do projeto (verificados no controle de origem) |
| `managed-settings.json` | [Configurações gerenciadas](/docs/pt/settings#settings-files) |
| `managed-mcp.json` | [Servidores MCP gerenciados](/docs/pt/mcp#managed-mcp-configuration) |

No Windows, `~` refere-se ao seu diretório home do usuário, como `C:\Users\YourName`.
**Localizações de arquivos gerenciados:**

* macOS: `/Library/Application Support/ClaudeCode/`
* Linux/WSL: `/etc/claude-code/`
* Windows: `C:\Program Files\ClaudeCode\`

Para detalhes sobre como configurar esses arquivos, veja [Configurações](/docs/pt/settings) e [MCP](/docs/pt/mcp).

### [​](#redefinindo-configuração) Redefinindo configuração

Para redefinir o Claude Code para as configurações padrão, você pode remover os arquivos de configuração:

Copiar

Perguntar à IA

```
# Reset all user settings and state
rm ~/.claude.json
rm -rf ~/.claude/

# Reset project-specific settings
rm -rf .claude/
rm .mcp.json
```

Isso removerá todas as suas configurações, ferramentas permitidas, configurações de servidor MCP e histórico de sessão.

[​](#desempenho-e-estabilidade) Desempenho e estabilidade
---------------------------------------------------------

### [​](#alto-uso-de-cpu-ou-memória) Alto uso de CPU ou memória

O Claude Code é projetado para funcionar com a maioria dos ambientes de desenvolvimento, mas pode consumir recursos significativos ao processar grandes bases de código. Se você está experimentando problemas de desempenho:

1. Use `/compact` regularmente para reduzir o tamanho do contexto
2. Feche e reinicie o Claude Code entre tarefas principais
3. Considere adicionar grandes diretórios de compilação ao seu arquivo `.gitignore`

### [​](#comando-trava-ou-congela) Comando trava ou congela

Se o Claude Code parece não responder:

1. Pressione Ctrl+C para tentar cancelar a operação atual
2. Se não responder, você pode precisar fechar o terminal e reiniciar

### [​](#problemas-de-busca-e-descoberta) Problemas de busca e descoberta

Se a ferramenta de Busca, menções `@file`, agentes personalizados e comandos de barra invertida personalizados não estão funcionando, instale o `ripgrep` do sistema:

Copiar

Perguntar à IA

```
# macOS (Homebrew)  
brew install ripgrep

# Windows (winget)
winget install BurntSushi.ripgrep.MSVC

# Ubuntu/Debian
sudo apt install ripgrep

# Alpine Linux
apk add ripgrep

# Arch Linux
pacman -S ripgrep
```

Então defina `USE_BUILTIN_RIPGREP=0` em seu [ambiente](/docs/pt/settings#environment-variables).

### [​](#resultados-de-busca-lentos-ou-incompletos-no-wsl) Resultados de busca lentos ou incompletos no WSL

Penalidades de desempenho de leitura de disco ao [trabalhar entre sistemas de arquivos no WSL](https://learn.microsoft.com/en-us/windows/wsl/filesystems) podem resultar em menos correspondências do que o esperado (mas não uma falta completa de funcionalidade de busca) ao usar o Claude Code no WSL.

`/doctor` mostrará Busca como OK neste caso.

**Soluções:**

1. **Envie buscas mais específicas**: Reduza o número de arquivos pesquisados especificando diretórios ou tipos de arquivo: “Procure por lógica de validação JWT no pacote auth-service” ou “Encontre uso de hash md5 em arquivos JS”.
2. **Mova o projeto para o sistema de arquivos Linux**: Se possível, certifique-se de que seu projeto está localizado no sistema de arquivos Linux (`/home/`) em vez do sistema de arquivos do Windows (`/mnt/c/`).
3. **Use Windows nativo em vez disso**: Considere executar o Claude Code nativamente no Windows em vez de através do WSL, para melhor desempenho do sistema de arquivos.

[​](#problemas-de-integração-de-ide) Problemas de integração de IDE
-------------------------------------------------------------------

### [​](#ide-jetbrains-não-detectado-no-wsl2) IDE JetBrains não detectado no WSL2

Se você está usando o Claude Code no WSL2 com IDEs JetBrains e recebendo erros “Nenhuma IDE disponível detectada”, isso provavelmente é devido à configuração de rede do WSL2 ou ao Firewall do Windows bloqueando a conexão.

#### [​](#modos-de-rede-do-wsl2) Modos de rede do WSL2

O WSL2 usa rede NAT por padrão, o que pode impedir a detecção de IDE. Você tem duas opções:
**Opção 1: Configurar Firewall do Windows** (recomendado)

1. Encontre seu endereço IP do WSL2:

   Copiar

   Perguntar à IA

   ```
   wsl hostname -I
   # Example output: 172.21.123.456
   ```
2. Abra o PowerShell como Administrador e crie uma regra de firewall:

   Copiar

   Perguntar à IA

   ```
   New-NetFirewallRule -DisplayName "Allow WSL2 Internal Traffic" -Direction Inbound -Protocol TCP -Action Allow -RemoteAddress 172.21.0.0/16 -LocalAddress 172.21.0.0/16
   ```

   (Ajuste o intervalo de IP com base em sua sub-rede WSL2 da etapa 1)
3. Reinicie sua IDE e Claude Code

**Opção 2: Alternar para rede espelhada**
Adicione ao `.wslconfig` no seu diretório de usuário do Windows:

Copiar

Perguntar à IA

```
[wsl2]
networkingMode=mirrored
```

Então reinicie o WSL com `wsl --shutdown` do PowerShell.

Esses problemas de rede afetam apenas o WSL2. O WSL1 usa a rede do host diretamente e não requer essas configurações.

Para dicas de configuração adicionais do JetBrains, veja nosso [guia de IDE JetBrains](/docs/pt/jetbrains#plugin-settings).

### [​](#relatando-problemas-de-integração-de-ide-do-windows-nativo-e-wsl) Relatando problemas de integração de IDE do Windows (nativo e WSL)

Se você está experimentando problemas de integração de IDE no Windows, [crie um problema](https://github.com/anthropics/claude-code/issues) com as seguintes informações:

* Tipo de ambiente: Windows nativo (Git Bash) ou WSL1/WSL2
* Modo de rede WSL (se aplicável): NAT ou espelhado
* Nome e versão da IDE
* Versão da extensão/plugin do Claude Code
* Tipo de shell: Bash, Zsh, PowerShell, etc.

### [​](#tecla-escape-não-funcionando-em-terminais-jetbrains-intellij,-pycharm,-etc) Tecla Escape não funcionando em terminais JetBrains (IntelliJ, PyCharm, etc.)

Se você está usando o Claude Code em terminais JetBrains e a tecla `Esc` não interrompe o agente conforme esperado, isso provavelmente é devido a um conflito de keybinding com os atalhos padrão do JetBrains.
Para corrigir este problema:

1. Vá para Configurações → Ferramentas → Terminal
2. Ou:
   * Desmarque “Mover foco para o editor com Escape”, ou
   * Clique em “Configurar keybindings do terminal” e delete o atalho “Alternar foco para Editor”
3. Aplique as alterações

Isso permite que a tecla `Esc` interrompa adequadamente as operações do Claude Code.

[​](#problemas-de-formatação-markdown) Problemas de formatação Markdown
-----------------------------------------------------------------------

O Claude Code às vezes gera arquivos markdown com tags de linguagem ausentes em cercas de código, o que pode afetar o destaque de sintaxe e legibilidade no GitHub, editores e ferramentas de documentação.

### [​](#tags-de-linguagem-ausentes-em-blocos-de-código) Tags de linguagem ausentes em blocos de código

Se você notar blocos de código como este em markdown gerado:

Copiar

Perguntar à IA

```
```
function example() {
  return "hello";
}
```
```

Em vez de blocos adequadamente marcados como:

Copiar

Perguntar à IA

```
```javascript
function example() {
  return "hello";
}
```
```

**Soluções:**

1. **Peça ao Claude para adicionar tags de linguagem**: Solicite “Adicione tags de linguagem apropriadas a todos os blocos de código neste arquivo markdown.”
2. **Use hooks de pós-processamento**: Configure hooks de formatação automática para detectar e adicionar tags de linguagem ausentes. Veja o [exemplo de hook de formatação markdown](/docs/pt/hooks-guide#markdown-formatting-hook) para detalhes de implementação.
3. **Verificação manual**: Após gerar arquivos markdown, revise-os para formatação adequada de blocos de código e solicite correções se necessário.

### [​](#espaçamento-e-formatação-inconsistentes) Espaçamento e formatação inconsistentes

Se o markdown gerado tem linhas em branco excessivas ou espaçamento inconsistente:
**Soluções:**

1. **Solicite correções de formatação**: Peça ao Claude para “Corrigir problemas de espaçamento e formatação neste arquivo markdown.”
2. **Use ferramentas de formatação**: Configure hooks para executar formatadores markdown como `prettier` ou scripts de formatação personalizados em arquivos markdown gerados.
3. **Especifique preferências de formatação**: Inclua requisitos de formatação em seus prompts ou arquivos de [memória](/docs/pt/memory) do projeto.

### [​](#melhores-práticas-para-geração-de-markdown) Melhores práticas para geração de markdown

Para minimizar problemas de formatação:

* **Seja explícito em solicitações**: Peça por “markdown adequadamente formatado com blocos de código marcados com linguagem”
* **Use convenções do projeto**: Documente seu estilo markdown preferido em [`CLAUDE.md`](/docs/pt/memory)
* **Configure hooks de validação**: Use hooks de pós-processamento para verificar e corrigir automaticamente problemas comuns de formatação

[​](#obtendo-mais-ajuda) Obtendo mais ajuda
-------------------------------------------

Se você está experimentando problemas não cobertos aqui:

1. Use o comando `/bug` dentro do Claude Code para relatar problemas diretamente à Anthropic
2. Verifique o [repositório GitHub](https://github.com/anthropics/claude-code) para problemas conhecidos
3. Execute `/doctor` para verificar a saúde da sua instalação do Claude Code
4. Pergunte ao Claude diretamente sobre seus recursos e funcionalidades - Claude tem acesso integrado à sua documentação