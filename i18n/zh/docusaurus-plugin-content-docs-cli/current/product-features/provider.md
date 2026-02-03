---
sidebar_position: 11
---

# 自定义Provider

## 配置文件

- 项目根目录：costrict.json

- 全局：~/.config/costrict/costrict.json

## 示例

openai接口风格：

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

**参数说明：**

● options.apiKey：可选参数，用于设置API密钥（如果不使用身份验证）。

● options.headers：可选，用于设置自定义标头。

● headers：可选，随每个请求发送的自定义标头。

● limit.context：模型可接受的最大输入令牌数。

● limit.output：模型可生成的最大令牌数。
