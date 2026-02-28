---
sidebar_position: 8
---

# Modes

Modes let you customize behavior, tools, and prompts for different use cases.

CoStrict ships with two built-in modes: **Build** and **Plan**. You can customize these or create your own.

---

## Built-in Modes

### Build

Build is the **default** mode with all tools enabled — the standard mode for development work.

### StrictPlan

**StrictPlan** provides a complete planning workflow. See the [StrictPlan documentation](./strict-plan) for details.

---

## Switching Modes

Press `Tab` in a session to cycle through modes, or use the configured `agent_cycle` shortcut.

---

## Configuring Modes

Modes can be configured in two ways.

### JSON Configuration

In `costrict.json`:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "mode": {
    "build": {
      "model": "anthropic/claude-sonnet-4-5",
      "tools": {
        "write": true,
        "edit": true,
        "bash": true
      }
    },
    "plan": {
      "model": "anthropic/claude-haiku-4-5",
      "tools": {
        "write": false,
        "edit": false,
        "bash": false
      }
    }
  }
}
```

### Markdown Configuration

Place Markdown files in:

- Global: `~/.config/costrict/modes/`
- Project: `.costrict/modes/`

The filename becomes the mode name (e.g. `review.md` creates a `review` mode).

```markdown title=".costrict/modes/review.md"
---
model: anthropic/claude-sonnet-4-5
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---

You are in code review mode. Focus on:

- Code quality and best practices
- Potential bugs and edge cases
- Security considerations

Provide constructive feedback without making direct changes.
```

---

## Configuration Options

### Model

Override the default model for this mode:

```json title="costrict.json"
{
  "mode": {
    "plan": {
      "model": "anthropic/claude-haiku-4-5"
    }
  }
}
```

### Temperature

Control response randomness (0.0–1.0):

- `0.0–0.2` — Focused and deterministic, good for analysis and planning
- `0.3–0.5` — Balanced, good for general development
- `0.6–1.0` — More creative, good for brainstorming

```json title="costrict.json"
{
  "mode": {
    "plan": { "temperature": 0.1 },
    "brainstorm": { "temperature": 0.7 }
  }
}
```

### Prompt

Specify a custom system prompt file for the mode:

```json title="costrict.json"
{
  "mode": {
    "review": {
      "prompt": "{file:./prompts/code-review.txt}"
    }
  }
}
```

### Tools

Control which tools are available in this mode:

```json title="costrict.json"
{
  "mode": {
    "readonly": {
      "tools": {
        "write": false,
        "edit": false,
        "bash": false,
        "read": true,
        "grep": true,
        "glob": true
      }
    }
  }
}
```

Available tools to configure:

| Tool | Description |
| ---- | ----------- |
| `bash` | Execute shell commands |
| `edit` | Modify existing files |
| `write` | Create new files |
| `read` | Read file contents |
| `grep` | Search file contents |
| `glob` | Find files by pattern |
| `list` | List directory contents |
| `patch` | Apply patches to files |
| `webfetch` | Fetch web page content |

---

## Custom Mode Examples

### Debug Mode

```markdown title=".costrict/modes/debug.md"
---
temperature: 0.1
tools:
  bash: true
  read: true
  grep: true
  write: false
  edit: false
---

You are in debug mode. Investigate and diagnose issues.

Focus on:
- Understanding the problem through careful analysis
- Using bash commands to inspect system state
- Reading relevant files and logs

Do not make any changes to files. Only investigate and report.
```

### Docs Mode

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "mode": {
    "docs": {
      "prompt": "{file:./prompts/documentation.txt}",
      "tools": {
        "write": true,
        "edit": true,
        "bash": false,
        "read": true,
        "grep": true,
        "glob": true
      }
    }
  }
}
```

---

## Mode Reference

| Mode | Use Case |
| ---- | -------- |
| Build | Full development — all tools enabled |
| Plan | Analysis and planning — no file changes |
| StrictPlan | Complete requirements analysis and task planning workflow |
| Review | Code review — read-only access |
| Debug | Troubleshooting — bash and read tools enabled |
| Docs | Documentation writing — file ops, no shell commands |
