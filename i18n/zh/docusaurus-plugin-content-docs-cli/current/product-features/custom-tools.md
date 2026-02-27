---
sidebar_position: 20
---

# 自定义工具

自定义工具是你编写的函数，LLM 可以在对话中调用它们，与 CoStrict [内置工具](./tools)协同工作。

---

## 创建工具

工具以 **TypeScript** 或 **JavaScript** 文件的形式定义，但工具内部可以调用**任何语言**编写的脚本。

### 文件位置

- 项目级：`.costrict/tools/`
- 全局：`~/.config/costrict/tools/`

### 基本结构

使用 `tool()` 辅助函数创建工具，**文件名即为工具名称**：

```ts title=".costrict/tools/database.ts"
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "查询项目数据库",
  args: {
    query: tool.schema.string().describe("要执行的 SQL 查询"),
  },
  async execute(args) {
    // 数据库查询逻辑
    return `已执行查询：${args.query}`
  },
})
```

上面的示例创建了一个名为 `database` 的工具。

---

### 单文件多工具

一个文件可以导出多个工具，每个导出会成为独立的工具，命名格式为 `<文件名>_<导出名>`：

```ts title=".costrict/tools/math.ts"
import { tool } from "@opencode-ai/plugin"

export const add = tool({
  description: "两数相加",
  args: {
    a: tool.schema.number().describe("第一个数"),
    b: tool.schema.number().describe("第二个数"),
  },
  async execute(args) {
    return args.a + args.b
  },
})

export const multiply = tool({
  description: "两数相乘",
  args: {
    a: tool.schema.number().describe("第一个数"),
    b: tool.schema.number().describe("第二个数"),
  },
  async execute(args) {
    return args.a * args.b
  },
})
```

这会创建 `math_add` 和 `math_multiply` 两个工具。

---

### 参数定义

使用 `tool.schema`（即 [Zod](https://zod.dev)）定义参数类型：

```ts
args: {
  name: tool.schema.string().describe("用户名"),
  age: tool.schema.number().optional().describe("年龄（可选）"),
  tags: tool.schema.array(tool.schema.string()).describe("标签列表"),
}
```

---

### 上下文信息

工具执行时可以访问当前会话的上下文：

```ts title=".costrict/tools/project.ts"
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "获取项目信息",
  args: {},
  async execute(args, context) {
    const { agent, sessionID, messageID, directory, worktree } = context
    return `目录：${directory}，Worktree：${worktree}`
  },
})
```

- `directory` — 会话的工作目录
- `worktree` — git worktree 根目录
- `sessionID` / `messageID` — 当前会话和消息 ID
- `agent` — 当前代理名称

---

## 示例：调用 Python 脚本

工具定义使用 TypeScript，但可以调用任何语言的脚本：

**Python 脚本：**

```python title=".costrict/tools/add.py"
import sys

a = int(sys.argv[1])
b = int(sys.argv[2])
print(a + b)
```

**工具定义：**

```ts title=".costrict/tools/python-add.ts"
import { tool } from "@opencode-ai/plugin"
import path from "path"

export default tool({
  description: "使用 Python 计算两数之和",
  args: {
    a: tool.schema.number().describe("第一个数"),
    b: tool.schema.number().describe("第二个数"),
  },
  async execute(args, context) {
    const script = path.join(context.worktree, ".costrict/tools/add.py")
    const result = await Bun.$`python3 ${script} ${args.a} ${args.b}`.text()
    return result.trim()
  },
})
```

---

## 测试工具

创建工具后，启动 CoStrict，在对话中直接描述需求，LLM 会自动识别并调用相应工具。

也可以通过插件方式定义工具，详见[插件文档](./plugins)。
