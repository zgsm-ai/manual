---
sidebar_position: 5
---

# Strict Mode

Strict mode enforces higher code quality standards and best practices.

## Overview

Enable strict mode for enhanced code quality checks and stricter validation.

## Enable Strict Mode

```bash
costrict config set strict_mode true
```

## Features

### Enhanced Validation

- Stricter type checking
- More comprehensive linting
- Security vulnerability scanning
- Performance analysis

### Code Standards

- Enforces coding conventions
- Requires documentation
- Validates test coverage
- Checks for code smells

## Usage

### Global Setting

```bash
costrict config set strict_mode true
```

### Per-Command

```bash
costrict review --strict
```

### Project-Level

Create `.costrictrc.json`:

```json
{
  "strict_mode": true,
  "strict_rules": {
    "require_tests": true,
    "min_coverage": 80,
    "require_docs": true
  }
}
```

## Strict Mode Rules

- All functions must have documentation
- Test coverage must meet threshold
- No console.log in production code
- No TODO comments without tickets
- All errors must be handled

## Related Features

- [Code Review](./code-review.md) - Automated reviews
- [Rules](./rules.md) - Custom rule configuration
