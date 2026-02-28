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

### 权限问题解决

如果在执行 `npm install -g` 时遇到权限错误，可以尝试以下解决方案：

**方案 1：使用 nvm 管理 Node.js（推荐）**

nvm (Node Version Manager) 会将 npm 包安装在用户目录下，避免权限问题：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # 或 source ~/.zshrc

# 安装最新版 Node.js
nvm install node

# 使用 Node.js
nvm use node

# 然后重新安装 costrict-cli
npm install -g @costrict/cs
```

**方案 2：配置 npm 使用用户目录**

```bash
# 创建用户目录下的 npm 全局包目录
mkdir ~/.npm-global

# 配置 npm 使用该目录
npm config set prefix '~/.npm-global'

# 将 npm 全局包目录添加到 PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc  # 或 ~/.zshrc

# 重新加载 shell 配置
source ~/.bashrc  # 或 source ~/.zshrc

# 然后重新安装 costrict-cli
npm install -g @costrict/cs
```

**方案 3：使用 sudo（仅限 Linux/macOS，不推荐）**

```bash
sudo npm install -g @costrict/cs
```

> 注意：使用 sudo 安装可能导致后续权限问题，不推荐长期使用此方案。

**方案 4：Windows 系统**

如果在 Windows 上遇到权限问题：
- 以管理员身份运行命令提示符或 PowerShell
- 右键点击终端应用，选择"以管理员身份运行"

执行 `cs --version`，出现版本号，则安装成功。
