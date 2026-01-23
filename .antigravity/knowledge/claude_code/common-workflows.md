# https://code.claude.com/docs/pt/common-workflows#use-plan-mode-for-safe-code-analysis

Cada tarefa neste documento inclui instruções claras, comandos de exemplo e melhores práticas para ajudá-lo a aproveitar ao máximo o Claude Code.

[​](#entender-novas-bases-de-código) Entender novas bases de código
-------------------------------------------------------------------

### [​](#obter-uma-visão-geral-rápida-da-base-de-código) Obter uma visão geral rápida da base de código

Suponha que você acabou de ingressar em um novo projeto e precisa entender sua estrutura rapidamente.

1

Navegue até o diretório raiz do projeto

Copiar

Perguntar à IA

```
cd /path/to/project
```

2

Inicie o Claude Code

Copiar

Perguntar à IA

```
claude
```

3

Peça uma visão geral de alto nível

Copiar

Perguntar à IA

```
> give me an overview of this codebase
```

4

Aprofunde-se em componentes específicos

Copiar

Perguntar à IA

```
> explain the main architecture patterns used here
```

Copiar

Perguntar à IA

```
> what are the key data models?
```

Copiar

Perguntar à IA

```
> how is authentication handled?
```

Dicas:

* Comece com perguntas amplas e depois estreite para áreas específicas
* Pergunte sobre convenções de codificação e padrões usados no projeto
* Solicite um glossário de termos específicos do projeto

### [​](#encontrar-código-relevante) Encontrar código relevante

Suponha que você precise localizar código relacionado a um recurso ou funcionalidade específica.

1

Peça ao Claude para encontrar arquivos relevantes

Copiar

Perguntar à IA

```
> find the files that handle user authentication
```

2

Obtenha contexto sobre como os componentes interagem

Copiar

Perguntar à IA

```
> how do these authentication files work together?
```

3

Entenda o fluxo de execução

Copiar

Perguntar à IA

```
> trace the login process from front-end to database
```

Dicas:

* Seja específico sobre o que você está procurando
* Use linguagem de domínio do projeto

---

[​](#corrigir-bugs-com-eficiência) Corrigir bugs com eficiência
---------------------------------------------------------------

Suponha que você tenha encontrado uma mensagem de erro e precise encontrar e corrigir sua origem.

1

Compartilhe o erro com Claude

Copiar

Perguntar à IA

```
> I'm seeing an error when I run npm test
```

2

Peça recomendações de correção

Copiar

Perguntar à IA

```
> suggest a few ways to fix the @ts-ignore in user.ts
```

3

Aplique a correção

Copiar

Perguntar à IA

```
> update user.ts to add the null check you suggested
```

Dicas:

* Diga ao Claude o comando para reproduzir o problema e obter um rastreamento de pilha
* Mencione quaisquer etapas para reproduzir o erro
* Deixe Claude saber se o erro é intermitente ou consistente

---

[​](#refatorar-código) Refatorar código
---------------------------------------

Suponha que você precise atualizar código antigo para usar padrões e práticas modernas.

1

Identifique código legado para refatoração

Copiar

Perguntar à IA

```
> find deprecated API usage in our codebase
```

2

Obtenha recomendações de refatoração

Copiar

Perguntar à IA

```
> suggest how to refactor utils.js to use modern JavaScript features
```

3

Aplique as mudanças com segurança

Copiar

Perguntar à IA

```
> refactor utils.js to use ES2024 features while maintaining the same behavior
```

4

Verifique a refatoração

Copiar

Perguntar à IA

```
> run tests for the refactored code
```

Dicas:

* Peça ao Claude para explicar os benefícios da abordagem moderna
* Solicite que as mudanças mantenham compatibilidade com versões anteriores quando necessário
* Faça refatoração em pequenos incrementos testáveis

---

[​](#usar-subagentos-especializados) Usar subagentos especializados
-------------------------------------------------------------------

Suponha que você queira usar subagentos de IA especializados para lidar com tarefas específicas de forma mais eficaz.

1

Visualize subagentos disponíveis

Copiar

Perguntar à IA

```
> /agents
```

Isso mostra todos os subagentos disponíveis e permite que você crie novos.

2

Use subagentos automaticamente

Claude Code delega automaticamente tarefas apropriadas para subagentos especializados:

Copiar

Perguntar à IA

```
> review my recent code changes for security issues
```

Copiar

Perguntar à IA

```
> run all tests and fix any failures
```

3

Solicite explicitamente subagentos específicos

Copiar

Perguntar à IA

```
> use the code-reviewer subagent to check the auth module
```

Copiar

Perguntar à IA

```
> have the debugger subagent investigate why users can't log in
```

4

Crie subagentos personalizados para seu fluxo de trabalho

Copiar

Perguntar à IA

```
> /agents
```

Em seguida, selecione “Create New subagent” e siga os prompts para definir:

* Um identificador único que descreve o propósito do subagentos (por exemplo, `code-reviewer`, `api-designer`).
* Quando Claude deve usar este agente
* Quais ferramentas ele pode acessar
* Um prompt do sistema descrevendo o papel e comportamento do agente

Dicas:

* Crie subagentos específicos do projeto em `.claude/agents/` para compartilhamento em equipe
* Use campos `description` descritivos para permitir delegação automática
* Limite o acesso a ferramentas ao que cada subagentos realmente precisa
* Verifique a [documentação de subagentos](/docs/pt/sub-agents) para exemplos detalhados

---

[​](#usar-plan-mode-para-análise-segura-de-código) Usar Plan Mode para análise segura de código
-----------------------------------------------------------------------------------------------

Plan Mode instrui Claude a criar um plano analisando a base de código com operações somente leitura, perfeito para explorar bases de código, planejar mudanças complexas ou revisar código com segurança.

### [​](#quando-usar-plan-mode) Quando usar Plan Mode

* **Implementação em várias etapas**: Quando seu recurso requer fazer edições em muitos arquivos
* **Exploração de código**: Quando você quer pesquisar a base de código completamente antes de mudar qualquer coisa
* **Desenvolvimento interativo**: Quando você quer iterar sobre a direção com Claude

### [​](#como-usar-plan-mode) Como usar Plan Mode

**Ative Plan Mode durante uma sessão**
Você pode mudar para Plan Mode durante uma sessão usando **Shift+Tab** para percorrer os modos de permissão.
Se você estiver em Normal Mode, **Shift+Tab** primeiro muda para Auto-Accept Mode, indicado por `⏵⏵ accept edits on` na parte inferior do terminal. Um **Shift+Tab** subsequente mudará para Plan Mode, indicado por `⏸ plan mode on`.
**Inicie uma nova sessão em Plan Mode**
Para iniciar uma nova sessão em Plan Mode, use a flag `--permission-mode plan`:

Copiar

Perguntar à IA

```
claude --permission-mode plan
```

**Execute consultas “headless” em Plan Mode**
Você também pode executar uma consulta em Plan Mode diretamente com `-p` (ou seja, em [“modo headless”](/docs/pt/headless)):

Copiar

Perguntar à IA

```
claude --permission-mode plan -p "Analyze the authentication system and suggest improvements"
```

### [​](#exemplo:-planejando-uma-refatoração-complexa) Exemplo: Planejando uma refatoração complexa

Copiar

Perguntar à IA

```
claude --permission-mode plan
```

Copiar

Perguntar à IA

```
> I need to refactor our authentication system to use OAuth2. Create a detailed migration plan.
```

Claude analisa a implementação atual e cria um plano abrangente. Refine com acompanhamentos:

Copiar

Perguntar à IA

```
> What about backward compatibility?
> How should we handle database migration?
```

### [​](#configure-plan-mode-como-padrão) Configure Plan Mode como padrão

Copiar

Perguntar à IA

```
// .claude/settings.json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

Veja a [documentação de configurações](/docs/pt/settings#available-settings) para mais opções de configuração.


---

[​](#trabalhar-com-testes) Trabalhar com testes
-----------------------------------------------

Suponha que você precise adicionar testes para código não coberto.

1

Identifique código não testado

Copiar

Perguntar à IA

```
> find functions in NotificationsService.swift that are not covered by tests
```

2

Gere scaffolding de teste

Copiar

Perguntar à IA

```
> add tests for the notification service
```

3

Adicione casos de teste significativos

Copiar

Perguntar à IA

```
> add test cases for edge conditions in the notification service
```

4

Execute e verifique os testes

Copiar

Perguntar à IA

```
> run the new tests and fix any failures
```

Claude pode gerar testes que seguem os padrões e convenções existentes do seu projeto. Ao solicitar testes, seja específico sobre qual comportamento você quer verificar. Claude examina seus arquivos de teste existentes para corresponder ao estilo, frameworks e padrões de asserção já em uso.
Para cobertura abrangente, peça ao Claude para identificar casos extremos que você pode ter perdido. Claude pode analisar seus caminhos de código e sugerir testes para condições de erro, valores de limite e entradas inesperadas que são fáceis de negligenciar.


---

[​](#criar-pull-requests) Criar pull requests
---------------------------------------------

Suponha que você precise criar uma pull request bem documentada para suas mudanças.

1

Resuma suas mudanças

Copiar

Perguntar à IA

```
> summarize the changes I've made to the authentication module
```

2

Gere uma pull request com Claude

Copiar

Perguntar à IA

```
> create a pr
```

3

Revise e refine

Copiar

Perguntar à IA

```
> enhance the PR description with more context about the security improvements
```

4

Adicione detalhes de teste

Copiar

Perguntar à IA

```
> add information about how these changes were tested
```

Dicas:

* Peça ao Claude diretamente para fazer uma PR para você
* Revise a PR gerada por Claude antes de enviar
* Peça ao Claude para destacar riscos potenciais ou considerações

[​](#lidar-com-documentação) Lidar com documentação
---------------------------------------------------

Suponha que você precise adicionar ou atualizar documentação para seu código.

1

Identifique código não documentado

Copiar

Perguntar à IA

```
> find functions without proper JSDoc comments in the auth module
```

2

Gere documentação

Copiar

Perguntar à IA

```
> add JSDoc comments to the undocumented functions in auth.js
```

3

Revise e melhore

Copiar

Perguntar à IA

```
> improve the generated documentation with more context and examples
```

4

Verifique a documentação

Copiar

Perguntar à IA

```
> check if the documentation follows our project standards
```

Dicas:

* Especifique o estilo de documentação que você deseja (JSDoc, docstrings, etc.)
* Peça por exemplos na documentação
* Solicite documentação para APIs públicas, interfaces e lógica complexa

---

[​](#trabalhar-com-imagens) Trabalhar com imagens
-------------------------------------------------

Suponha que você precise trabalhar com imagens em sua base de código e queira ajuda do Claude para analisar o conteúdo da imagem.

1

Adicione uma imagem à conversa

Você pode usar qualquer um destes métodos:

1. Arraste e solte uma imagem na janela do Claude Code
2. Copie uma imagem e cole-a no CLI com ctrl+v (Não use cmd+v)
3. Forneça um caminho de imagem ao Claude. Por exemplo, “Analyze this image: /path/to/your/image.png”

2

Peça ao Claude para analisar a imagem

Copiar

Perguntar à IA

```
> What does this image show?
```

Copiar

Perguntar à IA

```
> Describe the UI elements in this screenshot
```

Copiar

Perguntar à IA

```
> Are there any problematic elements in this diagram?
```

3

Use imagens para contexto

Copiar

Perguntar à IA

```
> Here's a screenshot of the error. What's causing it?
```

Copiar

Perguntar à IA

```
> This is our current database schema. How should we modify it for the new feature?
```

4

Obtenha sugestões de código do conteúdo visual

Copiar

Perguntar à IA

```
> Generate CSS to match this design mockup
```

Copiar

Perguntar à IA

```
> What HTML structure would recreate this component?
```

Dicas:

* Use imagens quando descrições de texto seriam pouco claras ou complicadas
* Inclua capturas de tela de erros, designs de UI ou diagramas para melhor contexto
* Você pode trabalhar com múltiplas imagens em uma conversa
* A análise de imagem funciona com diagramas, capturas de tela, mockups e muito mais
* Quando Claude referencia imagens (por exemplo, `[Image #1]`), `Cmd+Click` (Mac) ou `Ctrl+Click` (Windows/Linux) o link para abrir a imagem no seu visualizador padrão

---

[​](#referenciar-arquivos-e-diretórios) Referenciar arquivos e diretórios
-------------------------------------------------------------------------

Use @ para incluir rapidamente arquivos ou diretórios sem esperar que Claude os leia.

1

Referencie um único arquivo

Copiar

Perguntar à IA

```
> Explain the logic in @src/utils/auth.js
```

Isso inclui o conteúdo completo do arquivo na conversa.

2

Referencie um diretório

Copiar

Perguntar à IA

```
> What's the structure of @src/components?
```

Isso fornece uma listagem de diretório com informações de arquivo.

3

Referencie recursos MCP

Copiar

Perguntar à IA

```
> Show me the data from @github:repos/owner/repo/issues
```

Isso busca dados de servidores MCP conectados usando o formato @server:resource. Veja [recursos MCP](/docs/pt/mcp#use-mcp-resources) para detalhes.

Dicas:

* Os caminhos de arquivo podem ser relativos ou absolutos
* Referências de arquivo @ adicionam `CLAUDE.md` no diretório do arquivo e diretórios pai ao contexto
* Referências de diretório mostram listagens de arquivo, não conteúdos
* Você pode referenciar múltiplos arquivos em uma única mensagem (por exemplo, “@file1.js and @file2.js”)

---

[​](#usar-pensamento-estendido-modo-de-pensamento) Usar pensamento estendido (modo de pensamento)
-------------------------------------------------------------------------------------------------

[Pensamento estendido](https://docs.claude.com/en/docs/build-with-claude/extended-thinking) reserva uma parte do orçamento total de token de saída para Claude raciocinar através de problemas complexos passo a passo. Este raciocínio é visível em modo verboso, que você pode ativar com `Ctrl+O`.
O pensamento estendido é particularmente valioso para decisões arquitetônicas complexas, bugs desafiadores, planejamento de implementação em várias etapas e avaliação de compensações entre diferentes abordagens. Ele fornece mais espaço para explorar múltiplas soluções, analisar casos extremos e autocorrigir erros.

Sonnet 4.5 e Opus 4.5 têm pensamento ativado por padrão. Todos os outros modelos têm pensamento desativado por padrão. Use `/model` para visualizar ou mudar seu modelo atual.

Você pode configurar o modo de pensamento para Claude Code de várias maneiras:

| Escopo | Como ativar | Detalhes |
| --- | --- | --- |
| **Atalho de alternância** | Pressione `Option+T` (macOS) ou `Alt+T` (Windows/Linux) | Alterna pensamento ligado/desligado. Pode exigir [configuração de terminal](/docs/pt/terminal-config) para ativar atalhos de tecla Option |
| **Padrão global** | Use `/config` para ativar o modo de pensamento | Define seu padrão em todos os projetos. Salvo como `alwaysThinkingEnabled` em `~/.claude/settings.json` |
| **Substituição de variável de ambiente** | Defina a variável de ambiente [`MAX_THINKING_TOKENS`](/docs/pt/settings#environment-variables) | Quando definido, aplica um orçamento de token personalizado a todas as solicitações, substituindo sua configuração de modo de pensamento. Exemplo: `export MAX_THINKING_TOKENS=1024` |

### [​](#pensamento-por-solicitação-com-ultrathink) Pensamento por solicitação com `ultrathink`

Você pode incluir `ultrathink` como uma palavra-chave em sua mensagem para ativar o pensamento para uma única solicitação:

Copiar

Perguntar à IA

```
> ultrathink: design a caching layer for our API
```

Observe que `ultrathink` aloca o orçamento de pensamento E sinalizando semanticamente ao Claude para raciocinar mais completamente, o que pode resultar em pensamento mais profundo do que necessário para sua tarefa.
A palavra-chave `ultrathink` só funciona quando `MAX_THINKING_TOKENS` não está definido. Quando `MAX_THINKING_TOKENS` está configurado, ele tem prioridade e controla o orçamento de pensamento para todas as solicitações.
Outras frases como “think”, “think hard” e “think more” são interpretadas como instruções de prompt regular e não alocam tokens de pensamento.
Para visualizar o processo de pensamento do Claude, pressione `Ctrl+O` para ativar o modo verboso e veja o raciocínio interno exibido como texto em itálico cinzento.
Veja a [seção de orçamento de token abaixo](#how-extended-thinking-token-budgets-work) para informações detalhadas de orçamento e implicações de custo.

### [​](#como-funcionam-os-orçamentos-de-token-de-pensamento-estendido) Como funcionam os orçamentos de token de pensamento estendido

O pensamento estendido usa um **orçamento de token** que controla quanto raciocínio interno Claude pode realizar antes de responder.
Um orçamento de token de pensamento maior fornece:

* Mais espaço para explorar múltiplas abordagens de solução passo a passo
* Espaço para analisar casos extremos e avaliar compensações completamente
* Capacidade de revisar raciocínio e autocorrigir erros

Orçamentos de token para modo de pensamento:

* Quando o pensamento está **ativado** (via `/config` ou `ultrathink`), Claude pode usar até **31.999 tokens** do seu orçamento de saída para raciocínio interno
* Quando o pensamento está **desativado**, Claude usa **0 tokens** para pensamento

**Orçamentos de token personalizados:**

* Você pode definir um orçamento de token de pensamento personalizado usando a [variável de ambiente `MAX_THINKING_TOKENS`](/docs/pt/settings#environment-variables)
* Isso tem a prioridade mais alta e substitui o orçamento padrão de 31.999 tokens
* Veja a [documentação de pensamento estendido](https://docs.claude.com/en/docs/build-with-claude/extended-thinking) para intervalos de token válidos

Você é cobrado por todos os tokens de pensamento usados, mesmo que os modelos Claude 4 mostrem pensamento resumido

---

[​](#retomar-conversas-anteriores) Retomar conversas anteriores
---------------------------------------------------------------

Ao iniciar Claude Code, você pode retomar uma sessão anterior:

* `claude --continue` continua a conversa mais recente no diretório atual
* `claude --resume` abre um seletor de conversa ou retoma por nome

De dentro de uma sessão ativa, use `/resume` para mudar para uma conversa diferente.
As sessões são armazenadas por diretório de projeto. O seletor `/resume` mostra sessões do mesmo repositório git, incluindo worktrees.

### [​](#nomeie-suas-sessões) Nomeie suas sessões

Dê nomes descritivos às sessões para encontrá-las depois. Esta é uma melhor prática ao trabalhar em múltiplas tarefas ou recursos.

1

Nomeie a sessão atual

Use `/rename` durante uma sessão para dar-lhe um nome memorável:

Copiar

Perguntar à IA

```
> /rename auth-refactor
```

Você também pode renomear qualquer sessão do seletor: execute `/resume`, navegue até uma sessão e pressione `R`.

2

Retome por nome depois

Da linha de comando:

Copiar

Perguntar à IA

```
claude --resume auth-refactor
```

Ou de dentro de uma sessão ativa:

Copiar

Perguntar à IA

```
> /resume auth-refactor
```

### [​](#use-o-seletor-de-sessão) Use o seletor de sessão

O comando `/resume` (ou `claude --resume` sem argumentos) abre um seletor de sessão interativo com estes recursos:
**Atalhos de teclado no seletor:**

| Atalho | Ação |
| --- | --- |
| `↑` / `↓` | Navegue entre sessões |
| `→` / `←` | Expanda ou recolha sessões agrupadas |
| `Enter` | Selecione e retome a sessão destacada |
| `P` | Visualize o conteúdo da sessão |
| `R` | Renomeie a sessão destacada |
| `/` | Pesquise para filtrar sessões |
| `A` | Alterne entre diretório atual e todos os projetos |
| `B` | Filtre para sessões do seu ramo git atual |
| `Esc` | Saia do seletor ou modo de pesquisa |

**Organização de sessão:**
O seletor exibe sessões com metadados úteis:

* Nome da sessão ou prompt inicial
* Tempo decorrido desde a última atividade
* Contagem de mensagens
* Ramo Git (se aplicável)

Sessões bifurcadas (criadas com `/rewind` ou `--fork-session`) são agrupadas sob sua sessão raiz, facilitando encontrar conversas relacionadas.

Dicas:

* **Nomeie sessões cedo**: Use `/rename` ao iniciar trabalho em uma tarefa distinta—é muito mais fácil encontrar “payment-integration” do que “explain this function” depois
* Use `--continue` para acesso rápido à sua conversa mais recente no diretório atual
* Use `--resume session-name` quando você sabe qual sessão você precisa
* Use `--resume` (sem um nome) quando você precisa navegar e selecionar
* Para scripts, use `claude --continue --print "prompt"` para retomar em modo não interativo
* Pressione `P` no seletor para visualizar uma sessão antes de retomá-la
* A conversa retomada começa com o mesmo modelo e configuração do original

Como funciona:

1. **Armazenamento de Conversa**: Todas as conversas são automaticamente salvas localmente com seu histórico de mensagens completo
2. **Desserialização de Mensagem**: Ao retomar, todo o histórico de mensagens é restaurado para manter o contexto
3. **Estado da Ferramenta**: O uso de ferramentas e resultados da conversa anterior são preservados
4. **Restauração de Contexto**: A conversa retoma com todo o contexto anterior intacto

---

[​](#executar-sessões-paralelas-de-claude-code-com-git-worktrees) Executar sessões paralelas de Claude Code com Git worktrees
-----------------------------------------------------------------------------------------------------------------------------

Suponha que você precise trabalhar em múltiplas tarefas simultaneamente com isolamento completo de código entre instâncias de Claude Code.

1

Entenda Git worktrees

Git worktrees permitem que você verifique múltiplos ramos do mesmo
repositório em diretórios separados. Cada worktree tem seu próprio
diretório de trabalho com arquivos isolados, enquanto compartilha o mesmo
histórico Git. Saiba mais na [documentação oficial de Git worktree](https://git-scm.com/docs/git-worktree).

2

Crie um novo worktree

Copiar

Perguntar à IA

```
# Crie um novo worktree com um novo ramo 
git worktree add ../project-feature-a -b feature-a

# Ou crie um worktree com um ramo existente
git worktree add ../project-bugfix bugfix-123
```

Isso cria um novo diretório com uma cópia de trabalho separada do seu repositório.

3

Execute Claude Code em cada worktree

Copiar

Perguntar à IA

```
# Navegue até seu worktree 
cd ../project-feature-a

# Execute Claude Code neste ambiente isolado
claude
```

4

Execute Claude em outro worktree

Copiar

Perguntar à IA

```
cd ../project-bugfix
claude
```

5

Gerencie seus worktrees

Copiar

Perguntar à IA

```
# Liste todos os worktrees
git worktree list

# Remova um worktree quando terminar
git worktree remove ../project-feature-a
```

Dicas:

* Cada worktree tem seu próprio estado de arquivo independente, tornando-o perfeito para sessões paralelas de Claude Code
* Mudanças feitas em um worktree não afetarão outros, evitando que instâncias de Claude interfiram uma com a outra
* Todos os worktrees compartilham o mesmo histórico Git e conexões remotas
* Para tarefas de longa duração, você pode ter Claude trabalhando em um worktree enquanto você continua o desenvolvimento em outro
* Use nomes de diretório descritivos para identificar facilmente qual tarefa cada worktree é
* Lembre-se de inicializar seu ambiente de desenvolvimento em cada novo worktree de acordo com a configuração do seu projeto. Dependendo do seu stack, isso pode incluir:
  + Projetos JavaScript: Executar instalação de dependência (`npm install`, `yarn`)
  + Projetos Python: Configurar ambientes virtuais ou instalar com gerenciadores de pacotes
  + Outras linguagens: Seguir o processo de configuração padrão do seu projeto

---

[​](#usar-claude-como-um-utilitário-estilo-unix) Usar Claude como um utilitário estilo unix
-------------------------------------------------------------------------------------------

### [​](#adicione-claude-ao-seu-processo-de-verificação) Adicione Claude ao seu processo de verificação

Suponha que você queira usar Claude Code como um linter ou revisor de código.
**Adicione Claude ao seu script de build:**

Copiar

Perguntar à IA

```
// package.json
{
    ...
    "scripts": {
        ...
        "lint:claude": "claude -p 'you are a linter. please look at the changes vs. main and report any issues related to typos. report the filename and line number on one line, and a description of the issue on the second line. do not return any other text.'"
    }
}
```

Dicas:

* Use Claude para revisão de código automatizada em seu pipeline CI/CD
* Personalize o prompt para verificar problemas específicos relevantes ao seu projeto
* Considere criar múltiplos scripts para diferentes tipos de verificação

### [​](#pipe-in,-pipe-out) Pipe in, pipe out

Suponha que você queira canalizar dados para Claude e obter dados de volta em um formato estruturado.
**Canalize dados através de Claude:**

Copiar

Perguntar à IA

```
cat build-error.txt | claude -p 'concisely explain the root cause of this build error' > output.txt
```

Dicas:

* Use pipes para integrar Claude em scripts shell existentes
* Combine com outras ferramentas Unix para fluxos de trabalho poderosos
* Considere usar —output-format para saída estruturada

### [​](#controlar-formato-de-saída) Controlar formato de saída

Suponha que você precise da saída do Claude em um formato específico, especialmente ao integrar Claude Code em scripts ou outras ferramentas.

1

Use formato de texto (padrão)

Copiar

Perguntar à IA

```
cat data.txt | claude -p 'summarize this data' --output-format text > summary.txt
```

Isso produz apenas a resposta de texto simples do Claude (comportamento padrão).

2

Use formato JSON

Copiar

Perguntar à IA

```
cat code.py | claude -p 'analyze this code for bugs' --output-format json > analysis.json
```

Isso produz um array JSON de mensagens com metadados incluindo custo e duração.

3

Use formato JSON de streaming

Copiar

Perguntar à IA

```
cat log.txt | claude -p 'parse this log file for errors' --output-format stream-json
```

Isso produz uma série de objetos JSON em tempo real conforme Claude processa a solicitação. Cada mensagem é um objeto JSON válido, mas a saída inteira não é JSON válido se concatenado.

Dicas:

* Use `--output-format text` para integrações simples onde você apenas precisa da resposta do Claude
* Use `--output-format json` quando você precisa do log de conversa completo
* Use `--output-format stream-json` para saída em tempo real de cada turno de conversa

---

[​](#criar-comandos-slash-personalizados) Criar comandos slash personalizados
-----------------------------------------------------------------------------

Claude Code suporta comandos slash personalizados que você pode criar para executar rapidamente prompts ou tarefas específicas.
Para mais detalhes, veja a página de referência [Comandos slash](/docs/pt/slash-commands).

### [​](#criar-comandos-específicos-do-projeto) Criar comandos específicos do projeto

Suponha que você queira criar comandos slash reutilizáveis para seu projeto que todos os membros da equipe possam usar.

1

Crie um diretório de comandos em seu projeto

Copiar

Perguntar à IA

```
mkdir -p .claude/commands
```

2

Crie um arquivo Markdown para cada comando

Copiar

Perguntar à IA

```
echo "Analyze the performance of this code and suggest three specific optimizations:" > .claude/commands/optimize.md
```

3

Use seu comando personalizado em Claude Code

Copiar

Perguntar à IA

```
> /optimize
```

Dicas:

* Nomes de comando são derivados do nome do arquivo (por exemplo, `optimize.md` se torna `/optimize`)
* Você pode organizar comandos em subdiretórios (por exemplo, `.claude/commands/frontend/component.md` cria `/component` com “(project:frontend)” mostrado na descrição)
* Comandos de projeto estão disponíveis para todos que clonam o repositório
* O conteúdo do arquivo Markdown se torna o prompt enviado ao Claude quando o comando é invocado

### [​](#adicione-argumentos-de-comando-com-$arguments) Adicione argumentos de comando com $ARGUMENTS

Suponha que você queira criar comandos slash flexíveis que possam aceitar entrada adicional dos usuários.

1

Crie um arquivo de comando com o placeholder $ARGUMENTS

Copiar

Perguntar à IA

```
echo 'Find and fix issue #$ARGUMENTS. Follow these steps: 1.
Understand the issue described in the ticket 2. Locate the relevant code in
our codebase 3. Implement a solution that addresses the root cause 4. Add
appropriate tests 5. Prepare a concise PR description' >
.claude/commands/fix-issue.md
```

2

Use o comando com um número de problema

Em sua sessão de Claude, use o comando com argumentos.

Copiar

Perguntar à IA

```
> /fix-issue 123
```

Isso substitui $ARGUMENTS com “123” no prompt.

Dicas:

* O placeholder $ARGUMENTS é substituído por qualquer texto que segue o comando
* Você pode posicionar $ARGUMENTS em qualquer lugar em seu modelo de comando
* Outras aplicações úteis: gerar casos de teste para funções específicas, criar documentação para componentes, revisar código em arquivos particulares ou traduzir conteúdo para idiomas especificados

### [​](#criar-comandos-slash-pessoais) Criar comandos slash pessoais

Suponha que você queira criar comandos slash pessoais que funcionem em todos os seus projetos.

1

Crie um diretório de comandos em sua pasta home

Copiar

Perguntar à IA

```
mkdir -p ~/.claude/commands
```

2

Crie um arquivo Markdown para cada comando

Copiar

Perguntar à IA

```
echo "Review this code for security vulnerabilities, focusing on:" >
~/.claude/commands/security-review.md
```

3

Use seu comando personalizado pessoal

Copiar

Perguntar à IA

```
> /security-review
```

Dicas:

* Comandos pessoais mostram “(user)” em sua descrição quando listados com `/help`
* Comandos pessoais estão disponíveis apenas para você e não são compartilhados com sua equipe
* Comandos pessoais funcionam em todos os seus projetos
* Você pode usar estes para fluxos de trabalho consistentes em diferentes bases de código

---

[​](#pergunte-ao-claude-sobre-suas-capacidades) Pergunte ao Claude sobre suas capacidades
-----------------------------------------------------------------------------------------

Claude tem acesso integrado à sua documentação e pode responder perguntas sobre seus próprios recursos e limitações.

### [​](#perguntas-de-exemplo) Perguntas de exemplo

Copiar

Perguntar à IA

```
> can Claude Code create pull requests?
```

Copiar

Perguntar à IA

```
> how does Claude Code handle permissions?
```

Copiar

Perguntar à IA

```
> what slash commands are available?
```

Copiar

Perguntar à IA

```
> how do I use MCP with Claude Code?
```

Copiar

Perguntar à IA

```
> how do I configure Claude Code for Amazon Bedrock?
```

Copiar

Perguntar à IA

```
> what are the limitations of Claude Code?
```

Claude fornece respostas baseadas em documentação para essas perguntas. Para exemplos executáveis e demonstrações práticas, consulte as seções de fluxo de trabalho específicas acima.

Dicas:

* Claude sempre tem acesso à documentação mais recente do Claude Code, independentemente da versão que você está usando
* Faça perguntas específicas para obter respostas detalhadas
* Claude pode explicar recursos complexos como integração MCP, configurações empresariais e fluxos de trabalho avançados

---

[​](#próximos-passos) Próximos passos
-------------------------------------

[Implementação de referência do Claude Code
------------------------------------------

Clone nossa implementação de referência de contêiner de desenvolvimento.](https://github.com/anthropics/claude-code/tree/main/.devcontainer)