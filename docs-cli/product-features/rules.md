---
sidebar_position: 8
---

# Custom Rules

Configure custom rules for code quality and behavior.

## Overview

Rules allow you to define project-specific standards and conventions.

## Configuration

You can provide custom rules to CoStrict by creating an [AGENTS.md](https://AGENTS.md) file. This is similar to Cursor's rules.

The instructions it contains will be incorporated into the large model's context to customize its behavior for your specific project.

You can run the **/init** command in costrict-cli to create an AGENTS.md file, or you can manually create this file.

CoStrict also supports reading AGENTS.md files from multiple locations.

● Place an [AGENTS.md](https://AGENTS.md) file in the project root directory for project-specific rules. These rules only apply when you work in this directory or its subdirectories.

● You can also set global rules in the ~/.config/costrict/AGENTS.md file. These rules will apply to all OpenCode sessions.

● For users migrating from Claude Code, CoStrict supports Claude Code's file conventions as a fallback:

○ Project rules: CLAUDE.md in the project directory (used when AGENTS.md does not exist)

○ Global rules: ~/.claude/CLAUDE.md (used if ~/.config/opencode/AGENTS.md does not exist)

○ Skills: ~/.claude/skills/

To disable Claude Code compatibility, set one of the following environment variables:

```
export OPENCODE_DISABLE_CLAUDE_CODE=1        # Disable all .claude support
export OPENCODE_DISABLE_CLAUDE_CODE_PROMPT=1 # Disable only ~/.claude/CLAUDE.md
export OPENCODE_DISABLE_CLAUDE_CODE_SKILLS=1 # Disable only .claude/skills
```

## Example

[AGENTS.md](https://AGENTS.md):

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
