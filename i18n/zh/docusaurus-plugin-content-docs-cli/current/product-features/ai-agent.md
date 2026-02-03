---
sidebar_position: 1
---

# AI Agent

CoStrict CLI 提供强大的 AI 代理能力，用于命令行开发。

## 概述

CLI 模式下的 AI Agent 提供自主任务执行、智能代码分析和交互式问题解决，直接在终端中完成。

## 主要功能

### 自主任务执行

AI 代理可以分解复杂任务并逐步执行：

```bash
costrict agent --task "重构认证模块"
```

### 上下文感知辅助

代理在整个会话中保持上下文，理解你的项目结构和之前的交互。

### 多步骤规划

对于复杂任务，代理会创建并执行详细计划：

```bash
costrict plan "添加用户注册功能"
```

## 使用示例

### 基本代理命令

```bash
costrict agent --prompt "分析代码质量问题"
```

### 交互模式

```bash
costrict chat
> 你能帮我优化这个函数吗？
```

### 后台任务

```bash
costrict agent --background --task "运行测试并修复失败"
```

## 配置

配置代理行为：

```bash
costrict config set agent.model "claude-sonnet-4"
costrict config set agent.max_iterations 10
```

## 最佳实践

- 提供清晰、具体的指令
- 对复杂的多步骤任务使用 plan 模式
- 在应用前审查代理建议
- 通过专注的会话利用上下文

## 相关功能

- [Plan 模式](./plan.md) - 结构化任务规划
- [代码审查](./code-review.md) - 自动化代码审查
- [Skills](./Skills/skills.md) - 扩展代理能力
