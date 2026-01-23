# CERTUM WEALTH V2: MASTER BLUEPRINT
## Manual de Design da Plataforma

**Versão:** 2.0 (Sovereign Light)  
**Data:** 22/01/2026  
**Visual Standard:** High Finance Architecture  
**Target Score:** 9.0+ (Superar Linear, Stripe, Apple)

---

## 0. ANÁLISE DO HERO (PADRÃO CANÔNICO)

### O Que o Hero Estabelece Como Lei

Analisando os frames do Hero atual, extraí os **Tokens de Design Invioláveis**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HERO ANATOMY                                                               │
│                                                                             │
│  ┌─ HEADER ─────────────────────────────────────────────────────────────┐  │
│  │  CERTUM (wordmark, black)              ☰ Menu (circle, outline)      │  │
│  │  ● PROTOCOL GENESIS V.3 (mono, small, muted)                         │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─ MAIN TYPOGRAPHY ────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │   W E A L T H.                                                       │  │
│  │   ████████████████████ (Image Mask - Grayscale Metal)               │  │
│  │                                                                      │  │
│  │   A R C H I T E C T U R E.                                          │  │
│  │   ████████████████████████████ (Image Mask - Warm Interiors)        │  │
│  │                                                                      │  │
│  │   Text Scramble: Decryption effect on load                          │  │
│  │   Font: Serif Bold, Tracking Wide                                   │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─ FOOTER BAR ─────────────────────────────────────────────────────────┐  │
│  │  O sistema operacional    │  TVL           YIELD      │ INITIATE    │  │
│  │  para alavancagem         │  R$ 14.2Bi    +18.4%     │ PROTOCOL    │  │
│  │  soberana...              │  (mono)       (green)    │ (black btn) │  │
│  │                           │                          │             │  │
│  │  VISLUMBRAR FUTURO (anchor link)                    │ BY INVITE   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  BACKGROUND: Off-White (#F2F2F2) com ghost image de casa/plantas           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### TOKENS DE DESIGN EXTRAÍDOS DO HERO

| TOKEN | VALOR | USO |
|-------|-------|-----|
| **Background Primary** | `#F2F2F2` (Off-White Técnico) | Atmosfera geral |
| **Text Primary** | `#1A1A1A` (Near Black) | Headlines, body |
| **Text Muted** | `#8A8A8A` (Gray 500) | Labels, captions |
| **Accent Data** | `#00C853` (Emerald) | Números positivos, yields |
| **CTA Primary** | `#1A1A1A` (Black) | Botões principais |
| **Font Headline** | Serif Bold, tracking `0.05em` | Títulos grandes |
| **Font Mono** | Mono Medium, tracking `0.1em` | Dados, labels técnicos |
| **Font Body** | Sans-serif Light | Descrições |
| **Image Treatment** | Grayscale → Warm via mask | Texturas em tipografia |
| **Animation** | Text scramble (decryption) | Entrada de headlines |

---

## 1. BLOCO 2: THE HALL OF CLARITY
### *Os 3 Pilares da Engenharia Patrimonial*

#### 1.1 Conceito Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  THE HALL OF CLARITY                                                        │
│  "Arquitetura de 3 Pilares"                                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐              │   │
│  │   │             │   │             │   │             │              │   │
│  │   │   PILAR 1   │   │   PILAR 2   │   │   PILAR 3   │              │   │
│  │   │             │   │             │   │             │              │   │
│  │   │  CONSÓRCIO  │   │   SEGUROS   │   │   WEALTH    │              │   │
│  │   │  ▔▔▔▔▔▔▔▔▔  │   │  ▔▔▔▔▔▔▔▔▔  │   │  ▔▔▔▔▔▔▔▔▔  │              │   │
│  │   │             │   │             │   │             │              │   │
│  │   │  Alavanca   │   │  Protege    │   │  Multiplica │              │   │
│  │   │  Capital    │   │  Ativos     │   │  Legado     │              │   │
│  │   │             │   │             │   │             │              │   │
│  │   │   R$ 8.2Bi  │   │   R$ 4.1Bi  │   │   R$ 1.9Bi  │              │   │
│  │   │   em cartas │   │   em prêmio │   │   sob gestão│              │   │
│  │   │             │   │             │   │             │   ← SCROLL   │   │
│  │   └─────────────┘   └─────────────┘   └─────────────┘     REVEAL   │   │
│  │         │                 │                 │                      │   │
│  │         └─────────────────┼─────────────────┘                      │   │
│  │                           │                                        │   │
│  │                     ┌─────┴─────┐                                  │   │
│  │                     │  GENESIS  │                                  │   │
│  │                     │  PROTOCOL │                                  │   │
│  │                     └───────────┘                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Layout: "Temple Columns" - 3 colunas verticais que se conectam            │
│  ao "alicerce" central (Genesis Protocol)                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Descrição da Cena:**
- Três "pilares" arquitetônicos verticais que literalmente sustentam a estrutura
- Cada pilar é um card de vidro fosco com borda sutil
- Os pilares se conectam visualmente a uma base horizontal (o Protocolo Genesis)
- Sensação de engenharia estrutural, não de "features de SaaS"

#### 1.2 Mecânica Cinética (GSAP)

| TRIGGER | ANIMAÇÃO | TIMING |
|---------|----------|--------|
| Scroll Enter (50%) | Pilares "crescem" de baixo para cima (scaleY: 0→1) | 0.8s stagger 0.2s |
| Scroll Enter (70%) | Dados numéricos fazem "count up" | 1.5s ease-out |
| Scroll Enter (90%) | Linha de conexão desenha-se (stroke-dashoffset) | 0.6s |
| Hover Pilar | Glow sutil + lift (translateY: -8px) | 0.3s |

**GSAP Code Pattern:**
```javascript
// Pin não necessário - Pure Reveal
gsap.timeline({
  scrollTrigger: {
    trigger: "#hall-of-clarity",
    start: "top 60%",
    toggleActions: "play none none reverse"
  }
})
.from(".pillar", { scaleY: 0, transformOrigin: "bottom", stagger: 0.2, duration: 0.8 })
.from(".pillar-data", { textContent: 0, snap: { textContent: 1 }, duration: 1.5 }, "-=0.4")
.from(".connection-line", { strokeDashoffset: 500, duration: 0.6 }, "-=0.8");
```

#### 1.3 Referência de Elite

| SITE | O QUE EXTRAIR |
|------|---------------|
| **Linear.app** | Cards com glassmorphism sutil sobre fundo claro |
| **Stripe Atlas** | Estrutura de "pilares" conectados |
| **Apple Services** | Tipografia de número grande + label pequeno |

#### 1.4 Estado da Atmosfera

```typescript
SiteAtmosphere: {
  backgroundMood: 'void', // Off-white padrão
  accentColor: '#1A1A1A', // Black para os pilares
  // Sem mudança de cor - mantém neutralidade
}
```

#### 1.5 Componentes Chave

```typescript
// Legos necessários:
<Pillar 
  title="CONSÓRCIO"
  description="Alavanca Capital"
  metric="R$ 8.2Bi"
  metricLabel="em cartas ativas"
/>

<ConnectionLine from="pillar-1" to="genesis-core" />

<NumberTicker 
  value={8200000000}
  format="currency"
  duration={1.5}
/>

<SectionHeading 
  eyebrow="PROTOCOL GENESIS V.3"
  title="THE HALL OF CLARITY"
  scramble={true}
/>
```

---

## 2. BLOCO 3: THE VAULT
### *O Inventário de Ativos Alavancáveis*

#### 2.1 Conceito Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  THE VAULT                                                                  │
│  "Horizontal Gallery with Depth"                                           │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │   ← DRAG TO EXPLORE →                                              │   │
│  │                                                                     │   │
│  │   ┌───────────────┐                                                │   │
│  │   │               │                                                │   │
│  │   │   ░░░░░░░░░   │   ┌───────────────┐                           │   │
│  │   │   ░ IMÓVEIS ░ │   │               │                           │   │
│  │   │   ░░░░░░░░░   │   │   ░░░░░░░░░   │   ┌───────────────┐      │   │
│  │   │               │   │   ░ FROTA  ░  │   │               │      │   │
│  │   │  R$ 500k+     │   │   ░░░░░░░░░   │   │   ░░░░░░░░░   │      │   │
│  │   │  70% leverage │   │               │   │   ░  AGRO  ░  │      │   │
│  │   │               │   │  R$ 300k+     │   │   ░░░░░░░░░   │ ...  │   │
│  │   │   [EXPLORE]   │   │  80% leverage │   │               │      │   │
│  │   │               │   │               │   │  R$ 400k+     │      │   │
│  │   └───────────────┘   │   [EXPLORE]   │   │  70% leverage │      │   │
│  │         ↑             │               │   │               │      │   │
│  │     CARD FOCAL        └───────────────┘   │   [EXPLORE]   │      │   │
│  │    (escala maior,           ↑             │               │      │   │
│  │     z-index alto)      CARD NEXT          └───────────────┘      │   │
│  │                       (escala 0.9,              ↑                │   │
│  │                        opacidade 0.8)      CARD QUEUE            │   │
│  │                                           (escala 0.8,           │   │
│  │                                            opacidade 0.6)        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Layout: "Stacked Carousel" com parallax de profundidade                   │
│  Os cards "atrás" são menores e mais opacos                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Descrição da Cena:**
- Galeria horizontal com drag-to-scroll
- Cards empilhados com efeito de profundidade (escala e opacidade decrescente)
- Cada card tem imagem tratada (grayscale com hint de cor quente)
- Sensação de "cofre de possibilidades" sendo explorado

#### 2.2 Mecânica Cinética (GSAP)

| TRIGGER | ANIMAÇÃO | TIMING |
|---------|----------|--------|
| Scroll Enter | Cards entram da direita em stagger | 0.6s stagger 0.15s |
| Drag/Swipe | Cards reorganizam com spring physics | 0.4s ease-out-back |
| Card Focus | Card central escala para 1.0, outros diminuem | 0.3s |
| Hover Card | Image revela cor (grayscale → color) | 0.5s |

**GSAP Code Pattern:**
```javascript
// Horizontal Drag Carousel
Draggable.create("#vault-track", {
  type: "x",
  inertia: true,
  bounds: "#vault-container",
  onDrag: updateCardDepth,
  onThrowUpdate: updateCardDepth
});

function updateCardDepth() {
  cards.forEach((card, i) => {
    const distance = Math.abs(card.offsetLeft - centerX);
    const scale = gsap.utils.mapRange(0, 400, 1, 0.75, distance);
    const opacity = gsap.utils.mapRange(0, 400, 1, 0.5, distance);
    gsap.to(card, { scale, opacity, duration: 0.2 });
  });
}
```

#### 2.3 Referência de Elite

| SITE | O QUE EXTRAIR |
|------|---------------|
| **Apple TV+ (Shows)** | Carousel com profundidade e hover reveal |
| **Porsche Configurator** | Cards de produto com dados técnicos |
| **Stripe Press** | Tratamento de imagem grayscale elegante |

#### 2.4 Estado da Atmosfera

```typescript
SiteAtmosphere: {
  backgroundMood: 'void', // Mantém off-white
  // Possível transição sutil se usuário interagir muito
}
```

#### 2.5 Componentes Chave

```typescript
<VaultCarousel>
  <AssetCard
    category="IMÓVEIS"
    image="/assets/real-estate.jpg"
    ticket="R$ 500k+"
    leverage="70%"
    cta="EXPLORE"
    imageFilter="grayscale-to-warm"
  />
  // ... mais cards
</VaultCarousel>

<DragIndicator direction="horizontal" />

<CategoryFilter 
  options={['ALL', 'IMÓVEIS', 'FROTA', 'AGRO', 'NÁUTICA']}
  variant="pills"
/>
```

---

## 3. BLOCO 4: THE GENESIS PROTOCOL
### *A Metodologia em 3 Fases*

#### 3.1 Conceito Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  THE GENESIS PROTOCOL                                                       │
│  "Pinned Timeline with Horizontal Reveal"                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────┐                                                       │   │
│  │  │  PHASE  │                                                       │   │
│  │  │   01    │═══════════════════════════════════════════════►       │   │
│  │  │         │                                                       │   │
│  │  │ ANÁLISE │   "Mapeamos seu patrimônio atual,                    │   │
│  │  │         │    seus objetivos e seu apetite                      │   │
│  │  │   ◉     │    por risco em 72 horas."                           │   │
│  │  └─────────┘                                                       │   │
│  │       │                                                            │   │
│  │       │ SCROLL                                                     │   │
│  │       ▼                                                            │   │
│  │  ┌─────────┐                                                       │   │
│  │  │  PHASE  │                                                       │   │
│  │  │   02    │═══════════════════════════════════════════════►       │   │
│  │  │         │                                                       │   │
│  │  │ESTRATÉG.│   "Desenhamos a arquitetura de                       │   │
│  │  │         │    alavancagem ideal com simulações                  │   │
│  │  │   ◉     │    de Monte Carlo."                                  │   │
│  │  └─────────┘                                                       │   │
│  │       │                                                            │   │
│  │       │ SCROLL                                                     │   │
│  │       ▼                                                            │   │
│  │  ┌─────────┐                                                       │   │
│  │  │  PHASE  │                                                       │   │
│  │  │   03    │═══════════════════════════════════════════════►       │   │
│  │  │         │                                                       │   │
│  │  │EXECUÇÃO │   "Ativamos as cartas, os seguros e                  │   │
│  │  │         │    a blindagem patrimonial em paralelo."             │   │
│  │  │   ◉     │                                                       │   │
│  │  └─────────┘                                                       │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Layout: "Pinned Vertical Timeline"                                        │
│  O texto de cada fase revela-se progressivamente conforme scroll           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Descrição da Cena:**
- Timeline vertical com 3 fases "pinadas"
- Cada fase ocupa 100vh durante o scroll
- O texto revela-se palavra por palavra (typewriter effect)
- Linha de progresso preenche conforme avança
- Sensação de "processo industrial de precisão"

#### 3.2 Mecânica Cinética (GSAP)

| TRIGGER | ANIMAÇÃO | TIMING |
|---------|----------|--------|
| Section Enter | Pin da seção (scrub) | Durante 300vh |
| Phase Enter | Número grande faz morphing (01→02→03) | 0.6s |
| Phase Active | Texto revela palavra por palavra | 0.05s per word |
| Progress Line | Stroke-dashoffset acompanha scroll | Scrubbed |
| Phase Complete | Checkpoint "pulsa" (scale 1→1.2→1) | 0.3s |

**GSAP Code Pattern:**
```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: "#genesis-protocol",
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1
  }
})
.to(".phase-number", { morphSVG: "#phase-02" }, 0.33)
.to(".phase-text", { 
  text: { value: "Desenhamos a arquitetura..." },
  ease: "none"
}, 0.33)
.to(".progress-line", { strokeDashoffset: 0 }, "<")
.to(".phase-number", { morphSVG: "#phase-03" }, 0.66);
```

#### 3.3 Referência de Elite

| SITE | O QUE EXTRAIR |
|------|---------------|
| **Linear.app (Changelog)** | Timeline vertical com reveal progressivo |
| **Stripe (How it Works)** | Pinned section com scrub |
| **Apple (AirPods)** | Texto que revela palavra por palavra |

#### 3.4 Estado da Atmosfera

```typescript
SiteAtmosphere: {
  backgroundMood: 'warm', // Sutil shift para âmbar durante o processo
  accentColor: '#C9A227', // Gold para os checkpoints
}
```

#### 3.5 Componentes Chave

```typescript
<PinnedTimeline phases={3}>
  <TimelinePhase
    number="01"
    title="ANÁLISE"
    description="Mapeamos seu patrimônio atual..."
    checkpoint={true}
  />
  // ... mais fases
</PinnedTimeline>

<ProgressLine 
  scrubbed={true}
  color="var(--accent-color)"
/>

<WordReveal 
  text="Mapeamos seu patrimônio atual..."
  trigger="scroll"
  stagger={0.05}
/>

<MorphNumber 
  from="01"
  to="03"
  scrubbed={true}
/>
```

---

## 4. BLOCO 5: SYSTEM PROOF
### *Dashboard de Performance do Ecossistema*

#### 4.1 Conceito Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  SYSTEM PROOF                                                               │
│  "Data Bento Grid"                                                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │   ┌─────────────────────────────┐  ┌──────────────┐                │   │
│  │   │                             │  │              │                │   │
│  │   │   TOTAL VALUE LOCKED        │  │  YIELD       │                │   │
│  │   │                             │  │  MÉDIO       │                │   │
│  │   │   R$ 14.2                   │  │              │                │   │
│  │   │   ████████████ Bi          │  │  +18.4%      │                │   │
│  │   │                             │  │  ▲ 2.3%     │                │   │
│  │   │   ░░░░░░░░░░░░░░░░░░░░░░░░░│  │              │                │   │
│  │   │   (spark line 12 meses)    │  │              │                │   │
│  │   │                             │  │              │                │   │
│  │   └─────────────────────────────┘  └──────────────┘                │   │
│  │                                                                     │   │
│  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │   │
│  │   │              │  │              │  │              │            │   │
│  │   │  CARTAS      │  │  CONTEMPLA-  │  │  TEMPO       │            │   │
│  │   │  ATIVAS      │  │  ÇÕES/MÊS    │  │  MÉDIO       │            │   │
│  │   │              │  │              │  │              │            │   │
│  │   │  127.4K      │  │  2.847       │  │  38          │            │   │
│  │   │              │  │              │  │  meses       │            │   │
│  │   │              │  │  ◉◉◉◉◉◉◉◉◉◉ │  │              │            │   │
│  │   │              │  │  (progress)  │  │              │            │   │
│  │   └──────────────┘  └──────────────┘  └──────────────┘            │   │
│  │                                                                     │   │
│  │   ┌─────────────────────────────────────────────────────────────┐  │   │
│  │   │                                                             │  │   │
│  │   │   "Desde 1949, mais de R$ 180 bilhões em créditos          │  │   │
│  │   │    liberados para brasileiros construírem patrimônio."     │  │   │
│  │   │                                                             │  │   │
│  │   │                              — ECOSSISTEMA RODOBENS         │  │   │
│  │   └─────────────────────────────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Layout: "Bento Grid" estilo Apple com cards de dados                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Descrição da Cena:**
- Grid assimétrico "Bento Box" (2 grandes + 3 pequenos + 1 quote)
- Cada card tem um único KPI com visualização mínima
- Spark lines e progress bars em vez de charts pesados
- Quote institucional no final para humanizar os dados
- Sensação de "terminal financeiro de alta precisão"

#### 4.2 Mecânica Cinética (GSAP)

| TRIGGER | ANIMAÇÃO | TIMING |
|---------|----------|--------|
| Scroll Enter | Cards entram em stagger diagonal | 0.5s stagger 0.1s |
| Card Visible | Número faz count-up | 1.5s ease-out |
| Card Visible | Spark line desenha-se | 1.0s |
| Hover Card | Glow sutil + shadow lift | 0.3s |
| Quote Enter | Fade in com blur → sharp | 0.8s |

**GSAP Code Pattern:**
```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: "#system-proof",
    start: "top 70%"
  }
})
.from(".data-card", {
  opacity: 0,
  y: 30,
  stagger: { amount: 0.5, from: "start" }
})
.from(".number-value", {
  textContent: 0,
  snap: { textContent: 1 },
  duration: 1.5
}, "-=0.3")
.from(".spark-line path", {
  strokeDashoffset: 200,
  duration: 1
}, "-=1");
```

#### 4.3 Referência de Elite

| SITE | O QUE EXTRAIR |
|------|---------------|
| **Apple (Bento Grid)** | Layout assimétrico de cards |
| **Linear Dashboard** | KPIs com visualizações mínimas |
| **Stripe Radar** | Spark lines e data visualization |
| **Vercel Analytics** | Cards de dados com hover states |

#### 4.4 Estado da Atmosfera

```typescript
SiteAtmosphere: {
  backgroundMood: 'trust', // Shift sutil para azul (confiança em dados)
  accentColor: '#00C853', // Green para números positivos
}
```

#### 4.5 Componentes Chave

```typescript
<BentoGrid>
  <DataCard 
    size="large"
    label="TOTAL VALUE LOCKED"
    value={14200000000}
    format="currency-short"
    suffix="Bi"
    sparkline={tvlHistory}
  />
  <DataCard 
    size="medium"
    label="YIELD MÉDIO"
    value={18.4}
    format="percent"
    trend={+2.3}
  />
  // ... mais cards
</BentoGrid>

<SparkLine data={history} color="var(--accent-color)" />

<NumberTicker 
  value={127400}
  format="number-short"
  suffix="K"
/>

<QuoteCard 
  text="Desde 1949, mais de R$ 180 bilhões..."
  attribution="ECOSSISTEMA RODOBENS"
/>
```

---

## 5. BLOCO 6: MISSION COMMAND
### *Footer de Conversão Final*

#### 5.1 Conceito Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  MISSION COMMAND                                                            │
│  "Dark Contrast Footer"                                                     │
│                                                                             │
│  ████████████████████████████████████████████████████████████████████████  │
│  █                                                                      █  │
│  █   ┌─────────────────────────────────────────────────────────────┐   █  │
│  █   │                                                             │   █  │
│  █   │              INITIATE YOUR PROTOCOL                         │   █  │
│  █   │                                                             │   █  │
│  █   │   O momento de construir seu legado é agora.                │   █  │
│  █   │   Agende sua sessão de arquitetura patrimonial.             │   █  │
│  █   │                                                             │   █  │
│  █   │   ┌─────────────────────────────────────────────────────┐   │   █  │
│  █   │   │                                                     │   │   █  │
│  █   │   │   [  AGENDAR SESSÃO ESTRATÉGICA  ]                  │   │   █  │
│  █   │   │                                                     │   │   █  │
│  █   │   │   ou ligue: 0800 123 4567                           │   │   █  │
│  █   │   │                                                     │   │   █  │
│  █   │   └─────────────────────────────────────────────────────┘   │   █  │
│  █   │                                                             │   █  │
│  █   └─────────────────────────────────────────────────────────────┘   █  │
│  █                                                                      █  │
│  █   ─────────────────────────────────────────────────────────────────  █  │
│  █                                                                      █  │
│  █   CERTUM PRIVATE                                                     █  │
│  █   Wealth Architecture by Rodobens                                    █  │
│  █                                                                      █  │
│  █   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              █  │
│  █   │  PRODUTOS    │  │  EMPRESA     │  │  LEGAL       │              █  │
│  █   │              │  │              │  │              │              █  │
│  █   │  Consórcio   │  │  Sobre       │  │  Privacidade │              █  │
│  █   │  Seguros     │  │  Carreiras   │  │  Termos      │              █  │
│  █   │  Wealth      │  │  Imprensa    │  │  Compliance  │              █  │
│  █   └──────────────┘  └──────────────┘  └──────────────┘              █  │
│  █                                                                      █  │
│  █   © 2026 Certum Private. Todos os direitos reservados.              █  │
│  █   CNPJ: XX.XXX.XXX/0001-XX | Av. Brigadeiro Faria Lima, 1234        █  │
│  █                                                                      █  │
│  ████████████████████████████████████████████████████████████████████████  │
│                                                                             │
│  Layout: Inversão total - Dark background para peso e urgência             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Descrição da Cena:**
- INVERSÃO TOTAL: Background `#0A0A0A` (Void Black)
- Cria contraste dramático após todo o site light
- CTA principal grande e centrado (botão gold/white)
- Links de navegação em grid 3 colunas
- Compliance e dados legais em texto pequeno
- Sensação de "fechamento de ciclo" - do light ao dark

#### 5.2 Mecânica Cinética (GSAP)

| TRIGGER | ANIMAÇÃO | TIMING |
|---------|----------|--------|
| Section Enter | Background faz "wipe" de light para dark | 0.8s |
| CTA Enter | Headline faz text scramble | 1.0s |
| CTA Hover | Button glow + pulse | 0.3s loop |
| Links Enter | Fade in stagger por coluna | 0.4s stagger 0.05s |

**GSAP Code Pattern:**
```javascript
gsap.timeline({
  scrollTrigger: {
    trigger: "#mission-command",
    start: "top 80%"
  }
})
.to(".site-atmosphere", {
  "--bg-primary": "#0A0A0A",
  "--bg-secondary": "#0A0A0A",
  duration: 0.8
})
.from(".cta-headline", {
  scrambleText: { text: "INITIATE YOUR PROTOCOL", chars: "01" }
}, "-=0.4")
.from(".footer-links a", {
  opacity: 0,
  y: 10,
  stagger: 0.05
}, "-=0.2");
```

#### 5.3 Referência de Elite

| SITE | O QUE EXTRAIR |
|------|---------------|
| **Linear (Footer)** | Grid de links limpo sobre dark |
| **Stripe (CTA Section)** | Headline grande + single CTA |
| **Apple (Footer)** | Hierarquia de informação legal |

#### 5.4 Estado da Atmosfera

```typescript
SiteAtmosphere: {
  backgroundMood: 'void-dark', // NOVO ESTADO - Dark mode forçado
  accentColor: '#C9A227', // Gold para CTA
  textColor: '#FFFFFF'
}
```

#### 5.5 Componentes Chave

```typescript
<DarkSection>
  <CTABlock
    eyebrow="MISSION COMMAND"
    headline="INITIATE YOUR PROTOCOL"
    description="O momento de construir seu legado é agora."
    primaryCTA={{ label: "AGENDAR SESSÃO ESTRATÉGICA", href: "/agendar" }}
    secondaryCTA={{ label: "0800 123 4567", href: "tel:08001234567" }}
  />

  <FooterLinks 
    columns={[
      { title: "PRODUTOS", links: [...] },
      { title: "EMPRESA", links: [...] },
      { title: "LEGAL", links: [...] }
    ]}
  />

  <LegalFooter 
    copyright="2026 Certum Private"
    cnpj="XX.XXX.XXX/0001-XX"
    address="Av. Brigadeiro Faria Lima, 1234"
  />
</DarkSection>
```

---

## 6. RESUMO DO BLUEPRINT

### Tabela de Blocos

| # | BLOCO | CONCEITO | MECÂNICA GSAP | REFERÊNCIA | ATMOSFERA |
|---|-------|----------|---------------|------------|-----------|
| 2 | THE HALL OF CLARITY | Temple Columns | Reveal + Count Up | Linear, Stripe Atlas | `void` |
| 3 | THE VAULT | Stacked Carousel | Drag + Depth Scale | Apple TV+, Porsche | `void` |
| 4 | THE GENESIS PROTOCOL | Pinned Timeline | Pin + Word Reveal | Linear Changelog | `warm` |
| 5 | SYSTEM PROOF | Data Bento Grid | Stagger + Count Up | Apple Bento, Vercel | `trust` |
| 6 | MISSION COMMAND | Dark Contrast Footer | Wipe + Scramble | Linear Footer | `void-dark` |

### Componentes Compartilhados Necessários

```typescript
// Core Components
<SectionHeading />      // Eyebrow + Title + Scramble
<NumberTicker />        // Animated count-up
<SparkLine />           // Mini chart
<ProgressLine />        // SVG line with dashoffset
<WordReveal />          // Text reveal word-by-word

// Layout Components
<BentoGrid />           // Asymmetric grid
<PinnedTimeline />      // ScrollTrigger pin
<VaultCarousel />       // Draggable carousel

// Data Components
<DataCard />            // KPI card with visualization
<Pillar />              // Vertical column card
<QuoteCard />           // Testimonial/quote block

// Interactive Components
<DragIndicator />       // Visual drag hint
<CategoryFilter />      // Pill filter buttons
<CTABlock />            // CTA section

// Atmosphere
<DarkSection />         // Forces dark mode
<SiteAtmosphere />      // Global color controller
```

### Flow da Atmosfera

```
HERO          → void (off-white)
     ↓
HALL          → void (off-white)
     ↓
VAULT         → void (off-white)
     ↓
PROTOCOL      → warm (âmbar sutil) ← Transição GSAP 2s
     ↓
PROOF         → trust (azul sutil) ← Transição GSAP 2s
     ↓
COMMAND       → void-dark (black)  ← Transição GSAP 0.8s
```

---

## 7. PRÓXIMO PASSO

**PRONTO PARA EXECUÇÃO.**

Pegue o **BLOCO 2 (THE HALL OF CLARITY)** e envie para o DeepSeek/Claude Code com esta especificação:

```
OS-2026-007: THE HALL OF CLARITY
Visual: Temple Columns sobre Off-White
Mecânica: Reveal + Count Up
Componentes: <Pillar />, <NumberTicker />, <ConnectionLine />
```

---

*"High Finance Architecture: Cada pixel é um tijolo de confiança."*
*— Design Manual Certum V2*
