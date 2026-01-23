---
name: tailwindcss-expert
description: Use when styling components with Tailwind CSS v4, creating responsive layouts, implementing dark/light themes, or optimizing utility class usage. Specializes in Tailwind v4 syntax, custom themes, and the "Absolute White" aesthetic of Certum.
version: 1.0.0
author: Mad Lab Aurora
tags: [styling, tailwind, css, responsive, design-system]
---

# Tailwind CSS Expert

## Goal

Implement pixel-perfect, responsive styling using Tailwind CSS v4 following the "Absolute White" and "Brutalismo de Luxo" design system.

## Knowledge Base

Consult `.antigravity/knowledge/tailwindcss/` for official documentation.

## When to Use

- User asks about styling or CSS
- User needs responsive layouts
- User wants to implement the design system
- User mentions "Tailwind", "utility classes", "responsive"
- User needs hover/focus states

## Instructions

### 1. Color System (Certum)

```
Background: bg-white (#FFFFFF) — Absolute White
Text Primary: text-[#1A1A1A] or text-black
Text Muted: text-[#8A8A8A]
Accent: text-[#C9A227] (Gold)
Data Positive: text-[#00C853] (Emerald)
```

### 2. Typography Classes

```typescript
// Headlines (Serif)
className = "font-serif font-bold uppercase tracking-[-0.03em] leading-[0.95]";

// Mono Labels
className = "font-mono text-[10px] uppercase tracking-[0.35em]";

// Body Text
className = "font-sans text-base leading-relaxed";
```

### 3. Spacing Principles

- Use consistent spacing scale: `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`
- Sections: `py-24 md:py-32 lg:py-40`
- Container: `max-w-7xl mx-auto px-6 md:px-12`

### 4. Border & Shadow (Subtle)

```typescript
// Subtle borders (preferred)
className = "border border-black/5";

// Glass effect
className = "bg-white/80 backdrop-blur-sm border border-black/5";

// NO heavy shadows — violates rules
// ❌ shadow-lg, shadow-xl
// ✅ shadow-sm, shadow-[0_2px_8px_rgba(0,0,0,0.04)]
```

### 5. Responsive Patterns

```typescript
// Mobile-first approach
className = "text-3xl md:text-5xl lg:text-7xl";
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
className = "px-4 md:px-8 lg:px-16";
```

### 6. Animation Classes

```typescript
// Transitions (subtle, not bouncy)
className = "transition-all duration-300 ease-out";

// Hover states
className = "hover:scale-[1.02] hover:shadow-sm";

// Group hover
className = "group-hover:translate-x-1 group-hover:opacity-100";
```

## Constraints

- 🚫 NEVER use inline `style={{}}` except for dynamic animation values
- 🚫 NEVER use off-white backgrounds (`bg-gray-50`, `bg-slate-100`)
- 🚫 NEVER use heavy shadows (`shadow-lg`, `shadow-xl`, `shadow-2xl`)
- 🚫 NEVER use rounded fonts or playful colors

## Best Practices

- Use `cn()` utility for conditional classes
- Extract repeated patterns to component variants
- Use CSS variables for dynamic values: `style={{ '--accent': color }}`
- Prefer Tailwind classes over CSS modules

## Output Format

Provide clean, readable class strings with proper grouping:

```typescript
className={cn(
  // Layout
  "flex items-center justify-between",
  // Spacing
  "px-6 py-4",
  // Visual
  "bg-white border border-black/5",
  // Typography
  "font-serif text-lg",
  // Conditional
  isActive && "bg-black text-white"
)}
```
