---
sidebar_position: 5
---

# 严格模式

严格模式强制执行更高的代码质量标准和最佳实践。

## 概述

启用严格模式以增强代码质量检查和更严格的验证。

## 启用严格模式

```bash
costrict config set strict_mode true
```

## 功能

### 增强验证

- 更严格的类型检查
- 更全面的代码检查
- 安全漏洞扫描
- 性能分析

### 代码标准

- 强制执行编码约定
- 要求文档
- 验证测试覆盖率
- 检查代码异味

## 使用方法

### 全局设置

```bash
costrict config set strict_mode true
```

### 单次命令

```bash
costrict review --strict
```

### 项目级别

创建 `.costrictrc.json`:

```json
{
  "strict_mode": true,
  "strict_rules": {
    "require_tests": true,
    "min_coverage": 80,
    "require_docs": true
  }
}
```

## 严格模式规则

- 所有函数必须有文档
- 测试覆盖率必须达到阈值
- 生产代码中不能有 console.log
- TODO 注释必须关联工单
- 所有错误必须被处理

## 相关功能

- [代码审查](./code-review.md) - 自动化审查
- [规则](./rules.md) - 自定义规则配置
