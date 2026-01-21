# CONSTITUIÇÃO MAD LAB AURORA: PROJETO CERTUM

## 1. IDENTIDADE E ESTÉTICA
- **Filosofia:** "Brutalismo de Luxo". A interface deve ser pesada, sólida, escura e intimidadora, mas refinada como uma joia.
- **Visual:** Fundo Preto Absoluto (`#000000` ou `#050505`). Tipografia serifada para títulos (Vogue/Editorial) e monoespaçada para dados técnicos (Militar/HUD).
- **Sensação:** Inércia, peso, "Smoothness". Nada aparece instantaneamente; tudo se revela.

## 2. STACK TECNOLÓGICO (S-TIER)
- **Framework:** Next.js 15 (App Router) + React 19.
- **Linguagem:** TypeScript em Strict Mode. O uso de `any` é considerado crime capital.
- **Estilização:** Tailwind CSS v4.
- **Motion Engine:** - GSAP (via hook `useGSAP` - proibido usar `useEffect` para animações).
  - Lenis (Scroll Smooth Obrigatório).
  - Framer Motion (para micro-interações de UI).
- **Componentes:** Radix UI (Headless) + Shadcn/UI (Base customizada).

## 3. REGRAS DE OURO (ENGINEERING STANDARDS)
1.  **Componentes Híbridos:** Mantenha Server Components como padrão. Use `'use client'` apenas nas folhas (botões, interações, animações).
2.  **Fetch de Dados:** É PROIBIDO usar `fetch` nativo diretamente nos componentes. Todo acesso a dados deve passar pelo **Elysian SDK** ou Camada de Serviço tipada.
3.  **Performance de Render:** O site deve rodar a 60 FPS. Evite *Layout Thrashing*. Use `will-change` com sabedoria.
4.  **Limpeza:** Todo listener, timeline do GSAP ou intervalo deve ser limpo no `return` do hook.
5.  **Mobile First? Não.** "Experience First". O desktop é a vitrine de cinema, o mobile é o controle remoto. Ambos devem ser perfeitos, mas não idênticos.

## 4. INTEGRAÇÃO COM IA
- O código deve ser preparado para **Generative UI** (Vercel AI SDK). Componentes devem aceitar props que possam ser streamadas por um LLM.
