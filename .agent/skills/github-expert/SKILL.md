---
name: github-expert
description: Use when managing Git repositories, creating branches, handling pull requests, writing commit messages, or configuring GitHub Actions. Specializes in Git workflows, conventional commits, and CI/CD pipelines.
version: 1.0.0
author: Mad Lab Aurora
tags: [git, github, version-control, ci-cd, actions]
---

# GitHub Expert

## Goal

Manage source code effectively using Git and GitHub best practices, following conventional commits and proper branching strategies.

## Knowledge Base

Consult `.antigravity/knowledge/github/` for documentation.

## When to Use

- User asks about Git commands
- User needs to create branches or PRs
- User wants to set up CI/CD
- User mentions "Git", "GitHub", "commit", "branch", "PR"

## Instructions

### 1. Commit Message Format (Conventional Commits)

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons)
- `refactor`: Code change that neither fixes nor adds
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat(hero): add text scramble effect to headline"
git commit -m "fix(gsap): add cleanup to prevent memory leaks"
git commit -m "docs(readme): update installation instructions"
```

### 2. Branching Strategy (GitFlow Light)

```
main          ← Production (protected)
  └── develop ← Integration branch
        ├── feature/hero-animation
        ├── feature/vault-carousel
        └── fix/kinetic-heading-crash
```

**Commands:**

```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/new-component

# Merge back
git checkout develop
git merge feature/new-component
git branch -d feature/new-component
```

### 3. Pull Request Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No `console.log` or debug code
- [ ] TypeScript compiles without errors
- [ ] GSAP animations have cleanup

## Screenshots

[If applicable]
```

### 4. GitHub Actions (CI/CD)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
```

### 5. Useful Git Commands

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Stash changes
git stash
git stash pop

# Interactive rebase (cleanup commits)
git rebase -i HEAD~3

# Cherry-pick specific commit
git cherry-pick <commit-hash>

# View file history
git log --oneline -- path/to/file

# Blame (who changed what)
git blame path/to/file
```

### 6. .gitignore for Certum

```
# Dependencies
node_modules/

# Build output
dist/
.next/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Artifacts (optional - may want to track)
# artifacts/
```

## Constraints

- 🚫 NEVER commit `.env` files
- 🚫 NEVER force push to `main` or `develop`
- 🚫 NEVER commit large binary files
- ✅ ALWAYS write meaningful commit messages
- ✅ ALWAYS pull before pushing

## Code Review Checklist

- [ ] No hardcoded secrets
- [ ] Proper TypeScript types
- [ ] GSAP cleanup implemented
- [ ] No unused imports
- [ ] Follows Certum design system
