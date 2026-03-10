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

## 4. Fallback: Manual Binary Installation via GitHub Release

If both one-click installation and NPM installation fail (e.g., script blocked by network, no Node.js environment, strict permission restrictions, etc.), you can download the binary for your system architecture directly from the GitHub official Release page, extract it, and configure the environment variable to complete an offline installation. This method has no additional dependencies and is compatible with all supported systems.

**Official Release page:** https://github.com/zgsm-ai/opencode/releases

The Assets section on the page provides binary packages for all architectures. Select the file that matches your system and architecture — do not download the wrong version, as it will not run.

### 1. Download the Corresponding Binary Package

- **Windows**: For modern CPUs with AVX2 support, choose `cs-windows-x64.zip`; for older CPUs without AVX2, you must choose `cs-windows-x64-baseline.zip` — this version is optimized for legacy hardware compatibility and ensures the program starts correctly.

- **macOS Intel**: For standard models, choose `cs-darwin-x64.zip`; for older Intel processors without AVX2, use the corresponding baseline package if available; for Apple Silicon (ARM64), there are no AVX2 compatibility issues — choose `cs-darwin-arm64.zip` directly.

- **Linux x86_64**: For mainstream modern CPUs, choose `cs-linux-x64.tar.gz` (includes AVX2, higher performance); for older servers or desktop CPUs without AVX2, choose `cs-linux-x64-baseline.tar.gz`; for ARM64 architecture, no distinction is needed — choose `cs-linux-arm64.tar.gz` directly.

### 2. Extract the Files

- **Windows**: Right-click the archive and select "Extract All", extract to a fixed directory (recommended: `C:\Program Files\cs-cli`). Avoid moving it later to prevent path issues.

- **Linux/macOS**: Open a terminal, navigate to the directory containing the archive, and run the extraction command. For example on Linux:
  ```bash
  tar -zxvf cs-linux-x64.tar.gz -C /usr/local/cs-cli
  ```
  It is recommended to extract to `/usr/local` for easier permission management.

### 3. Configure System Environment Variables

#### Windows

1. Right-click "This PC" → "Properties" → "Advanced system settings" → "Advanced" tab → "Environment Variables".
2. Under "User variables" or "System variables", find the `Path` variable and double-click to edit.
3. Click "New" and paste the full path to the `bin` directory from the extracted folder (e.g., `C:\Program Files\cs-cli\bin`).
4. Click "OK" to save, close all settings windows, and restart the terminal for the changes to take effect.

#### Linux/macOS

1. Open a terminal and edit your shell configuration file:
   - bash: `vim ~/.bashrc`
   - zsh: `vim ~/.zshrc`
2. Add the following line at the end of the file (replace with your actual extracted `bin` path):
   ```bash
   export PATH=/usr/local/cs-cli/bin:$PATH
   ```
3. Save and exit, then reload the configuration:
   - bash: `source ~/.bashrc`
   - zsh: `source ~/.zshrc`

### 4. macOS Gatekeeper: "File is Damaged" Fix

On macOS, the binary may be blocked by Gatekeeper and the process killed immediately, with an error such as "the file is damaged and can't be opened." This is because macOS Gatekeeper blocks unsigned binaries.

Run the following command in the directory where the binary is located to remove the quarantine attribute:
```bash
xattr -d com.apple.quarantine ./cs
```
Then re-run `cs` normally.


## 5. Permission Troubleshooting

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

## 6. Verify Installation

After installation is complete, verify by running:
```bash
cs --version
```
If the version number is displayed, the installation was successful.

### Summary
1. Core installation methods: Use batch one-click installation for Windows, curl pipe installation for Linux/macOS, both support specifying version/local binary parameters;
2. For permission issues, prioritize using nvm (Linux/macOS) or administrator terminal (Windows), avoid subsequent issues caused by sudo;
3. Windows 7 only supports WEB mode, you can use CoStrict CLI through a remote Linux server.
