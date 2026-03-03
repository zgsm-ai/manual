---
sidebar_position: 9
---

# 插件

插件通过挂钩各种事件来扩展 CoStrict 的功能，可以添加新功能、集成外部服务或修改默认行为。

---

## 加载插件

### 从本地文件加载

将 JavaScript 或 TypeScript 文件放置在插件目录中，启动时自动加载：

- 项目级：`.costrict/plugins/`
- 全局：`~/.config/costrict/plugins/`

### 从 npm 加载

在配置文件中指定 npm 包：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-helicone-session", "opencode-wakatime", "@my-org/custom-plugin"]
}
```

npm 插件在启动时使用 Bun 自动安装，缓存在 `~/.cache/costrict/node_modules/` 中。

### 加载顺序

1. 全局配置（`~/.config/costrict/costrict.json`）
2. 项目配置（`costrict.json`）
3. 全局插件目录（`~/.config/costrict/plugins/`）
4. 项目插件目录（`.costrict/plugins/`）

---

## 编写插件

插件是一个导出一个或多个函数的 JS/TS 模块，函数接收上下文对象并返回事件钩子。

### 基本结构

```js title=".costrict/plugins/example.js"
export const MyPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // 在此实现事件钩子
  }
}
```

上下文参数说明：

- `project` — 当前项目信息
- `directory` — 当前工作目录
- `worktree` — git 工作树路径
- `client` — CoStrict SDK 客户端
- `$` — Bun [Shell API](https://bun.com/docs/runtime/shell)，用于执行命令

### TypeScript 支持

```ts title=".costrict/plugins/my-plugin.ts"
import type { Plugin } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // 类型安全的钩子实现
  }
}
```

### 插件依赖

本地插件需要外部 npm 包时，在配置目录中添加 `package.json`：

```json title=".costrict/package.json"
{
  "dependencies": {
    "shescape": "^2.1.0"
  }
}
```

CoStrict 启动时会自动运行 `bun install`。

---

## 可用事件

### 工具事件

- `tool.execute.before` — 工具执行前触发，可修改参数或阻止执行
- `tool.execute.after` — 工具执行后触发

### 会话事件

- `session.created` — 会话创建
- `session.idle` — 会话空闲（AI 完成响应）
- `session.compacted` — 会话被压缩
- `session.deleted` — 会话被删除
- `session.error` — 会话出现错误

### 文件事件

- `file.edited` — 文件被编辑
- `file.watcher.updated` — 文件监视器检测到变化

### TUI 事件

- `tui.prompt.append` — 向提示框追加内容
- `tui.command.execute` — 执行 TUI 命令
- `tui.toast.show` — 显示提示消息

### Shell 事件

- `shell.env` — 注入环境变量到 shell 执行环境

### 其他事件

- `message.updated` / `message.removed` — 消息变化
- `permission.asked` / `permission.replied` — 权限请求
- `lsp.updated` / `lsp.client.diagnostics` — LSP 状态
- `command.executed` — 命令执行
- `experimental.session.compacting` — 会话压缩前（实验性）

---

## 插件示例

### 会话完成通知

```js title=".costrict/plugins/notification.js"
export const NotificationPlugin = async ({ $ }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        // macOS 通知
        await $`osascript -e 'display notification "会话完成！" with title "CoStrict"'`
      }
    },
  }
}
```

### 保护 .env 文件

阻止 LLM 读取 `.env` 文件：

```js title=".costrict/plugins/env-protection.js"
export const EnvProtection = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args.filePath.includes(".env")) {
        throw new Error("不允许读取 .env 文件")
      }
    },
  }
}
```

### 注入环境变量

将环境变量注入所有 Shell 执行：

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

### 插件中定义自定义工具

```ts title=".costrict/plugins/custom-tools.ts"
import { type Plugin, tool } from "@opencode-ai/plugin"

export const CustomToolsPlugin: Plugin = async (ctx) => {
  return {
    tool: {
      mytool: tool({
        description: "自定义工具示例",
        args: {
          message: tool.schema.string().describe("消息内容"),
        },
        async execute(args, context) {
          return `收到消息：${args.message}，目录：${context.directory}`
        },
      }),
    },
  }
}
```

### 自定义压缩提示词

在会话上下文压缩时注入额外信息：

```ts title=".costrict/plugins/compaction.ts"
import type { Plugin } from "@opencode-ai/plugin"

export const CompactionPlugin: Plugin = async () => {
  return {
    "experimental.session.compacting": async (input, output) => {
      output.context.push(`
## 自定义上下文

记录需要在压缩后保留的重要状态：
- 当前任务进度
- 重要决策记录
- 正在修改的文件列表
`)
    },
  }
}
```

设置 `output.prompt` 可完全替换默认的压缩提示词。
