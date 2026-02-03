---
sidebar_position: 1
---

# AI Agent

CoStrict CLI provides powerful AI agent capabilities for command-line development.

## Overview

The AI Agent in CLI mode offers autonomous task execution, intelligent code analysis, and interactive problem-solving directly from your terminal.

## Key Features

### Autonomous Task Execution

The AI agent can break down complex tasks and execute them step by step:

```bash
costrict agent --task "Refactor the authentication module"
```

### Context-Aware Assistance

The agent maintains context throughout your session, understanding your project structure and previous interactions.

### Multi-Step Planning

For complex tasks, the agent creates and executes detailed plans:

```bash
costrict plan "Add user registration feature"
```

## Usage Examples

### Basic Agent Command

```bash
costrict agent --prompt "Analyze code quality issues"
```

### Interactive Mode

```bash
costrict chat
> Can you help me optimize this function?
```

### Background Tasks

```bash
costrict agent --background --task "Run tests and fix failures"
```

## Configuration

Configure agent behavior:

```bash
costrict config set agent.model "claude-sonnet-4"
costrict config set agent.max_iterations 10
```

## Best Practices

- Provide clear, specific instructions
- Use plan mode for complex multi-step tasks
- Review agent suggestions before applying
- Leverage context by working in focused sessions

## Related Features

- [Plan Mode](./plan.md) - Structured task planning
- [Code Review](./code-review.md) - Automated code review
- [Skills](./Skills/skills.md) - Extend agent capabilities
