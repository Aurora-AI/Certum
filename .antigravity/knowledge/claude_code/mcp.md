# https://code.claude.com/docs/pt/mcp

Claude Code pode se conectar a centenas de ferramentas externas e fontes de dados através do [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), um padrão de código aberto para integrações de IA com ferramentas. Os servidores MCP dão ao Claude Code acesso às suas ferramentas, bancos de dados e APIs.

[​](#o-que-você-pode-fazer-com-mcp) O que você pode fazer com MCP
-----------------------------------------------------------------

Com servidores MCP conectados, você pode pedir ao Claude Code para:

* **Implementar recursos de rastreadores de problemas**: “Adicione o recurso descrito no problema JIRA ENG-4521 e crie um PR no GitHub.”
* **Analisar dados de monitoramento**: “Verifique Sentry e Statsig para verificar o uso do recurso descrito em ENG-4521.”
* **Consultar bancos de dados**: “Encontre emails de 10 usuários aleatórios que usaram o recurso ENG-4521, com base no nosso banco de dados PostgreSQL.”
* **Integrar designs**: “Atualize nosso modelo de email padrão com base nos novos designs do Figma que foram postados no Slack”
* **Automatizar fluxos de trabalho**: “Crie rascunhos do Gmail convidando esses 10 usuários para uma sessão de feedback sobre o novo recurso.”

[​](#servidores-mcp-populares) Servidores MCP populares
-------------------------------------------------------

Aqui estão alguns servidores MCP comumente usados que você pode conectar ao Claude Code:

Use servidores MCP de terceiros por sua conta e risco - Anthropic não verificou
a correção ou segurança de todos esses servidores.
Certifique-se de confiar nos servidores MCP que está instalando.
Tenha especial cuidado ao usar servidores MCP que possam buscar conteúdo
não confiável, pois estes podem expô-lo ao risco de injeção de prompt.

**Precisa de uma integração específica?** [Encontre centenas de servidores MCP no GitHub](https://github.com/modelcontextprotocol/servers), ou crie o seu próprio usando o [MCP SDK](https://modelcontextprotocol.io/quickstart/server).

[​](#instalando-servidores-mcp) Instalando servidores MCP
---------------------------------------------------------

Os servidores MCP podem ser configurados de três maneiras diferentes dependendo de suas necessidades:

### [​](#opção-1:-adicionar-um-servidor-http-remoto) Opção 1: Adicionar um servidor HTTP remoto

Os servidores HTTP são a opção recomendada para conectar a servidores MCP remotos. Este é o transporte mais amplamente suportado para serviços baseados em nuvem.

Copiar

Perguntar à IA

```
# Sintaxe básica
claude mcp add --transport http <name> <url>

# Exemplo real: Conectar ao Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Exemplo com token Bearer
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### [​](#opção-2:-adicionar-um-servidor-sse-remoto) Opção 2: Adicionar um servidor SSE remoto

O transporte SSE (Server-Sent Events) está descontinuado. Use servidores HTTP em vez disso, quando disponível.

Copiar

Perguntar à IA

```
# Sintaxe básica
claude mcp add --transport sse <name> <url>

# Exemplo real: Conectar ao Asana
claude mcp add --transport sse asana https://mcp.asana.com/sse

# Exemplo com cabeçalho de autenticação
claude mcp add --transport sse private-api https://api.company.com/sse \
  --header "X-API-Key: your-key-here"
```

### [​](#opção-3:-adicionar-um-servidor-stdio-local) Opção 3: Adicionar um servidor stdio local

Os servidores Stdio são executados como processos locais em sua máquina. Eles são ideais para ferramentas que precisam de acesso direto ao sistema ou scripts personalizados.

Copiar

Perguntar à IA

```
# Sintaxe básica
claude mcp add [options] <name> -- <command> [args...]

# Exemplo real: Adicionar servidor Airtable
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \
  -- npx -y airtable-mcp-server
```

**Importante: Ordenação de opções**Todas as opções (`--transport`, `--env`, `--scope`, `--header`) devem vir **antes** do nome do servidor. O `--` (travessão duplo) então separa o nome do servidor do comando e argumentos que são passados para o servidor MCP.Por exemplo:

* `claude mcp add --transport stdio myserver -- npx server` → executa `npx server`
* `claude mcp add --transport stdio --env KEY=value myserver -- python server.py --port 8080` → executa `python server.py --port 8080` com `KEY=value` no ambiente

Isso evita conflitos entre as flags do Claude e as flags do servidor.

### [​](#gerenciando-seus-servidores) Gerenciando seus servidores

Uma vez configurados, você pode gerenciar seus servidores MCP com estes comandos:

Copiar

Perguntar à IA

```
# Listar todos os servidores configurados
claude mcp list

# Obter detalhes para um servidor específico
claude mcp get github

# Remover um servidor
claude mcp remove github

# (dentro do Claude Code) Verificar status do servidor
/mcp
```

### [​](#atualizações-dinâmicas-de-ferramentas) Atualizações dinâmicas de ferramentas

Claude Code suporta notificações `list_changed` do MCP, permitindo que servidores MCP atualizem dinamicamente suas ferramentas, prompts e recursos disponíveis sem exigir que você se desconecte e reconecte. Quando um servidor MCP envia uma notificação `list_changed`, Claude Code atualiza automaticamente os recursos disponíveis desse servidor.

Dicas:

* Use a flag `--scope` para especificar onde a configuração é armazenada:
  + `local` (padrão): Disponível apenas para você no projeto atual (era chamado de `project` em versões mais antigas)
  + `project`: Compartilhado com todos no projeto via arquivo `.mcp.json`
  + `user`: Disponível para você em todos os projetos (era chamado de `global` em versões mais antigas)
* Defina variáveis de ambiente com flags `--env` (por exemplo, `--env KEY=value`)
* Configure o tempo limite de inicialização do servidor MCP usando a variável de ambiente MCP\_TIMEOUT (por exemplo, `MCP_TIMEOUT=10000 claude` define um tempo limite de 10 segundos)
* Claude Code exibirá um aviso quando a saída da ferramenta MCP exceder 10.000 tokens. Para aumentar esse limite, defina a variável de ambiente `MAX_MCP_OUTPUT_TOKENS` (por exemplo, `MAX_MCP_OUTPUT_TOKENS=50000`)
* Use `/mcp` para autenticar com servidores remotos que exigem autenticação OAuth 2.0

**Usuários do Windows**: No Windows nativo (não WSL), servidores MCP locais que usam `npx` exigem o wrapper `cmd /c` para garantir a execução adequada.

Copiar

Perguntar à IA

```
# Isso cria command="cmd" que o Windows pode executar
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

Sem o wrapper `cmd /c`, você encontrará erros “Connection closed” porque o Windows não pode executar `npx` diretamente. (Veja a nota acima para uma explicação do parâmetro `--`.)

### [​](#servidores-mcp-fornecidos-por-plugins) Servidores MCP fornecidos por plugins

[Plugins](/docs/pt/plugins) podem agrupar servidores MCP, fornecendo automaticamente ferramentas e integrações quando o plugin é ativado. Os servidores MCP de plugins funcionam de forma idêntica aos servidores configurados pelo usuário.
**Como os servidores MCP de plugins funcionam**:

* Os plugins definem servidores MCP em `.mcp.json` na raiz do plugin ou inline em `plugin.json`
* Quando um plugin é ativado, seus servidores MCP iniciam automaticamente
* As ferramentas MCP do plugin aparecem ao lado das ferramentas MCP configuradas manualmente
* Os servidores de plugins são gerenciados através da instalação do plugin (não através de comandos `/mcp`)

**Exemplo de configuração MCP de plugin**:
Em `.mcp.json` na raiz do plugin:

Copiar

Perguntar à IA

```
{
  "database-tools": {
    "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
    "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
    "env": {
      "DB_URL": "${DB_URL}"
    }
  }
}
```

Ou inline em `plugin.json`:

Copiar

Perguntar à IA

```
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"]
    }
  }
}
```

**Recursos de MCP de plugin**:

* **Ciclo de vida automático**: Os servidores iniciam quando o plugin é ativado, mas você deve reiniciar Claude Code para aplicar alterações do servidor MCP (ativação ou desativação)
* **Variáveis de ambiente**: Use `${CLAUDE_PLUGIN_ROOT}` para caminhos relativos ao plugin
* **Acesso ao ambiente do usuário**: Acesso às mesmas variáveis de ambiente que servidores configurados manualmente
* **Múltiplos tipos de transporte**: Suporte para transportes stdio, SSE e HTTP (o suporte de transporte pode variar por servidor)

**Visualizando servidores MCP de plugin**:

Copiar

Perguntar à IA

```
# Dentro do Claude Code, veja todos os servidores MCP incluindo os de plugins
/mcp
```

Os servidores de plugins aparecem na lista com indicadores mostrando que vêm de plugins.
**Benefícios dos servidores MCP de plugin**:

* **Distribuição agrupada**: Ferramentas e servidores empacotados juntos
* **Configuração automática**: Nenhuma configuração MCP manual necessária
* **Consistência da equipe**: Todos obtêm as mesmas ferramentas quando o plugin é instalado

Veja a [referência de componentes de plugin](/docs/pt/plugins-reference#mcp-servers) para detalhes sobre como agrupar servidores MCP com plugins.

[​](#escopos-de-instalação-do-mcp) Escopos de instalação do MCP
---------------------------------------------------------------

Os servidores MCP podem ser configurados em três níveis de escopo diferentes, cada um servindo propósitos distintos para gerenciar a acessibilidade e o compartilhamento do servidor. Entender esses escopos ajuda você a determinar a melhor forma de configurar servidores para suas necessidades específicas.

### [​](#escopo-local) Escopo local

Os servidores com escopo local representam o nível de configuração padrão e são armazenados em `~/.claude.json` sob o caminho do seu projeto. Esses servidores permanecem privados para você e são acessíveis apenas ao trabalhar no diretório do projeto atual. Este escopo é ideal para servidores de desenvolvimento pessoal, configurações experimentais ou servidores contendo credenciais sensíveis que não devem ser compartilhadas.

Copiar

Perguntar à IA

```
# Adicionar um servidor com escopo local (padrão)
claude mcp add --transport http stripe https://mcp.stripe.com

# Especificar explicitamente escopo local
claude mcp add --transport http stripe --scope local https://mcp.stripe.com
```

### [​](#escopo-de-projeto) Escopo de projeto

Os servidores com escopo de projeto permitem colaboração em equipe armazenando configurações em um arquivo `.mcp.json` no diretório raiz do seu projeto. Este arquivo é projetado para ser verificado no controle de versão, garantindo que todos os membros da equipe tenham acesso às mesmas ferramentas e serviços MCP. Quando você adiciona um servidor com escopo de projeto, Claude Code cria ou atualiza automaticamente este arquivo com a estrutura de configuração apropriada.

Copiar

Perguntar à IA

```
# Adicionar um servidor com escopo de projeto
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp
```

O arquivo `.mcp.json` resultante segue um formato padronizado:

Copiar

Perguntar à IA

```
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

Por razões de segurança, Claude Code solicita aprovação antes de usar servidores com escopo de projeto de arquivos `.mcp.json`. Se você precisar redefinir essas escolhas de aprovação, use o comando `claude mcp reset-project-choices`.

### [​](#escopo-de-usuário) Escopo de usuário

Os servidores com escopo de usuário são armazenados em `~/.claude.json` e fornecem acessibilidade entre projetos, tornando-os disponíveis em todos os projetos em sua máquina enquanto permanecem privados para sua conta de usuário. Este escopo funciona bem para servidores de utilitários pessoais, ferramentas de desenvolvimento ou serviços que você usa frequentemente em diferentes projetos.

Copiar

Perguntar à IA

```
# Adicionar um servidor de usuário
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

### [​](#escolhendo-o-escopo-correto) Escolhendo o escopo correto

Selecione seu escopo com base em:

* **Escopo local**: Servidores pessoais, configurações experimentais ou credenciais sensíveis específicas de um projeto
* **Escopo de projeto**: Servidores compartilhados pela equipe, ferramentas específicas do projeto ou serviços necessários para colaboração
* **Escopo de usuário**: Utilitários pessoais necessários em múltiplos projetos, ferramentas de desenvolvimento ou serviços frequentemente usados

**Onde os servidores MCP são armazenados?**

* **Escopo de usuário e local**: `~/.claude.json` (no campo `mcpServers` ou sob caminhos de projeto)
* **Escopo de projeto**: `.mcp.json` no diretório raiz do seu projeto (verificado no controle de versão)
* **Gerenciado**: `managed-mcp.json` em diretórios do sistema (veja [Configuração MCP gerenciada](#managed-mcp-configuration))

### [​](#hierarquia-de-escopo-e-precedência) Hierarquia de escopo e precedência

As configurações do servidor MCP seguem uma hierarquia de precedência clara. Quando servidores com o mesmo nome existem em múltiplos escopos, o sistema resolve conflitos priorizando servidores com escopo local primeiro, seguidos por servidores com escopo de projeto e, finalmente, servidores com escopo de usuário. Este design garante que configurações pessoais possam sobrescrever as compartilhadas quando necessário.

### [​](#expansão-de-variáveis-de-ambiente-em-mcp-json) Expansão de variáveis de ambiente em `.mcp.json`

Claude Code suporta expansão de variáveis de ambiente em arquivos `.mcp.json`, permitindo que equipes compartilhem configurações mantendo flexibilidade para caminhos específicos da máquina e valores sensíveis como chaves de API.
**Sintaxe suportada:**

* `${VAR}` - Expande para o valor da variável de ambiente `VAR`
* `${VAR:-default}` - Expande para `VAR` se definida, caso contrário usa `default`

**Locais de expansão:**
As variáveis de ambiente podem ser expandidas em:

* `command` - O caminho do executável do servidor
* `args` - Argumentos da linha de comando
* `env` - Variáveis de ambiente passadas para o servidor
* `url` - Para tipos de servidor HTTP
* `headers` - Para autenticação do servidor HTTP

**Exemplo com expansão de variável:**

Copiar

Perguntar à IA

```
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

Se uma variável de ambiente necessária não estiver definida e não tiver um valor padrão, Claude Code falhará ao analisar a configuração.

[​](#exemplos-práticos) Exemplos práticos
-----------------------------------------

### [​](#exemplo:-monitorar-erros-com-sentry) Exemplo: Monitorar erros com Sentry

Copiar

Perguntar à IA

```
# 1. Adicionar o servidor MCP do Sentry
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# 2. Use /mcp para autenticar com sua conta Sentry
> /mcp

# 3. Depurar problemas de produção
> "Quais são os erros mais comuns nas últimas 24 horas?"
> "Mostre-me o rastreamento de pilha para o ID de erro abc123"
> "Qual implantação introduziu esses novos erros?"
```

### [​](#exemplo:-conectar-ao-github-para-revisões-de-código) Exemplo: Conectar ao GitHub para revisões de código

Copiar

Perguntar à IA

```
# 1. Adicionar o servidor MCP do GitHub
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 2. No Claude Code, autentique se necessário
> /mcp
# Selecione "Authenticate" para GitHub

# 3. Agora você pode pedir ao Claude para trabalhar com GitHub
> "Revise o PR #456 e sugira melhorias"
> "Crie um novo problema para o bug que acabamos de encontrar"
> "Mostre-me todos os PRs abertos atribuídos a mim"
```

### [​](#exemplo:-consultar-seu-banco-de-dados-postgresql) Exemplo: Consultar seu banco de dados PostgreSQL

Copiar

Perguntar à IA

```
# 1. Adicionar o servidor de banco de dados com sua string de conexão
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:[email protected]:5432/analytics"

# 2. Consultar seu banco de dados naturalmente
> "Qual é nossa receita total este mês?"
> "Mostre-me o esquema para a tabela de pedidos"
> "Encontre clientes que não fizeram uma compra em 90 dias"
```

[​](#autenticar-com-servidores-mcp-remotos) Autenticar com servidores MCP remotos
---------------------------------------------------------------------------------

Muitos servidores MCP baseados em nuvem exigem autenticação. Claude Code suporta OAuth 2.0 para conexões seguras.

1

Adicionar o servidor que requer autenticação

Por exemplo:

Copiar

Perguntar à IA

```
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

2

Use o comando /mcp dentro do Claude Code

No Claude Code, use o comando:

Copiar

Perguntar à IA

```
> /mcp
```

Então siga os passos no seu navegador para fazer login.

Dicas:

* Os tokens de autenticação são armazenados com segurança e atualizados automaticamente
* Use “Clear authentication” no menu `/mcp` para revogar acesso
* Se seu navegador não abrir automaticamente, copie a URL fornecida
* A autenticação OAuth funciona com servidores HTTP

[​](#adicionar-servidores-mcp-de-configuração-json) Adicionar servidores MCP de configuração JSON
-------------------------------------------------------------------------------------------------

Se você tiver uma configuração JSON para um servidor MCP, você pode adicioná-la diretamente:

1

Adicionar um servidor MCP de JSON

Copiar

Perguntar à IA

```
# Sintaxe básica
claude mcp add-json <name> '<json>'

# Exemplo: Adicionar um servidor HTTP com configuração JSON
claude mcp add-json weather-api '{"type":"http","url":"https://api.weather.com/mcp","headers":{"Authorization":"Bearer token"}}'

# Exemplo: Adicionar um servidor stdio com configuração JSON
claude mcp add-json local-weather '{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":{"CACHE_DIR":"/tmp"}}'
```

2

Verificar se o servidor foi adicionado

Copiar

Perguntar à IA

```
claude mcp get weather-api
```

Dicas:

* Certifique-se de que o JSON está adequadamente escapado no seu shell
* O JSON deve estar em conformidade com o esquema de configuração do servidor MCP
* Você pode usar `--scope user` para adicionar o servidor à sua configuração de usuário em vez da específica do projeto

[​](#importar-servidores-mcp-do-claude-desktop) Importar servidores MCP do Claude Desktop
-----------------------------------------------------------------------------------------

Se você já configurou servidores MCP no Claude Desktop, você pode importá-los:

1

Importar servidores do Claude Desktop

Copiar

Perguntar à IA

```
# Sintaxe básica 
claude mcp add-from-claude-desktop
```

2

Selecionar quais servidores importar

Após executar o comando, você verá um diálogo interativo que permite selecionar quais servidores você deseja importar.

3

Verificar se os servidores foram importados

Copiar

Perguntar à IA

```
claude mcp list
```

Dicas:

* Este recurso funciona apenas em macOS e Windows Subsystem for Linux (WSL)
* Ele lê o arquivo de configuração do Claude Desktop de sua localização padrão nessas plataformas
* Use a flag `--scope user` para adicionar servidores à sua configuração de usuário
* Os servidores importados terão os mesmos nomes que no Claude Desktop
* Se servidores com os mesmos nomes já existem, eles receberão um sufixo numérico (por exemplo, `server_1`)

[​](#usar-claude-code-como-um-servidor-mcp) Usar Claude Code como um servidor MCP
---------------------------------------------------------------------------------

Você pode usar Claude Code como um servidor MCP que outros aplicativos podem se conectar:

Copiar

Perguntar à IA

```
# Iniciar Claude como um servidor MCP stdio
claude mcp serve
```

Você pode usar isso no Claude Desktop adicionando esta configuração ao claude\_desktop\_config.json:

Copiar

Perguntar à IA

```
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "claude",
      "args": ["mcp", "serve"],
      "env": {}
    }
  }
}
```

**Configurando o caminho do executável**: O campo `command` deve fazer referência ao executável do Claude Code. Se o comando `claude` não estiver no PATH do seu sistema, você precisará especificar o caminho completo para o executável.Para encontrar o caminho completo:

Copiar

Perguntar à IA

```
which claude
```

Então use o caminho completo em sua configuração:

Copiar

Perguntar à IA

```
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "/full/path/to/claude",
      "args": ["mcp", "serve"],
      "env": {}
    }
  }
}
```

Sem o caminho correto do executável, você encontrará erros como `spawn claude ENOENT`.

Dicas:

* O servidor fornece acesso às ferramentas do Claude como View, Edit, LS, etc.
* No Claude Desktop, tente pedir ao Claude para ler arquivos em um diretório, fazer edições e muito mais.
* Observe que este servidor MCP está apenas expondo as ferramentas do Claude Code ao seu cliente MCP, então seu próprio cliente é responsável por implementar confirmação do usuário para chamadas de ferramentas individuais.

[​](#limites-de-saída-do-mcp-e-avisos) Limites de saída do MCP e avisos
-----------------------------------------------------------------------

Quando as ferramentas MCP produzem grandes saídas, Claude Code ajuda a gerenciar o uso de tokens para evitar sobrecarregar seu contexto de conversa:

* **Limite de aviso de saída**: Claude Code exibe um aviso quando qualquer saída de ferramenta MCP excede 10.000 tokens
* **Limite configurável**: Você pode ajustar o máximo de tokens de saída MCP permitidos usando a variável de ambiente `MAX_MCP_OUTPUT_TOKENS`
* **Limite padrão**: O máximo padrão é 25.000 tokens

Para aumentar o limite para ferramentas que produzem grandes saídas:

Copiar

Perguntar à IA

```
# Definir um limite mais alto para saídas de ferramentas MCP
export MAX_MCP_OUTPUT_TOKENS=50000
claude
```

Isso é particularmente útil ao trabalhar com servidores MCP que:

* Consultam grandes conjuntos de dados ou bancos de dados
* Geram relatórios ou documentação detalhados
* Processam extensos arquivos de log ou informações de depuração

Se você encontrar frequentemente avisos de saída com servidores MCP específicos, considere aumentar o limite ou configurar o servidor para paginar ou filtrar suas respostas.

[​](#usar-recursos-mcp) Usar recursos MCP
-----------------------------------------

Os servidores MCP podem expor recursos que você pode referenciar usando menções @, semelhante a como você referencia arquivos.

### [​](#referenciar-recursos-mcp) Referenciar recursos MCP

1

Listar recursos disponíveis

Digite `@` no seu prompt para ver recursos disponíveis de todos os servidores MCP conectados. Os recursos aparecem ao lado dos arquivos no menu de preenchimento automático.

2

Referenciar um recurso específico

Use o formato `@server:protocol://resource/path` para referenciar um recurso:

Copiar

Perguntar à IA

```
> Você pode analisar @github:issue://123 e sugerir uma correção?
```

Copiar

Perguntar à IA

```
> Por favor, revise a documentação da API em @docs:file://api/authentication
```

3

Múltiplas referências de recursos

Você pode referenciar múltiplos recursos em um único prompt:

Copiar

Perguntar à IA

```
> Compare @postgres:schema://users com @docs:file://database/user-model
```

Dicas:

* Os recursos são automaticamente buscados e incluídos como anexos quando referenciados
* Os caminhos dos recursos são pesquisáveis por correspondência aproximada no preenchimento automático de menção @
* Claude Code fornece automaticamente ferramentas para listar e ler recursos MCP quando os servidores os suportam
* Os recursos podem conter qualquer tipo de conteúdo que o servidor MCP fornece (texto, JSON, dados estruturados, etc.)

[​](#usar-prompts-mcp-como-comandos-de-barra) Usar prompts MCP como comandos de barra
-------------------------------------------------------------------------------------

Os servidores MCP podem expor prompts que se tornam disponíveis como comandos de barra no Claude Code.

### [​](#executar-prompts-mcp) Executar prompts MCP

1

Descobrir prompts disponíveis

Digite `/` para ver todos os comandos disponíveis, incluindo aqueles de servidores MCP. Os prompts MCP aparecem com o formato `/mcp__servername__promptname`.

2

Executar um prompt sem argumentos

Copiar

Perguntar à IA

```
> /mcp__github__list_prs
```

3

Executar um prompt com argumentos

Muitos prompts aceitam argumentos. Passe-os separados por espaço após o comando:

Copiar

Perguntar à IA

```
> /mcp__github__pr_review 456
```

Copiar

Perguntar à IA

```
> /mcp__jira__create_issue "Bug no fluxo de login" high
```

Dicas:

* Os prompts MCP são descobertos dinamicamente de servidores conectados
* Os argumentos são analisados com base nos parâmetros definidos do prompt
* Os resultados do prompt são injetados diretamente na conversa
* Os nomes do servidor e do prompt são normalizados (espaços se tornam sublinhados)

[​](#configuração-mcp-gerenciada) Configuração MCP gerenciada
-------------------------------------------------------------

Para organizações que precisam de controle centralizado sobre servidores MCP, Claude Code suporta duas opções de configuração:

1. **Controle exclusivo com `managed-mcp.json`**: Implante um conjunto fixo de servidores MCP que os usuários não podem modificar ou estender
2. **Controle baseado em política com listas de permissão/bloqueio**: Permita que os usuários adicionem seus próprios servidores, mas restrinja quais são permitidos

Essas opções permitem que administradores de TI:

* **Controlar quais servidores MCP os funcionários podem acessar**: Implante um conjunto padronizado de servidores MCP aprovados em toda a organização
* **Prevenir servidores MCP não autorizados**: Restrinja os usuários de adicionar servidores MCP não aprovados
* **Desabilitar MCP completamente**: Remova a funcionalidade MCP completamente se necessário

### [​](#opção-1:-controle-exclusivo-com-managed-mcp-json) Opção 1: Controle exclusivo com managed-mcp.json

Quando você implanta um arquivo `managed-mcp.json`, ele assume **controle exclusivo** sobre todos os servidores MCP. Os usuários não podem adicionar, modificar ou usar nenhum servidor MCP além daqueles definidos neste arquivo. Esta é a abordagem mais simples para organizações que desejam controle completo.
Os administradores do sistema implantam o arquivo de configuração em um diretório em todo o sistema:

* macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
* Linux e WSL: `/etc/claude-code/managed-mcp.json`
* Windows: `C:\Program Files\ClaudeCode\managed-mcp.json`

Estes são caminhos em todo o sistema (não diretórios home do usuário como `~/Library/...`) que exigem privilégios de administrador. Eles são projetados para serem implantados por administradores de TI.

O arquivo `managed-mcp.json` usa o mesmo formato que um arquivo `.mcp.json` padrão:

Copiar

Perguntar à IA

```
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp"
    },
    "company-internal": {
      "type": "stdio",
      "command": "/usr/local/bin/company-mcp-server",
      "args": ["--config", "/etc/company/mcp-config.json"],
      "env": {
        "COMPANY_API_URL": "https://internal.company.com"
      }
    }
  }
}
```

### [​](#opção-2:-controle-baseado-em-política-com-listas-de-permissão-e-bloqueio) Opção 2: Controle baseado em política com listas de permissão e bloqueio

Em vez de assumir controle exclusivo, os administradores podem permitir que os usuários configurem seus próprios servidores MCP enquanto aplicam restrições sobre quais servidores são permitidos. Esta abordagem usa `allowedMcpServers` e `deniedMcpServers` no [arquivo de configurações gerenciadas](/docs/pt/settings#settings-files).

**Escolhendo entre opções**: Use a Opção 1 (`managed-mcp.json`) quando você deseja implantar um conjunto fixo de servidores sem personalização do usuário. Use a Opção 2 (listas de permissão/bloqueio) quando você deseja permitir que os usuários adicionem seus próprios servidores dentro de restrições de política.

#### [​](#opções-de-restrição) Opções de restrição

Cada entrada na lista de permissão ou bloqueio pode restringir servidores de três maneiras:

1. **Por nome do servidor** (`serverName`): Corresponde ao nome configurado do servidor
2. **Por comando** (`serverCommand`): Corresponde ao comando exato e argumentos usados para iniciar servidores stdio
3. **Por padrão de URL** (`serverUrl`): Corresponde a URLs de servidor remoto com suporte a caracteres curinga

**Importante**: Cada entrada deve ter exatamente um de `serverName`, `serverCommand` ou `serverUrl`.

#### [​](#exemplo-de-configuração) Exemplo de configuração

Copiar

Perguntar à IA

```
{
  "allowedMcpServers": [
    // Permitir por nome do servidor
    { "serverName": "github" },
    { "serverName": "sentry" },

    // Permitir por comando exato (para servidores stdio)
    { "serverCommand": ["npx", "-y", "@modelcontextprotocol/server-filesystem"] },
    { "serverCommand": ["python", "/usr/local/bin/approved-server.py"] },

    // Permitir por padrão de URL (para servidores remotos)
    { "serverUrl": "https://mcp.company.com/*" },
    { "serverUrl": "https://*.internal.corp/*" }
  ],
  "deniedMcpServers": [
    // Bloquear por nome do servidor
    { "serverName": "dangerous-server" },

    // Bloquear por comando exato (para servidores stdio)
    { "serverCommand": ["npx", "-y", "unapproved-package"] },

    // Bloquear por padrão de URL (para servidores remotos)
    { "serverUrl": "https://*.untrusted.com/*" }
  ]
}
```

#### [​](#como-as-restrições-baseadas-em-comando-funcionam) Como as restrições baseadas em comando funcionam

**Correspondência exata**:

* Os arrays de comando devem corresponder **exatamente** - tanto o comando quanto todos os argumentos na ordem correta
* Exemplo: `["npx", "-y", "server"]` NÃO corresponderá a `["npx", "server"]` ou `["npx", "-y", "server", "--flag"]`

**Comportamento do servidor stdio**:

* Quando a lista de permissão contém **qualquer** entrada `serverCommand`, servidores stdio **devem** corresponder a um desses comandos
* Os servidores stdio não podem passar apenas pelo nome quando restrições de comando estão presentes
* Isso garante que os administradores possam aplicar quais comandos são permitidos executar

**Comportamento do servidor não-stdio**:

* Servidores remotos (HTTP, SSE, WebSocket) usam correspondência baseada em URL quando entradas `serverUrl` existem na lista de permissão
* Se nenhuma entrada de URL existir, servidores remotos voltam para correspondência baseada em nome
* As restrições de comando não se aplicam a servidores remotos

#### [​](#como-as-restrições-baseadas-em-url-funcionam) Como as restrições baseadas em URL funcionam

Os padrões de URL suportam caracteres curinga usando `*` para corresponder a qualquer sequência de caracteres. Isso é útil para permitir domínios inteiros ou subdomínios.
**Exemplos de caracteres curinga**:

* `https://mcp.company.com/*` - Permitir todos os caminhos em um domínio específico
* `https://*.example.com/*` - Permitir qualquer subdomínio de example.com
* `http://localhost:*/*` - Permitir qualquer porta em localhost

**Comportamento do servidor remoto**:

* Quando a lista de permissão contém **qualquer** entrada `serverUrl`, servidores remotos **devem** corresponder a um desses padrões de URL
* Os servidores remotos não podem passar apenas pelo nome quando restrições de URL estão presentes
* Isso garante que os administradores possam aplicar quais endpoints remotos são permitidos

Exemplo: Lista de permissão apenas de URL

Copiar

Perguntar à IA

```
{
  "allowedMcpServers": [
    { "serverUrl": "https://mcp.company.com/*" },
    { "serverUrl": "https://*.internal.corp/*" }
  ]
}
```

**Resultado**:

* Servidor HTTP em `https://mcp.company.com/api`: ✅ Permitido (corresponde ao padrão de URL)
* Servidor HTTP em `https://api.internal.corp/mcp`: ✅ Permitido (corresponde ao subdomínio curinga)
* Servidor HTTP em `https://external.com/mcp`: ❌ Bloqueado (não corresponde a nenhum padrão de URL)
* Servidor stdio com qualquer comando: ❌ Bloqueado (nenhuma entrada de nome ou comando para corresponder)



Exemplo: Lista de permissão apenas de comando

Copiar

Perguntar à IA

```
{
  "allowedMcpServers": [
    { "serverCommand": ["npx", "-y", "approved-package"] }
  ]
}
```

**Resultado**:

* Servidor stdio com `["npx", "-y", "approved-package"]`: ✅ Permitido (corresponde ao comando)
* Servidor stdio com `["node", "server.js"]`: ❌ Bloqueado (não corresponde ao comando)
* Servidor HTTP nomeado “my-api”: ❌ Bloqueado (nenhuma entrada de nome para corresponder)



Exemplo: Lista de permissão mista de nome e comando

Copiar

Perguntar à IA

```
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverCommand": ["npx", "-y", "approved-package"] }
  ]
}
```

**Resultado**:

* Servidor stdio nomeado “local-tool” com `["npx", "-y", "approved-package"]`: ✅ Permitido (corresponde ao comando)
* Servidor stdio nomeado “local-tool” com `["node", "server.js"]`: ❌ Bloqueado (entradas de comando existem mas não correspondem)
* Servidor stdio nomeado “github” com `["node", "server.js"]`: ❌ Bloqueado (servidores stdio devem corresponder a comandos quando entradas de comando existem)
* Servidor HTTP nomeado “github”: ✅ Permitido (corresponde ao nome)
* Servidor HTTP nomeado “other-api”: ❌ Bloqueado (nome não corresponde)



Exemplo: Lista de permissão apenas de nome

Copiar

Perguntar à IA

```
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverName": "internal-tool" }
  ]
}
```

**Resultado**:

* Servidor stdio nomeado “github” com qualquer comando: ✅ Permitido (nenhuma restrição de comando)
* Servidor stdio nomeado “internal-tool” com qualquer comando: ✅ Permitido (nenhuma restrição de comando)
* Servidor HTTP nomeado “github”: ✅ Permitido (corresponde ao nome)
* Qualquer servidor nomeado “other”: ❌ Bloqueado (nome não corresponde)

#### [​](#comportamento-da-lista-de-permissão-allowedmcpservers) Comportamento da lista de permissão (`allowedMcpServers`)

* `undefined` (padrão): Sem restrições - os usuários podem configurar qualquer servidor MCP
* Array vazio `[]`: Bloqueio completo - os usuários não podem configurar nenhum servidor MCP
* Lista de entradas: Os usuários podem configurar apenas servidores que correspondem por nome, comando ou padrão de URL

#### [​](#comportamento-da-lista-de-bloqueio-deniedmcpservers) Comportamento da lista de bloqueio (`deniedMcpServers`)

* `undefined` (padrão): Nenhum servidor é bloqueado
* Array vazio `[]`: Nenhum servidor é bloqueado
* Lista de entradas: Servidores especificados são explicitamente bloqueados em todos os escopos

#### [​](#notas-importantes) Notas importantes

* **Opção 1 e Opção 2 podem ser combinadas**: Se `managed-mcp.json` existir, ele tem controle exclusivo e os usuários não podem adicionar servidores. As listas de permissão/bloqueio ainda se aplicam aos servidores gerenciados em si.
* **A lista de bloqueio tem precedência absoluta**: Se um servidor corresponder a uma entrada de lista de bloqueio (por nome, comando ou URL), ele será bloqueado mesmo que esteja na lista de permissão
* As restrições baseadas em nome, comando e URL funcionam juntas: um servidor passa se corresponder **a** uma entrada de nome, uma entrada de comando ou um padrão de URL (a menos que bloqueado pela lista de bloqueio)

**Ao usar `managed-mcp.json`**: Os usuários não podem adicionar servidores MCP através de `claude mcp add` ou arquivos de configuração. As configurações `allowedMcpServers` e `deniedMcpServers` ainda se aplicam para filtrar quais servidores gerenciados são realmente carregados.