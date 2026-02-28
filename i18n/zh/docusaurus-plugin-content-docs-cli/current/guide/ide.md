---
sidebar_position: 5
---

# IDE 集成

CoStrict 可与 VS Code、Cursor 或任何支持终端的 IDE 集成。

---

## 用法

- **快速启动**：使用 `Cmd+Esc`（Mac）或 `Ctrl+Esc`（Windows/Linux）在分屏终端视图中打开 CoStrict，如果已有终端会话正在运行，则会自动聚焦到该会话。
- **新建会话**：使用 `Cmd+Shift+Esc`（Mac）或 `Ctrl+Shift+Esc`（Windows/Linux）启动新的 CoStrict 终端会话。
- **上下文感知**：自动将当前选中内容或标签页共享给 CoStrict。
- **文件引用快捷键**：使用 `Cmd+Option+K`（Mac）或 `Alt+Ctrl+K`（Linux/Windows）插入文件引用，例如 `@File#L37-42`。

---

## 安装

在 VS Code 及其常见分支（Cursor、Windsurf、VSCodium）上安装 CoStrict 扩展：

1. 打开 VS Code
2. 打开集成终端
3. 运行 `cs`——扩展将自动安装

---

### 手动安装

在扩展商店中搜索 **CoStrict**，然后点击 **Install**。

---

### 故障排除

如果扩展未能自动安装：

- 确保是在集成终端中运行的 `cs`，而不是外部终端。
- 确认你的 IDE 对应的 CLI 命令已安装：
  - VS Code：`code` 命令
  - Cursor：`cursor` 命令
  - Windsurf：`windsurf` 命令
  - VSCodium：`codium` 命令
  - 如果未安装，请按 `Cmd+Shift+P`（Mac）或 `Ctrl+Shift+P`（Windows/Linux），搜索 "Shell Command: Install 'code' command in PATH"
- 确保 IDE 有权限安装扩展。
