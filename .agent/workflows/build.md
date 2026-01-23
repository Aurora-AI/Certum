---
description: Fazer build de produção e verificar se não há erros
---

# Build Production

Use este workflow para validar que o projeto compila corretamente para produção.

// turbo-all

## Steps

1. **Limpe** artefatos anteriores:

```bash
rm -rf dist
```

2. **Execute** build de produção:

```bash
npm run build
```

3. **Verifique** o resultado:
   - Build completou sem erros?
   - Tamanho do bundle está aceitável?

4. **Reporte** status ao usuário:
   - ✅ Build SUCCESS: Pronto para deploy
   - ❌ Build FAILED: Liste os erros encontrados
