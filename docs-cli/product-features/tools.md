---
sidebar_position: 19
---

# Built-in Tools

Tools allow the LLM to perform actions in your codebase. CoStrict ships with a set of built-in tools and can be extended via [custom tools](./custom-tools) or [MCP servers](./mcp).

By default, all tools are **enabled** and require no permission to run. Use [permissions](./settings) to control tool behavior.

---

## Tool Permission Configuration

Use the `permission` field to control tool behavior:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "deny",
    "bash": "ask",
    "webfetch": "allow"
  }
}
```

Use wildcards to control multiple tools at once — for example, require confirmation for all tools from an MCP server:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "mymcp_*": "ask"
  }
}
```

---

## Built-in Tool Reference

### bash

Execute shell commands in the project environment (`npm install`, `git status`, etc.).

### edit

Modify existing files via exact string replacement. The primary way the LLM changes code.

### write

Create new files or overwrite existing ones.

> The `write` tool is controlled by the `edit` permission, which covers all file modification operations: `edit`, `write`, `patch`, and `multiedit`.

### read

Read file contents. Supports reading a specific line range in large files.

### grep

Search file contents with regular expressions. Supports full regex syntax and file pattern filtering.

### glob

Find files by pattern. Supports `**/*.js`, `src/**/*.ts`, etc. Returns results sorted by modification time.

### list

List files and directories at a given path. Supports glob pattern filtering.

### patch

Apply a patch (diff) file to the codebase.

> The `patch` tool is controlled by the `edit` permission.

### webfetch

Fetch and read web page content — useful for consulting documentation or researching online resources.

### websearch

Search the web for information.

> Available only when using the CoStrict platform provider, or when `COSTRICT_ENABLE_EXA=1` is set.

### skill

Load a Skill file (`SKILL.md`) and return its contents in the conversation.

### todowrite

Create and update a to-do list during coding sessions to track progress on complex multi-step tasks.

> Disabled by default for sub-agents. Can be enabled in agent configuration.

### todoread

Read the current state of the to-do list.

> Disabled by default for sub-agents. Can be enabled in agent configuration.

### lsp (experimental)

Interact with configured LSP servers for code intelligence: go-to-definition, find references, hover info, call hierarchy, and more.

Enable with:

```bash
export COSTRICT_EXPERIMENTAL_LSP_TOOL=true
```

Supported operations: `goToDefinition`, `findReferences`, `hover`, `documentSymbol`, `workspaceSymbol`, `goToImplementation`, `prepareCallHierarchy`, `incomingCalls`, `outgoingCalls`.

### question

Ask the user a question during task execution — useful for gathering preferences, clarifying instructions, or requesting decisions. Supports single-choice and free-text input.

---

## Ignore Patterns

Tools like `grep`, `glob`, and `list` use [ripgrep](https://github.com/BurntSushi/ripgrep) under the hood, which respects `.gitignore` patterns by default.

To include files that would normally be ignored, create an `.ignore` file in the project root:

```text title=".ignore"
!node_modules/
!dist/
!build/
```

---

## Extending Tools

- **Custom tools**: Write TypeScript/Python functions for the LLM to call — see [Custom Tools](./custom-tools)
- **MCP servers**: Integrate external tools and services — see [MCP Servers](./mcp)
