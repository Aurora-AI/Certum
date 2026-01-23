# https://code.claude.com/docs/pt/third-party-integrations

Esta página fornece uma visão geral das opções de implantação disponíveis e ajuda você a escolher a configuração certa para sua organização.

[​](#comparação-de-provedores) Comparação de provedores
-------------------------------------------------------

| Recurso | Anthropic | Amazon Bedrock | Google Vertex AI | Microsoft Foundry |
| --- | --- | --- | --- | --- |
| Regiões | [Países](https://www.anthropic.com/supported-countries) suportados | Múltiplas [regiões](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) AWS | Múltiplas [regiões](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) GCP | Múltiplas [regiões](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) Azure |
| Cache de prompt | Ativado por padrão | Ativado por padrão | Ativado por padrão | Ativado por padrão |
| Autenticação | Chave de API | Chave de API ou credenciais AWS | Credenciais GCP | Chave de API ou Microsoft Entra ID |
| Rastreamento de custos | Painel | AWS Cost Explorer | Faturamento GCP | Gerenciamento de Custos do Azure |
| Recursos empresariais | Equipes, monitoramento de uso | Políticas IAM, CloudTrail | Funções IAM, Logs de Auditoria da Nuvem | Políticas RBAC, Azure Monitor |

[​](#provedores-de-nuvem) Provedores de nuvem
---------------------------------------------

[Amazon Bedrock
--------------

Use modelos Claude através da infraestrutura AWS com autenticação baseada em chave de API ou IAM e monitoramento nativo do AWS](/docs/pt/amazon-bedrock)[Google Vertex AI
----------------

Acesse modelos Claude via Google Cloud Platform com segurança e conformidade de nível empresarial](/docs/pt/google-vertex-ai)[Microsoft Foundry
-----------------

Acesse Claude através do Azure com autenticação por chave de API ou Microsoft Entra ID e faturamento do Azure](/docs/pt/microsoft-foundry)

[​](#infraestrutura-corporativa) Infraestrutura corporativa
-----------------------------------------------------------

[Rede Empresarial
----------------

Configure Claude Code para funcionar com servidores proxy e requisitos SSL/TLS da sua organização](/docs/pt/network-config)[Gateway LLM
-----------

Implante acesso centralizado a modelos com rastreamento de uso, orçamento e registro de auditoria](/docs/pt/llm-gateway)

[​](#visão-geral-da-configuração) Visão geral da configuração
-------------------------------------------------------------

Claude Code suporta opções de configuração flexíveis que permitem combinar diferentes provedores e infraestrutura:

Entenda a diferença entre:

* **Proxy corporativo**: Um proxy HTTP/HTTPS para roteamento de tráfego (definido via `HTTPS_PROXY` ou `HTTP_PROXY`)
* **Gateway LLM**: Um serviço que lida com autenticação e fornece endpoints compatíveis com provedores (definido via `ANTHROPIC_BASE_URL`, `ANTHROPIC_BEDROCK_BASE_URL` ou `ANTHROPIC_VERTEX_BASE_URL`)

Ambas as configurações podem ser usadas em conjunto.

### [​](#usando-bedrock-com-proxy-corporativo) Usando Bedrock com proxy corporativo

Roteie o tráfego do Bedrock através de um proxy HTTP/HTTPS corporativo:

Copiar

Perguntar à IA

```
# Ativar Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1

# Configurar proxy corporativo
export HTTPS_PROXY='https://proxy.example.com:8080'
```

### [​](#usando-bedrock-com-gateway-llm) Usando Bedrock com Gateway LLM

Use um serviço de gateway que fornece endpoints compatíveis com Bedrock:

Copiar

Perguntar à IA

```
# Ativar Bedrock
export CLAUDE_CODE_USE_BEDROCK=1

# Configurar gateway LLM
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1  # Se o gateway lidar com autenticação AWS
```

### [​](#usando-foundry-com-proxy-corporativo) Usando Foundry com proxy corporativo

Roteie o tráfego do Azure através de um proxy HTTP/HTTPS corporativo:

Copiar

Perguntar à IA

```
# Ativar Microsoft Foundry
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_RESOURCE=your-resource
export ANTHROPIC_FOUNDRY_API_KEY=your-api-key  # Ou omita para autenticação Entra ID

# Configurar proxy corporativo
export HTTPS_PROXY='https://proxy.example.com:8080'
```

### [​](#usando-foundry-com-gateway-llm) Usando Foundry com Gateway LLM

Use um serviço de gateway que fornece endpoints compatíveis com Azure:

Copiar

Perguntar à IA

```
# Ativar Microsoft Foundry
export CLAUDE_CODE_USE_FOUNDRY=1

# Configurar gateway LLM
export ANTHROPIC_FOUNDRY_BASE_URL='https://your-llm-gateway.com'
export CLAUDE_CODE_SKIP_FOUNDRY_AUTH=1  # Se o gateway lidar com autenticação Azure
```

### [​](#usando-vertex-ai-com-proxy-corporativo) Usando Vertex AI com proxy corporativo

Roteie o tráfego do Vertex AI através de um proxy HTTP/HTTPS corporativo:

Copiar

Perguntar à IA

```
# Ativar Vertex
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id

# Configurar proxy corporativo
export HTTPS_PROXY='https://proxy.example.com:8080'
```

### [​](#usando-vertex-ai-com-gateway-llm) Usando Vertex AI com Gateway LLM

Combine modelos Google Vertex AI com um gateway LLM para gerenciamento centralizado:

Copiar

Perguntar à IA

```
# Ativar Vertex
export CLAUDE_CODE_USE_VERTEX=1

# Configurar gateway LLM
export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1  # Se o gateway lidar com autenticação GCP
```

### [​](#configuração-de-autenticação) Configuração de autenticação

Claude Code usa `ANTHROPIC_AUTH_TOKEN` para o cabeçalho `Authorization` quando necessário. Os sinalizadores `SKIP_AUTH` (`CLAUDE_CODE_SKIP_BEDROCK_AUTH`, `CLAUDE_CODE_SKIP_VERTEX_AUTH`) são usados em cenários de gateway LLM onde o gateway lida com autenticação do provedor.

[​](#escolhendo-a-configuração-de-implantação-correta) Escolhendo a configuração de implantação correta
-------------------------------------------------------------------------------------------------------

Considere estes fatores ao selecionar sua abordagem de implantação:

### [​](#acesso-direto-ao-provedor) Acesso direto ao provedor

Melhor para organizações que:

* Desejam a configuração mais simples
* Têm infraestrutura AWS ou GCP existente
* Precisam de monitoramento e conformidade nativos do provedor

### [​](#proxy-corporativo) Proxy corporativo

Melhor para organizações que:

* Têm requisitos de proxy corporativo existentes
* Precisam de monitoramento de tráfego e conformidade
* Devem rotear todo o tráfego através de caminhos de rede específicos

### [​](#gateway-llm) Gateway LLM

Melhor para organizações que:

* Precisam de rastreamento de uso entre equipes
* Desejam alternar dinamicamente entre modelos
* Exigem limitação de taxa personalizada ou orçamentos
* Precisam de gerenciamento centralizado de autenticação

[​](#depuração) Depuração
-------------------------

Ao depurar sua implantação:

* Use o [comando de barra](/docs/pt/slash-commands) `claude /status`. Este comando fornece observabilidade em qualquer autenticação, proxy e configurações de URL aplicadas.
* Defina a variável de ambiente `export ANTHROPIC_LOG=debug` para registrar solicitações.

[​](#melhores-práticas-para-organizações) Melhores práticas para organizações
-----------------------------------------------------------------------------

### [​](#1-invista-em-documentação-e-memória) 1. Invista em documentação e memória

Recomendamos fortemente investir em documentação para que Claude Code entenda sua base de código. As organizações podem implantar arquivos CLAUDE.md em vários níveis:

* **Em toda a organização**: Implante em diretórios do sistema como `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) para padrões de toda a empresa
* **Nível de repositório**: Crie arquivos `CLAUDE.md` nas raízes dos repositórios contendo arquitetura do projeto, comandos de compilação e diretrizes de contribuição. Verifique-os no controle de origem para que todos os usuários se beneficiem
  [Saiba mais](/docs/pt/memory).

### [​](#2-simplifique-a-implantação) 2. Simplifique a implantação

Se você tiver um ambiente de desenvolvimento personalizado, descobrimos que criar uma maneira “com um clique” de instalar Claude Code é fundamental para aumentar a adoção em toda a organização.

### [​](#3-comece-com-uso-orientado) 3. Comece com uso orientado

Incentive novos usuários a experimentar Claude Code para perguntas sobre a base de código, ou em correções de bugs menores ou solicitações de recursos. Peça ao Claude Code para fazer um plano. Verifique as sugestões do Claude e forneça feedback se estiver fora do caminho. Com o tempo, conforme os usuários entendem melhor esse novo paradigma, eles serão mais eficazes em permitir que Claude Code funcione de forma mais autônoma.

### [​](#4-configure-políticas-de-segurança) 4. Configure políticas de segurança

As equipes de segurança podem configurar permissões gerenciadas para o que Claude Code é e não é permitido fazer, o que não pode ser substituído pela configuração local. [Saiba mais](/docs/pt/security).

### [​](#5-aproveite-mcp-para-integrações) 5. Aproveite MCP para integrações

MCP é uma ótima maneira de dar ao Claude Code mais informações, como conectar a sistemas de gerenciamento de tickets ou logs de erros. Recomendamos que uma equipe central configure servidores MCP e verifique uma configuração `.mcp.json` na base de código para que todos os usuários se beneficiem. [Saiba mais](/docs/pt/mcp).
Na Anthropic, confiamos que Claude Code impulsione o desenvolvimento em todas as bases de código da Anthropic. Esperamos que você goste de usar Claude Code tanto quanto nós.

[​](#próximas-etapas) Próximas etapas
-------------------------------------

* [Configure Amazon Bedrock](/docs/pt/amazon-bedrock) para implantação nativa do AWS
* [Configure Google Vertex AI](/docs/pt/google-vertex-ai) para implantação GCP
* [Configure Microsoft Foundry](/docs/pt/microsoft-foundry) para implantação do Azure
* [Configure Rede Empresarial](/docs/pt/network-config) para requisitos de rede
* [Implante Gateway LLM](/docs/pt/llm-gateway) para gerenciamento empresarial
* [Configurações](/docs/pt/settings) para opções de configuração e variáveis de ambiente