---
sidebar_position: 6
---

# Slash 命令

CoStrict CLI 中常用操作的快捷命令。

## 概述

Slash 命令为常用操作提供快捷方式。

## 可用命令

### /review

快速代码审查:

```bash
costrict /review
```

### /test

运行测试:

```bash
costrict /test
```

### /fix

自动修复问题:

```bash
costrict /fix
```

### /explain

解释代码:

```bash
costrict /explain src/auth.js
```

### /optimize

优化代码:

```bash
costrict /optimize
```

## 自定义 Slash 命令

在 `.costrictrc.json` 中创建自定义命令:

```json
{
  "slash_commands": {
    "/deploy": "npm run build && npm run deploy",
    "/lint": "eslint . --fix"
  }
}
```

## 相关功能

- [Skills](./Skills/skills.md) - 扩展能力
- [AI Agent](./ai-agent.md) - 自主执行
