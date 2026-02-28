---
sidebar_position: 7
---

# ACP 协议支持

CoStrict 支持 [Agent Client Protocol](https://agentclientprotocol.com)（ACP），可以直接在兼容 ACP 的编辑器和 IDE 中使用。

ACP 是一个开放协议，用于标准化代码编辑器与 AI 编码代理之间的通信。

---

## 启动 ACP 服务器

通过以下命令将 CoStrict 作为 ACP 子进程启动，通过 stdio 上的 JSON-RPC 与编辑器通信：

```bash
cs acp
```

---

## 编辑器配置

### Zed

在 `~/.config/zed/settings.json` 中添加：

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

打开方式：在**命令面板**中执行 `agent: new thread`。

绑定快捷键（`keymap.json`）：

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

在 JetBrains IDE 的 `acp.json` 中添加：

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

打开方式：在 AI Chat 代理选择器中选择 `CoStrict`。

---

### Avante.nvim

在 [Avante.nvim](https://github.com/yetone/avante.nvim) 配置中添加：

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

如果需要传递环境变量：

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

在 Neovim 配置中添加：

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

## 功能支持

通过 ACP 使用 CoStrict 时，与在终端中使用效果完全一致，所有功能均受支持：

- 内置工具（文件操作、终端命令等）
- 自定义工具和斜杠命令
- MCP 服务器
- 来自 `AGENTS.md` 的项目规则
- 自定义格式化工具
- 代理和权限系统

> 部分内置斜杠命令（如 `/undo` 和 `/redo`）目前暂不支持。
