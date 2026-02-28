---
sidebar_position: 23
---

# ACP Protocol Support

CoStrict supports the [Agent Client Protocol](https://agentclientprotocol.com) (ACP), allowing you to use it directly inside compatible editors and IDEs.

ACP is an open protocol that standardizes communication between code editors and AI coding agents.

---

## Starting the ACP Server

Run CoStrict as an ACP subprocess, communicating with the editor via JSON-RPC over stdio:

```bash
cs acp
```

---

## Editor Configuration

### Zed

Add to `~/.config/zed/settings.json`:

```json title="~/.config/zed/settings.json"
{
  "agent_servers": {
    "CoStrict": {
      "command": "cs",
      "args": ["acp"]
    }
  }
}
```

Open via: run `agent: new thread` in the **Command Palette**.

Bind a keyboard shortcut (`keymap.json`):

```json title="keymap.json"
[
  {
    "bindings": {
      "cmd-alt-o": [
        "agent::NewExternalAgentThread",
        {
          "agent": {
            "custom": {
              "name": "CoStrict",
              "command": {
                "command": "cs",
                "args": ["acp"]
              }
            }
          }
        }
      ]
    }
  }
]
```

---

### JetBrains IDEs

Add to `acp.json` in your JetBrains IDE:

```json title="acp.json"
{
  "agent_servers": {
    "CoStrict": {
      "command": "/absolute/path/to/cs",
      "args": ["acp"]
    }
  }
}
```

Open via: select `CoStrict` in the AI Chat agent picker.

---

### Avante.nvim

Add to your [Avante.nvim](https://github.com/yetone/avante.nvim) configuration:

```lua
{
  acp_providers = {
    ["costrict"] = {
      command = "cs",
      args = { "acp" }
    }
  }
}
```

If you need to pass environment variables:

```lua
{
  acp_providers = {
    ["costrict"] = {
      command = "cs",
      args = { "acp" },
      env = {
        COSTRICT_BASE_URL = os.getenv("COSTRICT_BASE_URL")
      }
    }
  }
}
```

---

### CodeCompanion.nvim

Add to your Neovim configuration:

```lua
require("codecompanion").setup({
  interactions = {
    chat = {
      adapter = {
        name = "costrict",
        model = "claude-sonnet-4-5",
      },
    },
  },
})
```

---

## Feature Support

When using CoStrict via ACP, it behaves identically to the terminal experience — all features are supported:

- Built-in tools (file operations, shell commands, etc.)
- Custom tools and slash commands
- MCP servers
- Project rules from `AGENTS.md`
- Custom formatters
- Agent and permission system

> Some built-in slash commands such as `/undo` and `/redo` are not currently supported via ACP.
