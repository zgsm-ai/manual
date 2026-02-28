---
sidebar_position: 5
---

# IDE Integration

CoStrict integrates with VS Code, Cursor, or any IDE that supports a terminal.

---

## Usage

- **Quick launch**: `Cmd+Esc` (Mac) or `Ctrl+Esc` (Windows/Linux) opens CoStrict in a split terminal view, or focuses an existing session.
- **New session**: `Cmd+Shift+Esc` (Mac) or `Ctrl+Shift+Esc` (Windows/Linux) starts a new CoStrict terminal session.
- **Context awareness**: Automatically shares your current selection or active tab with CoStrict.
- **File reference shortcut**: `Cmd+Option+K` (Mac) or `Alt+Ctrl+K` (Linux/Windows) inserts a file reference, e.g. `@File#L37-42`.

---

## Installation

To install the CoStrict extension in VS Code and its forks (Cursor, Windsurf, VSCodium):

1. Open VS Code
2. Open the integrated terminal
3. Run `cs` — the extension installs automatically

---

### Manual Installation

Search for **CoStrict** in the Extensions marketplace and click **Install**.

---

### Troubleshooting

If the extension does not install automatically:

- Make sure you are running `cs` inside the **integrated terminal**, not an external terminal.
- Confirm that your IDE's CLI command is installed:
  - VS Code: `code`
  - Cursor: `cursor`
  - Windsurf: `windsurf`
  - VSCodium: `codium`
  - If missing, press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) and search for **Shell Command: Install 'code' command in PATH**
- Make sure the IDE has permission to install extensions.
