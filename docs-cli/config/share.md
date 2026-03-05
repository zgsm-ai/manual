---
sidebar_position: 13
---

# Session Sharing

CoStrict supports creating public share links for sessions, making it easy to collaborate or get help from others.

> Shared sessions are publicly accessible to anyone with the link. Be careful not to share content containing sensitive information.

---

## Share Modes

CoStrict supports three share modes, configured via the `share` option in `costrict.json`:

| Mode | Description |
| ---- | ----------- |
| `"manual"` | Manual sharing (default) — use the `/share` command to share on demand |
| `"auto"` | Automatically share all new sessions |
| `"disabled"` | Completely disable sharing |

---

## Manual Sharing (Default)

Type `/share` in the TUI to generate a share link and copy it to the clipboard:

```bash
/share
```

Shortcut: `ctrl+x s`

Explicitly set in config (optional):

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "share": "manual"
}
```

---

## Auto Sharing

Enable automatic sharing for all new sessions:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "share": "auto"
}
```

---

## Disable Sharing

Completely disable the sharing feature:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "share": "disabled"
}
```

Committing this configuration to your project's `costrict.json` enforces the sharing restriction for the entire team.

---

## Unsharing

Stop sharing and remove a session from public access:

```bash
/unshare
```

After running this command, the share link becomes invalid and the associated data is deleted.

---

## Important Notes

- Shared sessions include the complete conversation history and remain accessible until unshared
- Only share sessions that do not contain sensitive information
- Before sharing, check the content for API keys, passwords, proprietary code, or other sensitive data
- Unshare promptly once collaboration is complete
