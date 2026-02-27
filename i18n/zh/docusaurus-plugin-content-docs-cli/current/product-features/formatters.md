---
sidebar_position: 18
---

# 格式化工具

CoStrict 在写入或编辑文件后，会自动使用特定语言的格式化工具对其进行格式化，确保生成的代码符合项目的代码风格。

---

## 内置格式化工具

CoStrict 内置了多种主流语言的格式化工具，在满足对应的前提条件后会自动生效：

| 格式化工具     | 支持的扩展名                                              | 前提条件                              |
| -------------- | --------------------------------------------------------- | ------------------------------------- |
| `prettier`     | .js .jsx .ts .tsx .html .css .md .json .yaml 等           | `package.json` 中有 `prettier` 依赖   |
| `biome`        | .js .jsx .ts .tsx .html .css .md .json .yaml 等           | 存在 `biome.json(c)` 配置文件         |
| `gofmt`        | .go                                                       | `gofmt` 命令可用                      |
| `rustfmt`      | .rs                                                       | `rustfmt` 命令可用                    |
| `cargofmt`     | .rs                                                       | `cargo fmt` 命令可用                  |
| `ruff`         | .py .pyi                                                  | `ruff` 命令可用且有相应配置           |
| `uv`           | .py .pyi                                                  | `uv` 命令可用                         |
| `shfmt`        | .sh .bash                                                 | `shfmt` 命令可用                      |
| `clang-format` | .c .cpp .h .hpp .ino 等                                   | 存在 `.clang-format` 配置文件         |
| `dart`         | .dart                                                     | `dart` 命令可用                       |
| `ktlint`       | .kt .kts                                                  | `ktlint` 命令可用                     |
| `terraform`    | .tf .tfvars                                               | `terraform` 命令可用                  |
| `zig`          | .zig .zon                                                 | `zig` 命令可用                        |
| `rubocop`      | .rb .rake .gemspec .ru                                    | `rubocop` 命令可用                    |
| `standardrb`   | .rb .rake .gemspec .ru                                    | `standardrb` 命令可用                 |
| `pint`         | .php                                                      | `composer.json` 中有 `laravel/pint`   |
| `mix`          | .ex .exs .eex .heex 等                                    | `mix` 命令可用                        |
| `ocamlformat`  | .ml .mli                                                  | `ocamlformat` 命令可用且有配置文件    |
| `ormolu`       | .hs                                                       | `ormolu` 命令可用                     |
| `cljfmt`       | .clj .cljs .cljc .edn                                     | `cljfmt` 命令可用                     |
| `gleam`        | .gleam                                                    | `gleam` 命令可用                      |
| `nixfmt`       | .nix                                                      | `nixfmt` 命令可用                     |
| `dfmt`         | .d                                                        | `dfmt` 命令可用                       |
| `air`          | .R                                                        | `air` 命令可用                        |
| `htmlbeautifier` | .erb .html.erb                                          | `htmlbeautifier` 命令可用             |

例如，项目的 `package.json` 中包含 `prettier` 依赖，CoStrict 就会自动使用它进行格式化。

---

## 工作原理

当 CoStrict 写入或编辑文件时，会：

1. 根据文件扩展名匹配已启用的格式化工具
2. 运行对应的格式化命令
3. 自动应用格式化结果

整个过程在后台完成，无需手动操作。

---

## 配置

通过 `formatter` 选项自定义格式化工具行为：

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": {}
}
```

每个格式化工具支持以下配置属性：

| 属性          | 类型     | 描述                           |
| ------------- | -------- | ------------------------------ |
| `disabled`    | boolean  | 设为 `true` 可禁用该格式化工具 |
| `command`     | string[] | 执行格式化的命令（`$FILE` 为文件路径占位符） |
| `environment` | object   | 运行格式化工具时的环境变量     |
| `extensions`  | string[] | 该格式化工具处理的文件扩展名   |

---

### 禁用所有格式化工具

```json title="costrict.json"
{
  "$schema": "https://opencode.ai/config.json",
  "formatter": false
}
```

### 禁用特定格式化工具

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

### 自定义格式化工具

覆盖内置格式化工具或添加新的格式化工具：

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

命令中的 `$FILE` 占位符会被替换为待格式化文件的实际路径。
