---
sidebar_position: 3
---

# 代码审查

CoStrict CLI 中的自动化代码审查功能。

## 概述

直接从命令行获取 AI 驱动的代码审查。

## 基本用法

### 审查当前更改

```bash
costrict review
```

审查仓库中所有未提交的更改。

### 审查特定文件

```bash
costrict review src/auth.js src/utils.js
```

### 审查提交

```bash
costrict review --commit abc123
```

### 审查 Pull Request

```bash
costrict review --pr 42
```

## 审查输出

审查包括:

- 代码质量问题
- 潜在错误
- 安全漏洞
- 性能建议
- 最佳实践推荐

## 配置

```bash
# 设置审查严格程度
costrict config set review.strictness "high"

# 启用自动修复建议
costrict config set review.auto_fix true
```

## 审查模式

### 快速审查

```bash
costrict review --quick
```

快速审查，关注关键问题。

### 深度审查

```bash
costrict review --deep
```

全面分析，包括架构和设计模式。

### 安全审查

```bash
costrict review --security
```

关注安全漏洞和最佳实践。

## 集成

### Pre-commit Hook

```bash
costrict install-hook pre-commit
```

### CI/CD 集成

```bash
costrict review --format json > review-results.json
```

## 相关功能

- [AI Agent](./ai-agent.md) - 自主任务执行
- [严格模式](./strict-mode.md) - 增强代码质量检查
