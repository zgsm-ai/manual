---
sidebar_position: 21
---

# 会话分享

CoStrict 支持创建会话的公开分享链接，方便与他人协作或寻求帮助。

> 分享的会话对任何拥有链接的人都是公开可访问的，请注意不要分享含有敏感信息的内容。

---

## 分享模式

CoStrict 支持三种分享模式，在 `costrict.json` 中通过 `share` 选项配置：

| 模式 | 说明 |
| ---- | ---- |
| `"manual"` | 手动分享（默认），使用 `/share` 命令按需分享 |
| `"auto"` | 自动分享所有新会话 |
| `"disabled"` | 完全禁用分享功能 |

---

## 手动分享（默认）

在 TUI 中输入 `/share` 生成分享链接并复制到剪贴板：

```bash
/share
```

快捷键：`ctrl+x s`

配置文件中显式设置（可选）：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "share": "manual"
}
```

---

## 自动分享

为所有新会话启用自动分享：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "share": "auto"
}
```

---

## 禁用分享

完全禁用分享功能：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "share": "disabled"
}
```

将此配置提交到项目的 `costrict.json` 中，可对整个团队强制禁用分享。

---

## 取消分享

停止分享并从公开访问中移除：

```bash
/unshare
```

执行后，分享链接将失效，相关数据也会被删除。

---

## 注意事项

- 分享的会话包含完整对话历史，在取消分享前始终保持可访问
- 仅分享不包含敏感信息的会话
- 分享前请检查内容中是否包含 API Key、密码、专有代码等敏感数据
- 协作完成后及时取消分享
