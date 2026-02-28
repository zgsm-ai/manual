---
sidebar_position: 18
---

# Formatters

CoStrict automatically formats files after writing or editing them, keeping generated code consistent with your project's style.

---

## Built-in Formatters

CoStrict includes formatters for most popular languages. A formatter activates automatically when its requirements are met:

| Formatter | Supported Extensions | Requirement |
| --------- | -------------------- | ----------- |
| `prettier` | .js .jsx .ts .tsx .html .css .md .json .yaml and more | `prettier` in `package.json` |
| `biome` | .js .jsx .ts .tsx .html .css .md .json .yaml and more | `biome.json(c)` config file present |
| `gofmt` | .go | `gofmt` command available |
| `rustfmt` | .rs | `rustfmt` command available |
| `cargofmt` | .rs | `cargo fmt` command available |
| `ruff` | .py .pyi | `ruff` command available with config |
| `uv` | .py .pyi | `uv` command available |
| `shfmt` | .sh .bash | `shfmt` command available |
| `clang-format` | .c .cpp .h .hpp .ino and more | `.clang-format` config file present |
| `dart` | .dart | `dart` command available |
| `ktlint` | .kt .kts | `ktlint` command available |
| `terraform` | .tf .tfvars | `terraform` command available |
| `zig` | .zig .zon | `zig` command available |
| `rubocop` | .rb .rake .gemspec .ru | `rubocop` command available |
| `standardrb` | .rb .rake .gemspec .ru | `standardrb` command available |
| `pint` | .php | `laravel/pint` in `composer.json` |
| `mix` | .ex .exs .eex .heex and more | `mix` command available |
| `ocamlformat` | .ml .mli | `ocamlformat` available with config file |
| `ormolu` | .hs | `ormolu` command available |
| `cljfmt` | .clj .cljs .cljc .edn | `cljfmt` command available |
| `gleam` | .gleam | `gleam` command available |
| `nixfmt` | .nix | `nixfmt` command available |
| `dfmt` | .d | `dfmt` command available |
| `air` | .R | `air` command available |
| `htmlbeautifier` | .erb .html.erb | `htmlbeautifier` command available |

For example, if your project's `package.json` includes `prettier`, CoStrict will automatically use it for formatting.

---

## How It Works

When CoStrict writes or edits a file, it:

1. Matches the file extension against all enabled formatters
2. Runs the matching format command
3. Applies the result automatically

The entire process runs in the background — no manual steps required.

---

## Configuration

Customize formatters via the `formatter` option in `costrict.json`:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {}
}
```

Each formatter entry supports:

| Property | Type | Description |
| -------- | ---- | ----------- |
| `disabled` | boolean | Set to `true` to disable this formatter |
| `command` | string[] | Command to run (`$FILE` is replaced with the file path) |
| `environment` | object | Environment variables to set when running the formatter |
| `extensions` | string[] | File extensions this formatter handles |

---

### Disable All Formatters

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": false
}
```

### Disable a Specific Formatter

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {
    "prettier": {
      "disabled": true
    }
  }
}
```

### Custom Formatter

Override a built-in formatter or add a new one:

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {
    "prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "environment": {
        "NODE_ENV": "development"
      },
      "extensions": [".js", ".ts", ".jsx", ".tsx"]
    },
    "custom-markdown-formatter": {
      "command": ["deno", "fmt", "$FILE"],
      "extensions": [".md"]
    }
  }
}
```

The `$FILE` placeholder in the command is replaced with the actual file path.
