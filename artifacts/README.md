# Artifacts Directory

Este diretório contém evidências de trabalho dos agentes, seguindo o protocolo **Artifact-First**.

## Tipos de Artefatos

| Tipo             | Padrão de Nome             | Descrição                               |
| ---------------- | -------------------------- | --------------------------------------- |
| **Planos**       | `plan_{feature}.md`        | Arquitetura proposta antes de codificar |
| **Walkthroughs** | `walkthrough_{feature}.md` | Guia de verificação pós-implementação   |
| **Relatórios**   | `report_{date}.md`         | Resultados de auditorias e análises     |

## Protocolo

1. Todo plano deve ser criado **antes** de escrever código
2. Todo walkthrough deve explicar **como verificar** as mudanças
3. Artefatos são a **evidência** do trabalho do agente

---

> Este diretório é ignorado pelo Git por padrão (adicione ao `.gitignore` se necessário).
