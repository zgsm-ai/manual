---
sidebar_position: 19
---

# 内置工具

工具允许 LLM 在代码库中执行操作。CoStrict 自带一组内置工具，也可以通过[自定义工具](./custom-tools)或 [MCP 服务器](./mcp)扩展。

默认情况下，所有工具均**启用**且无需权限即可运行。可通过[权限配置](./settings)控制工具行为。

---

## 工具权限配置

使用 `permission` 字段控制工具的行为：

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

使用通配符批量控制，例如要求某个 MCP 服务器的所有工具都需要确认：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "mymcp_*": "ask"
  }
}
```

---

## 内置工具列表

### bash

在项目环境中执行 shell 命令（`npm install`、`git status` 等）。

### edit

通过精确的字符串替换修改现有文件，是 LLM 修改代码的主要方式。

### write

创建新文件或覆盖现有文件。

> `write` 工具由 `edit` 权限控制，该权限同时管理 `edit`、`write`、`patch`、`multiedit` 等所有文件修改操作。

### read

读取代码库中的文件内容，支持对大文件指定行范围读取。

### grep

使用正则表达式搜索文件内容，支持完整正则语法和文件模式过滤。

### glob

通过模式匹配查找文件，支持 `**/*.js`、`src/**/*.ts` 等 glob 模式，返回按修改时间排序的结果。

### list

列出指定路径下的文件和目录，支持 glob 模式过滤。

### patch

对文件应用补丁（diff 文件）。

> `patch` 工具由 `edit` 权限控制。

### webfetch

获取并读取网页内容，用于查阅文档或研究在线资源。

### websearch

在网络上搜索信息。

> 该工具仅在使用 CoStrict 平台提供商时可用，或通过设置 `COSTRICT_ENABLE_EXA=1` 启用。

### skill

加载一个 Skill 文件（`SKILL.md`）并在对话中返回其内容。

### todowrite

在编码会话中创建和更新待办事项列表，用于追踪复杂多步骤任务的进度。

> 该工具默认对子代理禁用，可在代理配置中手动启用。

### todoread

读取当前待办事项列表的状态。

> 该工具默认对子代理禁用，可在代理配置中手动启用。

### lsp（实验性）

与已配置的 LSP 服务器交互，获取代码智能功能：定义跳转、引用查找、悬停信息、调用层次结构等。

启用方式：

```bash
export COSTRICT_EXPERIMENTAL_LSP_TOOL=true
```

支持的操作：`goToDefinition`、`findReferences`、`hover`、`documentSymbol`、`workspaceSymbol`、`goToImplementation`、`prepareCallHierarchy`、`incomingCalls`、`outgoingCalls`。

### question

在执行过程中向用户提问，用于收集偏好、澄清指令或获取决策。支持单选和自定义输入。

---

## 忽略模式

`grep`、`glob`、`list` 等工具底层使用 [ripgrep](https://github.com/BurntSushi/ripgrep)，默认遵循 `.gitignore` 中的模式。

如需包含通常被忽略的文件，在项目根目录创建 `.ignore` 文件：

```text title=".ignore"
!node_modules/
!dist/
!build/
```

---

## 扩展工具

- **自定义工具**：用 TypeScript/Python 编写自定义函数供 LLM 调用，详见[自定义工具文档](./custom-tools)
- **MCP 服务器**：集成外部工具和服务，详见 [MCP 文档](./mcp)
