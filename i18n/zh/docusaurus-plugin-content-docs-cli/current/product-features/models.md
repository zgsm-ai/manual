---
sidebar_position: 14
---

# 模型与提供商

CoStrict 基于 [AI SDK](https://ai-sdk.dev/) 支持 75+ LLM 提供商，同时内置了 CoStrict 平台提供商。

---

## CoStrict 平台

CoStrict 平台是推荐的默认提供商，登录后即可直接使用，无需额外配置 API Key。

登录方式参见[快速开始](../guide/quick_start)。

---

## 内置提供商

除 CoStrict 平台外，以下主流提供商均已内置支持，配置好 API Key 后即可使用：

| 提供商 | 提供商 ID | 获取 API Key |
| ------ | --------- | ------------ |
| Anthropic | `anthropic` | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI | `openai` | [platform.openai.com](https://platform.openai.com) |
| Google Gemini | `google` | [aistudio.google.com](https://aistudio.google.com) |
| Azure OpenAI | `azure` | Azure Portal |
| Amazon Bedrock | `amazon-bedrock` | AWS Console |
| Google Vertex AI | `google-vertex` | Google Cloud Console |
| Groq | `groq` | [console.groq.com](https://console.groq.com) |
| Mistral | `mistral` | [console.mistral.ai](https://console.mistral.ai) |
| DeepSeek | `deepseek` | [platform.deepseek.com](https://platform.deepseek.com) |
| xAI (Grok) | `xai` | [console.x.ai](https://console.x.ai) |
| Ollama（本地） | `ollama` | 本地运行，无需 Key |
| LM Studio（本地） | `lmstudio` | 本地运行，无需 Key |

更多提供商可通过[自定义提供商](#自定义提供商)方式接入。

---

## 配置 API Key

### 通过命令行

使用 `cs auth login` 交互式配置 API Key，密钥存储在 `~/.local/share/costrict/auth.json` 中：

```bash
cs auth login
```

### 通过环境变量

CoStrict 启动时会自动读取环境变量中的 API Key：

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export OPENAI_API_KEY=sk-...
export GOOGLE_GENERATIVE_AI_API_KEY=...
```

也可以在项目根目录的 `.env` 文件中定义。

---

## 选择模型

在 TUI 中输入 `/models` 打开模型选择界面，或使用快捷键 `<leader>m`。

通过命令行指定模型：

```bash
cs --model anthropic/claude-sonnet-4-5
cs run --model costrict/GLM-4.7 "你好"
```

---

## 推荐模型

以下模型在代码生成和工具调用方面表现良好：

- Claude Opus 4.5
- Claude Sonnet 4.5
- GPT-5
- Gemini 3 Pro

---

## 设置默认模型

在配置文件中设置 `model` 字段，格式为 `provider_id/model_id`：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5"
}
```

`small_model` 用于标题生成等轻量级任务：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

### 模型加载优先级

1. `--model` 或 `-m` 命令行标志
2. 配置文件中的 `model` 字段
3. 上次使用的模型
4. 按内部优先级排列的第一个可用模型

---

## 配置模型选项

可以为特定模型配置全局选项：

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "models": {
        "claude-sonnet-4-5-20250929": {
          "options": {
            "thinking": {
              "type": "enabled",
              "budgetTokens": 16000
            }
          }
        }
      }
    },
    "openai": {
      "models": {
        "gpt-5": {
          "options": {
            "reasoningEffort": "high"
          }
        }
      }
    }
  }
}
```

---

## 模型变体

许多模型支持具有不同配置的多种变体，使用快捷键 `ctrl+t`（`variant_cycle`）可以快速切换。

### 内置变体

**Anthropic**：
- `high` — 高思考预算（默认）
- `max` — 最大思考预算

**OpenAI**（因模型而异）：
- `none` / `minimal` / `low` / `medium` / `high` / `xhigh` — 不同推理强度

**Google**：
- `low` — 较低推理/Token 预算
- `high` — 较高推理/Token 预算

### 自定义变体

```jsonc title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "variants": {
            "thinking": {
              "reasoningEffort": "high",
              "textVerbosity": "low"
            },
            "fast": {
              "disabled": true
            }
          }
        }
      }
    }
  }
}
```

---

## 自定义提供商

支持接入任何兼容 OpenAI 接口风格的提供商：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "My Provider",
      "options": {
        "baseURL": "https://api.myprovider.com/v1",
        "apiKey": "{env:MY_API_KEY}"
      },
      "models": {
        "my-model": {
          "name": "My Model",
          "limit": {
            "context": 200000,
            "output": 65536
          }
        }
      }
    }
  }
}
```

配置文件位置：
- 项目级：项目根目录 `costrict.json`
- 全局：`~/.config/costrict/costrict.json`

---

## Amazon Bedrock

Amazon Bedrock 支持额外的 AWS 特定配置：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "amazon-bedrock": {
      "options": {
        "region": "us-east-1",
        "profile": "my-aws-profile"
      }
    }
  }
}
```

- `region` — AWS 区域（默认读取 `AWS_REGION` 环境变量）
- `profile` — 来自 `~/.aws/credentials` 的 AWS 命名配置文件

---

## 查看可用模型

列出所有已配置提供商的可用模型：

```bash
cs models

# 按提供商筛选
cs models anthropic

# 刷新模型缓存
cs models --refresh
```
