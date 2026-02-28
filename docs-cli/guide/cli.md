---
sidebar_position: 4
---

# CLI Commands

When run without arguments, the CoStrict CLI launches the TUI interface by default.

```bash
cs
```

You can also pass a prompt directly to run non-interactively:

```bash
cs run "Explain how closures work in JavaScript"
```

---

## tui

Launch the CoStrict terminal user interface.

```bash
cs [project]
```

### Flags

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--continue` | `-c` | Resume the last session |
| `--session` | `-s` | Session ID to resume |
| `--fork` | | Fork the session when resuming (use with `--continue` or `--session`) |
| `--prompt` | | Prompt to use |
| `--model` | `-m` | Model to use, in `provider/model` format |
| `--agent` | | Agent to use |
| `--port` | | Port to listen on |
| `--hostname` | | Hostname to listen on |

---

## Commands

### agent

Manage CoStrict agents.

```bash
cs agent [command]
```

#### create

Create a new agent with a custom configuration.

```bash
cs agent create
```

This command guides you through creating an agent with a custom system prompt and tool configuration.

#### list

List all available agents.

```bash
cs agent list
```

---

### attach

Attach a terminal to a CoStrict backend started via `serve` or `web`.

```bash
cs attach [url]
```

Example:

```bash
# Start the backend server
cs web --port 4096 --hostname 0.0.0.0

# In another terminal, attach the TUI to the running backend
cs attach http://10.20.30.40:4096
```

#### Flags

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--dir` | | Working directory to launch the TUI in |
| `--session` | `-s` | Session ID to resume |

---

### auth

Manage provider credentials and login state.

```bash
cs auth [command]
```

#### login

Configure API keys for providers. Keys are stored in `~/.local/share/costrict/auth.json`.

```bash
cs auth login
```

CoStrict loads provider information from the credentials file on startup, as well as from environment variables or a `.env` file in the project.

#### list

List all authenticated providers.

```bash
cs auth list
# or
cs auth ls
```

#### logout

Remove a provider's login credentials.

```bash
cs auth logout
```

---

### mcp

Manage Model Context Protocol servers.

```bash
cs mcp [command]
```

#### add

Add an MCP server to your configuration.

```bash
cs mcp add
```

#### list

List all configured MCP servers and their connection status.

```bash
cs mcp list
# or
cs mcp ls
```

#### auth

Authenticate against an OAuth-enabled MCP server.

```bash
cs mcp auth [name]
```

List OAuth-enabled servers and their auth status:

```bash
cs mcp auth list
# or
cs mcp auth ls
```

#### logout

Remove OAuth credentials for an MCP server.

```bash
cs mcp logout [name]
```

#### debug

Debug OAuth connection issues for an MCP server.

```bash
cs mcp debug <name>
```

---

### models

List all available models across configured providers.

```bash
cs models [provider]
```

Models are displayed in `provider/model` format — useful for finding the exact model name to use in config files.

Filter by provider:

```bash
cs models anthropic
```

#### Flags

| Flag | Description |
| ---- | ----------- |
| `--refresh` | Refresh the model cache from models.dev |
| `--verbose` | Verbose output including pricing metadata |

---

### run

Run CoStrict non-interactively with a direct prompt.

```bash
cs run [message..]
```

Useful for scripting, automation, or quick answers:

```bash
cs run Explain how context works in Go
```

Connect to a running `cs serve` instance to avoid MCP server cold-start time:

```bash
# Start a headless server in one terminal
cs serve

# Run commands in another terminal
cs run --attach http://localhost:4096 "Explain async/await"
```

#### Flags

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--command` | | Command to run, using the message as arguments |
| `--continue` | `-c` | Resume the last session |
| `--session` | `-s` | Session ID to resume |
| `--fork` | | Fork the session when resuming |
| `--share` | | Share the session |
| `--model` | `-m` | Model to use, in `provider/model` format |
| `--agent` | | Agent to use |
| `--file` | `-f` | File to attach to the message |
| `--format` | | Output format: `default` or `json` (raw JSON events) |
| `--title` | | Session title |
| `--attach` | | Attach to a running CoStrict server (e.g. `http://localhost:4096`) |
| `--port` | | Local server port (default: random) |

---

### serve

Start a headless CoStrict server for API access.

```bash
cs serve
```

Set `COSTRICT_SERVER_PASSWORD` to enable HTTP basic auth (username defaults to `costrict`).

#### Flags

| Flag | Description |
| ---- | ----------- |
| `--port` | Port to listen on |
| `--hostname` | Hostname to listen on |
| `--mdns` | Enable mDNS discovery |
| `--cors` | Additional browser origins to allow for CORS |

---

### session

Manage CoStrict sessions.

```bash
cs session [command]
```

#### list

List all sessions.

```bash
cs session list
```

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--max-count` | `-n` | Limit to the most recent N sessions |
| `--format` | | Output format: `table` or `json` (default: `table`) |

---

### stats

Show token usage and cost statistics for sessions.

```bash
cs stats
```

#### Flags

| Flag | Description |
| ---- | ----------- |
| `--days` | Show stats for the last N days (default: all time) |
| `--tools` | Number of tools to show (default: all) |
| `--models` | Show per-model usage breakdown |
| `--project` | Filter by project |

---

### export

Export session data as JSON.

```bash
cs export [sessionID]
```

If no session ID is provided, you will be prompted to choose from available sessions.

---

### import

Import session data from a JSON file.

```bash
cs import <file>
```

---

### web

Start a headless CoStrict server with a web interface.

```bash
cs web
```

Opens a browser at `http://127.0.0.1:4096/` by default.

#### Flags

| Flag | Description |
| ---- | ----------- |
| `--port` | Port to listen on |
| `--hostname` | Hostname to listen on |
| `--mdns` | Enable mDNS discovery |
| `--cors` | Additional browser origins to allow for CORS |

---

### acp

Start an ACP (Agent Client Protocol) server.

```bash
cs acp
```

Communicates via nd-JSON over stdin/stdout.

#### Flags

| Flag | Description |
| ---- | ----------- |
| `--cwd` | Working directory |
| `--port` | Port to listen on |
| `--hostname` | Hostname to listen on |

---

### uninstall

Uninstall CoStrict and remove all related files.

```bash
cs uninstall
```

#### Flags

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--keep-config` | `-c` | Keep configuration files |
| `--keep-data` | `-d` | Keep session data and snapshots |
| `--dry-run` | | Show what would be deleted without deleting |
| `--force` | `-f` | Skip confirmation prompts |

---

### upgrade

Update CoStrict to the latest or a specific version.

```bash
cs upgrade [target]
```

Upgrade to a specific version:

```bash
cs upgrade v0.1.48
```

#### Flags

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--method` | `-m` | Installation method: `curl`, `npm`, `pnpm`, `bun`, `brew` |

---

## Global Flags

| Flag | Short | Description |
| ---- | ----- | ----------- |
| `--help` | `-h` | Show help |
| `--version` | `-v` | Print version number |
| `--print-logs` | | Print logs to stderr |
| `--log-level` | | Log level: `DEBUG`, `INFO`, `WARN`, `ERROR` |

---

## Environment Variables

| Variable | Type | Description |
| -------- | ---- | ----------- |
| `COSTRICT_BASE_URL` | string | CoStrict server URL (for self-hosted deployments) |
| `COSTRICT_SERVER_PASSWORD` | string | Enable basic auth for `serve`/`web` |
| `COSTRICT_SERVER_USERNAME` | string | Override basic auth username (default: `costrict`) |
| `COSTRICT_CONFIG` | string | Path to configuration file |
| `COSTRICT_CONFIG_DIR` | string | Path to configuration directory |
| `COSTRICT_CONFIG_CONTENT` | string | Inline JSON configuration |
| `COSTRICT_AUTO_SHARE` | boolean | Automatically share sessions |
| `COSTRICT_DISABLE_AUTOUPDATE` | boolean | Disable automatic update checks |
| `COSTRICT_DISABLE_TERMINAL_TITLE` | boolean | Disable automatic terminal title updates |
| `COSTRICT_PERMISSION` | string | Inline JSON permission configuration |
| `COSTRICT_DISABLE_LSP_DOWNLOAD` | boolean | Disable automatic LSP server downloads |
| `COSTRICT_DISABLE_AUTOCOMPACT` | boolean | Disable automatic context compaction |
| `COSTRICT_GIT_BASH_PATH` | string | Path to Git Bash executable on Windows |

### Experimental Features

| Variable | Type | Description |
| -------- | ---- | ----------- |
| `COSTRICT_EXPERIMENTAL` | boolean | Enable all experimental features |
| `COSTRICT_EXPERIMENTAL_LSP_TOOL` | boolean | Enable the experimental LSP tool |
| `COSTRICT_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS` | number | Default timeout for bash commands (ms) |
| `COSTRICT_EXPERIMENTAL_OUTPUT_TOKEN_MAX` | number | Maximum output tokens for LLM responses |
| `COSTRICT_EXPERIMENTAL_FILEWATCHER` | boolean | Enable directory-wide file watcher |
| `COSTRICT_EXPERIMENTAL_PLAN_MODE` | boolean | Enable plan mode |
