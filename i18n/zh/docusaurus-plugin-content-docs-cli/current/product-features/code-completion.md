---
sidebar_position: 2
---

# 代码补全

CoStrict CLI 在你的终端编辑器中提供智能代码补全建议。

## 概述

在通过 CLI 编辑文件时获取 AI 驱动的代码建议。

## 使用方法

### 启用代码补全

```bash
costrict config set completion.enabled true
```

### 与编辑器一起使用

```bash
costrict edit src/app.js
```

按 `Tab` 键触发补全建议。

## 功能特性

- 上下文感知建议
- 多行补全
- 语言特定智能
- 项目感知推荐

## 配置

```bash
# 设置补全触发键
costrict config set completion.trigger "tab"

# 设置建议延迟
costrict config set completion.delay 300
```

## 支持的语言

- JavaScript/TypeScript
- Python
- Go
- Rust
- Java
- 以及更多...
