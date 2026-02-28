---
sidebar_position: 5
---

# Themes

CoStrict ships with several built-in themes and supports custom themes. The default theme is `opencode`.

---

## Terminal Requirements

Themes require **true color** (24-bit) terminal support for accurate color rendering:

- **Check support**: Run `echo $COLORTERM` — output should be `truecolor` or `24bit`
- **Enable true color**: Set `export COLORTERM=truecolor` in your shell profile
- **Compatible terminals**: iTerm2, Alacritty, Kitty, Windows Terminal, GNOME Terminal (recent versions)

---

## Built-in Themes

| Name | Description |
| ---- | ----------- |
| `opencode` | CoStrict default theme |
| `system` | Automatically adapts to the terminal's color scheme |
| `tokyonight` | Based on [Tokyonight](https://github.com/folke/tokyonight.nvim) |
| `everforest` | Based on [Everforest](https://github.com/sainnhe/everforest) |
| `ayu` | Based on [Ayu](https://github.com/ayu-theme) dark theme |
| `catppuccin` | Based on [Catppuccin](https://github.com/catppuccin) |
| `catppuccin-macchiato` | Based on [Catppuccin](https://github.com/catppuccin) Macchiato |
| `gruvbox` | Based on [Gruvbox](https://github.com/morhetz/gruvbox) |
| `kanagawa` | Based on [Kanagawa](https://github.com/rebelot/kanagawa.nvim) |
| `nord` | Based on [Nord](https://github.com/nordtheme/nord) |
| `matrix` | Hacker-style black and green |
| `one-dark` | Based on [Atom One Dark](https://github.com/Th3Whit3Wolf/one-nvim) |

---

## Switching Themes

Type `/theme` in the TUI to open the theme picker, or set it in the config file:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "theme": "tokyonight"
}
```

Shortcut: `ctrl+x t`

---

## System Theme

The `system` theme adapts automatically to your terminal's color scheme:

- Generates a grayscale ramp based on the terminal background for optimal contrast
- Uses standard ANSI colors (0–15) for syntax highlighting
- Sets text and background to `none` to preserve the terminal's native appearance

Best for users who want CoStrict to blend in with their terminal's color scheme.

---

## Custom Themes

### Theme File Locations

Themes are loaded in the following priority order (later sources override earlier ones):

1. Built-in themes
2. User config directory: `~/.config/costrict/themes/*.json`
3. Project root: `.costrict/themes/*.json`
4. Current working directory: `./.costrict/themes/*.json`

Create a user-level theme:

```bash
mkdir -p ~/.config/costrict/themes
vim ~/.config/costrict/themes/my-theme.json
```

Create a project-level theme:

```bash
mkdir -p .costrict/themes
vim .costrict/themes/my-theme.json
```

### JSON Format

Themes use JSON with the following color value formats:

- **Hex**: `"#ffffff"`
- **ANSI color**: `3` (0–255)
- **Color reference**: a name defined in `defs`
- **Dark/light variant**: `{"dark": "#000", "light": "#fff"}`
- **No color**: `"none"` — uses the terminal's default

### Example

```json title=".costrict/themes/my-theme.json"
{
  "$schema": "https://opencode.ai/theme.json",
  "defs": {
    "nord0": "#2E3440",
    "nord1": "#3B4252",
    "nord4": "#D8DEE9",
    "nord8": "#88C0D0",
    "nord9": "#81A1C1",
    "nord11": "#BF616A",
    "nord14": "#A3BE8C"
  },
  "theme": {
    "primary": { "dark": "nord8", "light": "nord9" },
    "secondary": { "dark": "nord9", "light": "nord9" },
    "error": { "dark": "nord11", "light": "nord11" },
    "success": { "dark": "nord14", "light": "nord14" },
    "text": { "dark": "nord4", "light": "nord0" },
    "background": { "dark": "nord0", "light": "#ECEFF4" },
    "backgroundPanel": { "dark": "nord1", "light": "#E5E9F0" },
    "border": { "dark": "#434C5E", "light": "#4C566A" },
    "diffAdded": { "dark": "nord14", "light": "nord14" },
    "diffRemoved": { "dark": "nord11", "light": "nord11" }
  }
}
```
