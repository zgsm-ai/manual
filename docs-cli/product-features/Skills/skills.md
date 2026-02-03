---
sidebar_position: 1
---

# Skills

Skills extend CoStrict CLI capabilities with custom commands and workflows.

## Overview

Skills are reusable command templates that encapsulate common workflows and best practices.

## Using Skills

### List Available Skills

```bash
costrict skills list
```

### Run a Skill

```bash
costrict skill run <skill-name>
```

### Example Skills

```bash
# Code review skill
costrict skill run code-review

# Refactoring skill
costrict skill run refactor --target src/auth.js

# Testing skill
costrict skill run generate-tests --file src/utils.js
```

## Creating Custom Skills

### Skill Definition

Create a skill file `my-skill.yaml`:

```yaml
name: my-custom-skill
description: My custom workflow
steps:
  - name: Analyze code
    command: analyze
  - name: Generate tests
    command: test --generate
  - name: Review changes
    command: review
```

### Install Skill

```bash
costrict skill install ./my-skill.yaml
```

## Built-in Skills

- **code-review**: Comprehensive code review
- **refactor**: Intelligent refactoring
- **generate-tests**: Test generation
- **optimize**: Performance optimization
- **security-audit**: Security scanning
- **documentation**: Generate documentation

## Skill Marketplace

Browse and install community skills:

```bash
costrict skill search <keyword>
costrict skill install <skill-name>
```

## Related Features

- [AI Agent](../ai-agent.md) - Autonomous execution
- [Slash Commands](../slash-command.md) - Quick commands
