---
description: Criar um novo componente React com TypeScript, estrutura de pastas e testes
---

# Scaffold Component

Use este workflow quando precisar criar um novo componente do zero.

## Steps

1. **Pergunte** ao usuário o nome do componente (PascalCase, ex: `GravityCard`).

2. **Crie** o diretório do componente:

```
components/{ComponentName}/
├── {ComponentName}.tsx
├── index.ts
└── types.ts
```

// turbo 3. **Execute** a verificação de tipos:

```bash
npx tsc --noEmit
```

4. **Valide** que o componente segue as regras:
   - Usa `'use client'` apenas se necessário
   - Não contém `any`
   - Exporta interface de Props em `types.ts`

5. **Reporte** ao usuário o caminho do componente criado.
