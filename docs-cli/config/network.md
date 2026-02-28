---
sidebar_position: 9
---

# Network Configuration

CoStrict supports standard proxy environment variables and custom certificates for corporate network environments.

---

## Proxy

CoStrict respects standard proxy environment variables:

```bash
# HTTPS proxy (recommended)
export HTTPS_PROXY=https://proxy.example.com:8080

# HTTP proxy (if HTTPS is unavailable)
export HTTP_PROXY=http://proxy.example.com:8080

# Bypass proxy for local connections (required)
export NO_PROXY=localhost,127.0.0.1
```

> The TUI communicates with a local HTTP server. You must bypass the proxy for this connection to prevent routing loops.

---

### Proxy Authentication

If your proxy requires basic authentication, include credentials in the URL:

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

> Avoid hard-coding passwords in scripts or config files. Use environment variables or a secure credential store instead.

For proxies requiring advanced authentication (NTLM, Kerberos), use an LLM gateway that supports the required auth method.

---

## Custom Certificates

If your organization uses a custom CA for HTTPS connections, configure CoStrict to trust those certificates:

```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

This applies to both proxy connections and direct API access.
