---
sidebar_position: 17
---

# 主题

CoStrict 提供多个内置主题，也支持自定义主题。默认使用 `opencode` 主题。

---

## 终端要求

主题需要终端支持**真彩色**（24 位色）才能完整显示：

- **检查支持**：运行 `echo $COLORTERM`，输出应为 `truecolor` 或 `24bit`
- **启用真彩色**：在 shell 配置文件中设置 `export COLORTERM=truecolor`
- **兼容终端**：iTerm2、Alacritty、Kitty、Windows Terminal、GNOME Terminal 等现代终端均已支持

---

## 内置主题

| 名称                   | 描述                                                                |
| ---------------------- | ------------------------------------------------------------------- |
| `opencode`             | CoStrict 默认主题                                                   |
| `system`               | 自动适配终端的背景颜色                                              |
| `tokyonight`           | 基于 [Tokyonight](https://github.com/folke/tokyonight.nvim) 主题    |
| `everforest`           | 基于 [Everforest](https://github.com/sainnhe/everforest) 主题       |
| `ayu`                  | 基于 [Ayu](https://github.com/ayu-theme) 暗色主题                   |
| `catppuccin`           | 基于 [Catppuccin](https://github.com/catppuccin) 主题               |
| `catppuccin-macchiato` | 基于 [Catppuccin](https://github.com/catppuccin) 主题               |
| `gruvbox`              | 基于 [Gruvbox](https://github.com/morhetz/gruvbox) 主题             |
| `kanagawa`             | 基于 [Kanagawa](https://github.com/rebelot/kanagawa.nvim) 主题      |
| `nord`                 | 基于 [Nord](https://github.com/nordtheme/nord) 主题                 |
| `matrix`               | 黑客风格的黑底绿字主题                                              |
| `one-dark`             | 基于 [Atom One](https://github.com/Th3Whit3Wolf/one-nvim) Dark 主题 |

---

## 切换主题

在 TUI 中输入 `/theme` 打开主题选择界面，或在配置文件中直接指定：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "theme": "tokyonight"
}
```

快捷键：`ctrl+x t`

---

## system 主题

`system` 主题自动适配终端的配色方案：

- 根据终端背景颜色生成灰度色阶，确保最佳对比度
- 使用标准 ANSI 颜色（0-15）进行语法高亮
- 文本和背景色设为 `none`，保持终端原生外观

适合希望 CoStrict 与终端外观保持一致，或使用了自定义终端配色方案的用户。

---

## 自定义主题

### 主题文件位置

主题按以下优先级顺序加载（后面的覆盖前面的）：

1. 内置主题
2. 用户配置目录：`~/.config/costrict/themes/*.json`
3. 项目根目录：`.costrict/themes/*.json`
4. 当前工作目录：`./.costrict/themes/*.json`

创建用户级主题：

```bash
mkdir -p ~/.config/costrict/themes
vim ~/.config/costrict/themes/my-theme.json
```

创建项目级主题：

```bash
mkdir -p .costrict/themes
vim .costrict/themes/my-theme.json
```

### JSON 格式

主题使用 JSON 格式，支持以下颜色写法：

- **十六进制**：`"#ffffff"`
- **ANSI 颜色**：`3`（0-255）
- **颜色引用**：引用 `defs` 中定义的颜色名
- **深色/浅色变体**：`{"dark": "#000", "light": "#fff"}`
- **无颜色**：`"none"`，使用终端默认颜色

### 示例

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
