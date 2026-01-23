# https://code.claude.com/docs/pt/settings#environment-variables

O Claude Code oferece uma variedade de configurações para personalizar seu comportamento de acordo com suas necessidades. Você pode configurar o Claude Code executando o comando `/config` ao usar o REPL interativo, que abre uma interface de Configurações com abas onde você pode visualizar informações de status e modificar opções de configuração.

[​](#escopos-de-configuração) Escopos de configuração
-----------------------------------------------------

O Claude Code usa um **sistema de escopo** para determinar onde as configurações se aplicam e com quem são compartilhadas. Compreender os escopos ajuda você a decidir como configurar o Claude Code para uso pessoal, colaboração em equipe ou implantação empresarial.

### [​](#escopos-disponíveis) Escopos disponíveis

| Escopo | Localização | Quem afeta | Compartilhado com a equipe? |
| --- | --- | --- | --- |
| **Gerenciado** | `managed-settings.json` em nível de sistema | Todos os usuários na máquina | Sim (implantado por TI) |
| **Usuário** | Diretório `~/.claude/` | Você, em todos os projetos | Não |
| **Projeto** | `.claude/` no repositório | Todos os colaboradores neste repositório | Sim (confirmado no git) |
| **Local** | Arquivos `.claude/*.local.*` | Você, apenas neste repositório | Não (ignorado pelo git) |

### [​](#quando-usar-cada-escopo) Quando usar cada escopo

O **escopo Gerenciado** é para:

* Políticas de segurança que devem ser aplicadas em toda a organização
* Requisitos de conformidade que não podem ser substituídos
* Configurações padronizadas implantadas por TI/DevOps

O **escopo Usuário** é melhor para:

* Preferências pessoais que você deseja em todos os lugares (temas, configurações do editor)
* Ferramentas e plugins que você usa em todos os projetos
* Chaves de API e autenticação (armazenadas com segurança)

O **escopo Projeto** é melhor para:

* Configurações compartilhadas com a equipe (permissões, hooks, servidores MCP)
* Plugins que toda a equipe deve ter
* Padronização de ferramentas entre colaboradores

O **escopo Local** é melhor para:

* Substituições pessoais para um projeto específico
* Testar configurações antes de compartilhar com a equipe
* Configurações específicas da máquina que não funcionarão para outros

### [​](#como-os-escopos-interagem) Como os escopos interagem

Quando a mesma configuração é definida em vários escopos, escopos mais específicos têm precedência:

1. **Gerenciado** (mais alto) - não pode ser substituído por nada
2. **Argumentos de linha de comando** - substituições de sessão temporárias
3. **Local** - substitui configurações de projeto e usuário
4. **Projeto** - substitui configurações de usuário
5. **Usuário** (mais baixo) - se aplica quando nada mais especifica a configuração

Por exemplo, se uma permissão é permitida nas configurações do usuário, mas negada nas configurações do projeto, a configuração do projeto tem precedência e a permissão é bloqueada.

### [​](#o-que-usa-escopos) O que usa escopos

Os escopos se aplicam a muitos recursos do Claude Code:

| Recurso | Localização do usuário | Localização do projeto | Localização local |
| --- | --- | --- | --- |
| **Configurações** | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| **Subagentos** | `~/.claude/agents/` | `.claude/agents/` | — |
| **Servidores MCP** | `~/.claude.json` | `.mcp.json` | `~/.claude.json` (por projeto) |
| **Plugins** | `~/.claude/settings.json` | `.claude/settings.json` | `.claude/settings.local.json` |
| **CLAUDE.md** | `~/.claude/CLAUDE.md` | `CLAUDE.md` ou `.claude/CLAUDE.md` | `CLAUDE.local.md` |

---

[​](#arquivos-de-configuração) Arquivos de configuração
-------------------------------------------------------

O arquivo `settings.json` é nosso mecanismo oficial para configurar o Claude
Code através de configurações hierárquicas:

* **Configurações do usuário** são definidas em `~/.claude/settings.json` e se aplicam a todos
  os projetos.
* **Configurações do projeto** são salvas no diretório do seu projeto:
  + `.claude/settings.json` para configurações que são verificadas no controle de origem e compartilhadas com sua equipe
  + `.claude/settings.local.json` para configurações que não são verificadas, úteis para preferências pessoais e experimentação. O Claude Code configurará o git para ignorar `.claude/settings.local.json` quando for criado.
* **Configurações gerenciadas**: Para organizações que precisam de controle centralizado, o Claude Code suporta arquivos `managed-settings.json` e `managed-mcp.json` que podem ser implantados em diretórios do sistema:
  + macOS: `/Library/Application Support/ClaudeCode/`
  + Linux e WSL: `/etc/claude-code/`
  + Windows: `C:\Program Files\ClaudeCode\`

  Estes são caminhos em nível de sistema (não diretórios home do usuário como `~/Library/...`) que requerem privilégios de administrador. Eles são projetados para serem implantados por administradores de TI.

  Veja [Configurações gerenciadas](/docs/pt/iam#managed-settings) e [Configuração MCP gerenciada](/docs/pt/mcp#managed-mcp-configuration) para detalhes.

  As implantações gerenciadas também podem restringir **adições do marketplace de plugins** usando
  `strictKnownMarketplaces`. Para mais informações, veja [Restrições de marketplace gerenciado](/docs/pt/plugin-marketplaces#managed-marketplace-restrictions).
* **Outra configuração** é armazenada em `~/.claude.json`. Este arquivo contém suas preferências (tema, configurações de notificação, modo do editor), sessão OAuth, configurações de [servidor MCP](/docs/pt/mcp) para escopos de usuário e local, estado por projeto (ferramentas permitidas, configurações de confiança) e vários caches. Servidores MCP com escopo de projeto são armazenados separadamente em `.mcp.json`.

Exemplo settings.json

Copiar

Perguntar à IA

```
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl:*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  },
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review our code guidelines at docs.acme.com",
    "Reminder: Code reviews required for all PRs",
    "New security policy in effect"
  ]
}
```

### [​](#configurações-disponíveis) Configurações disponíveis

`settings.json` suporta várias opções:

| Chave | Descrição | Exemplo |
| --- | --- | --- |
| `apiKeyHelper` | Script personalizado, a ser executado em `/bin/sh`, para gerar um valor de autenticação. Este valor será enviado como cabeçalhos `X-Api-Key` e `Authorization: Bearer` para solicitações de modelo | `/bin/generate_temp_api_key.sh` |
| `cleanupPeriodDays` | Sessões inativas por mais tempo que este período são deletadas na inicialização. Configurar para `0` deleta imediatamente todas as sessões. (padrão: 30 dias) | `20` |
| `companyAnnouncements` | Anúncio a ser exibido aos usuários na inicialização. Se vários anúncios forem fornecidos, eles serão alternados aleatoriamente. | `["Welcome to Acme Corp! Review our code guidelines at docs.acme.com"]` |
| `env` | Variáveis de ambiente que serão aplicadas a cada sessão | `{"FOO": "bar"}` |
| `attribution` | Personalize a atribuição para commits git e pull requests. Veja [Configurações de atribuição](#attribution-settings) | `{"commit": "🤖 Generated with Claude Code", "pr": ""}` |
| `includeCoAuthoredBy` | **Descontinuado**: Use `attribution` em vez disso. Se deve incluir a linha `co-authored-by Claude` em commits git e pull requests (padrão: `true`) | `false` |
| `permissions` | Veja a tabela abaixo para a estrutura de permissões. |  |
| `hooks` | Configure comandos personalizados para executar antes ou depois de execuções de ferramentas. Veja [documentação de hooks](/docs/pt/hooks) | `{"PreToolUse": {"Bash": "echo 'Running command...'"}}` |
| `disableAllHooks` | Desabilite todos os [hooks](/docs/pt/hooks) | `true` |
| `allowManagedHooksOnly` | (Apenas configurações gerenciadas) Impeça o carregamento de hooks de usuário, projeto e plugin. Permite apenas hooks gerenciados e hooks SDK. Veja [Configuração de hooks](#hook-configuration) | `true` |
| `model` | Substitua o modelo padrão a usar para Claude Code | `"claude-sonnet-4-5-20250929"` |
| `otelHeadersHelper` | Script para gerar cabeçalhos OpenTelemetry dinâmicos. Executa na inicialização e periodicamente (veja [Cabeçalhos dinâmicos](/docs/pt/monitoring-usage#dynamic-headers)) | `/bin/generate_otel_headers.sh` |
| `statusLine` | Configure uma linha de status personalizada para exibir contexto. Veja [documentação de `statusLine`](/docs/pt/statusline) | `{"type": "command", "command": "~/.claude/statusline.sh"}` |
| `fileSuggestion` | Configure um script personalizado para autocompletar arquivo `@`. Veja [Configurações de sugestão de arquivo](#file-suggestion-settings) | `{"type": "command", "command": "~/.claude/file-suggestion.sh"}` |
| `respectGitignore` | Controle se o seletor de arquivo `@` respeita padrões `.gitignore`. Quando `true` (padrão), arquivos que correspondem aos padrões `.gitignore` são excluídos das sugestões | `false` |
| `outputStyle` | Configure um estilo de saída para ajustar o prompt do sistema. Veja [documentação de estilos de saída](/docs/pt/output-styles) | `"Explanatory"` |
| `forceLoginMethod` | Use `claudeai` para restringir login a contas Claude.ai, `console` para restringir login a contas Claude Console (faturamento de uso de API) | `claudeai` |
| `forceLoginOrgUUID` | Especifique o UUID de uma organização para selecioná-la automaticamente durante o login, ignorando a etapa de seleção de organização. Requer que `forceLoginMethod` seja definido | `"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"` |
| `enableAllProjectMcpServers` | Aprove automaticamente todos os servidores MCP definidos em arquivos `.mcp.json` do projeto | `true` |
| `enabledMcpjsonServers` | Lista de servidores MCP específicos de arquivos `.mcp.json` para aprovar | `["memory", "github"]` |
| `disabledMcpjsonServers` | Lista de servidores MCP específicos de arquivos `.mcp.json` para rejeitar | `["filesystem"]` |
| `allowedMcpServers` | Quando definido em managed-settings.json, lista de permissão de servidores MCP que os usuários podem configurar. Indefinido = sem restrições, array vazio = bloqueio. Aplica-se a todos os escopos. A lista de negação tem precedência. Veja [Configuração MCP gerenciada](/docs/pt/mcp#managed-mcp-configuration) | `[{ "serverName": "github" }]` |
| `deniedMcpServers` | Quando definido em managed-settings.json, lista de negação de servidores MCP que são explicitamente bloqueados. Aplica-se a todos os escopos, incluindo servidores gerenciados. A lista de negação tem precedência sobre a lista de permissão. Veja [Configuração MCP gerenciada](/docs/pt/mcp#managed-mcp-configuration) | `[{ "serverName": "filesystem" }]` |
| `strictKnownMarketplaces` | Quando definido em managed-settings.json, lista de permissão de marketplaces de plugins que os usuários podem adicionar. Indefinido = sem restrições, array vazio = bloqueio. Aplica-se apenas a adições de marketplace. Veja [Restrições de marketplace gerenciado](/docs/pt/plugin-marketplaces#managed-marketplace-restrictions) | `[{ "source": "github", "repo": "acme-corp/plugins" }]` |
| `awsAuthRefresh` | Script personalizado que modifica o diretório `.aws` (veja [configuração avançada de credenciais](/docs/pt/amazon-bedrock#advanced-credential-configuration)) | `aws sso login --profile myprofile` |
| `awsCredentialExport` | Script personalizado que gera JSON com credenciais AWS (veja [configuração avançada de credenciais](/docs/pt/amazon-bedrock#advanced-credential-configuration)) | `/bin/generate_aws_grant.sh` |
| `alwaysThinkingEnabled` | Habilite [pensamento estendido](/docs/pt/common-workflows#use-extended-thinking-thinking-mode) por padrão para todas as sessões. Normalmente configurado via comando `/config` em vez de editar diretamente | `true` |
| `plansDirectory` | Personalize onde os arquivos de plano são armazenados. O caminho é relativo à raiz do projeto. Padrão: `~/.claude/plans` | `"./plans"` |
| `showTurnDuration` | Mostre mensagens de duração de turno após respostas (por exemplo, “Cooked for 1m 6s”). Defina como `false` para ocultar essas mensagens | `true` |
| `language` | Configure o idioma de resposta preferido do Claude (por exemplo, `"japanese"`, `"spanish"`, `"french"`). Claude responderá neste idioma por padrão | `"japanese"` |
| `autoUpdatesChannel` | Canal de lançamento a seguir para atualizações. Use `"stable"` para uma versão que é tipicamente cerca de uma semana antiga e pula versões com regressões principais, ou `"latest"` (padrão) para o lançamento mais recente | `"stable"` |
| `spinnerTipsEnabled` | Mostre dicas no spinner enquanto Claude está trabalhando. Defina como `false` para desabilitar dicas (padrão: `true`) | `false` |
| `terminalProgressBarEnabled` | Habilite a barra de progresso do terminal que mostra progresso em terminais suportados como Windows Terminal e iTerm2 (padrão: `true`) | `false` |

### [​](#configurações-de-permissão) Configurações de permissão

| Chaves | Descrição | Exemplo |
| --- | --- | --- |
| `allow` | Array de regras de permissão para permitir uso de ferramentas. Veja [Sintaxe de regra de permissão](#permission-rule-syntax) abaixo para detalhes de correspondência de padrão | `[ "Bash(git diff:*)" ]` |
| `ask` | Array de regras de permissão para pedir confirmação ao usar ferramentas. Veja [Sintaxe de regra de permissão](#permission-rule-syntax) abaixo | `[ "Bash(git push:*)" ]` |
| `deny` | Array de regras de permissão para negar uso de ferramentas. Use isto para excluir arquivos sensíveis do acesso do Claude Code. Veja [Sintaxe de regra de permissão](#permission-rule-syntax) e [Limitações de permissão Bash](/docs/pt/iam#tool-specific-permission-rules) | `[ "WebFetch", "Bash(curl:*)", "Read(./.env)", "Read(./secrets/**)" ]` |
| `additionalDirectories` | [Diretórios de trabalho](/docs/pt/iam#working-directories) adicionais aos quais Claude tem acesso | `[ "../docs/" ]` |
| `defaultMode` | [Modo de permissão](/docs/pt/iam#permission-modes) padrão ao abrir Claude Code | `"acceptEdits"` |
| `disableBypassPermissionsMode` | Defina como `"disable"` para impedir que o modo `bypassPermissions` seja ativado. Isto desabilita a flag de linha de comando `--dangerously-skip-permissions`. Veja [configurações gerenciadas](/docs/pt/iam#managed-settings) | `"disable"` |

### [​](#sintaxe-de-regra-de-permissão) Sintaxe de regra de permissão

As regras de permissão seguem o formato `Tool` ou `Tool(specifier)`. Compreender a sintaxe ajuda você a escrever regras que correspondem exatamente ao que você pretende.

#### [​](#ordem-de-avaliação-de-regra) Ordem de avaliação de regra

Quando várias regras podem corresponder ao mesmo uso de ferramenta, as regras são avaliadas nesta ordem:

1. **Regras de negação** são verificadas primeiro
2. **Regras de pergunta** são verificadas segundo
3. **Regras de permissão** são verificadas por último

A primeira regra correspondente determina o comportamento. Isto significa que as regras de negação sempre têm precedência sobre as regras de permissão, mesmo que ambas correspondam ao mesmo comando.

#### [​](#correspondência-de-todos-os-usos-de-uma-ferramenta) Correspondência de todos os usos de uma ferramenta

Para corresponder a todos os usos de uma ferramenta, use apenas o nome da ferramenta sem parênteses:

| Regra | Efeito |
| --- | --- |
| `Bash` | Corresponde a **todos** os comandos Bash |
| `WebFetch` | Corresponde a **todas** as solicitações de busca web |
| `Read` | Corresponde a **todas** as leituras de arquivo |

`Bash(*)` **não** corresponde a todos os comandos Bash. O wildcard `*` só corresponde dentro do contexto do especificador. Para permitir ou negar todos os usos de uma ferramenta, use apenas o nome da ferramenta: `Bash`, não `Bash(*)`.

#### [​](#usando-especificadores-para-controle-refinado) Usando especificadores para controle refinado

Adicione um especificador entre parênteses para corresponder a usos específicos de ferramentas:

| Regra | Efeito |
| --- | --- |
| `Bash(npm run build)` | Corresponde ao comando exato `npm run build` |
| `Read(./.env)` | Corresponde à leitura do arquivo `.env` no diretório atual |
| `WebFetch(domain:example.com)` | Corresponde a solicitações de busca para example.com |

#### [​](#padrões-de-wildcard) Padrões de wildcard

Duas sintaxes de wildcard estão disponíveis para regras Bash:

| Wildcard | Posição | Comportamento | Exemplo |
| --- | --- | --- | --- |
| `:*` | Apenas no final do padrão | **Correspondência de prefixo** com limite de palavra. O prefixo deve ser seguido por um espaço ou fim de string. | `Bash(ls:*)` corresponde a `ls -la` mas não a `lsof` |
| `*` | Em qualquer lugar no padrão | **Correspondência glob** sem limite de palavra. Corresponde a qualquer sequência de caracteres naquela posição. | `Bash(ls*)` corresponde tanto a `ls -la` quanto a `lsof` |

**Correspondência de prefixo com `:*`**
O sufixo `:*` corresponde a qualquer comando que comece com o prefixo especificado. Isto funciona com comandos de múltiplas palavras. A seguinte configuração permite comandos npm e git commit enquanto bloqueia git push e rm -rf:

Copiar

Perguntar à IA

```
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(git commit:*)",
      "Bash(docker compose:*)"
    ],
    "deny": [
      "Bash(git push:*)",
      "Bash(rm -rf:*)"
    ]
  }
}
```

**Correspondência glob com `*`**
O wildcard `*` pode aparecer no início, meio ou fim de um padrão. A seguinte configuração permite qualquer comando git direcionado a main (como `git checkout main`, `git merge main`) e qualquer comando de verificação de versão (como `node --version`, `npm --version`):

Copiar

Perguntar à IA

```
{
  "permissions": {
    "allow": [
      "Bash(git * main)",
      "Bash(* --version)"
    ]
  }
}
```

Padrões de permissão Bash que tentam restringir argumentos de comando são frágeis. Por exemplo, `Bash(curl http://github.com/:*)` pretende restringir curl a URLs do GitHub, mas não corresponderá a `curl -X GET http://github.com/...` (flags antes da URL), `curl https://github.com/...` (protocolo diferente), ou comandos usando variáveis de shell. Não confie em padrões de restrição de argumentos como limite de segurança. Veja [Limitações de permissão Bash](/docs/pt/iam#tool-specific-permission-rules) para alternativas.

Para informações detalhadas sobre padrões de permissão específicos de ferramentas—incluindo regras Read, Edit, WebFetch, MCP, Task e limitações de permissão Bash—veja [Regras de permissão específicas de ferramentas](/docs/pt/iam#tool-specific-permission-rules).

### [​](#configurações-de-sandbox) Configurações de sandbox

Configure comportamento avançado de sandboxing. O sandboxing isola comandos bash do seu sistema de arquivos e rede. Veja [Sandboxing](/docs/pt/sandboxing) para detalhes.
**Restrições de sistema de arquivos e rede** são configuradas via regras de permissão Read, Edit e WebFetch, não via estas configurações de sandbox.

| Chaves | Descrição | Exemplo |
| --- | --- | --- |
| `enabled` | Habilite bash sandboxing (apenas macOS/Linux). Padrão: false | `true` |
| `autoAllowBashIfSandboxed` | Aprove automaticamente comandos bash quando sandboxed. Padrão: true | `true` |
| `excludedCommands` | Comandos que devem executar fora do sandbox | `["git", "docker"]` |
| `allowUnsandboxedCommands` | Permita comandos executarem fora do sandbox via parâmetro `dangerouslyDisableSandbox`. Quando definido como `false`, a escotilha de escape `dangerouslyDisableSandbox` é completamente desabilitada e todos os comandos devem executar sandboxed (ou estar em `excludedCommands`). Útil para políticas empresariais que requerem sandboxing rigoroso. Padrão: true | `false` |
| `network.allowUnixSockets` | Caminhos de socket Unix acessíveis no sandbox (para agentes SSH, etc.) | `["~/.ssh/agent-socket"]` |
| `network.allowLocalBinding` | Permita vinculação a portas localhost (apenas macOS). Padrão: false | `true` |
| `network.httpProxyPort` | Porta de proxy HTTP usada se você deseja trazer seu próprio proxy. Se não especificado, Claude executará seu próprio proxy. | `8080` |
| `network.socksProxyPort` | Porta de proxy SOCKS5 usada se você deseja trazer seu próprio proxy. Se não especificado, Claude executará seu próprio proxy. | `8081` |
| `enableWeakerNestedSandbox` | Habilite sandbox mais fraco para ambientes Docker sem privilégios (apenas Linux). **Reduz segurança.** Padrão: false | `true` |

**Exemplo de configuração:**

Copiar

Perguntar à IA

```
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker"],
    "network": {
      "allowUnixSockets": [
        "/var/run/docker.sock"
      ],
      "allowLocalBinding": true
    }
  },
  "permissions": {
    "deny": [
      "Read(.envrc)",
      "Read(~/.aws/**)"
    ]
  }
}
```

**Restrições de sistema de arquivos e rede** usam regras de permissão padrão:

* Use regras de negação `Read` para bloquear Claude de ler arquivos ou diretórios específicos
* Use regras de permissão `Edit` para permitir que Claude escreva em diretórios além do diretório de trabalho atual
* Use regras de negação `Edit` para bloquear escritas em caminhos específicos
* Use regras de permissão/negação `WebFetch` para controlar quais domínios de rede Claude pode acessar

### [​](#configurações-de-atribuição) Configurações de atribuição

O Claude Code adiciona atribuição a commits git e pull requests. Estes são configurados separadamente:

* Commits usam [git trailers](https://git-scm.com/docs/git-interpret-trailers) (como `Co-Authored-By`) por padrão, que podem ser personalizados ou desabilitados
* Descrições de pull request são texto simples

| Chaves | Descrição |
| --- | --- |
| `commit` | Atribuição para commits git, incluindo quaisquer trailers. String vazia oculta atribuição de commit |
| `pr` | Atribuição para descrições de pull request. String vazia oculta atribuição de pull request |

**Atribuição de commit padrão:**

Copiar

Perguntar à IA

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude Sonnet 4.5 <[email protected]>
```

**Atribuição de pull request padrão:**

Copiar

Perguntar à IA

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

**Exemplo:**

Copiar

Perguntar à IA

```
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: AI <[email protected]>",
    "pr": ""
  }
}
```

A configuração `attribution` tem precedência sobre a configuração descontinuada `includeCoAuthoredBy`. Para ocultar toda atribuição, defina `commit` e `pr` como strings vazias.

### [​](#configurações-de-sugestão-de-arquivo) Configurações de sugestão de arquivo

Configure um comando personalizado para autocompletar de caminho de arquivo `@`. A sugestão de arquivo integrada usa travessia rápida do sistema de arquivos, mas grandes monorepos podem se beneficiar de indexação específica do projeto, como um índice de arquivo pré-construído ou ferramentas personalizadas.

Copiar

Perguntar à IA

```
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  }
}
```

O comando executa com as mesmas variáveis de ambiente que [hooks](/docs/pt/hooks), incluindo `CLAUDE_PROJECT_DIR`. Ele recebe JSON via stdin com um campo `query`:

Copiar

Perguntar à IA

```
{"query": "src/comp"}
```

Gere caminhos de arquivo separados por nova linha para stdout (atualmente limitado a 15):

Copiar

Perguntar à IA

```
src/components/Button.tsx
src/components/Modal.tsx
src/components/Form.tsx
```

**Exemplo:**

Copiar

Perguntar à IA

```
#!/bin/bash
query=$(cat | jq -r '.query')
your-repo-file-index --query "$query" | head -20
```

### [​](#configuração-de-hooks) Configuração de hooks

**Apenas configurações gerenciadas**: Controla quais hooks são permitidos executar. Esta configuração só pode ser configurada em [configurações gerenciadas](#settings-files) e fornece aos administradores controle rigoroso sobre execução de hooks.
**Comportamento quando `allowManagedHooksOnly` é `true`:**

* Hooks gerenciados e hooks SDK são carregados
* Hooks de usuário, projeto e plugin são bloqueados

**Configuração:**

Copiar

Perguntar à IA

```
{
  "allowManagedHooksOnly": true
}
```

### [​](#precedência-de-configurações) Precedência de configurações

As configurações se aplicam em ordem de precedência. Do mais alto para o mais baixo:

1. **Configurações gerenciadas** (`managed-settings.json`)
   * Políticas implantadas por TI/DevOps em diretórios do sistema
   * Não podem ser substituídas por configurações de usuário ou projeto
2. **Argumentos de linha de comando**
   * Substituições temporárias para uma sessão específica
3. **Configurações de projeto local** (`.claude/settings.local.json`)
   * Configurações pessoais específicas do projeto
4. **Configurações de projeto compartilhadas** (`.claude/settings.json`)
   * Configurações de projeto compartilhadas com a equipe no controle de origem
5. **Configurações do usuário** (`~/.claude/settings.json`)
   * Configurações globais pessoais

Esta hierarquia garante que as políticas organizacionais sejam sempre aplicadas enquanto ainda permite que equipes e indivíduos personalizem sua experiência.
Por exemplo, se suas configurações de usuário permitem `Bash(npm run:*)` mas as configurações compartilhadas de um projeto negam, a configuração do projeto tem precedência e o comando é bloqueado.

### [​](#pontos-chave-sobre-o-sistema-de-configuração) Pontos-chave sobre o sistema de configuração

* **Arquivos de memória (`CLAUDE.md`)**: Contêm instruções e contexto que Claude carrega na inicialização
* **Arquivos de configuração (JSON)**: Configuram permissões, variáveis de ambiente e comportamento de ferramentas
* **Skills**: Prompts personalizados que podem ser invocados com `/skill-name` ou carregados por Claude automaticamente
* **Servidores MCP**: Estendem Claude Code com ferramentas e integrações adicionais
* **Precedência**: Configurações de nível superior (Gerenciado) substituem as de nível inferior (Usuário/Projeto)
* **Herança**: As configurações são mescladas, com configurações mais específicas adicionando ou substituindo as mais amplas

### [​](#prompt-do-sistema) Prompt do sistema

O prompt do sistema interno do Claude Code não é publicado. Para adicionar instruções personalizadas, use arquivos `CLAUDE.md` ou a flag `--append-system-prompt`.

### [​](#excluindo-arquivos-sensíveis) Excluindo arquivos sensíveis

Para impedir que Claude Code acesse arquivos contendo informações sensíveis como chaves de API, segredos e arquivos de ambiente, use a configuração `permissions.deny` em seu arquivo `.claude/settings.json`:

Copiar

Perguntar à IA

```
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Read(./build)"
    ]
  }
}
```

Isto substitui a configuração descontinuada `ignorePatterns`. Arquivos que correspondem a estes padrões serão completamente invisíveis para Claude Code, prevenindo qualquer exposição acidental de dados sensíveis.

[​](#configuração-de-subagentos) Configuração de subagentos
-----------------------------------------------------------

O Claude Code suporta subagentos de IA personalizados que podem ser configurados em níveis de usuário e projeto. Estes subagentos são armazenados como arquivos Markdown com frontmatter YAML:

* **Subagentos de usuário**: `~/.claude/agents/` - Disponíveis em todos os seus projetos
* **Subagentos de projeto**: `.claude/agents/` - Específicos do seu projeto e podem ser compartilhados com sua equipe

Arquivos de subagentos definem assistentes de IA especializados com prompts personalizados e permissões de ferramentas. Saiba mais sobre criação e uso de subagentos na [documentação de subagentos](/docs/pt/sub-agents).

[​](#configuração-de-plugins) Configuração de plugins
-----------------------------------------------------

O Claude Code suporta um sistema de plugins que permite estender funcionalidade com skills, agentes, hooks e servidores MCP. Plugins são distribuídos através de marketplaces e podem ser configurados em níveis de usuário e repositório.

### [​](#configurações-de-plugin) Configurações de plugin

Configurações relacionadas a plugins em `settings.json`:

Copiar

Perguntar à IA

```
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true,
    "analyzer@security-plugins": false
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": "github",
      "repo": "acme-corp/claude-plugins"
    }
  }
}
```

#### [​](#enabledplugins) `enabledPlugins`

Controla quais plugins estão habilitados. Formato: `"plugin-name@marketplace-name": true/false`
**Escopos**:

* **Configurações de usuário** (`~/.claude/settings.json`): Preferências de plugin pessoais
* **Configurações de projeto** (`.claude/settings.json`): Plugins específicos do projeto compartilhados com a equipe
* **Configurações locais** (`.claude/settings.local.json`): Substituições por máquina (não confirmadas)

**Exemplo**:

Copiar

Perguntar à IA

```
{
  "enabledPlugins": {
    "code-formatter@team-tools": true,
    "deployment-tools@team-tools": true,
    "experimental-features@personal": false
  }
}
```

#### [​](#extraknownmarketplaces) `extraKnownMarketplaces`

Define marketplaces adicionais que devem estar disponíveis para o repositório. Normalmente usado em configurações em nível de repositório para garantir que membros da equipe tenham acesso a fontes de plugin necessárias.
**Quando um repositório inclui `extraKnownMarketplaces`**:

1. Membros da equipe são solicitados a instalar o marketplace quando confiam na pasta
2. Membros da equipe são então solicitados a instalar plugins daquele marketplace
3. Os usuários podem pular marketplaces ou plugins indesejados (armazenados em configurações de usuário)
4. A instalação respeita limites de confiança e requer consentimento explícito

**Exemplo**:

Copiar

Perguntar à IA

```
{
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    },
    "security-plugins": {
      "source": {
        "source": "git",
        "url": "https://git.example.com/security/plugins.git"
      }
    }
  }
}
```

**Tipos de fonte de marketplace**:

* `github`: Repositório GitHub (usa `repo`)
* `git`: Qualquer URL git (usa `url`)
* `directory`: Caminho do sistema de arquivos local (usa `path`, apenas para desenvolvimento)

#### [​](#strictknownmarketplaces) `strictKnownMarketplaces`

**Apenas configurações gerenciadas**: Controla quais marketplaces de plugin os usuários podem adicionar. Esta configuração só pode ser configurada em [`managed-settings.json`](/docs/pt/iam#managed-settings) e fornece aos administradores controle rigoroso sobre fontes de marketplace.
**Localizações de arquivo de configurações gerenciadas**:

* **macOS**: `/Library/Application Support/ClaudeCode/managed-settings.json`
* **Linux e WSL**: `/etc/claude-code/managed-settings.json`
* **Windows**: `C:\Program Files\ClaudeCode\managed-settings.json`

**Características principais**:

* Disponível apenas em configurações gerenciadas (`managed-settings.json`)
* Não pode ser substituído por configurações de usuário ou projeto (precedência mais alta)
* Aplicado ANTES de operações de rede/sistema de arquivos (fontes bloqueadas nunca executam)
* Usa correspondência exata para especificações de fonte (incluindo `ref`, `path` para fontes git)

**Comportamento de lista de permissão**:

* `undefined` (padrão): Sem restrições - usuários podem adicionar qualquer marketplace
* Array vazio `[]`: Bloqueio completo - usuários não podem adicionar novos marketplaces
* Lista de fontes: Usuários podem apenas adicionar marketplaces que correspondem exatamente

**Todos os tipos de fonte suportados**:
A lista de permissão suporta seis tipos de fonte de marketplace. Cada fonte deve corresponder exatamente para que a adição de marketplace de um usuário seja permitida.

1. **Repositórios GitHub**:

Copiar

Perguntar à IA

```
{ "source": "github", "repo": "acme-corp/approved-plugins" }
{ "source": "github", "repo": "acme-corp/security-tools", "ref": "v2.0" }
{ "source": "github", "repo": "acme-corp/plugins", "ref": "main", "path": "marketplace" }
```

Campos: `repo` (obrigatório), `ref` (opcional: branch/tag/SHA), `path` (opcional: subdiretório)

2. **Repositórios Git**:

Copiar

Perguntar à IA

```
{ "source": "git", "url": "https://gitlab.example.com/tools/plugins.git" }
{ "source": "git", "url": "https://bitbucket.org/acme-corp/plugins.git", "ref": "production" }
{ "source": "git", "url": "ssh://[email protected]/plugins.git", "ref": "v3.1", "path": "approved" }
```

Campos: `url` (obrigatório), `ref` (opcional: branch/tag/SHA), `path` (opcional: subdiretório)

3. **Marketplaces baseados em URL**:

Copiar

Perguntar à IA

```
{ "source": "url", "url": "https://plugins.example.com/marketplace.json" }
{ "source": "url", "url": "https://cdn.example.com/marketplace.json", "headers": { "Authorization": "Bearer ${TOKEN}" } }
```

Campos: `url` (obrigatório), `headers` (opcional: cabeçalhos HTTP para acesso autenticado)

Marketplaces baseados em URL apenas baixam o arquivo `marketplace.json`. Eles não baixam arquivos de plugin do servidor. Plugins em marketplaces baseados em URL devem usar fontes externas (URLs GitHub, npm ou git) em vez de caminhos relativos. Para plugins com caminhos relativos, use um marketplace baseado em Git. Veja [Solução de problemas](/docs/pt/plugin-marketplaces#plugins-with-relative-paths-fail-in-url-based-marketplaces) para detalhes.

4. **Pacotes NPM**:

Copiar

Perguntar à IA

```
{ "source": "npm", "package": "@acme-corp/claude-plugins" }
{ "source": "npm", "package": "@acme-corp/approved-marketplace" }
```

Campos: `package` (obrigatório, suporta pacotes com escopo)

5. **Caminhos de arquivo**:

Copiar

Perguntar à IA

```
{ "source": "file", "path": "/usr/local/share/claude/acme-marketplace.json" }
{ "source": "file", "path": "/opt/acme-corp/plugins/marketplace.json" }
```

Campos: `path` (obrigatório: caminho absoluto para arquivo marketplace.json)

6. **Caminhos de diretório**:

Copiar

Perguntar à IA

```
{ "source": "directory", "path": "/usr/local/share/claude/acme-plugins" }
{ "source": "directory", "path": "/opt/acme-corp/approved-marketplaces" }
```

Campos: `path` (obrigatório: caminho absoluto para diretório contendo `.claude-plugin/marketplace.json`)
**Exemplos de configuração**:
Exemplo - Permitir apenas marketplaces específicos:

Copiar

Perguntar à IA

```
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/approved-plugins"
    },
    {
      "source": "github",
      "repo": "acme-corp/security-tools",
      "ref": "v2.0"
    },
    {
      "source": "url",
      "url": "https://plugins.example.com/marketplace.json"
    },
    {
      "source": "npm",
      "package": "@acme-corp/compliance-plugins"
    }
  ]
}
```

Exemplo - Desabilitar todas as adições de marketplace:

Copiar

Perguntar à IA

```
{
  "strictKnownMarketplaces": []
}
```

**Requisitos de correspondência exata**:
Fontes de marketplace devem corresponder **exatamente** para que a adição de um usuário seja permitida. Para fontes baseadas em git (`github` e `git`), isto inclui todos os campos opcionais:

* O `repo` ou `url` deve corresponder exatamente
* O campo `ref` deve corresponder exatamente (ou ambos serem indefinidos)
* O campo `path` deve corresponder exatamente (ou ambos serem indefinidos)

Exemplos de fontes que **NÃO correspondem**:

Copiar

Perguntar à IA

```
// Estas são DIFERENTES fontes:
{ "source": "github", "repo": "acme-corp/plugins" }
{ "source": "github", "repo": "acme-corp/plugins", "ref": "main" }

// Estas também são DIFERENTES:
{ "source": "github", "repo": "acme-corp/plugins", "path": "marketplace" }
{ "source": "github", "repo": "acme-corp/plugins" }
```

**Comparação com `extraKnownMarketplaces`**:

| Aspecto | `strictKnownMarketplaces` | `extraKnownMarketplaces` |
| --- | --- | --- |
| **Propósito** | Aplicação de política organizacional | Conveniência da equipe |
| **Arquivo de configuração** | Apenas `managed-settings.json` | Qualquer arquivo de configuração |
| **Comportamento** | Bloqueia adições não permitidas | Auto-instala marketplaces ausentes |
| **Quando aplicado** | Antes de operações de rede/sistema de arquivos | Após prompt de confiança do usuário |
| **Pode ser substituído** | Não (precedência mais alta) | Sim (por configurações de precedência mais alta) |
| **Formato de fonte** | Objeto de fonte direto | Marketplace nomeado com fonte aninhada |
| **Caso de uso** | Conformidade, restrições de segurança | Onboarding, padronização |

**Diferença de formato**:
`strictKnownMarketplaces` usa objetos de fonte diretos:

Copiar

Perguntar à IA

```
{
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "acme-corp/plugins" }
  ]
}
```

`extraKnownMarketplaces` requer marketplaces nomeados:

Copiar

Perguntar à IA

```
{
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": { "source": "github", "repo": "acme-corp/plugins" }
    }
  }
}
```

**Notas importantes**:

* Restrições são verificadas ANTES de qualquer solicitação de rede ou operação de sistema de arquivos
* Quando bloqueado, usuários veem mensagens de erro claras indicando que a fonte é bloqueada por política gerenciada
* A restrição se aplica apenas a adicionar NOVOS marketplaces; marketplaces previamente instalados permanecem acessíveis
* Configurações gerenciadas têm a precedência mais alta e não podem ser substituídas

Veja [Restrições de marketplace gerenciado](/docs/pt/plugin-marketplaces#managed-marketplace-restrictions) para documentação voltada para o usuário.

### [​](#gerenciando-plugins) Gerenciando plugins

Use o comando `/plugin` para gerenciar plugins interativamente:

* Procure plugins disponíveis de marketplaces
* Instale/desinstale plugins
* Habilite/desabilite plugins
* Visualize detalhes de plugin (comandos, agentes, hooks fornecidos)
* Adicione/remova marketplaces

Saiba mais sobre o sistema de plugins na [documentação de plugins](/docs/pt/plugins).

[​](#variáveis-de-ambiente) Variáveis de ambiente
-------------------------------------------------

O Claude Code suporta as seguintes variáveis de ambiente para controlar seu comportamento:

Todas as variáveis de ambiente também podem ser configuradas em [`settings.json`](#available-settings). Isto é útil como forma de definir automaticamente variáveis de ambiente para cada sessão, ou para distribuir um conjunto de variáveis de ambiente para toda sua equipe ou organização.

| Variável | Propósito |
| --- | --- |
| `ANTHROPIC_API_KEY` | Chave de API enviada como cabeçalho `X-Api-Key`, normalmente para o SDK Claude (para uso interativo, execute `/login`) |
| `ANTHROPIC_AUTH_TOKEN` | Valor personalizado para o cabeçalho `Authorization` (o valor que você definir aqui será prefixado com `Bearer` ) |
| `ANTHROPIC_CUSTOM_HEADERS` | Cabeçalhos personalizados que você deseja adicionar à solicitação (em formato `Name: Value`) |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Veja [Configuração de modelo](/docs/pt/model-config#environment-variables) |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Veja [Configuração de modelo](/docs/pt/model-config#environment-variables) |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Veja [Configuração de modelo](/docs/pt/model-config#environment-variables) |
| `ANTHROPIC_FOUNDRY_API_KEY` | Chave de API para autenticação Microsoft Foundry (veja [Microsoft Foundry](/docs/pt/microsoft-foundry)) |
| `ANTHROPIC_MODEL` | Nome da configuração de modelo a usar (veja [Configuração de modelo](/docs/pt/model-config#environment-variables)) |
| `ANTHROPIC_SMALL_FAST_MODEL` | [DESCONTINUADO] Nome de [modelo classe Haiku para tarefas em background](/docs/pt/costs) |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | Substitua a região AWS para o modelo classe Haiku ao usar Bedrock |
| `AWS_BEARER_TOKEN_BEDROCK` | Chave de API Bedrock para autenticação (veja [Chaves de API Bedrock](https://aws.amazon.com/blogs/machine-learning/accelerate-ai-development-with-amazon-bedrock-api-keys/)) |
| `BASH_DEFAULT_TIMEOUT_MS` | Timeout padrão para comandos bash de longa duração |
| `BASH_MAX_OUTPUT_LENGTH` | Número máximo de caracteres em saídas bash antes de serem truncadas no meio |
| `BASH_MAX_TIMEOUT_MS` | Timeout máximo que o modelo pode definir para comandos bash de longa duração |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Defina a porcentagem de capacidade de contexto (1-100) em que auto-compactação é acionada. Por padrão, auto-compactação é acionada em aproximadamente 95% de capacidade. Use valores mais baixos como `50` para compactar mais cedo. Valores acima do limiar padrão não têm efeito. Aplica-se a conversas principais e subagentos. Esta porcentagem se alinha com o campo `context_window.used_percentage` disponível em [linha de status](/docs/pt/statusline) |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | Retorne ao diretório de trabalho original após cada comando Bash |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | Intervalo em milissegundos em que credenciais devem ser atualizadas (ao usar `apiKeyHelper`) |
| `CLAUDE_CODE_CLIENT_CERT` | Caminho para arquivo de certificado de cliente para autenticação mTLS |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | Frase de acesso para `CLAUDE_CODE_CLIENT_KEY` criptografado (opcional) |
| `CLAUDE_CODE_CLIENT_KEY` | Caminho para arquivo de chave privada de cliente para autenticação mTLS |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | Defina como `1` para desabilitar cabeçalhos `anthropic-beta` específicos da API Anthropic. Use isto se experimentar problemas como “Unexpected value(s) for the `anthropic-beta` header” ao usar um gateway LLM com provedores de terceiros |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Defina como `1` para desabilitar toda funcionalidade de tarefa em background, incluindo o parâmetro `run_in_background` em ferramentas Bash e subagentos, auto-backgrounding e o atalho Ctrl+B |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | Tempo em milissegundos a esperar após o loop de consulta ficar ocioso antes de sair automaticamente. Útil para fluxos de trabalho automatizados e scripts usando modo SDK |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | Defina como `true` para permitir que o proxy execute resolução DNS em vez do chamador. Opt-in para ambientes onde o proxy deve lidar com resolução de nome de host |
| `CLAUDE_CODE_TMPDIR` | Substitua o diretório temporário usado para arquivos temporários internos. Claude Code acrescenta `/claude/` a este caminho. Padrão: `/tmp` em Unix/macOS, `os.tmpdir()` no Windows |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Equivalente a definir `DISABLE_AUTOUPDATER`, `DISABLE_BUG_COMMAND`, `DISABLE_ERROR_REPORTING` e `DISABLE_TELEMETRY` |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | Defina como `1` para desabilitar atualizações automáticas de título de terminal baseadas em contexto de conversa |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | Substitua o limite de token padrão para leituras de arquivo. Útil quando você precisa ler arquivos maiores na íntegra |
| `CLAUDE_CODE_HIDE_ACCOUNT_INFO` | Defina como `1` para ocultar seu endereço de email e nome da organização da interface do Claude Code. Útil ao fazer streaming ou gravação |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | Pule auto-instalação de extensões IDE |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Defina o número máximo de tokens de saída para a maioria das solicitações. Padrão: 32.000. Máximo: 64.000. Aumentar este valor reduz a janela de contexto efetiva disponível antes que [auto-compactação](/docs/pt/costs#reduce-token-usage) seja acionada. |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | Intervalo para atualizar cabeçalhos OpenTelemetry dinâmicos em milissegundos (padrão: 1740000 / 29 minutos). Veja [Cabeçalhos dinâmicos](/docs/pt/monitoring-usage#dynamic-headers) |
| `CLAUDE_CODE_SHELL` | Substitua detecção automática de shell. Útil quando seu shell de login difere do seu shell de trabalho preferido (por exemplo, `bash` vs `zsh`) |
| `CLAUDE_CODE_SHELL_PREFIX` | Prefixo de comando para envolver todos os comandos bash (por exemplo, para logging ou auditoria). Exemplo: `/path/to/logger.sh` executará `/path/to/logger.sh <command>` |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | Pule autenticação AWS para Bedrock (por exemplo, ao usar um gateway LLM) |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | Pule autenticação Azure para Microsoft Foundry (por exemplo, ao usar um gateway LLM) |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | Pule autenticação Google para Vertex (por exemplo, ao usar um gateway LLM) |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Veja [Configuração de modelo](/docs/pt/model-config) |
| `CLAUDE_CODE_USE_BEDROCK` | Use [Bedrock](/docs/pt/amazon-bedrock) |
| `CLAUDE_CODE_USE_FOUNDRY` | Use [Microsoft Foundry](/docs/pt/microsoft-foundry) |
| `CLAUDE_CODE_USE_VERTEX` | Use [Vertex](/docs/pt/google-vertex-ai) |
| `CLAUDE_CONFIG_DIR` | Personalize onde Claude Code armazena seus arquivos de configuração e dados |
| `DISABLE_AUTOUPDATER` | Defina como `1` para desabilitar atualizações automáticas. |
| `DISABLE_BUG_COMMAND` | Defina como `1` para desabilitar o comando `/bug` |
| `DISABLE_COST_WARNINGS` | Defina como `1` para desabilitar mensagens de aviso de custo |
| `DISABLE_ERROR_REPORTING` | Defina como `1` para optar por não participar de relatório de erro Sentry |
| `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | Defina como `1` para desabilitar chamadas de modelo para caminhos não críticos como texto de sabor |
| `DISABLE_PROMPT_CACHING` | Defina como `1` para desabilitar cache de prompt para todos os modelos (tem precedência sobre configurações por modelo) |
| `DISABLE_PROMPT_CACHING_HAIKU` | Defina como `1` para desabilitar cache de prompt para modelos Haiku |
| `DISABLE_PROMPT_CACHING_OPUS` | Defina como `1` para desabilitar cache de prompt para modelos Opus |
| `DISABLE_PROMPT_CACHING_SONNET` | Defina como `1` para desabilitar cache de prompt para modelos Sonnet |
| `DISABLE_TELEMETRY` | Defina como `1` para optar por não participar de telemetria Statsig (note que eventos Statsig não incluem dados do usuário como código, caminhos de arquivo ou comandos bash) |
| `ENABLE_TOOL_SEARCH` | Controla [busca de ferramenta MCP](/docs/pt/mcp#scale-with-mcp-tool-search). Valores: `auto` (padrão, habilita em 10% de contexto), `auto:N` (limiar personalizado, por exemplo, `auto:5` para 5%), `true` (sempre ativado), `false` (desabilitado) |
| `FORCE_AUTOUPDATE_PLUGINS` | Defina como `true` para forçar auto-atualizações de plugin mesmo quando o auto-atualizador principal é desabilitado via `DISABLE_AUTOUPDATER` |
| `HTTP_PROXY` | Especifique servidor proxy HTTP para conexões de rede |
| `HTTPS_PROXY` | Especifique servidor proxy HTTPS para conexões de rede |
| `IS_DEMO` | Defina como `true` para habilitar modo demo: oculta email e organização da interface, pula onboarding e oculta comandos internos. Útil para streaming ou gravação de sessões |
| `MAX_MCP_OUTPUT_TOKENS` | Número máximo de tokens permitidos em respostas de ferramenta MCP. Claude Code exibe um aviso quando a saída excede 10.000 tokens (padrão: 25000) |
| `MAX_THINKING_TOKENS` | Substitua o orçamento de token de [pensamento estendido](https://docs.claude.com/en/docs/build-with-claude/extended-thinking). Pensamento é habilitado em orçamento máximo (31.999 tokens) por padrão. Use isto para limitar o orçamento (por exemplo, `MAX_THINKING_TOKENS=10000`) ou desabilitar pensamento completamente (`MAX_THINKING_TOKENS=0`). Pensamento estendido melhora o desempenho em tarefas de raciocínio complexo e codificação, mas impacta [eficiência de cache de prompt](https://docs.claude.com/en/docs/build-with-claude/prompt-caching#caching-with-thinking-blocks). |
| `MCP_TIMEOUT` | Timeout em milissegundos para inicialização de servidor MCP |
| `MCP_TOOL_TIMEOUT` | Timeout em milissegundos para execução de ferramenta MCP |
| `NO_PROXY` | Lista de domínios e IPs para os quais solicitações serão emitidas diretamente, ignorando proxy |
| `SLASH_COMMAND_TOOL_CHAR_BUDGET` | Número máximo de caracteres para metadados de skill mostrados à [ferramenta Skill](/docs/pt/skills#control-who-invokes-a-skill) (padrão: 15000). Nome legado mantido para compatibilidade com versões anteriores. |
| `USE_BUILTIN_RIPGREP` | Defina como `0` para usar `rg` instalado no sistema em vez de `rg` incluído com Claude Code |
| `VERTEX_REGION_CLAUDE_3_5_HAIKU` | Substitua região para Claude 3.5 Haiku ao usar Vertex AI |
| `VERTEX_REGION_CLAUDE_3_7_SONNET` | Substitua região para Claude 3.7 Sonnet ao usar Vertex AI |
| `VERTEX_REGION_CLAUDE_4_0_OPUS` | Substitua região para Claude 4.0 Opus ao usar Vertex AI |
| `VERTEX_REGION_CLAUDE_4_0_SONNET` | Substitua região para Claude 4.0 Sonnet ao usar Vertex AI |
| `VERTEX_REGION_CLAUDE_4_1_OPUS` | Substitua região para Claude 4.1 Opus ao usar Vertex AI |

[​](#ferramentas-disponíveis-para-claude) Ferramentas disponíveis para Claude
-----------------------------------------------------------------------------

Claude Code tem acesso a um conjunto de ferramentas poderosas que ajudam a entender e modificar sua base de código:

| Ferramenta | Descrição | Permissão Necessária |
| --- | --- | --- |
| **AskUserQuestion** | Faz perguntas de múltipla escolha para reunir requisitos ou esclarecer ambiguidade | Não |
| **Bash** | Executa comandos de shell em seu ambiente (veja [Comportamento da ferramenta Bash](#bash-tool-behavior) abaixo) | Sim |
| **TaskOutput** | Recupera saída de uma tarefa em background (shell bash ou subagentos) | Não |
| **Edit** | Faz edições direcionadas em arquivos específicos | Sim |
| **ExitPlanMode** | Solicita ao usuário sair do modo plano e começar a codificar | Sim |
| **Glob** | Encontra arquivos baseado em correspondência de padrão | Não |
| **Grep** | Procura por padrões no conteúdo de arquivos | Não |
| **KillShell** | Mata um shell bash em background em execução por seu ID | Não |
| **MCPSearch** | Procura e carrega ferramentas MCP quando [busca de ferramenta](/docs/pt/mcp#scale-with-mcp-tool-search) está habilitada | Não |
| **NotebookEdit** | Modifica células de notebook Jupyter | Sim |
| **Read** | Lê o conteúdo de arquivos | Não |
| **Skill** | Executa uma [skill](/docs/pt/skills#control-who-invokes-a-skill) dentro da conversa principal | Sim |
| **Task** | Executa um sub-agente para lidar com tarefas complexas e multi-etapas | Não |
| **TodoWrite** | Cria e gerencia listas de tarefas estruturadas | Não |
| **WebFetch** | Busca conteúdo de uma URL especificada | Sim |
| **WebSearch** | Realiza buscas web com filtragem de domínio | Sim |
| **Write** | Cria ou sobrescreve arquivos | Sim |

Regras de permissão podem ser configuradas usando `/allowed-tools` ou em [configurações de permissão](/docs/pt/settings#available-settings). Veja também [Regras de permissão específicas de ferramentas](/docs/pt/iam#tool-specific-permission-rules).

### [​](#comportamento-da-ferramenta-bash) Comportamento da ferramenta Bash

A ferramenta Bash executa comandos de shell com o seguinte comportamento de persistência:

* **Diretório de trabalho persiste**: Quando Claude muda o diretório de trabalho (por exemplo, `cd /path/to/dir`), comandos Bash subsequentes executarão naquele diretório. Você pode usar `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1` para resetar ao diretório do projeto após cada comando.
* **Variáveis de ambiente NÃO persistem**: Variáveis de ambiente definidas em um comando Bash (por exemplo, `export MY_VAR=value`) **não** estão disponíveis em comandos Bash subsequentes. Cada comando Bash executa em um ambiente de shell fresco.

Para tornar variáveis de ambiente disponíveis em comandos Bash, você tem **três opções**:
**Opção 1: Ative o ambiente antes de iniciar Claude Code** (abordagem mais simples)
Ative seu ambiente virtual em seu terminal antes de lançar Claude Code:

Copiar

Perguntar à IA

```
conda activate myenv
# ou: source /path/to/venv/bin/activate
claude
```

Isto funciona para ambientes de shell, mas variáveis de ambiente definidas dentro dos comandos Bash do Claude não persistirão entre comandos.
**Opção 2: Defina CLAUDE\_ENV\_FILE antes de iniciar Claude Code** (configuração de ambiente persistente)
Exporte o caminho para um script de shell contendo sua configuração de ambiente:

Copiar

Perguntar à IA

```
export CLAUDE_ENV_FILE=/path/to/env-setup.sh
claude
```

Onde `/path/to/env-setup.sh` contém:

Copiar

Perguntar à IA

```
conda activate myenv
# ou: source /path/to/venv/bin/activate
# ou: export MY_VAR=value
```

Claude Code fornecerá este arquivo antes de cada comando Bash, tornando o ambiente persistente em todos os comandos.
**Opção 3: Use um hook SessionStart** (configuração específica do projeto)
Configure em `.claude/settings.json`:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{
        "type": "command",
        "command": "echo 'conda activate myenv' >> \"$CLAUDE_ENV_FILE\""
      }]
    }]
  }
}
```

O hook escreve para `$CLAUDE_ENV_FILE`, que é então fornecido antes de cada comando Bash. Isto é ideal para configurações de projeto compartilhadas com a equipe.
Veja [Hooks SessionStart](/docs/pt/hooks#persisting-environment-variables) para mais detalhes sobre a Opção 3.

### [​](#estendendo-ferramentas-com-hooks) Estendendo ferramentas com hooks

Você pode executar comandos personalizados antes ou depois de qualquer ferramenta executar usando
[hooks do Claude Code](/docs/pt/hooks-guide).
Por exemplo, você poderia executar automaticamente um formatador Python após Claude
modificar arquivos Python, ou impedir modificações em arquivos de configuração de produção
bloqueando operações Write para certos caminhos.

[​](#veja-também) Veja também
-----------------------------

* [Gerenciamento de Identidade e Acesso](/docs/pt/iam#configuring-permissions) - Visão geral do sistema de permissão e como regras allow/ask/deny interagem
* [Regras de permissão específicas de ferramentas](/docs/pt/iam#tool-specific-permission-rules) - Padrões detalhados para ferramentas Bash, Read, Edit, WebFetch, MCP e Task, incluindo limitações de segurança
* [Configurações gerenciadas](/docs/pt/iam#managed-settings) - Configuração de política gerenciada para organizações
* [Solução de problemas](/docs/pt/troubleshooting) - Soluções para problemas de configuração comuns