---
sidebar_position: 1
---

# 安装流程

## 一、环境要求

### 1. 操作系统
- **Windows**：Windows 10 及以上版本（Windows 7 仅支持 WEB 模式，详见下方说明）
- **Linux**：内核版本 4.0 及以上，支持 x86_64 / ARM64 架构；国产化操作系统需联系技术支持确认兼容性
- **macOS**：macOS 10.15 及以上稳定版本，支持 Intel x86_64 与 Apple Silicon ARM64 架构
- **容器环境**：运行容器的主机内核建议 4.0 及以上

### 2. 终端（TUI 模式）
- Windows：推荐使用 Windows Terminal 或 [electerm](https://github.com/electerm/electerm)
- Linux / macOS：系统自带终端、VS Code 内置终端均可

### 3. 备用方案（WEB 模式）
若 TUI 界面存在兼容性问题（如 Windows 7 系统、终端适配异常），可切换至 WEB 模式：
- 无需依赖终端环境，仅需主机网络正常且能访问主流浏览器（Chrome/Firefox/Edge 等）；
- Windows 7 用户：可在远程 Linux 服务器启动 CoStrict CLI 的 WEB 服务器，或通过 VS Code 远程连接服务器开发。

## 二、一键安装（推荐）

### 1. Windows 10+（CMD/PowerShell 通用）
```powershell
powershell iwr https://costrict.ai/install.bat -Out install.bat;.\install.bat
```

#### 可选参数示例（指定版本/本地二进制）：
```powershell
# 指定版本安装
powershell iwr https://costrict.ai/install.bat -Out install.bat;.\install.bat -v 1.0.180

# 从本地二进制文件安装
powershell iwr https://costrict.ai/install.bat -Out install.bat;.\install.bat -b C:\path\to\costrict-cli.exe
```

### 2. Linux 系统
```bash
curl -fsSL https://costrict.ai/install.sh | bash
```

#### 可选参数示例（指定版本/本地二进制）：
```bash
# 指定版本安装
curl -fsSL https://costrict.ai/install.sh | bash -s -- -v 1.0.180

# 从本地二进制文件安装
curl -fsSL https://costrict.ai/install.sh | bash -s -- -b /path/to/costrict-cli
```

### 3. macOS 系统
```bash
curl -fsSL https://costrict.ai/install.sh | bash
```

## 三、手动安装（NPM 方式）

若一键安装失败，可通过 NPM 手动安装：

### 1. 配置 NPM 源（可选）
```bash
npm config set registry=https://registry.npmjs.org
```

### 2. 全局安装
```bash
npm install -g @costrict/cs
```

## 四、兜底方案：GitHub Release 二进制手动安装

若一键安装、NPM 手动安装均失败（如网络屏蔽脚本、无 Node.js 环境、权限严格受限等极端场景），可直接从 GitHub 官方 Release 页面下载对应系统架构的二进制文件，手动解压并配置环境变量，完成离线安装。该方式无额外依赖，适配所有兼容系统。

**官方 Release 地址：** https://github.com/zgsm-ai/opencode/releases

页面内 Assets 板块提供全架构二进制包，需根据自身设备系统和架构选择对应文件，切勿下载错误版本，否则无法运行。

### 1. 下载对应二进制包

- **Windows 系统**：常规新款 CPU（支持 AVX2 指令集）选择 `cs-windows-x64.zip`；老旧 CPU、无 AVX2 指令集的设备，务必选择 `cs-windows-x64-baseline.zip`，该版本专为兼容老旧硬件优化，确保程序可正常启动运行。

- **macOS Intel 芯片**：常规机型选择 `cs-darwin-x64.zip`；老旧 Intel 处理器无 AVX2 支持时，可选用对应 baseline 兼容包；Apple Silicon ARM64 芯片无 AVX2 兼容问题，直接选择 `cs-darwin-arm64.zip`。

- **Linux x86_64 架构**：主流新 CPU 选择 `cs-linux-x64.tar.gz`，搭载 AVX2 指令集，运行效率更高；老旧服务器、老式台式机 CPU 无 AVX2 指令集，选择 `cs-linux-x64-baseline.tar.gz` 兼容版；ARM64 架构无需区分，直接选择 `cs-linux-arm64.tar.gz`。

### 2. 解压文件

- **Windows**：右键压缩包，选择"全部提取"，解压至固定目录（建议：`C:\Program Files\cs-cli`），避免随意移动导致路径失效。

- **Linux/macOS**：打开终端，进入压缩包所在目录，执行解压命令。以 Linux 为例：
  ```bash
  tar -zxvf cs-linux-x64.tar.gz -C /usr/local/cs-cli
  ```
  建议解压至 `/usr/local` 目录下，方便权限管理。

### 3. 配置系统环境变量

#### Windows 系统配置

1. 右键"此电脑" → 选择"属性" → 点击"高级系统设置" → 切换至"高级"选项卡 → 点击"环境变量"。
2. 在"用户变量"或"系统变量"中，找到 `Path` 变量，双击打开编辑页面。
3. 点击"新建"，粘贴解压后的 `bin` 目录完整路径（如 `C:\Program Files\cs-cli\bin`）。
4. 依次点击"确定"保存配置，关闭所有设置窗口，重启终端生效。

#### Linux/macOS 系统配置

1. 打开终端，编辑系统环境配置文件：
   - bash 终端：`vim ~/.bashrc`
   - zsh 终端：`vim ~/.zshrc`
2. 在文件末尾添加一行配置（替换为自己的解压 bin 路径）：
   ```bash
   export PATH=/usr/local/cs-cli/bin:$PATH
   ```
3. 保存文件并退出，执行命令重载配置：
   - bash 终端：`source ~/.bashrc`
   - zsh 终端：`source ~/.zshrc`

### 4. macOS 提示"文件已损坏"解决方案

在 macOS 上，二进制文件可能被 Gatekeeper 拦截并自动杀死进程，提示"文件已损坏，无法打开"。原因是 macOS 的 Gatekeeper 会拦截未签名的二进制文件。

在二进制文件所在目录执行以下命令，移除隔离属性：
```bash
xattr -d com.apple.quarantine ./cs
```
之后即可正常运行 `cs`。


## 五、权限问题解决方案

### 1. Linux/macOS 权限错误（推荐方案）

#### 方案 1：使用 nvm 管理 Node.js（避免系统权限问题）
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # zsh 终端请执行：source ~/.zshrc

# 安装并使用最新版 Node.js
nvm install node
nvm use node

# 重新安装 CoStrict CLI
npm install -g @costrict/cs
```

#### 方案 2：配置 npm 全局目录到用户目录
```bash
# 创建用户级 npm 全局目录
mkdir ~/.npm-global

# 配置 npm 使用该目录
npm config set prefix '~/.npm-global'

# 将目录添加到 PATH（永久生效）
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc  # zsh 终端请改为 ~/.zshrc

# 重新加载配置
source ~/.bashrc  # zsh 终端请执行：source ~/.zshrc

# 重新安装 CoStrict CLI
npm install -g @costrict/cs
```

#### 方案 3：使用 sudo（不推荐）
```bash
sudo npm install -g @costrict/cs
```
> 注意：sudo 安装可能导致后续 npm 包权限异常，仅临时应急使用。

### 2. Windows 权限错误
- 右键点击终端（CMD/PowerShell/Windows Terminal），选择「以管理员身份运行」；
- 重新执行安装命令即可。

## 六、验证安装

安装完成后，执行以下命令验证：
```bash
cs --version
```
若输出版本号，说明安装成功。

### 总结
1. 核心安装方式：Windows 用批处理一键安装，Linux/macOS 用 curl 管道安装，均支持指定版本/本地二进制参数；
2. 权限问题优先用 nvm（Linux/macOS）或管理员终端（Windows）解决，避免 sudo 带来的后续问题；
3. Windows 7 仅支持 WEB 模式，可通过远程 Linux 服务器使用 CoStrict CLI。
