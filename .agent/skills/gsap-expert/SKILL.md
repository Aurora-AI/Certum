---
name: gsap-expert
description: Use when implementing complex animations, scroll-triggered effects, pinning sections, parallax, text scramble, number counters, or any motion design using GreenSock Animation Platform (GSAP). Specializes in GSAP 3 syntax, ScrollTrigger, Draggable, MorphSVG, and performance optimization for 60fps animations.
version: 1.0.0
author: Mad Lab Aurora
tags: [animation, gsap, scrolltrigger, motion, parallax]
---

# GSAP Animation Expert

## Goal

Create smooth, performant, and visually impactful animations using GSAP best practices, aligned with the "Brutalismo de Luxo" aesthetic of Mad Lab Aurora.

## Knowledge Base

Consult `.antigravity/knowledge/gsap_docs/` for official documentation and patterns.

## When to Use

- User requests scroll-triggered animations
- User wants pinned sections (scrub effect)
- User needs parallax effects
- User asks for text scramble/decryption effects
- User wants number counters (count-up)
- User needs drag interactions
- User mentions "GSAP", "ScrollTrigger", "timeline"

## Instructions

### 1. Setup Pattern

Always use `gsap.context()` for proper cleanup:

```typescript
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Component() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // All animations here
    }, containerRef);

    return () => ctx.revert(); // CRITICAL: Always cleanup
  }, []);

  return <div ref={containerRef}>...</div>;
}
```

### 2. Animation Principles (Mad Lab Aurora)

- **Feeling:** HEAVY and SMOOTH (Inertia). No bouncy or elastic effects.
- **Easing:** Use `power2.out`, `power3.out`, `power4.out`. Never `elastic` or `bounce`.
- **Duration:** Prefer 0.6s - 1.2s for reveals. 0.3s for micro-interactions.
- **Stagger:** Use `{ amount: 0.5, from: "start" }` for elegant entrances.

### 3. ScrollTrigger Patterns

**Reveal on Scroll:**

```typescript
gsap.from(".element", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
```

**Pinned Section:**

```typescript
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section",
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
    },
  })
  .to(".element", { x: 100 }, 0)
  .to(".other", { opacity: 0 }, 0.5);
```

### 4. Constraints

- 🚫 NEVER forget `ctx.revert()` in cleanup
- 🚫 NEVER use `useEffect` for GSAP animations (use `useLayoutEffect`)
- 🚫 NEVER use `bounce` or `elastic` easing (violates "weight" aesthetic)
- 🚫 NEVER create animations without `gsap.context()` scope

### 5. Performance

- Use `will-change: transform` sparingly
- Prefer `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Target 60 FPS always

## Output Format

When implementing animations, always provide:

1. The animation code with proper cleanup
2. The trigger element reference
3. Performance considerations
