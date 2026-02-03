---
sidebar_position: 7
---

# Rules

Configure custom rules for code quality and behavior.

## Overview

Rules allow you to define project-specific standards and conventions.

## Configuration

Create `.costrictrc.json`:

```json
{
  "rules": {
    "naming": {
      "functions": "camelCase",
      "classes": "PascalCase",
      "constants": "UPPER_CASE"
    },
    "code_quality": {
      "max_function_length": 50,
      "max_file_length": 500,
      "complexity_threshold": 10
    },
    "security": {
      "no_hardcoded_secrets": true,
      "require_input_validation": true
    }
  }
}
```

## Rule Categories

### Naming Conventions

- Function naming
- Variable naming
- Class naming
- File naming

### Code Quality

- Function length limits
- Cyclomatic complexity
- Code duplication
- Comment requirements

### Security

- Secret detection
- Input validation
- SQL injection prevention
- XSS prevention

## Usage

### Check Rules

```bash
costrict check-rules
```

### Auto-fix

```bash
costrict fix-rules
```

## Related Features

- [Strict Mode](./strict-mode.md) - Enhanced enforcement
- [Code Review](./code-review.md) - Automated checks
