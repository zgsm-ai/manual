---
sidebar_position: 3
---

# v2.1.0

## New Plan Development Mode

### Plan Mode

Serious programming, following the "Plan Creation → Step-by-Step Implementation" workflow. Suitable for progressive development and task management, ensuring orderly project advancement.

## Architecture and Performance Optimization

### Dynamic Model Loading

Convert claude-code models to dynamic loading mechanism using the `getClaudeCodeModels()` function for on-demand loading, optimizing memory usage and startup performance.

### Terminal Simplification

Simplify terminal integration for editors like VSCode and JetBrains, improving developer experience.

### Directory Scanning Optimization

Optimize directory scanning performance by caching gitignore check results, reducing redundant computations.

## Tool System Enhancements

### Model-Specific Tool Customization

Add `excludedTools` and `includedTools` configurations to support customizing available tool sets for different models, enhancing model adaptability.

### Opt-in Tool Support

Add `customTools` functionality, allowing users to enable specific tools on-demand, providing more precise tool control.

### Text Replacement Tools

Add `search_and_replace` tool for batch text replacement operations, and `search_replace` native tool for single precise replacement.

**Important Change**: Remove `line_count` parameter from `write_to_file` tool, simplifying the tool interface.

## Native Tool Ecosystem Expansion

### Multi-Provider Support

Enable native tool support for DeepSeek, Doubao, Requesty, and multiple other AI providers, expanding ecosystem coverage.

### Mainstream Platform Integration

Add native tool support for OpenAI-compatible providers, Vertex Gemini, Grok, Bedrock, and other platforms, enhancing interoperability.

## Stability and Error Handling

### Race Condition Fix

Fix race condition issues in the `new_task` tool for native protocol, improving stability in concurrent scenarios.

### Exception Handling Enhancement

Handle malformed native tool calls to prevent system hanging, enhancing robustness.

### Model Fetching Optimization

Fix Vercel AI Gateway model fetching issues to ensure model service availability.

**Improvement**: Enhance error message readability and optimize documentation links for faster problem resolution.

## User Experience Improvements

### Display Mode Management

Add ModeSwitch component, allowing users to flexibly switch between different display modes in chat.

### Auto-Approval Mechanism Optimization

Improve auto-approval timer visibility in follow-up suggestions, providing more intuitive time feedback. Optimize interaction logic so that auto-approval timeout is automatically cancelled when users start typing, preventing accidental operations.

### Internationalization Improvements

Update i18n features, improving skipHint text clarity in multiple languages, enhancing multilingual user experience.

## Testing and Development Tools

### Terminal Test Updates

Update terminal test mocks and shell path handling logic, ensuring accuracy and consistency of test environments.