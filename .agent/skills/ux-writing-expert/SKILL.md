---
name: ux-writing-expert
description: Specialized skill for User Experience (UX) Writing, Interface Design, and Digital Accessibility (WCAG). Focuses on clarity, error prevention, and frictionless interaction.
---

# UX Writing Expert

This skill ensures that digital interfaces are intuitive, accessible, and helpful. It treats text as a functional UI component, prioritizing "Recognition over Recall" and "Error Prevention".

## Core Principles (Nielsen Heuristics applied to Text)

### 1. Visibility of System Status

- Never be vague. "Processing..." is bad. "Uploading 3 of 5 files..." is good.
- Provide immediate feedback for every interaction.

### 2. Match between System and Real World

- **No Jargon:** Avoid "Database Error", "Invalid String". Use "Please enter your name".
- **Natural Language:** Speak as a human would, not a machine.

### 3. Error Prevention & Recovery ("No Blame")

- **Structure:** {What happened} + {Why} + {How to fix}.
- **Tone:** Neutral/Helpful. Never conflicting ("Illegal action", "You failed").
- **Example:** Instead of "Invalid Date", use "Please enter a date in DD/MM/YYYY format".

### 4. Help Users Recognize, Diagnose, and Recover

- 404 Pages must offer escape routes (Home, Search, Support).
- Empty States should be calls to action (sell the value of filling the empty space).

## Accessibility Standards (WCAG)

### 1. Text Alternatives

- **Alt Text:** Functional description for informative images. Null (`""`) for decorative.
- **Context:** Describe _information_, not appearance (unless appearance is the info).

### 2. Readability (WCAG 3.1.5)

- **Lower Secondary Education Level:** Aim for simple vocabulary.
- **Flesch-Kincaid:** Monitor reading ease score. Simplify complex sentences.

### 3. Semantic Structure

- Use H1-H6 strictly for hierarchy, not for visual sizing.
- Labels must be explicit. "Click here" is forbidden. Use "Read the report".

## Microcopy Patterns

### Button Labels

- **Action-Oriented:** Start with a verb ("Save", "Download", "Join").
- **Specific:** "Submit" is weak. "Create Account" is strong.

### Onboarding

- **Benefit-First:** Explain _why_ a permission is needed before asking.
- **Progress:** Show "Step X of Y".

## Instructions for Agents using this Skill

1. **Context Check:** Where will this text appear? (Button? Modal? Tooltip?).
2. **Constraint Check:** Character limits (Mobile? App Store?).
3. **Accessibility Audit:** Is the language simple? Are instructions reliant on sensory characteristics ("Click the red button")? (Avoid this).
4. **Tone Check:** Use the 4 Dimensions (Funny/Serious, Formal/Casual, Respectful/Irreverent, Enthusiastic/Pragmatic) to match the brand.
