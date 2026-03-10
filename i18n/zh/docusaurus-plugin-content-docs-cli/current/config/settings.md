---
sidebar_position: 10
---
# 其它配置

## 工具权限

每条权限规则都归结为以下情况之一：

- "allow" — 无需批准即可运行

- "ask" — 请求批准

- "deny" — 阻止该操作

在 ~/.config/costrict/costrict.json 全局配置 或 项目根目录 costrict.json 中配置：

- 使用 * 匹配所有工具，并覆盖特定工具的权限

```
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "*": "ask",
    "bash": "allow",
    "edit": "deny"
  }
}
```

- 一次性设置所有权限

```
{
  "$schema": "https://opencode.ai/config.json",
  "permission": "allow"
}
```

- 细粒度规则

```
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "bash": {
      "*": "ask",
      "git *": "allow",
      "npm *": "allow",
      "rm *": "deny",
      "grep *": "allow"
    },
    "edit": {
      "*": "deny",
      "packages/web/src/content/docs/*.mdx": "allow"
    }
  }
}
```

权限模式使用简单的通配符匹配：

​                ● * 匹配零个或多个任意字符

​                ● ? 精确匹配一个字符

​                ● 所有其他字符均按字面意思匹配

- 外部目录：

```
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "external_directory": {
      "~/projects/personal/**": "allow"
    },
    "edit": {
      "~/projects/personal/**": "deny"
    }
  }
}
```





（5）Agent权限

您可以为每个Agent重写权限。智能体权限会与全局配置合并，且智能体规则优先。

.costrict/agents/review.md :

```
---
description: Code review without edits
mode: subagent
permission:
  edit: deny
  bash: ask
  webfetch: deny
---
 
Only analyze code and suggest changes.
```

## 环境变量

- COSTRICT_BASE_URL:  costrict服务端地址，私有化部署后端，配置使用；
- COSTRICT_EXPERIMENTAL_LSP_TOOL：启用实验性LSP工具；

## 对话语言设置

在 `~/.config/costrict/costrict.json` 全局配置中配置：

```json
{
  "promptLanguage": "en" // zh-CN/en 不填默认为 zh-CN
}
```

### 使用说明

- **`zh-CN`（默认）**：使用中文与 AI 进行对话和交互
- **`en`**：使用英文与 AI 进行对话和交互

:::tip 重要提示
当配置 `promptLanguage` 为 `en` 时，您提交的问题和指令也**必须使用英文**。这样可以确保 AI 能够更好地理解您的意图，并提供更准确的回复。

例如：
- ✅ 正确：`How do I implement a binary search tree?`
- ❌ 错误：`如何实现二叉搜索树？`
:::

### 语言切换效果

切换语言设置后会影响以下功能：

1. **对话语言**：AI 的回复语言会与配置保持一致
2. **系统提示词**：内部系统提示词的语言会相应调整
3. **错误信息**：部分错误提示的语言会根据设置显示



