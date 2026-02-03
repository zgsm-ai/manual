---
sidebar_position: 100
---

# 常见问题

关于 CoStrict CLI 的常见问题。

## 安装与设置

### 问：系统要求是什么？

答：需要 Node.js 18.x 或更高版本。CLI 支持 Windows、macOS 和 Linux。

### 问：如何更新 CLI？

答：运行 `npm update -g @costrict/cli` 或 `yarn global upgrade @costrict/cli`

### 问：可以同时使用 CLI 和插件吗？

答：可以！它们共享相同的账号和额度。

## 使用

### 问：如何进行身份认证？

答：运行 `costrict login` 并按照浏览器认证流程操作。

### 问：可以在 CI/CD 流水线中使用 CLI 吗？

答：可以，使用 `costrict login --token YOUR_TOKEN` 进行非交互式认证。

### 问：CLI 可以离线工作吗？

答：不可以，CLI 需要互联网连接来与 CoStrict AI 服务通信。

## 计费

### 问：CLI 和插件共享额度吗？

答：是的，所有使用都计入你账号的总额度。

### 问：CLI 使用如何计算？

答：与插件类似 - 基于处理的 token 数量和使用的模型。

更多计费问题，请查看 [计费文档](/plugin/billing/purchase)。

## 故障排除

### 问：安装后找不到 CLI 命令

答：确保你的全局 npm/yarn bin 目录在 PATH 中。

### 问：认证失败

答：尝试 `costrict logout` 然后重新 `costrict login`。

### 问：响应时间慢

答：检查你的网络连接并重试。如果问题持续，请联系支持。

## 获取帮助

- GitHub Issues: [报告 bug](https://github.com/zgsm-ai/costrict/issues)
- 文档：浏览其他部分获取详细指南
- 支持：通过网站联系我们
