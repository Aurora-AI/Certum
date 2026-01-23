---
description: Executar auditoria completa de código, performance e aderência às regras visuais e documentos técnicos do Mad Lab
---

# Audit

Use este workflow para verificar se o código atual está em conformidade com os padrões Certum e os documentos técnicos do Mad Lab Aurora.

## Steps

1. **Carregue** o contexto de governança:
   - Leia `.antigravity/rules.md` (Lei Suprema)
   - Leia `.antigravity/constitution.md` (Identidade)

2. **Consulte** o Knowledge Base:
   - Leia `.antigravity/knowledge/os/` para documentos técnicos do Mad Lab
   - Leia `.antigravity/knowledge/documento_tecnicos/` para especificações
   - Identifique requisitos visuais e funcionais documentados

3. **Verifique** aderência visual (conforme `rules.md`):
   - [ ] Background é Absolute White (`#FFFFFF`)?
   - [ ] Tipografia usa apenas Serif (Playfair) ou Mono (JetBrains/Geist)?
   - [ ] Há Dark Mode fora do Footer? (PROIBIDO)
   - [ ] Há sombras pesadas? (PROIBIDO - use bordas finas)
   - [ ] Noise/Grid textures estão presentes no fundo?

4. **Verifique** componentes cinéticos:
   - [ ] Títulos usam `<KineticHeading />` com efeito Scramble?
   - [ ] Scroll-triggered reveals estão implementados?
   - [ ] Hover states têm transição grayscale → color?

// turbo 5. **Execute** verificação de tipos:

```bash
npx tsc --noEmit
```

// turbo 6. **Execute** linter:

```bash
npm run lint
```

7. **Analise** performance e cleanup:
   - [ ] Há `console.log` no código? (PROIBIDO em produção)
   - [ ] Todo `gsap.context()` tem `revert()` no cleanup?
   - [ ] Listeners de window/scroll são removidos no unmount?
   - [ ] Animações usam apenas `transform` e `opacity`?

8. **Compare** com documentos técnicos:
   - A interface atual reflete as especificações em `knowledge/documento_tecnicos/`?
   - Os fluxos de usuário condizem com os requisitos documentados?
   - Há funcionalidades descritas nos docs que estão faltando?

9. **Emita** relatório com formato:

```markdown
## VEREDITO: [APROVADO / RECUSADO]

### Conformidade com Regras Visuais

- [x] Checklist item 1
- [ ] Checklist item 2 (FALHA)

### Conformidade com Documentos Técnicos

- Documento: `{nome_do_documento}`
- Status: [CONFORME / NÃO CONFORME]
- Discrepâncias: [Lista]

### Violações de Código

- [Lista de problemas encontrados]

### Performance

- TypeScript: [OK / ERROS]
- Lint: [OK / WARNINGS / ERRORS]
- GSAP Cleanup: [OK / VAZAMENTOS]

### Ações Corretivas

1. [Ação 1 com código corrigido]
2. [Ação 2 com código corrigido]

### Risco Futuro

- [Onde isso pode quebrar em 6 meses?]
```
