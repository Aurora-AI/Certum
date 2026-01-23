---
name: framer-motion-expert
description: Use when implementing micro-interactions, hover states, page transitions, layout animations, or gesture-based interactions. Specializes in Framer Motion declarative API, AnimatePresence, and React integration.
version: 1.0.0
author: Mad Lab Aurora
tags: [animation, framer-motion, micro-interactions, gestures, transitions]
---

# Framer Motion Expert

## Goal

Create fluid micro-interactions and UI animations using Framer Motion, complementing GSAP for complex scroll animations.

## Knowledge Base

Consult `.antigravity/knowledge/framer/` for official documentation.

## When to Use

- User needs hover/tap animations
- User wants page transitions
- User asks about layout animations
- User needs AnimatePresence (mount/unmount)
- User mentions "Framer Motion", "variants", "gestures"

**Note:** For scroll-triggered animations, prefer GSAP. Framer Motion is for UI micro-interactions.

## Instructions

### 1. Basic Animation Pattern

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>
```

### 2. Hover Interactions (Certum Style)

```typescript
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="..."
>
  Click me
</motion.button>
```

### 3. Variants Pattern

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### 4. AnimatePresence (Mount/Unmount)

```typescript
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### 5. Layout Animations

```typescript
<motion.div layout layoutId="shared-element">
  Content that animates on layout change
</motion.div>
```

### 6. useInView Hook

```typescript
import { useInView } from 'framer-motion';

const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: "-10% 0px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0 }}
  animate={inView ? { opacity: 1 } : { opacity: 0 }}
>
  Reveals when in view
</motion.div>
```

## Easing (Certum Style)

```typescript
// Smooth, heavy feeling (preferred)
ease: [0.16, 1, 0.3, 1]; // Custom cubic-bezier

// Standard options
ease: "easeOut";
ease: "easeInOut";

// 🚫 NEVER use:
ease: "anticipate"; // Too bouncy
ease: "backInOut"; // Too elastic
```

## Constraints

- 🚫 NEVER use spring animations with high bounce
- 🚫 NEVER use Framer for scroll-triggered (use GSAP ScrollTrigger)
- 🚫 NEVER make animations faster than 0.15s (feels cheap)
- ✅ ALWAYS use `mode="wait"` in AnimatePresence for clean transitions

## When to Use GSAP vs Framer Motion

| Use Case           | Tool   |
| ------------------ | ------ |
| Scroll animations  | GSAP   |
| Pinned sections    | GSAP   |
| Timeline sequences | GSAP   |
| Hover states       | Framer |
| Page transitions   | Framer |
| Mount/unmount      | Framer |
| Gestures           | Framer |
