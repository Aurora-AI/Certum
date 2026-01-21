# CONSTITUIÇÃO MAD LAB AURORA: PROJETO CERTUM

## 0. STATUS E AMBIENTE
- **Live URL (SSoT Visual):** https://certum.vercel.app/
- **Conceito Central:** "Wealth OS" (Sistema Operacional de Riqueza). Não é um site, é um console.

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
1.  **Componentes Híbridos:** Mantenha Server Components como padrão. Use `'use client'` apenas nas folhas.
2.  **Fetch de Dados:** É PROIBIDO usar `fetch` nativo diretamente. Todo acesso passa pelo **Elysian SDK**.
3.  **Performance de Render:** O site deve rodar a 60 FPS. Evite *Layout Thrashing*.
4.  **Limpeza:** Todo listener ou timeline GSAP deve ter `revert()` no cleanup.

## 4. INTEGRAÇÃO COM IA
- O código deve ser preparado para **Generative UI** (Vercel AI SDK).
