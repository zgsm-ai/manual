---
sidebar_position: 3
---

# Code Review

Automated code review capabilities in CoStrict CLI.

## Overview

Get AI-powered code reviews directly from the command line.

## Basic Usage

### Review Current Changes

```bash
costrict review
```

This reviews all uncommitted changes in your repository.

### Review Specific Files

```bash
costrict review src/auth.js src/utils.js
```

### Review a Commit

```bash
costrict review --commit abc123
```

### Review a Pull Request

```bash
costrict review --pr 42
```

## Review Output

The review includes:

- Code quality issues
- Potential bugs
- Security vulnerabilities
- Performance suggestions
- Best practice recommendations

## Configuration

```bash
# Set review strictness
costrict config set review.strictness "high"

# Enable auto-fix suggestions
costrict config set review.auto_fix true
```

## Review Modes

### Quick Review

```bash
costrict review --quick
```

Fast review focusing on critical issues.

### Deep Review

```bash
costrict review --deep
```

Comprehensive analysis including architecture and design patterns.

### Security Review

```bash
costrict review --security
```

Focus on security vulnerabilities and best practices.

## Integration

### Pre-commit Hook

```bash
costrict install-hook pre-commit
```

### CI/CD Integration

```bash
costrict review --format json > review-results.json
```

## Related Features

- [AI Agent](./ai-agent.md) - Autonomous task execution
- [Strict Mode](./strict-mode.md) - Enhanced code quality checks
