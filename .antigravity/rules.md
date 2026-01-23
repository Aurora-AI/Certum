# 🛡️ ANTIGRAVITY RULES: CERTUM PRIVATE V2

> **STATUS:** LEI SUPREMA (NON-NEGOTIABLE)
> **CONTEXTO:** Plataforma de Wealth Architecture (Ticket Alto)
> **REFERÊNCIA:** "The $90k Site" Aesthetic (Video Reference)

---

## 1. VISUAL AXIOMS (A LEI DO ABSOLUTE WHITE)

### 1.1. O Palco (Background)

- **REGRA:** O fundo de TODAS as seções (exceto Footer) deve ser **ABSOLUTE WHITE (`#FFFFFF`)**.
- 🚫 **PROIBIDO:** Off-white (`#F2F2F2`, `#F5F5F5`), Cinza, Bege ou Preto no corpo da página.
- **MOTIVO:** Somos uma galeria de arte, não um SaaS ou escritório de contabilidade. O branco absoluto cria contraste infinito.

### 1.2. A Atmosfera (Texturas & Molduras)

O branco nunca é "chapado". Ele deve conter:

- **Noise:** Granulação sutil (opacity 0.03, mix-blend-multiply) para simular papel moeda.
- **Grid:** Linhas matemáticas finíssimas (1px, opacity 0.03) para denotar precisão de engenharia.
- **Molduras:** O uso de bordas finas (`border-black/5`) e linhas verticais é encorajado para criar ritmo visual.

### 1.3. O Contraste (Tipografia)

- **Cor:** Texto principal sempre em **ABSOLUTE BLACK (`#000000`)**. Sem cinzas médios para leitura.
- **Vida:** A "cor" do site vem das **imagens** (dentro de molduras/cards) e dos **efeitos cinéticos**.

---

## 2. KINETIC PHYSICS (A VIDA DO SITE)

Um site branco sem movimento parece quebrado. A vida vem da **Física**, não da cor.

### 2.1. Tipografia Cinética

- Todo título de seção deve usar o componente `<KineticHeading />`.
- **Efeito:** Scramble/Decryption na entrada (`A8X# -> WEALTH`).
- **Masking:** Quando possível, usar máscaras de textura dentro de títulos gigantes (`bg-clip-text`).

### 2.2. Micro-Interações (GSAP)

- **Scroll:** Nada aparece "do nada". Tudo deve ter uma entrada triunfal (Reveal, Stagger, Pin).
- **Hover:** Imagens em Grayscale ganham cor (`saturation: 0 -> 1`) e escala sutil.
- **Feeling:** A animação deve ser PESADA e SUAVE (Inertia), denotando valor e solidez. Nada de movimentos rápidos ou elásticos ("bouncy").

---

## 3. COMPONENT ARCHITECTURE (LEGO SYSTEM)

### 3.1. Reutilização Obrigatória

Não crie componentes novos se os "Átomos" já existirem.

- Use `KineticHeading` para títulos.
- Use `SiteAtmosphere` para o fundo global.
- Use `PillarCard` ou `VaultCard` para grids.

### 3.2. Clean Code

- **Tailwind v4:** Use classes utilitárias. Evite CSS modules exceto para animações complexas.
- **TypeScript:** Strict mode. Sem `any`. Defina interfaces para tudo.

---

## 4. PROIBIÇÕES (RED FLAGS)

1.  🔴 **NUNCA** use fundo preto (Dark Mode) no meio da página. O preto é EXCLUSIVO para o Footer (Mission Command) para criar fechamento dramático.
2.  🔴 **NUNCA** use sombras pesadas (Drop Shadows). Prefira bordas finas (`border`) e glassmorphism sutil.
3.  🔴 **NUNCA** use fontes arredondadas ou "brincalhonas". Apenas Serif (Playfair/Similar) e Mono (JetBrains/Geist).

---

## 5. STACK TECNOLÓGICO (FERRAMENTAS APROVADAS)

### 5.1. Core

- **Framework:** React 18+ com Vite (ou Next.js 15 App Router quando SSR for necessário).
- **Linguagem:** TypeScript em Strict Mode. O uso de `any` é crime capital.
- **Estilização:** Tailwind CSS v4.

### 5.2. Motion Engine (Hierarquia de Uso)

1. **GSAP:** Animações complexas, ScrollTrigger, Pinning. Use sempre via `useGSAP` hook.
2. **Lenis:** Scroll Smooth obrigatório em todas as páginas.
3. **Framer Motion:** Micro-interações de UI (hover states, toggles, modals).

### 5.3. Componentes Base

- **Radix UI:** Primitivos headless para acessibilidade.
- **Shadcn/UI:** Base customizada (cores adaptadas ao "Absolute White").

---

## 6. PERFORMANCE & CLEANUP

### 6.1. 60 FPS ou Morte

- O site DEVE rodar a 60 FPS. Layout Thrashing é inadmissível.
- Use `will-change` com moderação. Prefira `transform` e `opacity` para animações.

### 6.2. GSAP Cleanup (CRÍTICO)

- Todo `gsap.context()` DEVE ter `revert()` no cleanup do `useEffect`/`useGSAP`.
- Listeners de window/scroll DEVEM ser removidos no unmount.

### 6.3. Build Hygiene

- 🚫 **PROIBIDO:** `console.log` em produção.
- 🚫 **PROIBIDO:** Imports de banco de dados ou API keys no client-side.

---

## 7. HIERARQUIA DE DECISÃO

Quando houver dúvida sobre um padrão visual ou técnico:

1. **Consulte o Live Site:** https://certum.vercel.app/ (Single Source of Truth Visual)
2. **Consulte este arquivo:** `.antigravity/rules.md`
3. **Consulte a Constitution:** `.antigravity/constitution.md`
4. **Consulte o Knowledge Base:** `.antigravity/knowledge/`

---

> **Lembrete ao Agente:** Antes de gerar qualquer código, pergunte-se: "Isso parece um site de $90.000 ou um template gratuito?" Se a resposta for a segunda, **REFAÇA**.
