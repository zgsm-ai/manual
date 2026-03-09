---
sidebar_position: 1
---

# Installation

## 1. System Requirements

### 1. Operating System
- **Windows**: Windows 10 or later (Windows 7 only supports WEB mode, see below for details)
- **Linux**: Kernel version 4.0 or later, supports x86_64 / ARM64 architectures; for domestic operating systems, please contact technical support to confirm compatibility
- **macOS**: macOS 10.15 or later stable version, supports Intel x86_64 and Apple Silicon ARM64 architectures
- **Container Environment**: Host kernel version 4.0 or later is recommended

### 2. Terminal (TUI Mode)
- Windows: Windows Terminal or [electerm](https://github.com/electerm/electerm) is recommended
- Linux / macOS: System default terminal or VS Code integrated terminal works fine

### 3. Fallback Option (WEB Mode)
If there are compatibility issues with the TUI interface (such as Windows 7 system or terminal adaptation issues), you can switch to WEB mode:
- No dependency on terminal environment, only requires host network access and a mainstream browser (Chrome/Firefox/Edge, etc.)
- Windows 7 users: You can start the CoStrict CLI web server on a remote Linux server, or use VS Code to remotely connect to the server for development.

## 2. One-click Installation (Recommended)

### 1. Windows 10+ (CMD/PowerShell)
```powershell
powershell iwr https://costrict.ai/install.bat -Out install.bat;.\install.bat
```

#### Optional Parameters (specify version/local binary):
```powershell
# Install a specific version
powershell iwr https://costrict.ai/install.bat -Out install.bat;.\install.bat -v 1.0.180

# Install from local binary file
powershell iwr https://costrict.ai/install.bat -Out install.bat;.\install.bat -b C:\path\to\costrict-cli.exe
```

### 2. Linux
```bash
curl -fsSL https://costrict.ai/install.sh | bash
```

#### Optional Parameters (specify version/local binary):
```bash
# Install a specific version
curl -fsSL https://costrict.ai/install.sh | bash -s -- -v 1.0.180

# Install from local binary file
curl -fsSL https://costrict.ai/install.sh | bash -s -- -b /path/to/costrict-cli
```

### 3. macOS
```bash
curl -fsSL https://costrict.ai/install.sh | bash
```

## 3. Manual Installation (NPM)

If one-click installation fails, you can install manually via NPM:

### 1. Configure NPM Registry (Optional)
```bash
npm config set registry=https://registry.npmjs.org
```

### 2. Global Installation
```bash
npm install -g @costrict/cs
```

## 4. Permission Troubleshooting

### 1. Linux/macOS Permission Errors (Recommended Solutions)

#### Solution 1: Use nvm to manage Node.js (avoid system permission issues)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # For zsh terminal, run: source ~/.zshrc

# Install and use the latest Node.js
nvm install node
nvm use node

# Reinstall CoStrict CLI
npm install -g @costrict/cs
```

#### Solution 2: Configure npm global directory to user directory
```bash
# Create user-level npm global directory
mkdir ~/.npm-global

# Configure npm to use this directory
npm config set prefix '~/.npm-global'

# Add directory to PATH (permanent)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc  # For zsh terminal, change to ~/.zshrc

# Reload configuration
source ~/.bashrc  # For zsh terminal, run: source ~/.zshrc

# Reinstall CoStrict CLI
npm install -g @costrict/cs
```

#### Solution 3: Use sudo (not recommended)
```bash
sudo npm install -g @costrict/cs
```
> Note: Installing with sudo may cause subsequent npm package permission issues. Use only for temporary emergencies.

### 2. Windows Permission Errors
- Right-click the terminal (CMD/PowerShell/Windows Terminal) and select "Run as Administrator";
- Re-run the installation command.

## 5. Verify Installation

After installation is complete, verify by running:
```bash
cs --version
```
If the version number is displayed, the installation was successful.

### Summary
1. Core installation methods: Use batch one-click installation for Windows, curl pipe installation for Linux/macOS, both support specifying version/local binary parameters;
2. For permission issues, prioritize using nvm (Linux/macOS) or administrator terminal (Windows), avoid subsequent issues caused by sudo;
3. Windows 7 only supports WEB mode, you can use CoStrict CLI through a remote Linux server.
