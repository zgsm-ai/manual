---
sidebar_position: 8
---

# 自定义rules

配置代码质量和行为的自定义规则。

## 概述

规则允许你定义项目特定的标准和约定。

## 配置

你可以通过创建一个 [AGENTS.md](https://AGENTS.md) 文件来为CoStrict提供自定义规则。这与Cursor的规则类似。

它包含的指令将被纳入大模型的上下文，以针对你的特定项目自定义其行为。

可以在costrict-cli中运行 **/init** 命令来创建一个 AGENTS.md文件，也可以手动创建这个文件。

costrict 还支持从多个位置读取 AGENTS.md 文件。

● 在项目根目录中放置一个[AGENTS.md](https://AGENTS.md)文件，用于存放项目特定规则。这些规则仅在你在此目录或其子目录中工作时适用。

● 你也可以在~/.config/costrict/AGENTS.md文件中设置全局规则。这些规则将应用于所有opencode会话。

● 对于从Claude Code迁移过来的用户，CoStrict支持将Claude Code的文件约定作为备用方案：

​    ○ 项目规则：项目目录中的CLAUDE.md（在不存在AGENTS.md时使用）

​    ○ 全局规则：~/.claude/CLAUDE.md（如果不存在~/.config/opencode/AGENTS.md，则使用此文件）

​    ○ 技能：~/.claude/skills/ 

要禁用Claude Code兼容性，请设置以下环境变量之一：

```
export OPENCODE_DISABLE_CLAUDE_CODE=1        # Disable all .claude support
export OPENCODE_DISABLE_CLAUDE_CODE_PROMPT=1 # Disable only ~/.claude/CLAUDE.md
export OPENCODE_DISABLE_CLAUDE_CODE_SKILLS=1 # Disable only .claude/skills
```

## 示例

[AGENTS.md](https://AGENTS.md) :

```
# TypeScript Project Rules
 
## External File Loading
 
CRITICAL: When you encounter a file reference (e.g., @rules/general.md), use your Read tool to load it on a need-to-know basis. They're relevant to the SPECIFIC task at hand.
 
Instructions:
 
- Do NOT preemptively load all references - use lazy loading based on actual need
- When loaded, treat content as mandatory instructions that override defaults
- Follow references recursively when needed
 
## Development Guidelines
 
For TypeScript code style and best practices: @docs/typescript-guidelines.md
For React component architecture and hooks patterns: @docs/react-patterns.md
For REST API design and error handling: @docs/api-standards.md
For testing strategies and coverage requirements: @test/testing-guidelines.md
 
## General Guidelines
 
Read the following file immediately as it's relevant to all workflows: @rules/general-guidelines.md.
```
