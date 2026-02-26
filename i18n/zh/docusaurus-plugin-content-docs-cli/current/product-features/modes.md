---
sidebar_position: 15
---

# 模式

CoStrict 中的模式允许你为不同的使用场景自定义行为、工具和提示词。

内置两种模式：**Build** 和 **Plan**。你可以自定义这些模式，也可以创建自己的模式。

---

## 内置模式

### Build

Build 是启用了所有工具的**默认**模式，适合日常开发工作，可以完全访问文件操作和系统命令。

### StritPlan

**StrictPlan** 模式可以提供更完整的规划工作流，详见 [StrictPlan 文档](./strict-plan)。

---

## 切换模式

在会话中使用 `Tab` 键切换模式，或使用配置的 `agent_cycle` 快捷键。

---

## 配置模式

模式可以通过两种方式配置。

### JSON 配置

在 `costrict.json` 中配置：

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

### Markdown 配置

将 Markdown 文件放置在以下位置：

- 全局：`~/.config/costrict/modes/`
- 项目：`.costrict/modes/`

文件名即为模式名称（例如 `review.md` 创建名为 `review` 的模式）。

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

## 配置选项

### 模型

为该模式指定使用的模型：

```json title="costrict.json"
{
  "mode": {
    "plan": {
      "model": "anthropic/claude-haiku-4-5"
    }
  }
}
```

### 温度

控制 AI 响应的随机性（0.0 ~ 1.0）：

- `0.0–0.2` — 集中且确定性高，适合代码分析和规划
- `0.3–0.5` — 兼顾稳定性与创造力，适合一般开发任务
- `0.6–1.0` — 更具创造性，适合头脑风暴

```json title="costrict.json"
{
  "mode": {
    "plan": { "temperature": 0.1 },
    "brainstorm": { "temperature": 0.7 }
  }
}
```

### 提示词

为模式指定自定义系统提示词文件：

```json title="costrict.json"
{
  "mode": {
    "review": {
      "prompt": "{file:./prompts/code-review.txt}"
    }
  }
}
```

### 工具

控制该模式下可用的工具：

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

可配置的工具列表：

| 工具        | 描述             |
| ----------- | ---------------- |
| `bash`      | 执行 shell 命令  |
| `edit`      | 修改现有文件     |
| `write`     | 创建新文件       |
| `read`      | 读取文件内容     |
| `grep`      | 搜索文件内容     |
| `glob`      | 按模式查找文件   |
| `list`      | 列出目录内容     |
| `patch`     | 对文件应用补丁   |
| `webfetch`  | 获取网页内容     |

---

## 自定义模式示例

### Debug 模式

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

You are in debug mode. Your primary goal is to help investigate and diagnose issues.

Focus on:
- Understanding the problem through careful analysis
- Using bash commands to inspect system state
- Reading relevant files and logs

Do not make any changes to files. Only investigate and report.
```

### Docs 模式

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

## 使用场景参考

| 模式 | 适用场景 |
| ---- | -------- |
| Build | 日常开发，启用所有工具 |
| Plan | 分析和规划，不做任何更改 |
| StrictPlan | 完整的需求分析和任务规划工作流 |
| Review | 代码审查，只读访问 |
| Debug | 问题排查，启用 bash 和读取工具 |
| Docs | 文档编写，支持文件操作但不支持系统命令 |
