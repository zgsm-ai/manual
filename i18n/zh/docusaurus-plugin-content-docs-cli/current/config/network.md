---
sidebar_position: 9
---

# 网络配置

CoStrict 支持标准代理环境变量和自定义证书，适用于企业网络环境。

---

## 代理

CoStrict 遵循标准代理环境变量：

```bash
# HTTPS 代理（推荐）
export HTTPS_PROXY=https://proxy.example.com:8080

# HTTP 代理（HTTPS 不可用时使用）
export HTTP_PROXY=http://proxy.example.com:8080

# 本地连接绕过代理（必须设置）
export NO_PROXY=localhost,127.0.0.1
```

> TUI 与本地 HTTP 服务器进行通信，必须为此连接绕过代理，以防止路由循环。

---

### 代理身份验证

如果代理需要基本身份验证，在 URL 中包含凭据：

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

> 避免将密码硬编码在脚本或配置文件中，建议使用环境变量或安全的凭据存储方式。

对于需要 NTLM 或 Kerberos 等高级身份验证的代理，建议使用支持相应认证方式的 LLM 网关。

---

## 自定义证书

如果企业使用自定义 CA 进行 HTTPS 连接，配置 CoStrict 信任这些证书：

```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

此配置同时适用于代理连接和直接 API 访问。
