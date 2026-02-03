---
sidebar_position: 1
---

# Skills

Skills 通过自定义命令和工作流扩展 CoStrict CLI 的能力。

## 概述

Skills 是可重用的命令模板，封装了常见的工作流和最佳实践。

## 使用 Skills

### 列出可用 Skills

```bash
costrict skills list
```

### 运行 Skill

```bash
costrict skill run <skill-name>
```

### 示例 Skills

```bash
# 代码审查 skill
costrict skill run code-review

# 重构 skill
costrict skill run refactor --target src/auth.js

# 测试 skill
costrict skill run generate-tests --file src/utils.js
```

## 创建自定义 Skills

### Skill 定义

创建 skill 文件 `my-skill.yaml`:

```yaml
name: my-custom-skill
description: 我的自定义工作流
steps:
  - name: 分析代码
    command: analyze
  - name: 生成测试
    command: test --generate
  - name: 审查变更
    command: review
```

### 安装 Skill

```bash
costrict skill install ./my-skill.yaml
```

## 内置 Skills

- **code-review**: 全面的代码审查
- **refactor**: 智能重构
- **generate-tests**: 测试生成
- **optimize**: 性能优化
- **security-audit**: 安全扫描
- **documentation**: 生成文档

## Skill 市场

浏览和安装社区 skills:

```bash
costrict skill search <关键词>
costrict skill install <skill-name>
```

## 相关功能

- [AI Agent](../ai-agent.md) - 自主执行
- [Slash 命令](../slash-command.md) - 快速命令
