---
sidebar_position: 1
---

# 知识库数据模型

## 概述

本文档定义了AI知识采集系统的数据模型。该模式旨在存储AI开发资源的全面信息，支持有效的搜索、过滤和质量评估。

## 模式结构

数据模型定义为JSON Schema，包含以下字段类别：

### 1. 基础信息

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `id` | string | 是 | 资源的唯一标识符。必须匹配模式 `^[a-z0-9-]+$` |
| `name` | string | 是 | 资源的显示名称（1-200字符） |
| `description` | string | 是 | 详细描述（10-2000字符） |
| `url` | string (URI) | 是 | 主要URL或仓库链接 |
| `category` | string | 是 | 主要分类：`open-source`、`documentation`、`dataset` 或 `tool` |
| `type` | string | 是 | 分类内的资源类型（如 `framework`、`library`、`tutorial`） |

### 2. 元数据字段

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `author` | string | 否 | 作者或组织名称 |
| `stars` | integer | 否 | GitHub星标数（适用于仓库） |
| `forks` | integer | 否 | GitHub分叉数（适用于仓库） |
| `downloads` | integer | 否 | 下载次数（适用于包） |
| `version` | string | 否 | 当前版本号（格式：X.Y.Z） |
| `updatedAt` | string (ISO 8601) | 是 | 最后更新时间戳 |
| `createdAt` | string (ISO 8601) | 是 | 创建时间戳 |

### 3. 使用指南

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `example` | string | 否 | 代码示例或使用片段（最多5000字符） |
| `config` | object | 否 | 配置示例 |
| `dependencies` | array[string] | 否 | 所需依赖项 |
| `installSteps` | array[object] | 否 | 安装步骤，包含步骤描述和命令 |

### 4. 质量评估

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `rating` | number | 否 | 平均用户评分（0-5） |
| `reviews` | integer | 否 | 用户评论数量 |
| `feedback` | array[object] | 否 | 用户反馈条目，包含用户、评论、日期和评分 |
| `qualityTags` | array[string] | 否 | 质量标签：`well-documented`、`actively-maintained`、`production-ready` 等 |

### 5. 可选字段

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `tags` | array[string] | 否 | 可搜索标签，用于提高可发现性 |
| `license` | string | 否 | 许可证类型（MIT、Apache-2.0、GPL-3.0等） |
| `platform` | array[string] | 否 | 支持的平台：`windows`、`macos`、`linux`、`web`、`docker`、`cloud` |
| `language` | array[string] | 否 | 支持的编程语言 |

## 数据示例

```json
{
  "id": "pytorch-framework",
  "name": "PyTorch",
  "description": "一个开源机器学习框架，加速从研究原型到生产部署的路径。",
  "url": "https://github.com/pytorch/pytorch",
  "category": "open-source",
  "type": "framework",
  "author": "Meta AI",
  "stars": 75000,
  "forks": 21000,
  "downloads": 5000000,
  "version": "2.1.0",
  "updatedAt": "2024-01-15T10:30:00Z",
  "createdAt": "2016-09-01T00:00:00Z",
  "example": "import torch\nx = torch.rand(5, 3)\nprint(x)",
  "config": {
    "device": "cuda",
    "precision": "fp16"
  },
  "dependencies": [
    "python>=3.8",
    "numpy>=1.20"
  ],
  "installSteps": [
    {
      "step": "安装支持CUDA的PyTorch",
      "command": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118"
    }
  ],
  "rating": 4.8,
  "reviews": 1250,
  "qualityTags": [
    "well-documented",
    "actively-maintained",
    "production-ready",
    "high-performance"
  ],
  "tags": [
    "deep-learning",
    "neural-network",
    "gpu-acceleration",
    "autodiff"
  ],
  "license": "BSD-3-Clause",
  "platform": ["windows", "macos", "linux"],
  "language": ["python", "cpp"]
}
```

## 验证规则

### 必填字段
所有资源**必须**包含以下字段：
- `id`、`name`、`description`、`url`、`category`、`type`
- `createdAt`、`updatedAt`（ISO 8601格式）

### 字段约束
- `id`：必须是小写字母数字加连字符，1-100个字符
- `name`：1-200个字符
- `description`：10-2000个字符
- `url`：有效的HTTP/HTTPS URL
- `rating`：0到5之间的十进制数
- `version`：语义版本格式（X.Y.Z）

### 分类值
- `open-source`：开源项目和框架
- `documentation`：教程、指南和教育内容
- `dataset`：公共数据集和模型仓库
- `tool`：开发工具和平台

### 质量标签
预定义的质量评估标签：
- `well-documented`：提供全面的文档
- `actively-maintained`：定期更新和活跃的社区
- `production-ready`：经过测试，可用于生产环境
- `beginner-friendly`：易于入门
- `enterprise-ready`：适合企业部署
- `high-performance`：针对速度和效率进行了优化
- `lightweight`：最少的依赖和较小的占用空间
- `community-favorite`：社区高度评价

## 实现说明

### 数据库模式
在数据库中实现此数据模型时：
1. 在 `id`、`category`、`type` 和 `tags` 上创建索引以提高查询效率
2. 对 `name` 和 `description` 字段使用全文搜索
3. 将时间戳存储为UTC时区
4. 在插入前根据JSON Schema验证输入数据

### API集成
通过API公开此数据时：
1. 在列表视图中返回所有必填字段
2. 在详细视图中包含可选字段
3. 支持按 `category`、`type`、`tags` 和 `qualityTags` 过滤
4. 支持按 `stars`、`rating`、`updatedAt` 和 `downloads` 排序

### 数据质量
为保持高质量数据：
1. 定期从源仓库更新 `stars`、`forks` 和 `downloads`
2. 验证URL并检查断开的链接
3. 鼓励用户反馈以改进 `rating` 和 `reviews`
4. 根据社区参与度审查和更新 `qualityTags`
