# https://code.claude.com/docs/pt/security

[​](#como-abordamos-a-segurança) Como abordamos a segurança
-----------------------------------------------------------

### [​](#fundação-de-segurança) Fundação de segurança

A segurança do seu código é fundamental. Claude Code é construído com segurança em seu núcleo, desenvolvido de acordo com o programa de segurança abrangente da Anthropic. Saiba mais e acesse recursos (relatório SOC 2 Type 2, certificado ISO 27001, etc.) no [Anthropic Trust Center](https://trust.anthropic.com).

### [​](#arquitetura-baseada-em-permissões) Arquitetura baseada em permissões

Claude Code usa permissões somente leitura rigorosas por padrão. Quando ações adicionais são necessárias (editar arquivos, executar testes, executar comandos), Claude Code solicita permissão explícita. Os usuários controlam se aprovam ações uma única vez ou as permitem automaticamente.
Projetamos Claude Code para ser transparente e seguro. Por exemplo, exigimos aprovação para comandos bash antes de executá-los, dando a você controle direto. Esta abordagem permite que usuários e organizações configurem permissões diretamente.
Para configuração detalhada de permissões, consulte [Gerenciamento de Identidade e Acesso](/docs/pt/iam).

### [​](#proteções-integradas) Proteções integradas

Para mitigar riscos em sistemas agênticos:

* **Ferramenta bash em sandbox**: [Sandbox](/docs/pt/sandboxing) comandos bash com isolamento de sistema de arquivos e rede, reduzindo prompts de permissão mantendo a segurança. Ative com `/sandbox` para definir limites onde Claude Code pode trabalhar autonomamente
* **Restrição de acesso de escrita**: Claude Code só pode escrever na pasta onde foi iniciado e suas subpastas—não pode modificar arquivos em diretórios pai sem permissão explícita. Embora Claude Code possa ler arquivos fora do diretório de trabalho (útil para acessar bibliotecas do sistema e dependências), operações de escrita são estritamente confinadas ao escopo do projeto, criando um limite de segurança claro
* **Mitigação de fadiga de prompt**: Suporte para lista de permissões de comandos seguros frequentemente usados por usuário, por base de código ou por organização
* **Modo Aceitar Edições**: Aceitar em lote múltiplas edições mantendo prompts de permissão para comandos com efeitos colaterais

### [​](#responsabilidade-do-usuário) Responsabilidade do usuário

Claude Code tem apenas as permissões que você concede a ele. Você é responsável por revisar o código e comandos propostos quanto à segurança antes da aprovação.

[​](#proteja-se-contra-injeção-de-prompt) Proteja-se contra injeção de prompt
-----------------------------------------------------------------------------

Injeção de prompt é uma técnica onde um atacante tenta substituir ou manipular as instruções de um assistente de IA inserindo texto malicioso. Claude Code inclui várias proteções contra esses ataques:

### [​](#proteções-principais) Proteções principais

* **Sistema de permissões**: Operações sensíveis requerem aprovação explícita
* **Análise com reconhecimento de contexto**: Detecta instruções potencialmente prejudiciais analisando a solicitação completa
* **Sanitização de entrada**: Previne injeção de comando processando entradas do usuário
* **Lista de bloqueio de comandos**: Bloqueia comandos arriscados que buscam conteúdo arbitrário da web como `curl` e `wget` por padrão. Quando explicitamente permitido, esteja ciente das [limitações de padrão de permissão](/docs/pt/iam#tool-specific-permission-rules)

### [​](#proteções-de-privacidade) Proteções de privacidade

Implementamos várias proteções para proteger seus dados, incluindo:

* Períodos de retenção limitados para informações sensíveis (consulte o [Privacy Center](https://privacy.anthropic.com/en/articles/10023548-how-long-do-you-store-my-data) para saber mais)
* Acesso restrito aos dados de sessão do usuário
* Controle do usuário sobre preferências de treinamento de dados. Usuários consumidores podem alterar suas [configurações de privacidade](https://claude.ai/settings/privacy) a qualquer momento.

Para detalhes completos, consulte nossos [Termos de Serviço Comercial](https://www.anthropic.com/legal/commercial-terms) (para usuários Team, Enterprise e API) ou [Termos do Consumidor](https://www.anthropic.com/legal/consumer-terms) (para usuários Free, Pro e Max) e [Política de Privacidade](https://www.anthropic.com/legal/privacy).

### [​](#proteções-adicionais) Proteções adicionais

* **Aprovação de solicitação de rede**: Ferramentas que fazem solicitações de rede requerem aprovação do usuário por padrão
* **Janelas de contexto isoladas**: A busca na web usa uma janela de contexto separada para evitar injetar prompts potencialmente maliciosos
* **Verificação de confiança**: Primeiras execuções de base de código e novos servidores MCP requerem verificação de confiança
  + Nota: A verificação de confiança é desabilitada ao executar de forma não interativa com a flag `-p`
* **Detecção de injeção de comando**: Comandos bash suspeitos requerem aprovação manual mesmo se previamente permitidos
* **Correspondência com falha fechada**: Comandos não correspondidos padrão para exigir aprovação manual
* **Descrições em linguagem natural**: Comandos bash complexos incluem explicações para compreensão do usuário
* **Armazenamento seguro de credenciais**: Chaves de API e tokens são criptografados. Consulte [Gerenciamento de Credenciais](/docs/pt/iam#credential-management)

**Risco de segurança do WebDAV no Windows**: Ao executar Claude Code no Windows, recomendamos contra habilitar WebDAV ou permitir que Claude Code acesse caminhos como `\\*` que podem conter subdiretórios WebDAV. [WebDAV foi descontinuado pela Microsoft](https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features#:~:text=The%20Webclient%20(WebDAV)%20service%20is%20deprecated) devido a riscos de segurança. Habilitar WebDAV pode permitir que Claude Code dispare solicitações de rede para hosts remotos, contornando o sistema de permissões.

**Melhores práticas para trabalhar com conteúdo não confiável**:

1. Revise comandos sugeridos antes da aprovação
2. Evite canalizar conteúdo não confiável diretamente para Claude
3. Verifique as alterações propostas em arquivos críticos
4. Use máquinas virtuais (VMs) para executar scripts e fazer chamadas de ferramenta, especialmente ao interagir com serviços web externos
5. Relate comportamento suspeito com `/bug`

Embora essas proteções reduzam significativamente o risco, nenhum sistema é completamente
imune a todos os ataques. Sempre mantenha boas práticas de segurança ao trabalhar
com qualquer ferramenta de IA.

[​](#segurança-do-mcp) Segurança do MCP
---------------------------------------

Claude Code permite que os usuários configurem servidores do Model Context Protocol (MCP). A lista de servidores MCP permitidos é configurada no seu código-fonte, como parte das configurações do Claude Code que os engenheiros verificam no controle de versão.
Encorajamos escrever seus próprios servidores MCP ou usar servidores MCP de provedores em que você confia. Você pode configurar permissões do Claude Code para servidores MCP. Anthropic não gerencia nem audita nenhum servidor MCP.

[​](#segurança-do-ide) Segurança do IDE
---------------------------------------

Consulte [Segurança e privacidade do VS Code](/docs/pt/vs-code#security-and-privacy) para mais informações sobre como executar Claude Code em um IDE.

[​](#segurança-de-execução-em-nuvem) Segurança de execução em nuvem
-------------------------------------------------------------------

Ao usar [Claude Code na web](/docs/pt/claude-code-on-the-web), controles de segurança adicionais estão em vigor:

* **Máquinas virtuais isoladas**: Cada sessão em nuvem é executada em uma VM isolada gerenciada pela Anthropic
* **Controles de acesso à rede**: O acesso à rede é limitado por padrão e pode ser configurado para ser desabilitado ou permitir apenas domínios específicos
* **Proteção de credenciais**: A autenticação é tratada através de um proxy seguro que usa uma credencial com escopo dentro da sandbox, que é então traduzida para seu token de autenticação GitHub real
* **Restrições de branch**: Operações de git push são restritas ao branch de trabalho atual
* **Registro de auditoria**: Todas as operações em ambientes em nuvem são registradas para fins de conformidade e auditoria
* **Limpeza automática**: Ambientes em nuvem são automaticamente encerrados após a conclusão da sessão

Para mais detalhes sobre execução em nuvem, consulte [Claude Code na web](/docs/pt/claude-code-on-the-web).

[​](#melhores-práticas-de-segurança) Melhores práticas de segurança
-------------------------------------------------------------------

### [​](#trabalhando-com-código-sensível) Trabalhando com código sensível

* Revise todas as alterações sugeridas antes da aprovação
* Use configurações de permissão específicas do projeto para repositórios sensíveis
* Considere usar [devcontainers](/docs/pt/devcontainer) para isolamento adicional
* Audite regularmente suas configurações de permissão com `/permissions`

### [​](#segurança-da-equipe) Segurança da equipe

* Use [configurações gerenciadas](/docs/pt/iam#managed-settings) para impor padrões organizacionais
* Compartilhe configurações de permissão aprovadas através do controle de versão
* Treine membros da equipe sobre melhores práticas de segurança
* Monitore o uso do Claude Code através de [métricas OpenTelemetry](/docs/pt/monitoring-usage)

### [​](#relatando-problemas-de-segurança) Relatando problemas de segurança

Se você descobrir uma vulnerabilidade de segurança no Claude Code:

1. Não a divulgue publicamente
2. Relate-a através do nosso [programa HackerOne](https://hackerone.com/anthropic-vdp/reports/new?type=team&report_type=vulnerability)
3. Inclua etapas detalhadas de reprodução
4. Permita tempo para que abordemos o problema antes da divulgação pública

[​](#recursos-relacionados) Recursos relacionados
-------------------------------------------------

* [Sandboxing](/docs/pt/sandboxing) - Isolamento de sistema de arquivos e rede para comandos bash
* [Gerenciamento de Identidade e Acesso](/docs/pt/iam) - Configure permissões e controles de acesso
* [Monitoramento de uso](/docs/pt/monitoring-usage) - Rastreie e audite a atividade do Claude Code
* [Contêineres de desenvolvimento](/docs/pt/devcontainer) - Ambientes seguros e isolados
* [Anthropic Trust Center](https://trust.anthropic.com) - Certificações de segurança e conformidade