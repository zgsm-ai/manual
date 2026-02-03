---
sidebar_position: 2
---

# Code Completion

CoStrict CLI provides intelligent code completion suggestions in your terminal editor.

## Overview

Get AI-powered code suggestions while editing files through the CLI.

## Usage

### Enable Code Completion

```bash
costrict config set completion.enabled true
```

### Use with Editor

```bash
costrict edit src/app.js
```

Press `Tab` to trigger completion suggestions.

## Features

- Context-aware suggestions
- Multi-line completions
- Language-specific intelligence
- Project-aware recommendations

## Configuration

```bash
# Set completion trigger key
costrict config set completion.trigger "tab"

# Set suggestion delay
costrict config set completion.delay 300
```

## Supported Languages

- JavaScript/TypeScript
- Python
- Go
- Rust
- Java
- And more...
