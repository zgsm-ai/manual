---
sidebar_position: 4
---

# Plan Mode

Plan mode helps you break down complex tasks into manageable steps.

## Overview

When facing complex development tasks, Plan mode creates a structured implementation plan before execution.

## Usage

### Create a Plan

```bash
costrict plan "Add user authentication system"
```

### Execute a Plan

```bash
costrict execute-plan plan-2024-02-02.md
```

### Interactive Planning

```bash
costrict chat
> I need to refactor the database layer
> Can you create a plan for this?
```

## Plan Structure

Plans typically include:

- Task breakdown
- File changes required
- Testing strategy
- Implementation order
- Rollback considerations

## Best Practices

- Use plan mode for tasks requiring multiple files
- Review plans before execution
- Break large plans into smaller milestones
- Keep plans focused on single features

## Related Features

- [AI Agent](./ai-agent.md) - Autonomous execution
- [Code Review](./code-review.md) - Validate implementations
