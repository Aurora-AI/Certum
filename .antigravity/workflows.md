# PROTOCOLO DE FLUXO AURORA

> ⚠️ **DEPRECATED:** Este arquivo foi substituído pelo padrão Antigravity.
>
> Os workflows agora estão em: `.agent/workflows/*.md`

---

## Workflows Disponíveis

Use os seguintes comandos slash para ativar workflows:

| Comando               | Descrição                                         |
| --------------------- | ------------------------------------------------- |
| `/audit`              | Auditoria completa de código e aderência visual   |
| `/build`              | Build de produção com validação de erros          |
| `/dev-server`         | Iniciar servidor de desenvolvimento               |
| `/plan-feature`       | Criar plano antes de implementar feature complexa |
| `/scaffold-component` | Criar novo componente com estrutura padrão        |

---

## Protocolo Original (Referência)

O fluxo básico permanece:

1. **New Feature Request:**
   - User → "Quero um efeito de distorção na imagem."
   - System → Executa `/plan-feature` → Gera `artifacts/plan_{feature}.md`

2. **Execution:**
   - User → "Aprovei. Execute."
   - System → Carrega `BUILDER.md` + Plano → Gera Código

3. **Audit:**
   - User → "Analise este código." (ou `/audit`)
   - System → Carrega `REVIEWER.md` → Emite Relatório
