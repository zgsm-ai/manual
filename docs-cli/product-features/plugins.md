---
sidebar_position: 22
---

# Plugins

Plugins extend CoStrict's functionality by hooking into various events. They can add new features, integrate external services, or modify default behavior.

---

## Loading Plugins

### From Local Files

Place JavaScript or TypeScript files in a plugins directory — they are loaded automatically at startup:

- Project-level: `.costrict/plugins/`
- Global: `~/.config/costrict/plugins/`

### From npm

Specify npm packages in your config file:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-helicone-session", "opencode-wakatime", "@my-org/custom-plugin"]
}
```

npm plugins are automatically installed using Bun at startup, cached in `~/.cache/costrict/node_modules/`.

### Load Order

1. Global config (`~/.config/costrict/costrict.json`)
2. Project config (`costrict.json`)
3. Global plugins directory (`~/.config/costrict/plugins/`)
4. Project plugins directory (`.costrict/plugins/`)

---

## Writing Plugins

A plugin is a JS/TS module that exports one or more functions. Each function receives a context object and returns event hooks.

### Basic Structure

```js title=".costrict/plugins/example.js"
export const MyPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // Implement event hooks here
  }
}
```

Context parameter reference:

- `project` — Current project information
- `directory` — Current working directory
- `worktree` — Git worktree path
- `client` — CoStrict SDK client
- `$` — Bun [Shell API](https://bun.com/docs/runtime/shell) for executing commands

### TypeScript Support

```ts title=".costrict/plugins/my-plugin.ts"
import type { Plugin } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // Type-safe hook implementations
  }
}
```

### Plugin Dependencies

If a local plugin requires external npm packages, add a `package.json` to the config directory:

```json title=".costrict/package.json"
{
  "dependencies": {
    "shescape": "^2.1.0"
  }
}
```

CoStrict automatically runs `bun install` at startup.

---

## Available Events

### Tool Events

- `tool.execute.before` — Fires before a tool executes; can modify arguments or prevent execution
- `tool.execute.after` — Fires after a tool executes

### Session Events

- `session.created` — Session created
- `session.idle` — Session idle (AI finished responding)
- `session.compacted` — Session was compacted
- `session.deleted` — Session was deleted
- `session.error` — Session encountered an error

### File Events

- `file.edited` — A file was edited
- `file.watcher.updated` — File watcher detected a change

### TUI Events

- `tui.prompt.append` — Append content to the prompt input
- `tui.command.execute` — Execute a TUI command
- `tui.toast.show` — Show a toast notification

### Shell Events

- `shell.env` — Inject environment variables into the shell execution environment

### Other Events

- `message.updated` / `message.removed` — Message changes
- `permission.asked` / `permission.replied` — Permission requests
- `lsp.updated` / `lsp.client.diagnostics` — LSP status
- `command.executed` — Command executed
- `experimental.session.compacting` — Before session compaction (experimental)

---

## Plugin Examples

### Session Completion Notification

```js title=".costrict/plugins/notification.js"
export const NotificationPlugin = async ({ $ }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        // macOS notification
        await $`osascript -e 'display notification "Session complete!" with title "CoStrict"'`
      }
    },
  }
}
```

### Protect .env Files

Prevent the LLM from reading `.env` files:

```js title=".costrict/plugins/env-protection.js"
export const EnvProtection = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args.filePath.includes(".env")) {
        throw new Error("Reading .env files is not allowed")
      }
    },
  }
}
```

### Inject Environment Variables

Inject environment variables into all shell executions:

```js title=".costrict/plugins/inject-env.js"
export const InjectEnvPlugin = async () => {
  return {
    "shell.env": async (input, output) => {
      output.env.MY_API_KEY = "secret"
      output.env.PROJECT_ROOT = input.cwd
    },
  }
}
```

### Define Custom Tools in a Plugin

```ts title=".costrict/plugins/custom-tools.ts"
import { type Plugin, tool } from "@opencode-ai/plugin"

export const CustomToolsPlugin: Plugin = async (ctx) => {
  return {
    tool: {
      mytool: tool({
        description: "Example custom tool",
        args: {
          message: tool.schema.string().describe("Message content"),
        },
        async execute(args, context) {
          return `Received message: ${args.message}, directory: ${context.directory}`
        },
      }),
    },
  }
}
```

### Custom Compaction Prompt

Inject additional information when the session context is compacted:

```ts title=".costrict/plugins/compaction.ts"
import type { Plugin } from "@opencode-ai/plugin"

export const CompactionPlugin: Plugin = async () => {
  return {
    "experimental.session.compacting": async (input, output) => {
      output.context.push(`
## Custom Context

Record important state to preserve after compaction:
- Current task progress
- Key decisions made
- List of files being modified
`)
    },
  }
}
```

Set `output.prompt` to completely replace the default compaction prompt.
