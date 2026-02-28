---
sidebar_position: 4
---

# CLI 命令

CoStrict CLI 在不带任何参数运行时，默认启动 TUI 界面。

```bash
cs
```

也可以直接传入提示词以非交互方式运行：

```bash
cs run "解释 JavaScript 中闭包的工作原理"
```

---

## tui

启动 CoStrict 终端用户界面。

```bash
cs [project]
```

### 标志

| 标志         | 简写 | 描述                                                      |
| ------------ | ---- | --------------------------------------------------------- |
| `--continue` | `-c` | 继续上一个会话                                            |
| `--session`  | `-s` | 要继续的会话 ID                                           |
| `--fork`     |      | 继续时分叉会话（与 `--continue` 或 `--session` 配合使用） |
| `--prompt`   |      | 要使用的提示词                                            |
| `--model`    | `-m` | 要使用的模型，格式为 provider/model                       |
| `--agent`    |      | 要使用的代理                                              |
| `--port`     |      | 监听端口                                                  |
| `--hostname` |      | 监听主机名                                                |

---

## 命令

### agent

管理 CoStrict 的代理。

```bash
cs agent [command]
```

#### create

使用自定义配置创建新的代理。

```bash
cs agent create
```

此命令将引导您使用自定义系统提示词和工具配置来创建新的代理。

#### list

列出所有可用的代理。

```bash
cs agent list
```

---

### attach

将终端连接到已通过 `serve` 或 `web` 命令启动的 CoStrict 后端服务器。

```bash
cs attach [url]
```

例如：

```bash
# 启动后端服务器
cs web --port 4096 --hostname 0.0.0.0

# 在另一个终端中，将 TUI 连接到运行中的后端
cs attach http://10.20.30.40:4096
```

#### 标志

| 标志        | 简写 | 描述                |
| ----------- | ---- | ------------------- |
| `--dir`     |      | 启动 TUI 的工作目录 |
| `--session` | `-s` | 要继续的会话 ID     |

---

### auth

管理提供商的凭据和登录信息。

```bash
cs auth [command]
```

#### login

为提供商配置 API 密钥。密钥存储在 `~/.local/share/costrict/auth.json` 中。

```bash
cs auth login
```

CoStrict 启动时会从凭据文件加载提供商信息，同时也会加载环境变量或项目中 `.env` 文件中定义的密钥。

#### list

列出所有已认证的提供商。

```bash
cs auth list
# 或
cs auth ls
```

#### logout

清除提供商的登录信息。

```bash
cs auth logout
```

---

### mcp

管理 Model Context Protocol 服务器。

```bash
cs mcp [command]
```

#### add

将 MCP 服务器添加到配置中。

```bash
cs mcp add
```

#### list

列出所有已配置的 MCP 服务器及其连接状态。

```bash
cs mcp list
# 或
cs mcp ls
```

#### auth

对支持 OAuth 的 MCP 服务器进行认证。

```bash
cs mcp auth [name]
```

列出支持 OAuth 的服务器及其认证状态：

```bash
cs mcp auth list
# 或
cs mcp auth ls
```

#### logout

移除 MCP 服务器的 OAuth 凭据。

```bash
cs mcp logout [name]
```

#### debug

调试 MCP 服务器的 OAuth 连接问题。

```bash
cs mcp debug <name>
```

---

### models

列出已配置提供商的所有可用模型。

```bash
cs models [provider]
```

以 `provider/model` 格式显示所有可用模型，可用于确定配置文件中使用的确切模型名称。

按提供商筛选：

```bash
cs models anthropic
```

#### 标志

| 标志        | 描述                                     |
| ----------- | ---------------------------------------- |
| `--refresh` | 从 models.dev 刷新模型缓存               |
| `--verbose` | 使用更详细的输出（包含费用等元数据）     |

---

### run

以非交互模式运行 CoStrict，直接传入提示词。

```bash
cs run [message..]
```

适用于脚本编写、自动化或快速获取答案的场景：

```bash
cs run 解释 Go 中 context 的用法
```

连接到正在运行的 `cs serve` 实例，避免 MCP 服务器冷启动：

```bash
# 在一个终端启动无界面服务器
cs serve

# 在另一个终端运行命令
cs run --attach http://localhost:4096 "解释 async/await"
```

#### 标志

| 标志         | 简写 | 描述                                                           |
| ------------ | ---- | -------------------------------------------------------------- |
| `--command`  |      | 要运行的命令，使用 message 作为参数                            |
| `--continue` | `-c` | 继续上一个会话                                                 |
| `--session`  | `-s` | 要继续的会话 ID                                                |
| `--fork`     |      | 继续时分叉会话（与 `--continue` 或 `--session` 配合使用）      |
| `--share`    |      | 分享会话                                                       |
| `--model`    | `-m` | 要使用的模型，格式为 provider/model                            |
| `--agent`    |      | 要使用的代理                                                   |
| `--file`     | `-f` | 附加到消息的文件                                               |
| `--format`   |      | 格式：default（格式化输出）或 json（原始 JSON 事件）           |
| `--title`    |      | 会话标题                                                       |
| `--attach`   |      | 连接到正在运行的 CoStrict 服务器（例如 http://localhost:4096） |
| `--port`     |      | 本地服务器端口（默认为随机端口）                               |

---

### serve

启动无界面的 CoStrict 服务器以提供 API 访问。

```bash
cs serve
```

设置 `COSTRICT_SERVER_PASSWORD` 可启用 HTTP 基本认证（用户名默认为 `costrict`）。

#### 标志

| 标志         | 描述                       |
| ------------ | -------------------------- |
| `--port`     | 监听端口                   |
| `--hostname` | 监听主机名                 |
| `--mdns`     | 启用 mDNS 发现             |
| `--cors`     | 允许 CORS 的额外浏览器来源 |

---

### session

管理 CoStrict 会话。

```bash
cs session [command]
```

#### list

列出所有会话。

```bash
cs session list
```

| 标志          | 简写 | 描述                                  |
| ------------- | ---- | ------------------------------------- |
| `--max-count` | `-n` | 限制为最近 N 个会话                   |
| `--format`    |      | 输出格式：table 或 json（默认 table） |

---

### stats

显示会话的 Token 用量和费用统计信息。

```bash
cs stats
```

#### 标志

| 标志        | 描述                                                   |
| ----------- | ------------------------------------------------------ |
| `--days`    | 显示最近 N 天的统计信息（默认为所有时间）              |
| `--tools`   | 显示的工具数量（默认为全部）                           |
| `--models`  | 显示模型用量明细                                       |
| `--project` | 按项目筛选                                             |

---

### export

将会话数据导出为 JSON。

```bash
cs export [sessionID]
```

不提供会话 ID 时，系统将提示您从可用会话中选择。

---

### import

从 JSON 文件导入会话数据。

```bash
cs import <file>
```

---

### web

启动带有 Web 界面的无界面 CoStrict 服务器。

```bash
cs web
```

此命令启动 HTTP 服务器并打开浏览器，通过 Web 界面访问 CoStrict。默认地址为 `http://127.0.0.1:4096/`。

#### 标志

| 标志         | 描述                       |
| ------------ | -------------------------- |
| `--port`     | 监听端口                   |
| `--hostname` | 监听主机名                 |
| `--mdns`     | 启用 mDNS 发现             |
| `--cors`     | 允许 CORS 的额外浏览器来源 |

---

### acp

启动 ACP（Agent Client Protocol）服务器。

```bash
cs acp
```

通过 stdin/stdout 使用 nd-JSON 进行通信。

#### 标志

| 标志         | 描述       |
| ------------ | ---------- |
| `--cwd`      | 工作目录   |
| `--port`     | 监听端口   |
| `--hostname` | 监听主机名 |

---

### uninstall

卸载 CoStrict 并删除所有相关文件。

```bash
cs uninstall
```

#### 标志

| 标志            | 简写 | 描述                           |
| --------------- | ---- | ------------------------------ |
| `--keep-config` | `-c` | 保留配置文件                   |
| `--keep-data`   | `-d` | 保留会话数据和快照             |
| `--dry-run`     |      | 显示将被删除的内容但不实际删除 |
| `--force`       | `-f` | 跳过确认提示                   |

---

### upgrade

将 CoStrict 更新到最新版本或指定版本。

```bash
cs upgrade [target]
```

更新到指定版本：

```bash
cs upgrade v0.1.48
```

#### 标志

| 标志       | 简写 | 描述                                       |
| ---------- | ---- | ------------------------------------------ |
| `--method` | `-m` | 使用的安装方式：curl、npm、pnpm、bun、brew |

---

## 全局标志

| 标志           | 简写 | 描述                                 |
| -------------- | ---- | ------------------------------------ |
| `--help`       | `-h` | 显示帮助信息                         |
| `--version`    | `-v` | 打印版本号                           |
| `--print-logs` |      | 将日志输出到 stderr                  |
| `--log-level`  |      | 日志级别（DEBUG、INFO、WARN、ERROR） |

---

## 环境变量

CoStrict 可以通过环境变量进行配置。

| 变量                                    | 类型    | 描述                                      |
| --------------------------------------- | ------- | ----------------------------------------- |
| `COSTRICT_BASE_URL`                     | string  | CoStrict 服务端地址（私有化部署时使用）   |
| `COSTRICT_SERVER_PASSWORD`              | string  | 为 `serve`/`web` 启用基本认证             |
| `COSTRICT_SERVER_USERNAME`              | string  | 覆盖基本认证用户名（默认为 `costrict`）   |
| `COSTRICT_CONFIG`                       | string  | 配置文件路径                              |
| `COSTRICT_CONFIG_DIR`                   | string  | 配置目录路径                              |
| `COSTRICT_CONFIG_CONTENT`               | string  | 内联 JSON 配置内容                        |
| `COSTRICT_AUTO_SHARE`                   | boolean | 自动分享会话                              |
| `COSTRICT_DISABLE_AUTOUPDATE`           | boolean | 禁用自动更新检查                          |
| `COSTRICT_DISABLE_TERMINAL_TITLE`       | boolean | 禁用自动终端标题更新                      |
| `COSTRICT_PERMISSION`                   | string  | 内联 JSON 权限配置                        |
| `COSTRICT_DISABLE_LSP_DOWNLOAD`         | boolean | 禁用 LSP 服务器自动下载                   |
| `COSTRICT_DISABLE_AUTOCOMPACT`          | boolean | 禁用自动上下文压缩                        |
| `COSTRICT_GIT_BASH_PATH`               | string  | Windows 上 Git Bash 可执行文件的路径      |

### 实验性功能

| 变量                                            | 类型    | 描述                            |
| ----------------------------------------------- | ------- | ------------------------------- |
| `COSTRICT_EXPERIMENTAL`                         | boolean | 启用所有实验性功能              |
| `COSTRICT_EXPERIMENTAL_LSP_TOOL`                | boolean | 启用实验性 LSP 工具             |
| `COSTRICT_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS` | number  | bash 命令的默认超时时间（毫秒） |
| `COSTRICT_EXPERIMENTAL_OUTPUT_TOKEN_MAX`        | number  | LLM 响应的最大输出 Token 数     |
| `COSTRICT_EXPERIMENTAL_FILEWATCHER`             | boolean | 启用整个目录的文件监听器        |
| `COSTRICT_EXPERIMENTAL_PLAN_MODE`               | boolean | 启用计划模式                    |
