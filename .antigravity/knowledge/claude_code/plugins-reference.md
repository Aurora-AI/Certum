# https://code.claude.com/docs/pt/plugins-reference#agents

Procurando instalar plugins? Veja [Descobrir e instalar plugins](/docs/pt/discover-plugins). Para criar plugins, veja [Plugins](/docs/pt/plugins). Para distribuir plugins, veja [Marketplaces de plugins](/docs/pt/plugin-marketplaces).

Esta referência fornece especificações técnicas completas para o sistema de plugins Claude Code, incluindo esquemas de componentes, comandos CLI e ferramentas de desenvolvimento.

[​](#referência-de-componentes-de-plugin) Referência de componentes de plugin
-----------------------------------------------------------------------------

Esta seção documenta os cinco tipos de componentes que os plugins podem fornecer.

### [​](#comandos) Comandos

Os plugins adicionam comandos de barra invertida personalizados que se integram perfeitamente ao sistema de comandos do Claude Code.
**Localização**: Diretório `commands/` na raiz do plugin
**Formato de arquivo**: Arquivos Markdown com frontmatter
Para detalhes completos sobre a estrutura de comando do plugin, padrões de invocação e recursos, veja [Comandos de plugin](/docs/pt/slash-commands#plugin-commands).

### [​](#agentes) Agentes

Os plugins podem fornecer subagentos especializados para tarefas específicas que Claude pode invocar automaticamente quando apropriado.
**Localização**: Diretório `agents/` na raiz do plugin
**Formato de arquivo**: Arquivos Markdown descrevendo as capacidades do agente
**Estrutura do agente**:

Copiar

Perguntar à IA

```
---
description: O que este agente se especializa
capabilities: ["task1", "task2", "task3"]
---

# Nome do Agente

Descrição detalhada do papel do agente, experiência e quando Claude deve invocá-lo.

## Capacidades
- Tarefa específica em que o agente se destaca
- Outra capacidade especializada
- Quando usar este agente versus outros

## Contexto e exemplos
Forneça exemplos de quando este agente deve ser usado e que tipos de problemas ele resolve.
```

**Pontos de integração**:

* Os agentes aparecem na interface `/agents`
* Claude pode invocar agentes automaticamente com base no contexto da tarefa
* Os agentes podem ser invocados manualmente pelos usuários
* Os agentes de plugin funcionam junto com os agentes Claude integrados

### [​](#skills) Skills

Os plugins podem fornecer Agent Skills que estendem as capacidades do Claude. As Skills são invocadas pelo modelo—Claude decide autonomamente quando usá-las com base no contexto da tarefa.
**Localização**: Diretório `skills/` na raiz do plugin
**Formato de arquivo**: Diretórios contendo arquivos `SKILL.md` com frontmatter
**Estrutura de Skill**:

Copiar

Perguntar à IA

```
skills/
├── pdf-processor/
│   ├── SKILL.md
│   ├── reference.md (opcional)
│   └── scripts/ (opcional)
└── code-reviewer/
    └── SKILL.md
```

**Comportamento de integração**:

* As Skills de plugin são descobertas automaticamente quando o plugin é instalado
* Claude invoca Skills autonomamente com base no contexto de tarefa correspondente
* As Skills podem incluir arquivos de suporte junto com SKILL.md

Para o formato SKILL.md e orientação completa de autoria de Skill, veja:

* [Usar Skills no Claude Code](/docs/pt/skills)
* [Visão geral de Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview#skill-structure)

### [​](#hooks) Hooks

Os plugins podem fornecer manipuladores de eventos que respondem automaticamente aos eventos do Claude Code.
**Localização**: `hooks/hooks.json` na raiz do plugin, ou inline em plugin.json
**Formato**: Configuração JSON com correspondentes de eventos e ações
**Configuração de hook**:

Copiar

Perguntar à IA

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

**Eventos disponíveis**:

* `PreToolUse`: Antes de Claude usar qualquer ferramenta
* `PostToolUse`: Depois que Claude usa com sucesso qualquer ferramenta
* `PostToolUseFailure`: Depois que a execução da ferramenta Claude falha
* `PermissionRequest`: Quando um diálogo de permissão é mostrado
* `UserPromptSubmit`: Quando o usuário envia um prompt
* `Notification`: Quando Claude Code envia notificações
* `Stop`: Quando Claude tenta parar
* `SubagentStart`: Quando um subagenteé iniciado
* `SubagentStop`: Quando um subagentetenta parar
* `SessionStart`: No início das sessões
* `SessionEnd`: No final das sessões
* `PreCompact`: Antes do histórico de conversa ser compactado

**Tipos de hook**:

* `command`: Executar comandos shell ou scripts
* `prompt`: Avaliar um prompt com um LLM (usa o placeholder `$ARGUMENTS` para contexto)
* `agent`: Executar um verificador agêntico com ferramentas para tarefas de verificação complexas

### [​](#servidores-mcp) Servidores MCP

Os plugins podem agrupar servidores Model Context Protocol (MCP) para conectar Claude Code com ferramentas e serviços externos.
**Localização**: `.mcp.json` na raiz do plugin, ou inline em plugin.json
**Formato**: Configuração padrão de servidor MCP
**Configuração de servidor MCP**:

Copiar

Perguntar à IA

```
{
  "mcpServers": {
    "plugin-database": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${CLAUDE_PLUGIN_ROOT}/data"
      }
    },
    "plugin-api-client": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

**Comportamento de integração**:

* Os servidores MCP de plugin iniciam automaticamente quando o plugin é habilitado
* Os servidores aparecem como ferramentas MCP padrão no kit de ferramentas do Claude
* As capacidades do servidor se integram perfeitamente com as ferramentas existentes do Claude
* Os servidores de plugin podem ser configurados independentemente dos servidores MCP do usuário

### [​](#servidores-lsp) Servidores LSP

Procurando usar plugins LSP? Instale-os do marketplace oficial—procure por “lsp” na aba Discover `/plugin`. Esta seção documenta como criar plugins LSP para linguagens não cobertas pelo marketplace oficial.

Os plugins podem fornecer servidores [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) para dar ao Claude inteligência de código em tempo real enquanto trabalha em sua base de código.
A integração LSP fornece:

* **Diagnósticos instantâneos**: Claude vê erros e avisos imediatamente após cada edição
* **Navegação de código**: ir para definição, encontrar referências e informações de hover
* **Consciência de linguagem**: informações de tipo e documentação para símbolos de código

**Localização**: `.lsp.json` na raiz do plugin, ou inline em `plugin.json`
**Formato**: Configuração JSON mapeando nomes de servidores de linguagem para suas configurações
**Formato de arquivo `.lsp.json`**:

Copiar

Perguntar à IA

```
{
  "go": {
    "command": "gopls",
    "args": ["serve"],
    "extensionToLanguage": {
      ".go": "go"
    }
  }
}
```

**Inline em `plugin.json`**:

Copiar

Perguntar à IA

```
{
  "name": "my-plugin",
  "lspServers": {
    "go": {
      "command": "gopls",
      "args": ["serve"],
      "extensionToLanguage": {
        ".go": "go"
      }
    }
  }
}
```

**Campos obrigatórios:**

| Campo | Descrição |
| --- | --- |
| `command` | O binário LSP a executar (deve estar em PATH) |
| `extensionToLanguage` | Mapeia extensões de arquivo para identificadores de linguagem |

**Campos opcionais:**

| Campo | Descrição |
| --- | --- |
| `args` | Argumentos de linha de comando para o servidor LSP |
| `transport` | Transporte de comunicação: `stdio` (padrão) ou `socket` |
| `env` | Variáveis de ambiente a definir ao iniciar o servidor |
| `initializationOptions` | Opções passadas ao servidor durante a inicialização |
| `settings` | Configurações passadas via `workspace/didChangeConfiguration` |
| `workspaceFolder` | Caminho da pasta de workspace para o servidor |
| `startupTimeout` | Tempo máximo para aguardar a inicialização do servidor (milissegundos) |
| `shutdownTimeout` | Tempo máximo para aguardar o desligamento gracioso (milissegundos) |
| `restartOnCrash` | Se deve reiniciar automaticamente o servidor se ele falhar |
| `maxRestarts` | Número máximo de tentativas de reinicialização antes de desistir |

**Você deve instalar o binário do servidor de linguagem separadamente.** Os plugins LSP configuram como Claude Code se conecta a um servidor de linguagem, mas não incluem o servidor em si. Se você vir `Executable not found in $PATH` na aba Errors `/plugin`, instale o binário necessário para sua linguagem.

**Plugins LSP disponíveis:**

| Plugin | Servidor de linguagem | Comando de instalação |
| --- | --- | --- |
| `pyright-lsp` | Pyright (Python) | `pip install pyright` ou `npm install -g pyright` |
| `typescript-lsp` | TypeScript Language Server | `npm install -g typescript-language-server typescript` |
| `rust-lsp` | rust-analyzer | [Veja instalação rust-analyzer](https://rust-analyzer.github.io/manual.html#installation) |

Instale o servidor de linguagem primeiro, depois instale o plugin do marketplace.


---

[​](#escopos-de-instalação-de-plugin) Escopos de instalação de plugin
---------------------------------------------------------------------

Quando você instala um plugin, você escolhe um **escopo** que determina onde o plugin está disponível e quem mais pode usá-lo:

| Escopo | Arquivo de configurações | Caso de uso |
| --- | --- | --- |
| `user` | `~/.claude/settings.json` | Plugins pessoais disponíveis em todos os projetos (padrão) |
| `project` | `.claude/settings.json` | Plugins de equipe compartilhados via controle de versão |
| `local` | `.claude/settings.local.json` | Plugins específicos do projeto, gitignored |
| `managed` | `managed-settings.json` | Plugins gerenciados (somente leitura, apenas atualizar) |

Os plugins usam o mesmo sistema de escopo que outras configurações do Claude Code. Para instruções de instalação e sinalizadores de escopo, veja [Instalar plugins](/docs/pt/discover-plugins#install-plugins). Para uma explicação completa de escopos, veja [Escopos de configuração](/docs/pt/settings#configuration-scopes).


---

[​](#esquema-de-manifesto-de-plugin) Esquema de manifesto de plugin
-------------------------------------------------------------------

O arquivo `plugin.json` define os metadados e configuração do seu plugin. Esta seção documenta todos os campos e opções suportados.

### [​](#esquema-completo) Esquema completo

Copiar

Perguntar à IA

```
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "[email protected]",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "skills": "./custom/skills/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json"
}
```

### [​](#campos-obrigatórios) Campos obrigatórios

| Campo | Tipo | Descrição | Exemplo |
| --- | --- | --- | --- |
| `name` | string | Identificador único (kebab-case, sem espaços) | `"deployment-tools"` |

### [​](#campos-de-metadados) Campos de metadados

| Campo | Tipo | Descrição | Exemplo |
| --- | --- | --- | --- |
| `version` | string | Versão semântica | `"2.1.0"` |
| `description` | string | Breve explicação do propósito do plugin | `"Deployment automation tools"` |
| `author` | object | Informações do autor | `{"name": "Dev Team", "email": "[email protected]"}` |
| `homepage` | string | URL de documentação | `"https://docs.example.com"` |
| `repository` | string | URL do código-fonte | `"https://github.com/user/plugin"` |
| `license` | string | Identificador de licença | `"MIT"`, `"Apache-2.0"` |
| `keywords` | array | Tags de descoberta | `["deployment", "ci-cd"]` |

### [​](#campos-de-caminho-de-componente) Campos de caminho de componente

| Campo | Tipo | Descrição | Exemplo |
| --- | --- | --- | --- |
| `commands` | string|array | Arquivos/diretórios de comando adicionais | `"./custom/cmd.md"` ou `["./cmd1.md"]` |
| `agents` | string|array | Arquivos de agente adicionais | `"./custom/agents/"` |
| `skills` | string|array | Diretórios de skill adicionais | `"./custom/skills/"` |
| `hooks` | string|object | Caminho de configuração de hook ou configuração inline | `"./hooks.json"` |
| `mcpServers` | string|object | Caminho de configuração MCP ou configuração inline | `"./mcp-config.json"` |
| `outputStyles` | string|array | Arquivos/diretórios de estilo de saída adicionais | `"./styles/"` |
| `lspServers` | string|object | Configuração [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) para inteligência de código (ir para definição, encontrar referências, etc.) | `"./.lsp.json"` |

### [​](#regras-de-comportamento-de-caminho) Regras de comportamento de caminho

**Importante**: Caminhos personalizados complementam diretórios padrão - eles não os substituem.

* Se `commands/` existe, é carregado além dos caminhos de comando personalizados
* Todos os caminhos devem ser relativos à raiz do plugin e começar com `./`
* Comandos de caminhos personalizados usam as mesmas regras de nomenclatura e namespacing
* Múltiplos caminhos podem ser especificados como arrays para flexibilidade

**Exemplos de caminho**:

Copiar

Perguntar à IA

```
{
  "commands": [
    "./specialized/deploy.md",
    "./utilities/batch-process.md"
  ],
  "agents": [
    "./custom-agents/reviewer.md",
    "./custom-agents/tester.md"
  ]
}
```

### [​](#variáveis-de-ambiente) Variáveis de ambiente

**`${CLAUDE_PLUGIN_ROOT}`**: Contém o caminho absoluto para seu diretório de plugin. Use isso em hooks, servidores MCP e scripts para garantir caminhos corretos independentemente do local de instalação.

Copiar

Perguntar à IA

```
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/process.sh"
          }
        ]
      }
    ]
  }
}
```

---

[​](#cache-de-plugin-e-resolução-de-arquivo) Cache de plugin e resolução de arquivo
-----------------------------------------------------------------------------------

Para fins de segurança e verificação, Claude Code copia plugins para um diretório de cache em vez de usá-los no local. Entender esse comportamento é importante ao desenvolver plugins que fazem referência a arquivos externos.

### [​](#como-funciona-o-cache-de-plugin) Como funciona o cache de plugin

Quando você instala um plugin, Claude Code copia os arquivos do plugin para um diretório de cache:

* **Para plugins de marketplace com caminhos relativos**: O caminho especificado no campo `source` é copiado recursivamente. Por exemplo, se sua entrada de marketplace especificar `"source": "./plugins/my-plugin"`, todo o diretório `./plugins` é copiado.
* **Para plugins com `.claude-plugin/plugin.json`**: O diretório raiz implícito (o diretório contendo `.claude-plugin/plugin.json`) é copiado recursivamente.

### [​](#limitações-de-travessia-de-caminho) Limitações de travessia de caminho

Os plugins não podem fazer referência a arquivos fora de sua estrutura de diretório copiada. Caminhos que atravessam fora da raiz do plugin (como `../shared-utils`) não funcionarão após a instalação porque esses arquivos externos não são copiados para o cache.

### [​](#trabalhando-com-dependências-externas) Trabalhando com dependências externas

Se seu plugin precisa acessar arquivos fora de seu diretório, você tem duas opções:
**Opção 1: Use symlinks**
Crie links simbólicos para arquivos externos dentro de seu diretório de plugin. Os symlinks são honrados durante o processo de cópia:

Copiar

Perguntar à IA

```
# Dentro de seu diretório de plugin
ln -s /path/to/shared-utils ./shared-utils
```

O conteúdo vinculado será copiado para o cache do plugin.
**Opção 2: Reestruture seu marketplace**
Defina o caminho do plugin para um diretório pai que contenha todos os arquivos necessários, depois forneça o resto do manifesto do plugin diretamente na entrada do marketplace:

Copiar

Perguntar à IA

```
{
  "name": "my-plugin",
  "source": "./",
  "description": "Plugin that needs root-level access",
  "commands": ["./plugins/my-plugin/commands/"],
  "agents": ["./plugins/my-plugin/agents/"],
  "strict": false
}
```

Essa abordagem copia toda a raiz do marketplace, dando ao seu plugin acesso a diretórios irmãos.

Os symlinks que apontam para locais fora da raiz lógica do plugin são seguidos durante a cópia. Isso fornece flexibilidade enquanto mantém os benefícios de segurança do sistema de cache.

---

[​](#estrutura-de-diretório-de-plugin) Estrutura de diretório de plugin
-----------------------------------------------------------------------

### [​](#layout-de-plugin-padrão) Layout de plugin padrão

Um plugin completo segue esta estrutura:

Copiar

Perguntar à IA

```
enterprise-plugin/
├── .claude-plugin/           # Diretório de metadados
│   └── plugin.json          # Obrigatório: manifesto de plugin
├── commands/                 # Localização de comando padrão
│   ├── status.md
│   └── logs.md
├── agents/                   # Localização de agente padrão
│   ├── security-reviewer.md
│   ├── performance-tester.md
│   └── compliance-checker.md
├── skills/                   # Agent Skills
│   ├── code-reviewer/
│   │   └── SKILL.md
│   └── pdf-processor/
│       ├── SKILL.md
│       └── scripts/
├── hooks/                    # Configurações de hook
│   ├── hooks.json           # Configuração de hook principal
│   └── security-hooks.json  # Hooks adicionais
├── .mcp.json                # Definições de servidor MCP
├── .lsp.json                # Configurações de servidor LSP
├── scripts/                 # Scripts de hook e utilitário
│   ├── security-scan.sh
│   ├── format-code.py
│   └── deploy.js
├── LICENSE                  # Arquivo de licença
└── CHANGELOG.md             # Histórico de versão
```

O diretório `.claude-plugin/` contém o arquivo `plugin.json`. Todos os outros diretórios (commands/, agents/, skills/, hooks/) devem estar na raiz do plugin, não dentro de `.claude-plugin/`.

### [​](#referência-de-localizações-de-arquivo) Referência de localizações de arquivo

| Componente | Localização padrão | Propósito |
| --- | --- | --- |
| **Manifesto** | `.claude-plugin/plugin.json` | Arquivo de metadados obrigatório |
| **Comandos** | `commands/` | Arquivos Markdown de comando de barra invertida |
| **Agentes** | `agents/` | Arquivos Markdown de subagenteAgentes |
| **Skills** | `skills/` | Agent Skills com arquivos SKILL.md |
| **Hooks** | `hooks/hooks.json` | Configuração de hook |
| **Servidores MCP** | `.mcp.json` | Definições de servidor MCP |
| **Servidores LSP** | `.lsp.json` | Configurações de servidor de linguagem |

---

[​](#referência-de-comandos-cli) Referência de comandos CLI
-----------------------------------------------------------

Claude Code fornece comandos CLI para gerenciamento de plugin não interativo, útil para scripts e automação.

### [​](#plugin-install) plugin install

Instale um plugin dos marketplaces disponíveis.

Copiar

Perguntar à IA

```
claude plugin install <plugin> [options]
```

**Argumentos:**

* `<plugin>`: Nome do plugin ou `plugin-name@marketplace-name` para um marketplace específico

**Opções:**

| Opção | Descrição | Padrão |
| --- | --- | --- |
| `-s, --scope <scope>` | Escopo de instalação: `user`, `project`, ou `local` | `user` |
| `-h, --help` | Exibir ajuda para comando |  |

**Exemplos:**

Copiar

Perguntar à IA

```
# Instalar no escopo de usuário (padrão)
claude plugin install formatter@my-marketplace

# Instalar no escopo de projeto (compartilhado com equipe)
claude plugin install formatter@my-marketplace --scope project

# Instalar no escopo local (gitignored)
claude plugin install formatter@my-marketplace --scope local
```

### [​](#plugin-uninstall) plugin uninstall

Remova um plugin instalado.

Copiar

Perguntar à IA

```
claude plugin uninstall <plugin> [options]
```

**Argumentos:**

* `<plugin>`: Nome do plugin ou `plugin-name@marketplace-name`

**Opções:**

| Opção | Descrição | Padrão |
| --- | --- | --- |
| `-s, --scope <scope>` | Desinstalar do escopo: `user`, `project`, ou `local` | `user` |
| `-h, --help` | Exibir ajuda para comando |  |

**Aliases:** `remove`, `rm`

### [​](#plugin-enable) plugin enable

Habilite um plugin desabilitado.

Copiar

Perguntar à IA

```
claude plugin enable <plugin> [options]
```

**Argumentos:**

* `<plugin>`: Nome do plugin ou `plugin-name@marketplace-name`

**Opções:**

| Opção | Descrição | Padrão |
| --- | --- | --- |
| `-s, --scope <scope>` | Escopo para habilitar: `user`, `project`, ou `local` | `user` |
| `-h, --help` | Exibir ajuda para comando |  |

### [​](#plugin-disable) plugin disable

Desabilite um plugin sem desinstalá-lo.

Copiar

Perguntar à IA

```
claude plugin disable <plugin> [options]
```

**Argumentos:**

* `<plugin>`: Nome do plugin ou `plugin-name@marketplace-name`

**Opções:**

| Opção | Descrição | Padrão |
| --- | --- | --- |
| `-s, --scope <scope>` | Escopo para desabilitar: `user`, `project`, ou `local` | `user` |
| `-h, --help` | Exibir ajuda para comando |  |

### [​](#plugin-update) plugin update

Atualize um plugin para a versão mais recente.

Copiar

Perguntar à IA

```
claude plugin update <plugin> [options]
```

**Argumentos:**

* `<plugin>`: Nome do plugin ou `plugin-name@marketplace-name`

**Opções:**

| Opção | Descrição | Padrão |
| --- | --- | --- |
| `-s, --scope <scope>` | Escopo para atualizar: `user`, `project`, `local`, ou `managed` | `user` |
| `-h, --help` | Exibir ajuda para comando |  |

---

[​](#ferramentas-de-depuração-e-desenvolvimento) Ferramentas de depuração e desenvolvimento
-------------------------------------------------------------------------------------------

### [​](#comandos-de-depuração) Comandos de depuração

Use `claude --debug` para ver detalhes de carregamento de plugin:

Copiar

Perguntar à IA

```
claude --debug
```

Isso mostra:

* Quais plugins estão sendo carregados
* Quaisquer erros em manifestos de plugin
* Registro de comando, agente e hook
* Inicialização de servidor MCP

### [​](#problemas-comuns) Problemas comuns

| Problema | Causa | Solução |
| --- | --- | --- |
| Plugin não carregando | `plugin.json` inválido | Validar sintaxe JSON com `claude plugin validate` ou `/plugin validate` |
| Comandos não aparecendo | Estrutura de diretório errada | Certifique-se de `commands/` na raiz, não em `.claude-plugin/` |
| Hooks não disparando | Script não executável | Execute `chmod +x script.sh` |
| Falha do servidor MCP | `${CLAUDE_PLUGIN_ROOT}` ausente | Use variável para todos os caminhos de plugin |
| Erros de caminho | Caminhos absolutos usados | Todos os caminhos devem ser relativos e começar com `./` |
| LSP `Executable not found in $PATH` | Servidor de linguagem não instalado | Instale o binário (por exemplo, `npm install -g typescript-language-server typescript`) |

### [​](#exemplos-de-mensagens-de-erro) Exemplos de mensagens de erro

**Erros de validação de manifesto**:

* `Invalid JSON syntax: Unexpected token } in JSON at position 142`: verifique se há vírgulas ausentes, vírgulas extras ou strings não citadas
* `Plugin has an invalid manifest file at .claude-plugin/plugin.json. Validation errors: name: Required`: um campo obrigatório está faltando
* `Plugin has a corrupt manifest file at .claude-plugin/plugin.json. JSON parse error: ...`: erro de sintaxe JSON

**Erros de carregamento de plugin**:

* `Warning: No commands found in plugin my-plugin custom directory: ./cmds. Expected .md files or SKILL.md in subdirectories.`: caminho de comando existe mas não contém arquivos de comando válidos
* `Plugin directory not found at path: ./plugins/my-plugin. Check that the marketplace entry has the correct path.`: o caminho `source` em marketplace.json aponta para um diretório inexistente
* `Plugin my-plugin has conflicting manifests: both plugin.json and marketplace entry specify components.`: remova definições de componente duplicadas ou defina `strict: true` na entrada do marketplace

### [​](#solução-de-problemas-de-hook) Solução de problemas de hook

**Script de hook não executando**:

1. Verifique se o script é executável: `chmod +x ./scripts/your-script.sh`
2. Verifique a linha shebang: A primeira linha deve ser `#!/bin/bash` ou `#!/usr/bin/env bash`
3. Verifique se o caminho usa `${CLAUDE_PLUGIN_ROOT}`: `"command": "${CLAUDE_PLUGIN_ROOT}/scripts/your-script.sh"`
4. Teste o script manualmente: `./scripts/your-script.sh`

**Hook não disparando em eventos esperados**:

1. Verifique se o nome do evento está correto (sensível a maiúsculas): `PostToolUse`, não `postToolUse`
2. Verifique se o padrão de correspondência corresponde às suas ferramentas: `"matcher": "Write|Edit"` para operações de arquivo
3. Confirme se o tipo de hook é válido: `command`, `prompt`, ou `agent`

### [​](#solução-de-problemas-de-servidor-mcp) Solução de problemas de servidor MCP

**Servidor não iniciando**:

1. Verifique se o comando existe e é executável
2. Verifique se todos os caminhos usam a variável `${CLAUDE_PLUGIN_ROOT}`
3. Verifique os logs do servidor MCP: `claude --debug` mostra erros de inicialização
4. Teste o servidor manualmente fora do Claude Code

**Ferramentas do servidor não aparecendo**:

1. Certifique-se de que o servidor está configurado corretamente em `.mcp.json` ou `plugin.json`
2. Verifique se o servidor implementa o protocolo MCP corretamente
3. Verifique se há timeouts de conexão na saída de depuração

### [​](#erros-de-estrutura-de-diretório) Erros de estrutura de diretório

**Sintomas**: Plugin carrega mas componentes (comandos, agentes, hooks) estão faltando.
**Estrutura correta**: Componentes devem estar na raiz do plugin, não dentro de `.claude-plugin/`. Apenas `plugin.json` pertence a `.claude-plugin/`.

Copiar

Perguntar à IA

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      ← Apenas manifesto aqui
├── commands/            ← No nível raiz
├── agents/              ← No nível raiz
└── hooks/               ← No nível raiz
```

Se seus componentes estão dentro de `.claude-plugin/`, mova-os para a raiz do plugin.
**Checklist de depuração**:

1. Execute `claude --debug` e procure por mensagens “loading plugin”
2. Verifique se cada diretório de componente está listado na saída de depuração
3. Verifique se as permissões de arquivo permitem ler os arquivos do plugin

---

[​](#referência-de-distribuição-e-versionamento) Referência de distribuição e versionamento
-------------------------------------------------------------------------------------------

### [​](#gerenciamento-de-versão) Gerenciamento de versão

Siga o versionamento semântico para lançamentos de plugin:

Copiar

Perguntar à IA

```
{
  "name": "my-plugin",
  "version": "2.1.0"
}
```

**Formato de versão**: `MAJOR.MINOR.PATCH`

* **MAJOR**: Mudanças de quebra (mudanças de API incompatíveis)
* **MINOR**: Novos recursos (adições compatíveis com versões anteriores)
* **PATCH**: Correções de bugs (correções compatíveis com versões anteriores)

**Melhores práticas**:

* Comece em `1.0.0` para seu primeiro lançamento estável
* Atualize a versão em `plugin.json` antes de distribuir alterações
* Documente as alterações em um arquivo `CHANGELOG.md`
* Use versões de pré-lançamento como `2.0.0-beta.1` para testes

---

[​](#veja-também) Veja também
-----------------------------

* [Plugins](/docs/pt/plugins) - Tutoriais e uso prático
* [Marketplaces de plugins](/docs/pt/plugin-marketplaces) - Criando e gerenciando marketplaces
* [Comandos de barra invertida](/docs/pt/slash-commands) - Detalhes de desenvolvimento de comando
* [Subagentos](/docs/pt/sub-agents) - Configuração e capacidades de agente
* [Agent Skills](/docs/pt/skills) - Estender as capacidades do Claude
* [Hooks](/docs/pt/hooks) - Manipulação de eventos e automação
* [MCP](/docs/pt/mcp) - Integração de ferramenta externa
* [Configurações](/docs/pt/settings) - Opções de configuração para plugins