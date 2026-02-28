---
sidebar_position: 20
---

# Custom Tools

Custom tools are functions you write that the LLM can call during a conversation, working alongside CoStrict's [built-in tools](./tools).

---

## Creating Tools

Tools are defined as **TypeScript** or **JavaScript** files, but they can call scripts written in **any language** internally.

### File Locations

- Project-level: `.costrict/tools/`
- Global: `~/.config/costrict/tools/`

### Basic Structure

Use the `tool()` helper to create a tool. The **filename becomes the tool name**:

```ts title=".costrict/tools/database.ts"
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "Query the project database",
  args: {
    query: tool.schema.string().describe("The SQL query to execute"),
  },
  async execute(args) {
    // Database query logic
    return `Query executed: ${args.query}`
  },
})
```

The example above creates a tool named `database`.

---

### Multiple Tools in One File

A single file can export multiple tools. Each export becomes an independent tool named `<filename>_<exportname>`:

```ts title=".costrict/tools/math.ts"
import { tool } from "@opencode-ai/plugin"

export const add = tool({
  description: "Add two numbers",
  args: {
    a: tool.schema.number().describe("First number"),
    b: tool.schema.number().describe("Second number"),
  },
  async execute(args) {
    return args.a + args.b
  },
})

export const multiply = tool({
  description: "Multiply two numbers",
  args: {
    a: tool.schema.number().describe("First number"),
    b: tool.schema.number().describe("Second number"),
  },
  async execute(args) {
    return args.a * args.b
  },
})
```

This creates two tools: `math_add` and `math_multiply`.

---

### Parameter Definitions

Use `tool.schema` (which is [Zod](https://zod.dev)) to define parameter types:

```ts
args: {
  name: tool.schema.string().describe("Username"),
  age: tool.schema.number().optional().describe("Age (optional)"),
  tags: tool.schema.array(tool.schema.string()).describe("List of tags"),
}
```

---

### Context Information

Tools can access the current session's context at execution time:

```ts title=".costrict/tools/project.ts"
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "Get project information",
  args: {},
  async execute(args, context) {
    const { agent, sessionID, messageID, directory, worktree } = context
    return `Directory: ${directory}, Worktree: ${worktree}`
  },
})
```

- `directory` — The session's working directory
- `worktree` — The git worktree root
- `sessionID` / `messageID` — Current session and message IDs
- `agent` — The current agent name

---

## Example: Calling a Python Script

Tool definitions use TypeScript, but can invoke scripts in any language:

**Python script:**

```python title=".costrict/tools/add.py"
import sys

a = int(sys.argv[1])
b = int(sys.argv[2])
print(a + b)
```

**Tool definition:**

```ts title=".costrict/tools/python-add.ts"
import { tool } from "@opencode-ai/plugin"
import path from "path"

export default tool({
  description: "Add two numbers using Python",
  args: {
    a: tool.schema.number().describe("First number"),
    b: tool.schema.number().describe("Second number"),
  },
  async execute(args, context) {
    const script = path.join(context.worktree, ".costrict/tools/add.py")
    const result = await Bun.$`python3 ${script} ${args.a} ${args.b}`.text()
    return result.trim()
  },
})
```

---

## Testing Tools

Once created, start CoStrict and describe your needs in the conversation — the LLM will automatically identify and call the appropriate tool.

You can also define tools via plugins; see the [Plugins documentation](./plugins).
