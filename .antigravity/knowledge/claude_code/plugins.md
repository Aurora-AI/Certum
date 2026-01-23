# https://code.claude.com/docs/pt/plugins

Plugins permitem estender Claude Code com funcionalidade personalizada que pode ser compartilhada entre projetos e equipes. Este guia aborda a criação de seus próprios plugins com comandos de barra, agentes, Skills, hooks e servidores MCP.
Procurando instalar plugins existentes? Veja [Descobrir e instalar plugins](/docs/pt/discover-plugins). Para especificações técnicas completas, veja [Referência de plugins](/docs/pt/plugins-reference).

[​](#quando-usar-plugins-vs-configuração-autônoma) Quando usar plugins vs configuração autônoma
-----------------------------------------------------------------------------------------------

Claude Code suporta duas maneiras de adicionar comandos de barra personalizados, agentes e hooks:

| Abordagem | Nomes de comando de barra | Melhor para |
| --- | --- | --- |
| **Autônoma** (diretório `.claude/`) | `/hello` | Fluxos de trabalho pessoais, personalizações específicas do projeto, experimentos rápidos |
| **Plugins** (diretórios com `.claude-plugin/plugin.json`) | `/plugin-name:hello` | Compartilhamento com colegas de equipe, distribuição para comunidade, lançamentos versionados, reutilizável em projetos |

**Use configuração autônoma quando**:

* Você está personalizando Claude Code para um único projeto
* A configuração é pessoal e não precisa ser compartilhada
* Você está experimentando com comandos de barra ou hooks antes de empacotá-los
* Você quer nomes de comando de barra curtos como `/hello` ou `/review`

**Use plugins quando**:

* Você quer compartilhar funcionalidade com sua equipe ou comunidade
* Você precisa dos mesmos comandos de barra/agentes em vários projetos
* Você quer controle de versão e atualizações fáceis para suas extensões
* Você está distribuindo através de um marketplace
* Você está bem com comandos de barra com namespace como `/my-plugin:hello` (namespacing previne conflitos entre plugins)

Comece com configuração autônoma em `.claude/` para iteração rápida, depois [converta para um plugin](#convert-existing-configurations-to-plugins) quando estiver pronto para compartilhar.

[​](#início-rápido) Início rápido
---------------------------------

Este início rápido o guia através da criação de um plugin com um comando de barra personalizado. Você criará um manifesto (o arquivo de configuração que define seu plugin), adicionará um comando de barra e o testará localmente usando a flag `--plugin-dir`.

### [​](#pré-requisitos) Pré-requisitos

* Claude Code [instalado e autenticado](/docs/pt/quickstart#step-1-install-claude-code)
* Claude Code versão 1.0.33 ou posterior (execute `claude --version` para verificar)

Se você não vir o comando `/plugin`, atualize Claude Code para a versão mais recente. Veja [Solução de problemas](/docs/pt/troubleshooting) para instruções de atualização.

### [​](#crie-seu-primeiro-plugin) Crie seu primeiro plugin

1

Crie o diretório do plugin

Cada plugin vive em seu próprio diretório contendo um manifesto e seus comandos, agentes ou hooks personalizados. Crie um agora:

Copiar

Perguntar à IA

```
mkdir my-first-plugin
```

2

Crie o manifesto do plugin

O arquivo manifesto em `.claude-plugin/plugin.json` define a identidade do seu plugin: seu nome, descrição e versão. Claude Code usa esses metadados para exibir seu plugin no gerenciador de plugins.Crie o diretório `.claude-plugin` dentro da pasta do seu plugin:

Copiar

Perguntar à IA

```
mkdir my-first-plugin/.claude-plugin
```

Depois crie `my-first-plugin/.claude-plugin/plugin.json` com este conteúdo:

my-first-plugin/.claude-plugin/plugin.json

Copiar

Perguntar à IA

```
{
"name": "my-first-plugin",
"description": "A greeting plugin to learn the basics",
"version": "1.0.0",
"author": {
"name": "Your Name"
}
}
```

| Campo | Propósito |
| --- | --- |
| `name` | Identificador único e namespace de comando de barra. Comandos de barra são prefixados com isso (por exemplo, `/my-first-plugin:hello`). |
| `description` | Mostrado no gerenciador de plugins ao navegar ou instalar plugins. |
| `version` | Rastreie lançamentos usando [versionamento semântico](/docs/pt/plugins-reference#version-management). |
| `author` | Opcional. Útil para atribuição. |

Para campos adicionais como `homepage`, `repository` e `license`, veja o [esquema de manifesto completo](/docs/pt/plugins-reference#plugin-manifest-schema).

3

Adicione um comando de barra

Comandos de barra são arquivos Markdown no diretório `commands/`. O nome do arquivo se torna o nome do comando de barra, prefixado com o namespace do plugin (`hello.md` em um plugin chamado `my-first-plugin` cria `/my-first-plugin:hello`). O conteúdo Markdown diz ao Claude como responder quando alguém executa o comando de barra.Crie um diretório `commands` na pasta do seu plugin:

Copiar

Perguntar à IA

```
mkdir my-first-plugin/commands
```

Depois crie `my-first-plugin/commands/hello.md` com este conteúdo:

my-first-plugin/commands/hello.md

Copiar

Perguntar à IA

```
---
description: Greet the user with a friendly message
---

# Hello Command

Greet the user warmly and ask how you can help them today.
```

4

Teste seu plugin

Execute Claude Code com a flag `--plugin-dir` para carregar seu plugin:

Copiar

Perguntar à IA

```
claude --plugin-dir ./my-first-plugin
```

Assim que Claude Code iniciar, tente seu novo comando:

Copiar

Perguntar à IA

```
/my-first-plugin:hello
```

Você verá Claude responder com uma saudação. Execute `/help` para ver seu comando listado sob o namespace do plugin.

**Por que namespacing?** Comandos de barra de plugin são sempre com namespace (como `/greet:hello`) para prevenir conflitos quando vários plugins têm comandos com o mesmo nome.Para alterar o prefixo de namespace, atualize o campo `name` em `plugin.json`.

5

Adicione argumentos de comando de barra

Torne seu comando de barra dinâmico aceitando entrada do usuário. O placeholder `$ARGUMENTS` captura qualquer texto que o usuário fornece após o comando de barra.Atualize seu arquivo `hello.md`:

my-first-plugin/commands/hello.md

Copiar

Perguntar à IA

```
---
description: Greet the user with a personalized message
---

# Hello Command

Greet the user named "$ARGUMENTS" warmly and ask how you can help them today. Make the greeting personal and encouraging.
```

Reinicie Claude Code para pegar as mudanças, depois tente o comando com seu nome:

Copiar

Perguntar à IA

```
/my-first-plugin:hello Alex
```

Claude o saudará pelo nome. Para mais opções de argumentos como `$1`, `$2` para parâmetros individuais, veja [Comandos de barra](/docs/pt/slash-commands).

Você criou e testou com sucesso um plugin com estes componentes-chave:

* **Manifesto do plugin** (`.claude-plugin/plugin.json`): descreve os metadados do seu plugin
* **Diretório de comandos** (`commands/`): contém seus comandos de barra personalizados
* **Argumentos de comando** (`$ARGUMENTS`): captura entrada do usuário para comportamento dinâmico

A flag `--plugin-dir` é útil para desenvolvimento e testes. Quando estiver pronto para compartilhar seu plugin com outros, veja [Criar e distribuir um marketplace de plugins](/docs/pt/plugin-marketplaces).

[​](#visão-geral-da-estrutura-do-plugin) Visão geral da estrutura do plugin
---------------------------------------------------------------------------

Você criou um plugin com um comando de barra, mas plugins podem incluir muito mais: agentes personalizados, Skills, hooks, servidores MCP e servidores LSP.

**Erro comum**: Não coloque `commands/`, `agents/`, `skills/` ou `hooks/` dentro do diretório `.claude-plugin/`. Apenas `plugin.json` vai dentro de `.claude-plugin/`. Todos os outros diretórios devem estar no nível raiz do plugin.

| Diretório | Localização | Propósito |
| --- | --- | --- |
| `.claude-plugin/` | Raiz do plugin | Contém apenas manifesto `plugin.json` (obrigatório) |
| `commands/` | Raiz do plugin | Comandos de barra como arquivos Markdown |
| `agents/` | Raiz do plugin | Definições de agente personalizadas |
| `skills/` | Raiz do plugin | Agent Skills com arquivos `SKILL.md` |
| `hooks/` | Raiz do plugin | Manipuladores de eventos em `hooks.json` |
| `.mcp.json` | Raiz do plugin | Configurações de servidor MCP |
| `.lsp.json` | Raiz do plugin | Configurações de servidor LSP para inteligência de código |

**Próximos passos**: Pronto para adicionar mais recursos? Pule para [Desenvolver plugins mais complexos](#develop-more-complex-plugins) para adicionar agentes, hooks, servidores MCP e servidores LSP. Para especificações técnicas completas de todos os componentes do plugin, veja [Referência de plugins](/docs/pt/plugins-reference).

[​](#desenvolver-plugins-mais-complexos) Desenvolver plugins mais complexos
---------------------------------------------------------------------------

Assim que você se sentir confortável com plugins básicos, você pode criar extensões mais sofisticadas.

### [​](#adicione-skills-ao-seu-plugin) Adicione Skills ao seu plugin

Plugins podem incluir [Agent Skills](/docs/pt/skills) para estender as capacidades do Claude. Skills são invocadas pelo modelo: Claude as usa automaticamente com base no contexto da tarefa.
Adicione um diretório `skills/` na raiz do seu plugin com pastas de Skill contendo arquivos `SKILL.md`:

Copiar

Perguntar à IA

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── code-review/
        └── SKILL.md
```

Cada `SKILL.md` precisa de frontmatter com campos `name` e `description`, seguido de instruções:

Copiar

Perguntar à IA

```
---
name: code-review
description: Reviews code for best practices and potential issues. Use when reviewing code, checking PRs, or analyzing code quality.
---

When reviewing code, check for:
1. Code organization and structure
2. Error handling
3. Security concerns
4. Test coverage
```

Após instalar o plugin, reinicie Claude Code para carregar as Skills. Para orientação completa de autoria de Skill incluindo divulgação progressiva e restrições de ferramenta, veja [Agent Skills](/docs/pt/skills).

### [​](#adicione-servidores-lsp-ao-seu-plugin) Adicione servidores LSP ao seu plugin

Para linguagens comuns como TypeScript, Python e Rust, instale os plugins LSP pré-construídos do marketplace oficial. Crie plugins LSP personalizados apenas quando você precisar de suporte para linguagens que ainda não estão cobertas.

Plugins LSP (Language Server Protocol) dão ao Claude inteligência de código em tempo real. Se você precisar suportar uma linguagem que não tem um plugin LSP oficial, você pode criar o seu próprio adicionando um arquivo `.lsp.json` ao seu plugin:

.lsp.json

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

Usuários que instalam seu plugin devem ter o binário do servidor de linguagem instalado em sua máquina.
Para opções de configuração LSP completas, veja [Servidores LSP](/docs/pt/plugins-reference#lsp-servers).

### [​](#organize-plugins-complexos) Organize plugins complexos

Para plugins com muitos componentes, organize sua estrutura de diretório por funcionalidade. Para layouts de diretório completos e padrões de organização, veja [Estrutura de diretório do plugin](/docs/pt/plugins-reference#plugin-directory-structure).

### [​](#teste-seus-plugins-localmente) Teste seus plugins localmente

Use a flag `--plugin-dir` para testar plugins durante o desenvolvimento. Isso carrega seu plugin diretamente sem exigir instalação.

Copiar

Perguntar à IA

```
claude --plugin-dir ./my-plugin
```

Conforme você faz mudanças no seu plugin, reinicie Claude Code para pegar as atualizações. Teste seus componentes de plugin:

* Tente seus comandos com `/command-name`
* Verifique que agentes aparecem em `/agents`
* Verifique que hooks funcionam conforme esperado

Você pode carregar vários plugins de uma vez especificando a flag várias vezes:

Copiar

Perguntar à IA

```
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

### [​](#depure-problemas-de-plugin) Depure problemas de plugin

Se seu plugin não está funcionando conforme esperado:

1. **Verifique a estrutura**: Certifique-se de que seus diretórios estão na raiz do plugin, não dentro de `.claude-plugin/`
2. **Teste componentes individualmente**: Verifique cada comando, agente e hook separadamente
3. **Use ferramentas de validação e depuração**: Veja [Ferramentas de depuração e desenvolvimento](/docs/pt/plugins-reference#debugging-and-development-tools) para comandos CLI e técnicas de solução de problemas

### [​](#compartilhe-seus-plugins) Compartilhe seus plugins

Quando seu plugin estiver pronto para compartilhar:

1. **Adicione documentação**: Inclua um `README.md` com instruções de instalação e uso
2. **Versione seu plugin**: Use [versionamento semântico](/docs/pt/plugins-reference#version-management) em seu `plugin.json`
3. **Crie ou use um marketplace**: Distribua através de [marketplaces de plugins](/docs/pt/plugin-marketplaces) para instalação
4. **Teste com outros**: Tenha membros da equipe testarem o plugin antes de distribuição mais ampla

Assim que seu plugin estiver em um marketplace, outros poderão instalá-lo usando as instruções em [Descobrir e instalar plugins](/docs/pt/discover-plugins).

Para especificações técnicas completas, técnicas de depuração e estratégias de distribuição, veja [Referência de plugins](/docs/pt/plugins-reference).

[​](#converter-configurações-existentes-em-plugins) Converter configurações existentes em plugins
-------------------------------------------------------------------------------------------------

Se você já tem comandos personalizados, Skills ou hooks em seu diretório `.claude/`, você pode convertê-los em um plugin para compartilhamento e distribuição mais fáceis.

### [​](#etapas-de-migração) Etapas de migração

1

Crie a estrutura do plugin

Crie um novo diretório de plugin:

Copiar

Perguntar à IA

```
mkdir -p my-plugin/.claude-plugin
```

Crie o arquivo de manifesto em `my-plugin/.claude-plugin/plugin.json`:

my-plugin/.claude-plugin/plugin.json

Copiar

Perguntar à IA

```
{
  "name": "my-plugin",
  "description": "Migrated from standalone configuration",
  "version": "1.0.0"
}
```

2

Copie seus arquivos existentes

Copie suas configurações existentes para o diretório do plugin:

Copiar

Perguntar à IA

```
# Copy commands
cp -r .claude/commands my-plugin/

# Copy agents (if any)
cp -r .claude/agents my-plugin/

# Copy skills (if any)
cp -r .claude/skills my-plugin/
```

3

Migre hooks

Se você tem hooks em suas configurações, crie um diretório de hooks:

Copiar

Perguntar à IA

```
mkdir my-plugin/hooks
```

Crie `my-plugin/hooks/hooks.json` com sua configuração de hooks. Copie o objeto `hooks` de seu `.claude/settings.json` ou `settings.local.json`—o formato é o mesmo:

my-plugin/hooks/hooks.json

Copiar

Perguntar à IA

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "npm run lint:fix $FILE" }]
      }
    ]
  }
}
```

4

Teste seu plugin migrado

Carregue seu plugin para verificar se tudo funciona:

Copiar

Perguntar à IA

```
claude --plugin-dir ./my-plugin
```

Teste cada componente: execute seus comandos, verifique que agentes aparecem em `/agents` e verifique que hooks disparam corretamente.

### [​](#o-que-muda-ao-migrar) O que muda ao migrar

| Autônoma (`.claude/`) | Plugin |
| --- | --- |
| Disponível apenas em um projeto | Pode ser compartilhado via marketplaces |
| Arquivos em `.claude/commands/` | Arquivos em `plugin-name/commands/` |
| Hooks em `settings.json` | Hooks em `hooks/hooks.json` |
| Deve copiar manualmente para compartilhar | Instale com `/plugin install` |

Após migrar, você pode remover os arquivos originais de `.claude/` para evitar duplicatas. A versão do plugin terá precedência quando carregada.

[​](#próximos-passos) Próximos passos
-------------------------------------

Agora que você entende o sistema de plugins do Claude Code, aqui estão caminhos sugeridos para diferentes objetivos:

### [​](#para-usuários-de-plugins) Para usuários de plugins

* [Descobrir e instalar plugins](/docs/pt/discover-plugins): navegue em marketplaces e instale plugins
* [Configurar marketplaces de equipe](/docs/pt/discover-plugins#configure-team-marketplaces): configure plugins em nível de repositório para sua equipe

### [​](#para-desenvolvedores-de-plugins) Para desenvolvedores de plugins

* [Criar e distribuir um marketplace](/docs/pt/plugin-marketplaces): empacote e compartilhe seus plugins
* [Referência de plugins](/docs/pt/plugins-reference): especificações técnicas completas
* Aprofunde-se em componentes específicos do plugin:
  + [Comandos de barra](/docs/pt/slash-commands): detalhes de desenvolvimento de comando
  + [Subagentes](/docs/pt/sub-agents): configuração e capacidades de agente
  + [Agent Skills](/docs/pt/skills): estenda as capacidades do Claude
  + [Hooks](/docs/pt/hooks): manipulação de eventos e automação
  + [MCP](/docs/pt/mcp): integração de ferramenta externa