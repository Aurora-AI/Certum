---
name: shadcn-expert
description: Use when implementing UI components with Shadcn/UI, customizing component variants, or creating accessible interactive elements. Specializes in Radix UI primitives, component composition, and adapting Shadcn to the "Absolute White" Certum aesthetic.
version: 1.0.0
author: Mad Lab Aurora
tags: [components, shadcn, radix, accessibility, ui]
---

# Shadcn/UI Expert

## Goal

Implement accessible, composable UI components using Shadcn/UI adapted to the Certum "Absolute White" design system.

## Knowledge Base

Consult `.antigravity/knowledge/shadcn_ui/` for component patterns.

## When to Use

- User needs interactive components (dialogs, dropdowns, tabs)
- User asks about accessibility (a11y)
- User wants to customize Shadcn components
- User mentions "Radix", "Shadcn", "primitives"

## Instructions

### 1. Component Installation (CLI)

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### 2. Certum Theme Adaptation

**Button Variants:**

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90",
        outline:
          "border border-black/20 bg-transparent hover:bg-black hover:text-white",
        ghost: "hover:bg-black/5",
        gold: "bg-[#C9A227] text-white hover:bg-[#B8922E]",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6",
        lg: "h-14 px-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
```

### 3. Dialog Pattern (Certum Style)

```typescript
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent className="bg-white border border-black/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
    <DialogHeader>
      <DialogTitle className="font-serif text-2xl">Title</DialogTitle>
      <DialogDescription className="text-[#8A8A8A]">
        Description text here
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### 4. Form Components

```typescript
// Input with Certum styling
<Input
  className="h-12 border-black/10 bg-transparent focus:border-black focus:ring-0 font-mono"
  placeholder="Enter value"
/>

// Select with Certum styling
<Select>
  <SelectTrigger className="h-12 border-black/10 font-mono">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-black/5">
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### 5. Composition Patterns

```typescript
// Card component with slots
<Card className="border border-black/5 bg-white/80 backdrop-blur-sm">
  <CardHeader>
    <CardTitle className="font-serif">Title</CardTitle>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
  <CardFooter className="border-t border-black/5">
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Constraints

- 🚫 NEVER use default Shadcn colors (adapt to Certum palette)
- 🚫 NEVER remove Radix accessibility attributes
- 🚫 NEVER use rounded-full on buttons (use rounded-none or rounded-sm)
- ✅ ALWAYS use `asChild` for custom trigger elements

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG 2.1 AA

## Output Format

Provide component code with:

1. Proper TypeScript interfaces
2. Certum-adapted styling
3. Accessibility attributes preserved
