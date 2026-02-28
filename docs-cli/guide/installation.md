---
sidebar_position: 1
---

# Installation

## System Requirements
- Windows 10 or later
- High-version Linux machine/container
- Mac
- Recommended terminals: Windows Terminal or terminal in VSCode

Note: If your machine is Windows 7, you can use web mode by starting the CoStrict CLI web server on a remote Linux server and accessing it through a browser, or use VSCode to remotely connect to the server for development.

## Installation

```bash
npm config set registry=https://registry.npmjs.org
npm install -g @costrict/cs
```

### Permission Issues

If you encounter permission errors when running `npm install -g`, try the following solutions:

**Solution 1: Use nvm to manage Node.js (Recommended)**

nvm (Node Version Manager) installs npm packages in the user directory, avoiding permission issues:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or source ~/.zshrc

# Install the latest Node.js
nvm install node

# Use Node.js
nvm use node

# Then reinstall costrict-cli
npm install -g @costrict/cs
```

**Solution 2: Configure npm to use user directory**

```bash
# Create npm global package directory in user directory
mkdir ~/.npm-global

# Configure npm to use this directory
npm config set prefix '~/.npm-global'

# Add npm global package directory to PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc  # or ~/.zshrc

# Reload shell configuration
source ~/.bashrc  # or source ~/.zshrc

# Then reinstall costrict-cli
npm install -g @costrict/cs
```

**Solution 3: Use sudo (Linux/macOS only, not recommended)**

```bash
sudo npm install -g @costrict/cs
```

> Note: Installing with sudo may cause permission issues later. This solution is not recommended for long-term use.

**Solution 4: Windows System**

If you encounter permission issues on Windows:
- Run Command Prompt or PowerShell as Administrator
- Right-click the terminal app and select "Run as Administrator"

Execute `cs --version`. If the version number appears, the installation is successful.

