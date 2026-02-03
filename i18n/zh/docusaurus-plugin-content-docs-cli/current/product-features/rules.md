---
sidebar_position: 7
---

# 规则

配置代码质量和行为的自定义规则。

## 概述

规则允许你定义项目特定的标准和约定。

## 配置

创建 `.costrictrc.json`:

```json
{
  "rules": {
    "naming": {
      "functions": "camelCase",
      "classes": "PascalCase",
      "constants": "UPPER_CASE"
    },
    "code_quality": {
      "max_function_length": 50,
      "max_file_length": 500,
      "complexity_threshold": 10
    },
    "security": {
      "no_hardcoded_secrets": true,
      "require_input_validation": true
    }
  }
}
```

## 规则类别

### 命名约定

- 函数命名
- 变量命名
- 类命名
- 文件命名

### 代码质量

- 函数长度限制
- 圈复杂度
- 代码重复
- 注释要求

### 安全性

- 密钥检测
- 输入验证
- SQL 注入防护
- XSS 防护

## 使用方法

### 检查规则

```bash
costrict check-rules
```

### 自动修复

```bash
costrict fix-rules
```

## 相关功能

- [严格模式](./strict-mode.md) - 增强执行
- [代码审查](./code-review.md) - 自动化检查
