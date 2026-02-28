---
sidebar_position: 14
---

# Models & Providers

CoStrict supports 75+ LLM providers via [AI SDK](https://ai-sdk.dev/), plus the built-in CoStrict platform provider.

---

## CoStrict Platform

The CoStrict platform is the recommended default provider. After logging in, it is available immediately with no additional API key configuration.

See [Account Login](../guide/quick_start) to get started.

---

## Built-in Providers

The following major providers are built in and ready to use once API keys are configured:

| Provider | Provider ID | Get API Key |
| -------- | ----------- | ----------- |
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
| Ollama (local) | `ollama` | No key needed |
| LM Studio (local) | `lmstudio` | No key needed |

Additional providers can be added via [Custom Providers](#custom-providers).

---

## Configuring API Keys

### Via CLI

Use `cs auth login` to configure API keys interactively. Keys are stored in `~/.local/share/costrict/auth.json`:

```bash
cs auth login
```

### Via Environment Variables

CoStrict automatically reads API keys from environment variables on startup:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export OPENAI_API_KEY=sk-...
export GOOGLE_GENERATIVE_AI_API_KEY=...
```

You can also define them in a `.env` file in the project root.

---

## Selecting a Model

Type `/models` in the TUI to open the model selection UI, or use the shortcut `<leader>m`.

Specify a model on the command line:

```bash
cs --model anthropic/claude-sonnet-4-5
cs run --model costrict/GLM-4.7 "Hello"
```

---

## Recommended Models

The following models perform well for code generation and tool use:

- Claude Opus 4.5
- Claude Sonnet 4.5
- GPT-5
- Gemini 3 Pro

---

## Setting the Default Model

Set the `model` field in the config file using the format `provider_id/model_id`:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5"
}
```

Use `small_model` for lightweight background tasks like title generation:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

### Model Loading Priority

1. `--model` / `-m` CLI flag
2. `model` field in config file
3. Last used model
4. First available model by internal priority

---

## Configuring Model Options

Set global options for a specific model:

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

## Model Variants

Many models support multiple variants with different configurations. Use `ctrl+t` (`variant_cycle`) to switch between them.

### Built-in Variants

**Anthropic:**
- `high` — High thinking budget (default)
- `max` — Maximum thinking budget

**OpenAI** (varies by model):
- `none` / `minimal` / `low` / `medium` / `high` / `xhigh` — Reasoning intensity levels

**Google:**
- `low` — Lower reasoning/token budget
- `high` — Higher reasoning/token budget

### Custom Variants

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

## Custom Providers

Connect any provider that exposes an OpenAI-compatible API:

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

Config file locations:
- Project-level: `costrict.json` in the project root
- Global: `~/.config/costrict/costrict.json`

---

## Amazon Bedrock

Amazon Bedrock supports additional AWS-specific configuration:

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

- `region` — AWS region (defaults to `AWS_REGION` env var)
- `profile` — Named AWS profile from `~/.aws/credentials`

---

## Listing Available Models

```bash
cs models

# Filter by provider
cs models anthropic

# Refresh the model cache
cs models --refresh
```
