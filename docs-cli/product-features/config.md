---
sidebar_position: 13
---

# Configuration

CoStrict uses JSON configuration files.

---

## Format

Both **JSON** and **JSONC** (JSON with comments) are supported.

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  // Theme configuration
  "theme": "opencode",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true
}
```

---

## Configuration File Locations

Configuration files can be placed in different locations with different priorities. Multiple files are **merged** — later sources only override earlier ones on conflicting keys.

### Priority Order

Sources are loaded in this order (later sources take higher priority):

1. **Remote config** (from `.well-known/opencode`) — organization defaults
2. **Global config** (`~/.config/costrict/costrict.json`) — user preferences
3. **Custom config** (`COSTRICT_CONFIG` env var) — custom overrides
4. **Project config** (`costrict.json` in the project root) — project-specific settings
5. **`.costrict` directory** — agents, commands, plugins
6. **Inline config** (`COSTRICT_CONFIG_CONTENT` env var) — runtime overrides

### Global Config

Place global configuration at `~/.config/costrict/costrict.json` for user-level preferences such as theme, provider, or keybinds.

### Project Config

Add `costrict.json` to the project root for the highest-priority local settings. CoStrict searches the current directory on startup, walking up to the nearest Git root. Safe to commit to Git.

### Custom Path

Use the `COSTRICT_CONFIG` environment variable to specify a custom config file:

```bash
export COSTRICT_CONFIG=/path/to/my/custom-config.json
cs run "Hello world"
```

### Custom Directory

Use `COSTRICT_CONFIG_DIR` to specify a custom config directory that is searched like the standard `.costrict` directory:

```bash
export COSTRICT_CONFIG_DIR=/path/to/my/config-directory
cs run "Hello world"
```

---

## Configuration Options

### Model

Set the default model and a lightweight model for background tasks:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

Provider-level options:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "timeout": 600000,
        "setCacheKey": true
      }
    }
  }
}
```

- `timeout` — Request timeout in milliseconds (default `300000`). Set to `false` to disable.
- `setCacheKey` — Always set the cache key for the specified provider.

---

### Tools

Control which tools the LLM can use:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "tools": {
    "write": false,
    "bash": false
  }
}
```

---

### Theme

Set the UI theme:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "theme": "opencode"
}
```

See [Themes](./themes) for available options.

---

### Agent

Define agents directly in the config file:

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "code-reviewer": {
      "description": "Code review focused on security and maintainability",
      "model": "anthropic/claude-sonnet-4-5",
      "prompt": "You are a code reviewer. Focus on security, performance, and maintainability.",
      "tools": {
        "write": false,
        "edit": false
      }
    }
  }
}
```

You can also define agents using Markdown files in `~/.config/costrict/agents/` or `.costrict/agents/`.

### Default Agent

Set the default agent used when none is explicitly specified:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "build"
}
```

Must be a top-level agent (not a sub-agent). Falls back to `"build"` if the specified agent doesn't exist.

---

### Commands

Define custom commands in the config file:

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "test": {
      "template": "Run the full test suite and show a coverage report.",
      "description": "Run tests",
      "agent": "build"
    },
    "component": {
      "template": "Create a React component named $ARGUMENTS with TypeScript support.",
      "description": "Create a new component"
    }
  }
}
```

---

### Keybinds

Customize keyboard shortcuts:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "keybinds": {
    "leader": "ctrl+x",
    "session_new": "<leader>n"
  }
}
```

See [Keybinds](./keybinds) for the full list.

---

### Permissions

By default, CoStrict **allows all actions**. Change this with the `permission` option:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

See [Settings & Permissions](./settings) for details.

---

### Compaction

Control context compaction behavior:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}
```

- `auto` — Automatically compact when the context is full (default `true`)
- `prune` — Remove old tool outputs to save tokens (default `true`)
- `reserved` — Token buffer to keep during compaction

---

### Formatters

Configure code formatters:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {
    "prettier": {
      "disabled": true
    },
    "custom-prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "extensions": [".js", ".ts", ".jsx", ".tsx"]
    }
  }
}
```

See [Formatters](./formatters) for details.

---

### File Watcher

Configure file watcher ignore patterns:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "watcher": {
    "ignore": ["node_modules/**", "dist/**", ".git/**"]
  }
}
```

---

### Auto-update

CoStrict checks for updates on startup. Disable with:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "autoupdate": false
}
```

Set to `"notify"` to show a notification without auto-updating.

---

### Disable / Enable Providers

Disable specific providers even if their credentials are available:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "disabled_providers": ["openai", "gemini"]
}
```

Whitelist only specific providers:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "enabled_providers": ["anthropic", "costrict"]
}
```

`disabled_providers` takes precedence over `enabled_providers`.

---

### Server

Configure the server for `cs serve` and `cs web`:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "server": {
    "port": 4096,
    "hostname": "0.0.0.0",
    "mdns": true,
    "cors": ["http://localhost:5173"]
  }
}
```

---

## Variable Substitution

### Environment Variables

Use `{env:VARIABLE_NAME}` to reference environment variables:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "options": {
        "apiKey": "{env:MY_API_KEY}"
      }
    }
  }
}
```

Unset variables are replaced with an empty string.

### File References

Use `{file:path/to/file}` to inline file contents:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{file:~/.secrets/openai-key}"
      }
    }
  }
}
```

Paths can be relative to the config file, or absolute (starting with `/` or `~`).
