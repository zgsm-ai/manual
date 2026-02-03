---
sidebar_position: 1
---

# Installation

## System Requirements
- Windows 10 or later
- High-version Linux machine/container
- Recommended terminals: Windows Terminal or terminal in VSCode

Note: If your machine is Windows 7, you can use web mode by starting the CoStrict CLI web server on a remote Linux server and accessing it through a browser, or use VSCode to remotely connect to the server for development.

## Installation

```bash
npm config set registry=https://registry.npmjs.org
npm install -g @costrict/cs
```

Execute `cs --version`. If the version number appears, the installation is successful.
