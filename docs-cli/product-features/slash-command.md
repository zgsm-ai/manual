---
sidebar_position: 6
---

# Slash Commands

Quick commands for common operations in CoStrict CLI.

## Overview

Slash commands provide shortcuts for frequently used operations.

## Available Commands

### /review

Quick code review:

```bash
costrict /review
```

### /test

Run tests:

```bash
costrict /test
```

### /fix

Auto-fix issues:

```bash
costrict /fix
```

### /explain

Explain code:

```bash
costrict /explain src/auth.js
```

### /optimize

Optimize code:

```bash
costrict /optimize
```

## Custom Slash Commands

Create custom commands in `.costrictrc.json`:

```json
{
  "slash_commands": {
    "/deploy": "npm run build && npm run deploy",
    "/lint": "eslint . --fix"
  }
}
```

## Related Features

- [Skills](./Skills/skills.md) - Extended capabilities
- [AI Agent](./ai-agent.md) - Autonomous execution
