---
description: Criar plano de implementação detalhado antes de codificar uma feature complexa
---

# Plan Feature

Use este workflow quando uma nova feature for solicitada. Seguindo o protocolo "Artifact-First", o plano deve ser criado ANTES de qualquer código.

## Steps

1. **Analise** o requisito do usuário e identifique:
   - Objetivo final
   - Componentes afetados
   - Dependências externas

2. **Consulte** o Knowledge Base:
   - `.antigravity/knowledge/gsap_docs/` para animações
   - `.antigravity/knowledge/tailwindcss/` para estilização
   - `.antigravity/knowledge/shadcn_ui/` para componentes

3. **Crie** o arquivo de plano:

```
artifacts/plan_{feature_name}.md
```

4. **Estruture** o plano com:
   - Objetivo
   - Arquitetura Proposta
   - Componentes a Criar/Modificar
   - Estimativa de Complexidade (1-10)
   - Riscos Identificados

5. **Apresente** o plano ao usuário para aprovação ANTES de prosseguir.

6. **Aguarde** confirmação explícita: "Aprovado. Execute."
