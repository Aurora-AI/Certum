---
name: antigravity-expert
description: Use when understanding the Antigravity IDE architecture, creating skills, workflows, agents, or optimizing the agentic development environment. Specializes in the Antigravity Kit, MCP integration, and multi-agent orchestration.
version: 1.0.0
author: Mad Lab Aurora
tags: [antigravity, agents, skills, workflows, mcp, orchestration]
---

# Antigravity IDE Expert

## Goal

Master the Antigravity agentic development environment, creating effective skills, workflows, and multi-agent systems.

## Knowledge Base

Consult `.antigravity/knowledge/antigravity/` and the Manual Antigravity in `knowledge/documento_tecnicos/`.

## When to Use

- User asks about creating skills or workflows
- User wants to understand agent architecture
- User needs to configure MCP servers
- User mentions "Antigravity", "skill", "workflow", "agent"

## Instructions

### 1. Skill Creation (SKILL.md Pattern)

```yaml
---
name: skill-name
description: Semantic description that triggers activation
version: 1.0.0
author: Author Name
tags: [tag1, tag2]
---

# Skill Title

## Goal
What this skill accomplishes.

## When to Use
- Trigger condition 1
- Trigger condition 2

## Instructions
Step-by-step guidance.

## Constraints
- What NOT to do

## Output Format
Expected output structure.
```

### 2. Workflow Creation

```yaml
---
description: What this workflow does
---
# Workflow Name

## Steps

1. **First Step** description

// turbo
2. **Auto-run Step**
\`\`\`bash
npm run command
\`\`\`

3. **Manual Step** requiring approval
```

**Turbo Annotations:**

- `// turbo` - Auto-run this specific step
- `// turbo-all` - Auto-run ALL steps in workflow

### 3. Directory Structure

```
project/
├── .agent/
│   ├── skills/           # Skill definitions
│   │   └── skill-name/
│   │       ├── SKILL.md
│   │       ├── scripts/  # Optional helper scripts
│   │       └── resources/ # Optional static files
│   └── workflows/        # Workflow definitions
│       └── workflow-name.md
├── .antigravity/
│   ├── constitution.md   # Project identity
│   ├── rules.md          # Coding rules (always active)
│   ├── roles/            # Agent personas
│   │   ├── ARCHITECT.md
│   │   ├── BUILDER.md
│   │   └── REVIEWER.md
│   └── knowledge/        # Documentation links
└── artifacts/            # Agent work evidence
    └── plan_*.md
```

### 4. Artifact-First Protocol

Before implementing any feature:

1. Create `artifacts/plan_{feature}.md`
2. Wait for user approval
3. Execute implementation
4. Create `artifacts/walkthrough_{feature}.md`

### 5. Role-Based Prompting

```markdown
# In ARCHITECT.md

You are the Senior Architect. Your job is to:

1. Analyze requirements
2. Create detailed plans
3. Never write code directly

# In BUILDER.md

You are the Implementation Engineer. Your job is to:

1. Follow the plan exactly
2. Write clean TypeScript
3. Ensure GSAP cleanup

# In REVIEWER.md

You are the Quality Guardian. Your job is to:

1. Audit code for violations
2. Check performance
3. Issue verdicts
```

### 6. MCP Server Configuration

```json
// mcp_servers.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

### 7. Skill Complexity Levels

| Level | Description              | Example                |
| ----- | ------------------------ | ---------------------- |
| 1     | Pure prompt engineering  | `git-commit-formatter` |
| 2     | Uses static resources    | `license-header-adder` |
| 3     | Few-shot examples        | `json-to-pydantic`     |
| 4     | Executes scripts         | `database-validator`   |
| 5     | Multi-tool orchestration | `adk-tool-scaffold`    |

## Constraints

- 🚫 NEVER create skills without proper YAML frontmatter
- 🚫 NEVER skip the Artifact-First protocol for complex features
- ✅ ALWAYS write semantic descriptions for skill activation
- ✅ ALWAYS include cleanup/constraints in skills

## Output Format

When creating skills or workflows:

1. Complete YAML frontmatter
2. Clear step-by-step instructions
3. Examples where helpful
4. Constraints section
