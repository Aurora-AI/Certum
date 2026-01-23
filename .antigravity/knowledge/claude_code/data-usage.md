# https://code.claude.com/docs/pt/data-usage

[​](#políticas-de-dados) Políticas de dados
-------------------------------------------

### [​](#política-de-treinamento-de-dados) Política de treinamento de dados

**Usuários consumidores (planos Free, Pro e Max)**:
Oferecemos a você a opção de permitir que seus dados sejam usados para melhorar futuros modelos Claude. Treinaremos novos modelos usando dados de contas Free, Pro e Max quando essa configuração estiver ativada (incluindo quando você usa Claude Code dessas contas).
**Usuários comerciais**: (planos Team e Enterprise, API, plataformas de terceiros e Claude Gov) mantêm as políticas existentes: Anthropic não treina modelos generativos usando código ou prompts enviados para Claude Code sob termos comerciais, a menos que o cliente tenha optado por fornecer seus dados para melhorias de modelo (por exemplo, o [Development Partner Program](https://support.claude.com/en/articles/11174108-about-the-development-partner-program)).

### [​](#development-partner-program) Development Partner Program

Se você optar explicitamente por métodos para nos fornecer materiais para treinar, como através do [Development Partner Program](https://support.claude.com/en/articles/11174108-about-the-development-partner-program), podemos usar esses materiais fornecidos para treinar nossos modelos. Um administrador da organização pode optar explicitamente pelo Development Partner Program para sua organização. Observe que este programa está disponível apenas para API de primeira parte da Anthropic, e não para usuários de Bedrock ou Vertex.

### [​](#feedback-usando-o-comando-/bug) Feedback usando o comando `/bug`

Se você optar por nos enviar feedback sobre Claude Code usando o comando `/bug`, podemos usar seu feedback para melhorar nossos produtos e serviços. Transcrições compartilhadas via `/bug` são retidas por 5 anos.

### [​](#pesquisas-de-qualidade-de-sessão) Pesquisas de qualidade de sessão

Quando você vê o prompt “How is Claude doing this session?” (Como Claude está se saindo nesta sessão?) em Claude Code, responder a esta pesquisa (incluindo selecionar “Dismiss” (Descartar)), apenas sua classificação numérica (1, 2, 3 ou descartar) é registrada. Não coletamos ou armazenamos transcrições de conversas, entradas, saídas ou outros dados de sessão como parte desta pesquisa. Diferentemente do feedback de polegar para cima/para baixo ou relatórios `/bug`, esta pesquisa de qualidade de sessão é uma métrica simples de satisfação do produto. Suas respostas a esta pesquisa não afetam suas preferências de treinamento de dados e não podem ser usadas para treinar nossos modelos de IA.

### [​](#retenção-de-dados) Retenção de dados

Anthropic retém dados de Claude Code com base no tipo de conta e preferências.
**Usuários consumidores (planos Free, Pro e Max)**:

* Usuários que permitem uso de dados para melhorias de modelo: período de retenção de 5 anos para suportar desenvolvimento de modelo e melhorias de segurança
* Usuários que não permitem uso de dados para melhorias de modelo: período de retenção de 30 dias
* As configurações de privacidade podem ser alteradas a qualquer momento em [claude.ai/settings/data-privacy-controls](https://claude.ai/settings/data-privacy-controls).

**Usuários comerciais (Team, Enterprise e API)**:

* Padrão: período de retenção de 30 dias
* Retenção zero de dados: Disponível com chaves de API configuradas apropriadamente - Claude Code não reterá transcrições de chat em servidores
* Cache local: Clientes Claude Code podem armazenar sessões localmente por até 30 dias para permitir retomada de sessão (configurável)

Saiba mais sobre práticas de retenção de dados em nosso [Privacy Center](https://privacy.anthropic.com/).
Para detalhes completos, consulte nossos [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms) (para usuários de Team, Enterprise e API) ou [Consumer Terms](https://www.anthropic.com/legal/consumer-terms) (para usuários de Free, Pro e Max) e [Privacy Policy](https://www.anthropic.com/legal/privacy).

[​](#acesso-a-dados) Acesso a dados
-----------------------------------

Para todos os usuários de primeira parte, você pode aprender mais sobre quais dados são registrados para [Claude Code local](#local-claude-code-data-flow-and-dependencies) e [Claude Code remoto](#cloud-execution-data-flow-and-dependencies). Observe que para Claude Code remoto, Claude acessa o repositório onde você inicia sua sessão de Claude Code. Claude não acessa repositórios que você conectou mas não iniciou uma sessão.

[​](#claude-code-local:-fluxo-de-dados-e-dependências) Claude Code local: Fluxo de dados e dependências
-------------------------------------------------------------------------------------------------------

O diagrama abaixo mostra como Claude Code se conecta a serviços externos durante a instalação e operação normal. Linhas sólidas indicam conexões necessárias, enquanto linhas tracejadas representam fluxos de dados opcionais ou iniciados pelo usuário.
![Diagrama mostrando as conexões externas de Claude Code: instalar/atualizar se conecta ao NPM, e solicitações do usuário se conectam aos serviços Anthropic incluindo autenticação Console, public-api e opcionalmente Statsig, Sentry e relatório de bugs](https://mintcdn.com/claude-code/I9Dpo7RZuIbc86cX/images/claude-code-data-flow.svg?fit=max&auto=format&n=I9Dpo7RZuIbc86cX&q=85&s=9e77f476347e7c9983f6e211d27cf6a9)
Claude Code é instalado a partir do [NPM](https://www.npmjs.com/package/@anthropic-ai/claude-code). Claude Code é executado localmente. Para interagir com o LLM, Claude Code envia dados pela rede. Esses dados incluem todos os prompts do usuário e saídas do modelo. Os dados são criptografados em trânsito via TLS e não são criptografados em repouso. Claude Code é compatível com a maioria dos VPNs e proxies LLM populares.
Claude Code é construído nas APIs da Anthropic. Para detalhes sobre os controles de segurança da nossa API, incluindo nossos procedimentos de logging de API, consulte artefatos de conformidade oferecidos no [Anthropic Trust Center](https://trust.anthropic.com).

### [​](#execução-em-nuvem:-fluxo-de-dados-e-dependências) Execução em nuvem: Fluxo de dados e dependências

Ao usar [Claude Code na web](/docs/pt/claude-code-on-the-web), as sessões são executadas em máquinas virtuais gerenciadas pela Anthropic em vez de localmente. Em ambientes de nuvem:

* **Armazenamento de código e dados:** Seu repositório é clonado para uma VM isolada. Código e dados de sessão estão sujeitos às políticas de retenção e uso para seu tipo de conta (veja a seção Retenção de dados acima)
* **Credenciais:** A autenticação do GitHub é tratada através de um proxy seguro; suas credenciais do GitHub nunca entram na sandbox
* **Tráfego de rede:** Todo o tráfego de saída passa por um proxy de segurança para logging de auditoria e prevenção de abuso
* **Dados de sessão:** Prompts, alterações de código e saídas seguem as mesmas políticas de dados que o uso local de Claude Code

Para detalhes de segurança sobre execução em nuvem, consulte [Security](/docs/pt/security#cloud-execution-security).

[​](#serviços-de-telemetria) Serviços de telemetria
---------------------------------------------------

Claude Code se conecta de máquinas dos usuários ao serviço Statsig para registrar métricas operacionais como latência, confiabilidade e padrões de uso. Este logging não inclui nenhum código ou caminho de arquivo. Os dados são criptografados em trânsito usando TLS e em repouso usando criptografia AES de 256 bits. Leia mais na [documentação de segurança do Statsig](https://www.statsig.com/trust/security). Para desativar a telemetria do Statsig, defina a variável de ambiente `DISABLE_TELEMETRY`.
Claude Code se conecta de máquinas dos usuários ao Sentry para logging de erros operacionais. Os dados são criptografados em trânsito usando TLS e em repouso usando criptografia AES de 256 bits. Leia mais na [documentação de segurança do Sentry](https://sentry.io/security/). Para desativar o logging de erros, defina a variável de ambiente `DISABLE_ERROR_REPORTING`.
Quando os usuários executam o comando `/bug`, uma cópia de seu histórico de conversas completo incluindo código é enviada para Anthropic. Os dados são criptografados em trânsito e em repouso. Opcionalmente, um problema do Github é criado em nosso repositório público. Para desativar o relatório de bugs, defina a variável de ambiente `DISABLE_BUG_COMMAND`.

[​](#comportamentos-padrão-por-provedor-de-api) Comportamentos padrão por provedor de API
-----------------------------------------------------------------------------------------

Por padrão, desativamos todo o tráfego não essencial (incluindo relatório de erros, telemetria e funcionalidade de relatório de bugs) ao usar Bedrock ou Vertex. Você também pode desativar todos esses de uma vez definindo a variável de ambiente `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. Aqui estão os comportamentos padrão completos:

| Serviço | Claude API | Vertex API | Bedrock API |
| --- | --- | --- | --- |
| **Statsig (Métricas)** | Ativado por padrão. `DISABLE_TELEMETRY=1` para desativar. | Desativado por padrão. `CLAUDE_CODE_USE_VERTEX` deve ser 1. | Desativado por padrão. `CLAUDE_CODE_USE_BEDROCK` deve ser 1. |
| **Sentry (Erros)** | Ativado por padrão. `DISABLE_ERROR_REPORTING=1` para desativar. | Desativado por padrão. `CLAUDE_CODE_USE_VERTEX` deve ser 1. | Desativado por padrão. `CLAUDE_CODE_USE_BEDROCK` deve ser 1. |
| **Claude API (relatórios `/bug`)** | Ativado por padrão. `DISABLE_BUG_COMMAND=1` para desativar. | Desativado por padrão. `CLAUDE_CODE_USE_VERTEX` deve ser 1. | Desativado por padrão. `CLAUDE_CODE_USE_BEDROCK` deve ser 1. |

Todas as variáveis de ambiente podem ser verificadas em `settings.json` ([leia mais](/docs/pt/settings)).