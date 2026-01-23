# https://code.claude.com/docs/pt/iam#tool-specific-permission-rules

[​](#métodos-de-autenticação) Métodos de autenticação
-----------------------------------------------------

Configurar Claude Code requer acesso aos modelos Anthropic. Para equipes, você pode configurar o acesso ao Claude Code de uma destas formas:

* [Claude for Teams ou Enterprise](/docs/pt/setup#for-teams-and-organizations) (recomendado)
* [Claude Console com faturamento de equipe](/docs/pt/setup#for-teams-and-organizations)
* [Amazon Bedrock](/docs/pt/amazon-bedrock)
* [Google Vertex AI](/docs/pt/google-vertex-ai)
* [Microsoft Foundry](/docs/pt/microsoft-foundry)

### [​](#claude-for-teams-ou-enterprise-recomendado) Claude for Teams ou Enterprise (recomendado)

[Claude for Teams](https://claude.com/pricing#team-&-enterprise) e [Claude for Enterprise](https://anthropic.com/contact-sales) oferecem a melhor experiência para organizações que usam Claude Code. Os membros da equipe obtêm acesso tanto ao Claude Code quanto ao Claude na web com faturamento centralizado e gerenciamento de equipe.

* **Claude for Teams**: Plano de autoatendimento com recursos de colaboração, ferramentas de administração e gerenciamento de faturamento. Melhor para equipes menores.
* **Claude for Enterprise**: Adiciona SSO, captura de domínio, permissões baseadas em funções, API de conformidade e configurações de política gerenciada para configurações de Claude Code em toda a organização. Melhor para organizações maiores com requisitos de segurança e conformidade.

**Para configurar o acesso ao Claude Code:**

1. Inscreva-se em [Claude for Teams](https://claude.com/pricing#team-&-enterprise) ou entre em contato com vendas para [Claude for Enterprise](https://anthropic.com/contact-sales)
2. Convide membros da equipe no painel de administração
3. Os membros da equipe instalam Claude Code e fazem login com suas contas Claude.ai

### [​](#autenticação-do-claude-console) Autenticação do Claude Console

Para organizações que preferem faturamento baseado em API, você pode configurar o acesso através do Claude Console.
**Para configurar o acesso ao Claude Code para sua equipe via Claude Console:**

1. Use sua conta Claude Console existente ou crie uma nova conta Claude Console
2. Você pode adicionar usuários através de um dos métodos abaixo:
   * Convide usuários em massa de dentro do Console (Console -> Settings -> Members -> Invite)
   * [Configure SSO](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)
3. Ao convidar usuários, eles precisam de uma das seguintes funções:
   * A função “Claude Code” significa que os usuários podem apenas criar chaves de API do Claude Code
   * A função “Developer” significa que os usuários podem criar qualquer tipo de chave de API
4. Cada usuário convidado precisa completar estas etapas:
   * Aceitar o convite do Console
   * [Verificar requisitos do sistema](/docs/pt/setup#system-requirements)
   * [Instalar Claude Code](/docs/pt/setup#installation)
   * Fazer login com credenciais da conta Console

### [​](#autenticação-do-provedor-de-nuvem) Autenticação do provedor de nuvem

**Para configurar o acesso ao Claude Code para sua equipe via Bedrock, Vertex ou Azure:**

1. Siga a [documentação do Bedrock](/docs/pt/amazon-bedrock), [documentação do Vertex](/docs/pt/google-vertex-ai) ou [documentação do Microsoft Foundry](/docs/pt/microsoft-foundry)
2. Distribua as variáveis de ambiente e instruções para gerar credenciais de nuvem para seus usuários. Leia mais sobre como [gerenciar configuração aqui](/docs/pt/settings).
3. Os usuários podem [instalar Claude Code](/docs/pt/setup#installation)

[​](#controle-de-acesso-e-permissões) Controle de acesso e permissões
---------------------------------------------------------------------

Oferecemos permissões granulares para que você possa especificar exatamente o que o agente pode fazer (por exemplo, executar testes, executar linter) e o que não pode fazer (por exemplo, atualizar infraestrutura de nuvem). Essas configurações de permissão podem ser verificadas no controle de versão e distribuídas para todos os desenvolvedores em sua organização, bem como personalizadas por desenvolvedores individuais.

### [​](#sistema-de-permissões) Sistema de permissões

Claude Code usa um sistema de permissões em camadas para equilibrar poder e segurança:

| Tipo de Ferramenta | Exemplo | Aprovação Necessária | Comportamento de “Sim, não pergunte novamente” |
| --- | --- | --- | --- |
| Somente leitura | Leitura de arquivos, Grep | Não | N/A |
| Comandos Bash | Execução de shell | Sim | Permanentemente por diretório de projeto e comando |
| Modificação de Arquivo | Editar/escrever arquivos | Sim | Até o final da sessão |

### [​](#configurando-permissões) Configurando permissões

Você pode visualizar e gerenciar as permissões de ferramentas do Claude Code com `/permissions`. Esta interface lista todas as regras de permissão e o arquivo settings.json do qual são originadas.

* As regras **Allow** permitem que Claude Code use a ferramenta especificada sem aprovação manual.
* As regras **Ask** solicitam confirmação sempre que Claude Code tenta usar a ferramenta especificada.
* As regras **Deny** impedem que Claude Code use a ferramenta especificada.

As regras são avaliadas em ordem: **deny → ask → allow**. A primeira regra correspondente vence, então as regras de negação sempre têm precedência.

* **Diretórios adicionais** estendem o acesso de arquivo do Claude para diretórios além do diretório de trabalho inicial.
* **Modo padrão** controla o comportamento de permissão do Claude ao encontrar novas solicitações.

As regras de permissão usam o formato: `Tool` ou `Tool(optional-specifier)`
Uma regra que é apenas o nome da ferramenta corresponde a qualquer uso dessa ferramenta. Por exemplo, adicionar `Bash` à lista de permissões permite que Claude Code use a ferramenta Bash sem exigir aprovação do usuário. Observe que `Bash(*)` **não** corresponde a todos os comandos Bash. Use `Bash` sem parênteses para corresponder a todos os usos.

Para uma referência rápida sobre a sintaxe de regra de permissão incluindo curingas, consulte [Sintaxe de regra de permissão](/docs/pt/settings#permission-rule-syntax) na documentação de configurações.

#### [​](#modos-de-permissão) Modos de permissão

Claude Code suporta vários modos de permissão que podem ser definidos como `defaultMode` em [arquivos de configuração](/docs/pt/settings#settings-files):

| Modo | Descrição |
| --- | --- |
| `default` | Comportamento padrão - solicita permissão no primeiro uso de cada ferramenta |
| `acceptEdits` | Aceita automaticamente permissões de edição de arquivo para a sessão |
| `plan` | Modo de Plano - Claude pode analisar mas não modificar arquivos ou executar comandos |
| `dontAsk` | Nega automaticamente ferramentas a menos que pré-aprovadas via `/permissions` ou regras [`permissions.allow`](/docs/pt/settings#permission-settings) |
| `bypassPermissions` | Ignora todos os prompts de permissão (requer ambiente seguro - veja aviso abaixo) |

#### [​](#diretórios-de-trabalho) Diretórios de trabalho

Por padrão, Claude tem acesso aos arquivos no diretório onde foi iniciado. Você pode estender este acesso:

* **Durante a inicialização**: Use o argumento CLI `--add-dir <path>`
* **Durante a sessão**: Use o comando de barra `/add-dir`
* **Configuração persistente**: Adicione a `additionalDirectories` em [arquivos de configuração](/docs/pt/settings#settings-files)

Os arquivos em diretórios adicionais seguem as mesmas regras de permissão do diretório de trabalho original - eles se tornam legíveis sem prompts, e as permissões de edição de arquivo seguem o modo de permissão atual.

#### [​](#regras-de-permissão-específicas-da-ferramenta) Regras de permissão específicas da ferramenta

Algumas ferramentas suportam controles de permissão mais granulares:
**Bash**
As regras de permissão do Bash suportam correspondência de prefixo com `:*` e correspondência de curinga com `*`:

* `Bash(npm run build)` Corresponde ao comando Bash exato `npm run build`
* `Bash(npm run test:*)` Corresponde a comandos Bash começando com `npm run test`
* `Bash(npm *)` Corresponde a qualquer comando começando com `npm`  (por exemplo, `npm install`, `npm run build`)
* `Bash(* install)` Corresponde a qualquer comando terminando com  `install` (por exemplo, `npm install`, `yarn install`)
* `Bash(git * main)` Corresponde a comandos como `git checkout main`, `git merge main`

Claude Code está ciente de operadores de shell (como `&&`) então uma regra de correspondência de prefixo como `Bash(safe-cmd:*)` não lhe dará permissão para executar o comando `safe-cmd && other-cmd`

Limitações importantes dos padrões de permissão do Bash:

1. O curinga `:*` funciona apenas no final de um padrão para correspondência de prefixo
2. O curinga `*` pode aparecer em qualquer posição e corresponde a qualquer sequência de caracteres
3. Padrões como `Bash(curl http://github.com/:*)` podem ser contornados de muitas formas:
   * Opções antes da URL: `curl -X GET http://github.com/...` não corresponderá
   * Protocolo diferente: `curl https://github.com/...` não corresponderá
   * Redirecionamentos: `curl -L http://bit.ly/xyz` (redireciona para github)
   * Variáveis: `URL=http://github.com && curl $URL` não corresponderá
   * Espaços extras: `curl http://github.com` não corresponderá

Para filtragem de URL mais confiável, considere:

* **Restringir ferramentas de rede Bash**: Use regras de negação para bloquear `curl`, `wget` e comandos similares, depois use a ferramenta WebFetch com permissão `WebFetch(domain:github.com)` para domínios permitidos
* **Usar hooks PreToolUse**: Implemente um hook que valida URLs em comandos Bash e bloqueia domínios não permitidos
* Instruir Claude Code sobre seus padrões de curl permitidos via CLAUDE.md

Observe que usar WebFetch sozinho não impede acesso à rede. Se Bash for permitido, Claude ainda pode usar `curl`, `wget` ou outras ferramentas para alcançar qualquer URL.

**Read & Edit**
As regras `Edit` se aplicam a todas as ferramentas integradas que editam arquivos. Claude fará uma tentativa de melhor esforço para aplicar regras `Read` a todas as ferramentas integradas que leem arquivos como Grep e Glob.
As regras Read & Edit seguem a especificação [gitignore](https://git-scm.com/docs/gitignore) com quatro tipos de padrão distintos:

| Padrão | Significado | Exemplo | Corresponde |
| --- | --- | --- | --- |
| `//path` | Caminho **absoluto** da raiz do sistema de arquivos | `Read(//Users/alice/secrets/**)` | `/Users/alice/secrets/**` |
| `~/path` | Caminho do diretório **home** | `Read(~/Documents/*.pdf)` | `/Users/alice/Documents/*.pdf` |
| `/path` | Caminho **relativo ao arquivo de configuração** | `Edit(/src/**/*.ts)` | `<caminho do arquivo de configuração>/src/**/*.ts` |
| `path` ou `./path` | Caminho **relativo ao diretório atual** | `Read(*.env)` | `<cwd>/*.env` |

Um padrão como `/Users/alice/file` NÃO é um caminho absoluto - é relativo ao seu arquivo de configuração! Use `//Users/alice/file` para caminhos absolutos.

* `Edit(/docs/**)` - Edita em `<project>/docs/` (NÃO `/docs/`!)
* `Read(~/.zshrc)` - Lê o `.zshrc` do seu diretório home
* `Edit(//tmp/scratch.txt)` - Edita o caminho absoluto `/tmp/scratch.txt`
* `Read(src/**)` - Lê de `<diretório-atual>/src/`

**WebFetch**

* `WebFetch(domain:example.com)` Corresponde a solicitações de busca para example.com

**MCP**

* `mcp__puppeteer` Corresponde a qualquer ferramenta fornecida pelo servidor `puppeteer` (nome configurado em Claude Code)
* `mcp__puppeteer__*` Sintaxe de curinga que também corresponde a todas as ferramentas do servidor `puppeteer`
* `mcp__puppeteer__puppeteer_navigate` Corresponde à ferramenta `puppeteer_navigate` fornecida pelo servidor `puppeteer`

**Task (Subagentes)**
Use regras `Task(AgentName)` para controlar quais [subagentes](/docs/pt/sub-agents) Claude pode usar:

* `Task(Explore)` Corresponde ao subagente Explore
* `Task(Plan)` Corresponde ao subagente Plan
* `Task(Verify)` Corresponde ao subagente Verify

Adicione essas regras ao array `deny` em suas [configurações](/docs/pt/settings#permission-settings) ou use a flag CLI `--disallowedTools` para desabilitar agentes específicos. Por exemplo, para desabilitar o agente Explore:

Copiar

Perguntar à IA

```
{
  "permissions": {
    "deny": ["Task(Explore)"]
  }
}
```

### [​](#controle-de-permissão-adicional-com-hooks) Controle de permissão adicional com hooks

[Hooks do Claude Code](/docs/pt/hooks-guide) fornecem uma forma de registrar comandos de shell personalizados para realizar avaliação de permissão em tempo de execução. Quando Claude Code faz uma chamada de ferramenta, hooks PreToolUse são executados antes do sistema de permissão ser executado, e a saída do hook pode determinar se aprova ou nega a chamada de ferramenta no lugar do sistema de permissão.

### [​](#configurações-gerenciadas) Configurações gerenciadas

Para organizações que precisam de controle centralizado sobre a configuração do Claude Code, administradores podem implantar arquivos `managed-settings.json` em [diretórios do sistema](/docs/pt/settings#settings-files). Esses arquivos de política seguem o mesmo formato que arquivos de configuração regulares e não podem ser substituídos por configurações de usuário ou projeto.

### [​](#precedência-de-configurações) Precedência de configurações

Quando múltiplas fontes de configuração existem, elas são aplicadas na seguinte ordem (precedência mais alta para mais baixa):

1. Configurações gerenciadas (`managed-settings.json`)
2. Argumentos de linha de comando
3. Configurações de projeto local (`.claude/settings.local.json`)
4. Configurações de projeto compartilhado (`.claude/settings.json`)
5. Configurações de usuário (`~/.claude/settings.json`)

Esta hierarquia garante que as políticas organizacionais sejam sempre aplicadas enquanto ainda permite flexibilidade nos níveis de projeto e usuário onde apropriado.

[​](#gerenciamento-de-credenciais) Gerenciamento de credenciais
---------------------------------------------------------------

Claude Code gerencia com segurança suas credenciais de autenticação:

* **Local de armazenamento**: No macOS, chaves de API, tokens OAuth e outras credenciais são armazenadas no Keychain macOS criptografado.
* **Tipos de autenticação suportados**: Credenciais Claude.ai, credenciais da API Claude, Azure Auth, Bedrock Auth e Vertex Auth.
* **Scripts de credencial personalizados**: A configuração [`apiKeyHelper`](/docs/pt/settings#available-settings) pode ser configurada para executar um script de shell que retorna uma chave de API.
* **Intervalos de atualização**: Por padrão, `apiKeyHelper` é chamado após 5 minutos ou em resposta HTTP 401. Defina a variável de ambiente `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` para intervalos de atualização personalizados.