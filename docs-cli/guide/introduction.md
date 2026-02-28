---
sidebar_position: 0
---

# Introduction to CoStrict CLI

CoStrict CLI is a terminal-based AI coding assistant that lets you collaborate with large language models on coding tasks without leaving your command line.

![TUI main screen](img/feature/main.png)

---

## Core Capabilities

### Multiple Launch Modes
- **TUI Interactive Interface**: Run `cs` to open the full-featured terminal UI with multi-session management
- **Non-interactive Mode**: `cs run "your prompt"` for scripts and automation pipelines
- **Web Interface**: `cs web` to use CoStrict in your browser

### Powerful Built-in Toolset
CoStrict ships with tools for file reading/writing, shell execution, code search, web requests, and more. Extend further with **custom tools** and **MCP servers**.

### Flexible Configuration
Manage model selection, tool permissions, themes, keybinds, and more via `costrict.json`. Supports both project-level and global configuration.

### Plugin System
Hook into tool execution, session events, file changes, and more using JS/TS plugins for deep customization.

### IDE Integration
Deep integration with Zed, JetBrains, and Neovim via the ACP protocol. Also available as a VS Code extension.

---

## Quick Start

```bash
# Install
npm install -g @costrict/cs

# Launch the interactive UI
cs

# Non-interactive mode
cs run "Generate a README for this project"
```

For detailed installation steps, see [Installation](./installation). For a full feature walkthrough, see [Features](./feature).
