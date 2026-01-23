# https://code.claude.com/docs/pt/model-config

[​](#modelos-disponíveis) Modelos disponíveis
---------------------------------------------

Para a configuração `model` no Claude Code, você pode configurar:

* Um **alias de modelo**
* Um **nome de modelo**
  + Anthropic API: Um **[nome de modelo](https://docs.claude.com/pt/docs/about-claude/models/overview#model-names)** completo
  + Bedrock: um ARN de perfil de inferência
  + Foundry: um nome de implantação
  + Vertex: um nome de versão

### [​](#aliases-de-modelo) Aliases de modelo

Os aliases de modelo fornecem uma maneira conveniente de selecionar configurações de modelo sem precisar lembrar dos números exatos da versão:

| Alias de modelo | Comportamento |
| --- | --- |
| **`default`** | Configuração de modelo recomendada, dependendo do tipo de sua conta |
| **`sonnet`** | Usa o modelo Sonnet mais recente (atualmente Sonnet 4.5) para tarefas diárias de codificação |
| **`opus`** | Usa o modelo Opus (atualmente Opus 4.5) para tarefas especializadas de raciocínio complexo |
| **`haiku`** | Usa o modelo Haiku rápido e eficiente para tarefas simples |
| **`sonnet[1m]`** | Usa Sonnet com uma janela de [contexto de 1 milhão de tokens](https://docs.claude.com/pt/docs/build-with-claude/context-windows#1m-token-context-window) para sessões longas |
| **`opusplan`** | Modo especial que usa `opus` durante o modo de plano, depois muda para `sonnet` para execução |

### [​](#configurando-seu-modelo) Configurando seu modelo

Você pode configurar seu modelo de várias maneiras, listadas em ordem de prioridade:

1. **Durante a sessão** - Use `/model <alias|name>` para alternar modelos durante a sessão
2. **Na inicialização** - Inicie com `claude --model <alias|name>`
3. **Variável de ambiente** - Defina `ANTHROPIC_MODEL=<alias|name>`
4. **Configurações** - Configure permanentemente em seu arquivo de configurações usando o campo `model`.

Exemplo de uso:

Copiar

Perguntar à IA

```
# Iniciar com Opus
claude --model opus

# Alternar para Sonnet durante a sessão
/model sonnet
```

Exemplo de arquivo de configurações:

Copiar

Perguntar à IA

```
{
    "permissions": {
        ...
    },
    "model": "opus"
}
```

[​](#comportamento-especial-do-modelo) Comportamento especial do modelo
-----------------------------------------------------------------------

### [​](#configuração-do-modelo-default) Configuração do modelo `default`

O comportamento de `default` depende do tipo de sua conta.
Para certos usuários Max, Claude Code fará fallback automaticamente para Sonnet se você atingir um limite de uso com Opus.

### [​](#configuração-do-modelo-opusplan) Configuração do modelo `opusplan`

O alias de modelo `opusplan` fornece uma abordagem híbrida automatizada:

* **No modo de plano** - Usa `opus` para raciocínio complexo e decisões de arquitetura
* **No modo de execução** - Muda automaticamente para `sonnet` para geração de código e implementação

Isso oferece o melhor dos dois mundos: o raciocínio superior do Opus para planejamento e a eficiência do Sonnet para execução.

### [​](#contexto-estendido-com-[1m]) Contexto estendido com [1m]

Para usuários de Console/API, o sufixo `[1m]` pode ser adicionado a nomes de modelo completos para ativar uma [janela de contexto de 1 milhão de tokens](https://docs.claude.com/pt/docs/build-with-claude/context-windows#1m-token-context-window).

Copiar

Perguntar à IA

```
# Exemplo de uso de um nome de modelo completo com o sufixo [1m]
/model anthropic.claude-sonnet-4-5-20250929-v1:0[1m]
```

Nota: Modelos de contexto estendido têm [preços diferentes](https://docs.claude.com/pt/docs/about-claude/pricing#long-context-pricing).

[​](#verificando-seu-modelo-atual) Verificando seu modelo atual
---------------------------------------------------------------

Você pode ver qual modelo está usando atualmente de várias maneiras:

1. Na [linha de status](/docs/pt/statusline) (se configurada)
2. Em `/status`, que também exibe as informações de sua conta.

[​](#variáveis-de-ambiente) Variáveis de ambiente
-------------------------------------------------

Você pode usar as seguintes variáveis de ambiente, que devem ser **nomes de modelo** completos (ou equivalentes para seu provedor de API), para controlar os nomes de modelo aos quais os aliases mapeiam.

| Variável de ambiente | Descrição |
| --- | --- |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | O modelo a usar para `opus`, ou para `opusplan` quando o Modo de Plano está ativo. |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | O modelo a usar para `sonnet`, ou para `opusplan` quando o Modo de Plano não está ativo. |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | O modelo a usar para `haiku`, ou [funcionalidade em segundo plano](/docs/pt/costs#background-token-usage) |
| `CLAUDE_CODE_SUBAGENT_MODEL` | O modelo a usar para [subagentes](/docs/pt/sub-agents) |

Nota: `ANTHROPIC_SMALL_FAST_MODEL` está descontinuado em favor de `ANTHROPIC_DEFAULT_HAIKU_MODEL`.

### [​](#configuração-de-cache-de-prompt) Configuração de cache de prompt

Claude Code usa automaticamente [cache de prompt](https://docs.claude.com/pt/docs/build-with-claude/prompt-caching) para otimizar o desempenho e reduzir custos. Você pode desabilitar o cache de prompt globalmente ou para camadas de modelo específicas:

| Variável de ambiente | Descrição |
| --- | --- |
| `DISABLE_PROMPT_CACHING` | Defina como `1` para desabilitar o cache de prompt para todos os modelos (tem precedência sobre configurações por modelo) |
| `DISABLE_PROMPT_CACHING_HAIKU` | Defina como `1` para desabilitar o cache de prompt apenas para modelos Haiku |
| `DISABLE_PROMPT_CACHING_SONNET` | Defina como `1` para desabilitar o cache de prompt apenas para modelos Sonnet |
| `DISABLE_PROMPT_CACHING_OPUS` | Defina como `1` para desabilitar o cache de prompt apenas para modelos Opus |

Essas variáveis de ambiente oferecem controle granular sobre o comportamento do cache de prompt. A configuração global `DISABLE_PROMPT_CACHING` tem precedência sobre as configurações específicas do modelo, permitindo que você desabilite rapidamente todo o cache quando necessário. As configurações por modelo são úteis para controle seletivo, como ao depurar modelos específicos ou trabalhar com provedores de nuvem que podem ter implementações de cache diferentes.