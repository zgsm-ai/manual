---
sidebar_position: 1
---

# 安装流程

## 环境要求
- win10及以上
- 高版本linux机器/容器
- 推荐终端： Windows Terminal 或者 vscode中打开终端

注：如果您的机器是win7，可使用web模式，在远程linux服务器上启动 costrict-cli的web服务器，然后在浏览器中打开使用；或者使用 vscode远程连接服务器开发。

## 安装

```bash
npm config set registry=https://registry.npmjs.org
npm install -g @costrict/cs
```

执行 `cs --version`，出现版本号，则安装成功。