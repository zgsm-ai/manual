---
sidebar_position: 100
---

# FAQ

Frequently asked questions about CoStrict CLI.

## Installation & Setup

### Q: What are the system requirements?

A: Node.js 18.x or higher is required. The CLI works on Windows, macOS, and Linux.

### Q: How do I update the CLI?

A: Run `npm update -g @costrict/cli` or `yarn global upgrade @costrict/cli`

### Q: Can I use CLI and Plugin at the same time?

A: Yes! They share the same account and credits.

## Usage

### Q: How do I authenticate?

A: Run `costrict login` and follow the browser authentication flow.

### Q: Can I use CLI in CI/CD pipelines?

A: Yes, use `costrict login --token YOUR_TOKEN` for non-interactive authentication.

### Q: Does CLI work offline?

A: No, CLI requires internet connection to communicate with CoStrict AI services.

## Billing

### Q: Do CLI and Plugin share credits?

A: Yes, all usage counts towards your account's total credits.

### Q: How is CLI usage calculated?

A: Similar to Plugin - based on tokens processed and model used.

For more billing questions, see [Billing Documentation](/plugin/billing/purchase).

## Troubleshooting

### Q: CLI command not found after installation

A: Make sure your global npm/yarn bin directory is in your PATH.

### Q: Authentication fails

A: Try `costrict logout` then `costrict login` again.

### Q: Slow response times

A: Check your internet connection and try again. If issues persist, contact support.

## Getting Help

- GitHub Issues: [Report a bug](https://github.com/zgsm-ai/costrict/issues)
- Documentation: Browse other sections for detailed guides
- Support: Contact us through the website
