---
sidebar_position: 1
---

# 配置

CoStrict 使用 JSON 配置文件进行配置。

---

## 格式

支持 **JSON** 和 **JSONC**（带注释的 JSON）两种格式。

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  // 主题配置
  "theme": "opencode",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true
}
```

---

## 配置文件位置

配置文件可以放置在不同位置，具有不同的优先级。多个配置文件会**合并**，而不是替换——后面的配置仅在键冲突时覆盖前面的配置。

### 优先级顺序

配置源按以下顺序加载（后面的源优先级更高）：

1. **远程配置**（来自 `.well-known/opencode`）— 组织默认值
2. **全局配置**（`~/.config/costrict/costrict.json`）— 用户偏好
3. **自定义配置**（`COSTRICT_CONFIG` 环境变量）— 自定义覆盖
4. **项目配置**（项目根目录的 `costrict.json`）— 项目特定设置
5. **`.costrict` 目录** — 代理、命令、插件
6. **内联配置**（`COSTRICT_CONFIG_CONTENT` 环境变量）— 运行时覆盖

### 全局配置

将全局配置放在 `~/.config/costrict/costrict.json` 中，用于设置用户级别的偏好，例如主题、提供商或快捷键。

### 项目配置

在项目根目录中添加 `costrict.json`，项目配置具有最高优先级，会覆盖全局配置。

CoStrict 启动时会在当前目录中查找配置文件，或向上遍历到最近的 Git 目录。该文件可以安全地提交到 Git 中。

### 自定义路径

使用 `COSTRICT_CONFIG` 环境变量指定自定义配置文件路径：

```bash
export COSTRICT_CONFIG=/path/to/my/custom-config.json
cs run "Hello world"
```

### 自定义目录

使用 `COSTRICT_CONFIG_DIR` 环境变量指定自定义配置目录，该目录会像标准 `.costrict` 目录一样被搜索代理、命令和插件：

```bash
export COSTRICT_CONFIG_DIR=/path/to/my/config-directory
cs run "Hello world"
```

---

## 配置项说明

### 模型

通过 `model` 和 `small_model` 设置默认模型：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

`small_model` 用于标题生成等轻量级任务，默认会尝试使用提供商中更便宜的模型。

提供商级别的选项配置：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "timeout": 600000,
        "setCacheKey": true
      }
    }
  }
}
```

- `timeout` — 请求超时时间，单位毫秒（默认 300000）。设为 `false` 可禁用超时。
- `setCacheKey` — 确保始终为指定提供商设置缓存键。

---

### 工具

管理 LLM 可以使用的工具：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "tools": {
    "write": false,
    "bash": false
  }
}
```

---

### 主题

设置界面主题：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "theme": "opencode"
}
```

---

### 代理

在配置文件中直接定义代理：

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "code-reviewer": {
      "description": "代码审查，关注安全性和可维护性",
      "model": "anthropic/claude-sonnet-4-5",
      "prompt": "You are a code reviewer. Focus on security, performance, and maintainability.",
      "tools": {
        "write": false,
        "edit": false
      }
    }
  }
}
```

也可以使用 `~/.config/costrict/agents/` 或 `.costrict/agents/` 中的 Markdown 文件定义代理。

### 默认代理

设置启动时的默认代理：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "build"
}
```

默认代理必须是主代理（不能是子代理）。可以是内置代理（如 `"build"` 或 `"plan"`），也可以是自定义代理。

---

### 命令

在配置文件中定义自定义命令：

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "test": {
      "template": "运行完整测试套件并显示覆盖率报告。",
      "description": "运行测试",
      "agent": "build"
    },
    "component": {
      "template": "创建一个名为 $ARGUMENTS 的 React 组件，包含 TypeScript 支持。",
      "description": "创建新组件"
    }
  }
}
```

---

### 快捷键

自定义快捷键：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "keybinds": {
    "leader": "ctrl+x",
    "session_new": "<leader>n"
  }
}
```

详见[快捷键文档](./keybinds)。

---

### 权限

默认情况下，CoStrict **允许所有操作**。可以通过 `permission` 选项更改此行为：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

详见[权限配置文档](./settings)。

---

### 压缩

控制上下文压缩行为：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}
```

- `auto` — 当上下文已满时自动压缩（默认 `true`）
- `prune` — 删除旧的工具输出以节省 Token（默认 `true`）
- `reserved` — 压缩时保留的 Token 缓冲区

---

### 格式化程序

配置代码格式化程序：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {
    "prettier": {
      "disabled": true
    },
    "custom-prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "extensions": [".js", ".ts", ".jsx", ".tsx"]
    }
  }
}
```

---

### 文件监视器

配置文件监视器的忽略模式：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "watcher": {
    "ignore": ["node_modules/**", "dist/**", ".git/**"]
  }
}
```

---

### 自动更新

CoStrict 启动时会自动检查新版本。禁用自动更新：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "autoupdate": false
}
```

设为 `"notify"` 可在有新版本时仅通知而不自动更新。

---

### 禁用/启用提供商

禁用特定提供商（即使其凭据可用）：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "disabled_providers": ["openai", "gemini"]
}
```

仅允许使用特定提供商：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "enabled_providers": ["anthropic", "costrict"]
}
```

`disabled_providers` 优先于 `enabled_providers`。

---

### 服务器

为 `cs serve` 和 `cs web` 命令配置服务器：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "server": {
    "port": 4096,
    "hostname": "0.0.0.0",
    "mdns": true,
    "cors": ["http://localhost:5173"]
  }
}
```

---

## 变量替换

配置文件中支持变量替换。

### 环境变量

使用 `{env:VARIABLE_NAME}` 引用环境变量：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "options": {
        "apiKey": "{env:MY_API_KEY}"
      }
    }
  }
}
```

如果环境变量未设置，将被替换为空字符串。

### 文件引用

使用 `{file:path/to/file}` 引用文件内容：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{file:~/.secrets/openai-key}"
      }
    }
  }
}
```

文件路径可以是相对于配置文件所在目录的路径，或以 `/`、`~` 开头的绝对路径。
