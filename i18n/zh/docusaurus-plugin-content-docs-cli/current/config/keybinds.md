---
sidebar_position: 6
---

# 快捷键

CoStrict 提供了一系列快捷键，可以通过配置文件进行自定义。

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "keybinds": {
    "leader": "ctrl+x",
    "session_new": "<leader>n",
    "session_list": "<leader>l",
    "model_list": "<leader>m",
    "agent_list": "<leader>a",
    "command_list": "ctrl+p"
  }
}
```

---

## 前导键

CoStrict 的大多数快捷键使用 `leader`（前导键）来避免与终端中的其他快捷键冲突。

默认前导键为 `ctrl+x`。例如，新建会话需要先按 `ctrl+x`，再按 `n`。

---

## 禁用快捷键

将对应键值设置为 `"none"` 即可禁用：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "keybinds": {
    "session_compact": "none"
  }
}
```

---

## 完整快捷键列表

以下是所有可配置的快捷键及其默认值：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "keybinds": {
    "leader": "ctrl+x",
    "app_exit": "ctrl+c,ctrl+d,<leader>q",
    "editor_open": "<leader>e",
    "theme_list": "<leader>t",
    "sidebar_toggle": "<leader>b",
    "scrollbar_toggle": "none",
    "username_toggle": "none",
    "status_view": "<leader>s",
    "tool_details": "none",
    "session_export": "<leader>x",
    "session_new": "<leader>n",
    "session_list": "<leader>l",
    "session_timeline": "<leader>g",
    "session_fork": "none",
    "session_rename": "none",
    "session_share": "none",
    "session_unshare": "none",
    "session_interrupt": "escape",
    "session_compact": "<leader>c",
    "session_child_cycle": "<leader>right",
    "session_child_cycle_reverse": "<leader>left",
    "session_parent": "<leader>up",
    "messages_page_up": "pageup,ctrl+alt+b",
    "messages_page_down": "pagedown,ctrl+alt+f",
    "messages_line_up": "ctrl+alt+y",
    "messages_line_down": "ctrl+alt+e",
    "messages_half_page_up": "ctrl+alt+u",
    "messages_half_page_down": "ctrl+alt+d",
    "messages_first": "ctrl+g,home",
    "messages_last": "ctrl+alt+g,end",
    "messages_next": "none",
    "messages_previous": "none",
    "messages_copy": "<leader>y",
    "messages_undo": "<leader>u",
    "messages_redo": "<leader>r",
    "messages_last_user": "none",
    "messages_toggle_conceal": "<leader>h",
    "model_list": "<leader>m",
    "model_cycle_recent": "f2",
    "model_cycle_recent_reverse": "shift+f2",
    "model_cycle_favorite": "none",
    "model_cycle_favorite_reverse": "none",
    "variant_cycle": "ctrl+t",
    "command_list": "ctrl+p",
    "agent_list": "<leader>a",
    "agent_cycle": "tab",
    "agent_cycle_reverse": "shift+tab",
    "input_clear": "ctrl+c",
    "input_paste": "ctrl+v",
    "input_submit": "return",
    "input_newline": "shift+return,ctrl+return,alt+return,ctrl+j",
    "input_move_left": "left,ctrl+b",
    "input_move_right": "right,ctrl+f",
    "input_move_up": "up",
    "input_move_down": "down",
    "input_select_left": "shift+left",
    "input_select_right": "shift+right",
    "input_select_up": "shift+up",
    "input_select_down": "shift+down",
    "input_line_home": "ctrl+a",
    "input_line_end": "ctrl+e",
    "input_select_line_home": "ctrl+shift+a",
    "input_select_line_end": "ctrl+shift+e",
    "input_visual_line_home": "alt+a",
    "input_visual_line_end": "alt+e",
    "input_select_visual_line_home": "alt+shift+a",
    "input_select_visual_line_end": "alt+shift+e",
    "input_buffer_home": "home",
    "input_buffer_end": "end",
    "input_select_buffer_home": "shift+home",
    "input_select_buffer_end": "shift+end",
    "input_delete_line": "ctrl+shift+d",
    "input_delete_to_line_end": "ctrl+k",
    "input_delete_to_line_start": "ctrl+u",
    "input_backspace": "backspace,shift+backspace",
    "input_delete": "ctrl+d,delete,shift+delete",
    "input_undo": "ctrl+-,super+z",
    "input_redo": "ctrl+.,super+shift+z",
    "input_word_forward": "alt+f,alt+right,ctrl+right",
    "input_word_backward": "alt+b,alt+left,ctrl+left",
    "input_select_word_forward": "alt+shift+f,alt+shift+right",
    "input_select_word_backward": "alt+shift+b,alt+shift+left",
    "input_delete_word_forward": "alt+d,alt+delete,ctrl+delete",
    "input_delete_word_backward": "ctrl+w,ctrl+backspace,alt+backspace",
    "history_previous": "up",
    "history_next": "down",
    "terminal_suspend": "ctrl+z",
    "terminal_title_toggle": "none",
    "tips_toggle": "<leader>h",
    "display_thinking": "none"
  }
}
```

---

## 输入框快捷键

提示词输入框支持 Readline/Emacs 风格的文本编辑快捷键：

| 快捷键   | 操作                              |
| -------- | --------------------------------- |
| `ctrl+a` | 移动到当前行的开头                |
| `ctrl+e` | 移动到当前行的末尾                |
| `ctrl+b` | 光标向后移动一个字符              |
| `ctrl+f` | 光标向前移动一个字符              |
| `alt+b`  | 光标向后移动一个单词              |
| `alt+f`  | 光标向前移动一个单词              |
| `ctrl+d` | 删除光标所在位置的字符            |
| `ctrl+k` | 删除从光标到行尾的内容            |
| `ctrl+u` | 删除从光标到行首的内容            |
| `ctrl+w` | 删除前一个单词                    |
| `alt+d`  | 删除后一个单词                    |
| `ctrl+t` | 交换光标前后的字符                |
| `ctrl+g` | 取消弹出窗口 / 中止正在运行的响应 |

---

## Shift+Enter 配置

某些终端默认不会发送带修饰键的 Enter 键，需要手动配置。

### Windows Terminal

打开 `settings.json`（路径：`%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`），在根级 `actions` 数组中添加：

```json
"actions": [
  {
    "command": {
      "action": "sendInput",
      "input": "\u001b[13;2u"
    },
    "id": "User.sendInput.ShiftEnterCustom"
  }
]
```

在根级 `keybindings` 数组中添加：

```json
"keybindings": [
  {
    "keys": "shift+enter",
    "id": "User.sendInput.ShiftEnterCustom"
  }
]
```

保存后重启 Windows Terminal 或打开新标签页即可生效。
