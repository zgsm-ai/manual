---
sidebar_position: 11
---

# Custom Provider

## Configuration Files

- Project root directory: costrict.json

- Global: ~/.config/costrict/costrict.json

## Example

OpenAI interface style:

```
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "ProviderDisplay Name",
      "options": {
        "baseURL": "https://api.myprovider.com/v1",
        "apiKey": "{env:API_KEY}",
        "headers": {
          "Authorization": "Bearer custom-token"
        }
      },
      "models": {
        "my-model-name": {
          "name": "My Model Display Name",
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

**Parameter Description:**

● options.apiKey: Optional parameter for setting the API key (if not using authentication).

● options.headers: Optional, for setting custom headers.

● headers: Optional, custom headers sent with each request.

● limit.context: Maximum number of input tokens the model can accept.

● limit.output: Maximum number of tokens the model can generate.
