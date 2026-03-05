---
sidebar_position: 3
---

# AI平台官方市场调研

本文档对主要AI平台市场进行全面调研，包括访问方式、数据结构、爬取策略以及数据采集的法律考虑。

## OpenAI GPT Store

### 访问方式和URL

- **主要URL**: [https://chat.openai.com/gpts](https://chat.openai.com/gpts)
- **GPT Store首页**: [https://openai.com/gpt-store](https://openai.com/gpt-store)
- **API文档**: 无公开的GPT Store浏览API

:::note
GPT Store需要ChatGPT Plus、Team或Enterprise订阅才能访问自定义GPT。
:::

### GPTs的元数据结构

Store中的每个GPT包含以下元数据字段：

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `name` | string | GPT的显示名称 |
| `description` | string | 简短描述（最多约500字符） |
| `author` | string | 创建者名称或组织 |
| `category` | string | 主分类（如"Productivity"、"Education"） |
| `rating` | number | 平均用户评分（0-5分） |
| `conversations` | integer | 发起的对话数量 |
| `profile_image` | URL | GPT图标或头像 |
| `gpt_id` | string | 唯一标识符（如`g-abc123`） |

### 分类和标签系统

OpenAI将GPT组织为几个主要类别：

- **Featured**: 精选和热门GPT
- **DALL·E**: 图像生成工具
- **Writing**: 内容创作和编辑
- **Productivity**: 工作流自动化
- **Research & Analysis**: 数据分析和研究工具
- **Programming**: 编程助手
- **Education**: 学习和辅导
- **Lifestyle**: 个人工具和娱乐

### 爬取策略（页面分析）

:::warning 法律提示
在任何爬取活动之前，务必查阅OpenAI的服务条款和robots.txt。
:::

**技术方法：**

1. **动态内容**: GPT Store使用React进行客户端渲染
2. **需要认证**: 必须登录才能访问Store内容
3. **速率限制**: OpenAI实施严格的速率限制

**推荐工具：**

- **Puppeteer**: 用于处理动态内容和认证
- **Playwright**: 更好的移动端模拟替代方案
- **Browserbase/Browserless**: 托管浏览器实例

**Puppeteer处理动态内容示例：**

```javascript
const puppeteer = require('puppeteer');

async function scrapeGPTStore() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // 设置视口和用户代理
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  // 导航到GPT Store（需要先手动登录）
  await page.goto('https://chat.openai.com/gpts', { waitUntil: 'networkidle2' });
  
  // 等待GPT卡片加载
  await page.waitForSelector('[data-testid="gpt-card"]', { timeout: 30000 });
  
  // 提取GPT数据
  const gpts = await page.evaluate(() => {
    const cards = document.querySelectorAll('[data-testid="gpt-card"]');
    return Array.from(cards).map(card => ({
      name: card.querySelector('h3')?.textContent || '',
      description: card.querySelector('p')?.textContent || '',
      author: card.querySelector('[data-author]')?.textContent || ''
    }));
  });
  
  await browser.close();
  return gpts;
}
```

**主要挑战：**

- 会话管理和Cookie处理
- Cloudflare防护
- 动态类名和选择器
- 分页和无限滚动

### 是否有公开API

截至2024年，OpenAI**不提供**以下功能的公开API：
- 浏览GPT Store
- 检索GPT元数据
- 搜索GPTs
- 访问GPT评分和评论

**可用的API：**
- **Assistants API**: 创建自定义助手（与GPT不同）
- **Chat Completions API**: 与您有权限访问的GPT交互

### 数据采集的法律和道德考虑（GPT Store）

1. **遵守服务条款**
   - 查阅：[OpenAI使用条款](https://openai.com/policies/terms-of-use)
   - 爬取可能违反服务条款
   - 数据采集仅限个人使用

2. **版权问题**
   - GPT描述受创建者版权保护
   - 尊重知识产权
   - 未经许可不要重新发布GPT内容

3. **遵守速率限制**
   - 在请求之间实施延迟（最少2-3秒）
   - 遵守HTTP 429（请求过多）响应
   - 使用指数退避策略

4. **数据使用限制**
   - 采集的数据仅用于个人研究
   - 不要构建竞争性服务
   - 不要出售或重新分发爬取的数据

## Claude MCP Market

### MCP服务器的发布机制

Model Context Protocol (MCP) 服务器通过以下方式发布：

1. **官方仓库**: [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
2. **社区仓库**: 各种GitHub仓库
3. **NPM注册表**: 一些MCP服务器作为包发布
4. **手动配置**: 直接JSON配置

### 市场数据获取方式

**主要来源：**

| 来源 | 方法 | 更新频率 |
|--------|--------|------------------|
| GitHub仓库 | 克隆/获取仓库 | 按需 |
| README文件 | 解析Markdown | 按需 |
| 包注册表 | API调用（npm、pypi） | 实时 |
| 社区列表 | 网页爬取 | 定期 |

**GitHub API方法：**

```javascript
// 从官方仓库获取MCP服务器
const response = await fetch(
  'https://api.github.com/repos/modelcontextprotocol/servers/contents/'
);
const servers = await response.json();

// 解析每个服务器目录的元数据
for (const server of servers) {
  if (server.type === 'dir') {
    const readme = await fetch(
      `https://api.github.com/repos/modelcontextprotocol/servers/contents/${server.name}/README.md`
    );
    // 解析README获取元数据
  }
}
```

### MCP配置格式标准

MCP服务器使用标准化的JSON配置格式：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"],
      "env": {
        "OPTIONAL_ENV_VAR": "value"
      }
    },
    "another-server": {
      "command": "python",
      "args": ["-m", "mcp_server_git"],
      "env": {}
    }
  }
}
```

**配置字段：**

| 字段 | 必需 | 描述 |
|-------|----------|-------------|
| `command` | 是 | 可执行命令（npx、python、node等） |
| `args` | 是 | 命令行参数数组 |
| `env` | 否 | 环境变量对象 |

**常见服务器类型：**

- **Filesystem**: 文件和目录操作
- **Git**: 仓库管理
- **Database**: SQL和NoSQL数据库连接器
- **Web Search**: 搜索引擎集成
- **API Connectors**: REST/GraphQL API封装器

### 官方仓库地址

- **主仓库**: [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- **文档**: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
- **协议规范**: [https://spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)

### 服务器信息提取方法

**1. README解析：**

```javascript
function parseMCPReadme(markdown) {
  const metadata = {
    name: '',
    description: '',
    version: '',
    author: '',
    capabilities: []
  };
  
  // 从第一个标题提取名称
  const nameMatch = markdown.match(/^#\s+(.+)$/m);
  if (nameMatch) metadata.name = nameMatch[1];
  
  // 从第一个段落提取描述
  const descMatch = markdown.match(/^#\s+.+\n\n(.+)$/m);
  if (descMatch) metadata.description = descMatch[1];
  
  return metadata;
}
```

**2. Package.json分析：**

```bash
# 克隆仓库
git clone https://github.com/modelcontextprotocol/servers.git

# 查找所有package.json文件
find servers -name "package.json" -exec jq '{name, version, description, author}' {} \;
```

**3. 基于API的提取：**

```javascript
// 使用GitHub API列出服务器
async function listMCPServers() {
  const response = await fetch(
    'https://api.github.com/repos/modelcontextprotocol/servers/contents/'
  );
  
  const contents = await response.json();
  
  return contents
    .filter(item => item.type === 'dir')
    .map(dir => ({
      name: dir.name,
      url: dir.html_url,
      api_url: dir.url
    }));
}
```

## 其他AI平台市场

### Perplexity AI

**平台特点：**
- AI驱动的搜索引擎，带有引用
- 实时网络搜索能力
- 收藏和线程功能

**资源类型：**
- AI搜索收藏
- 自定义线程
- 共享对话
- AI生成的摘要

**数据获取方式：**

| 方法 | 访问权限 | 速率限制 |
|--------|--------|------------|
| 网页界面 | 需要登录 | 标准 |
| API（Sonar） | 需要API密钥 | 1000次请求/小时 |
| 浏览器扩展 | 公开 | 无 |

**API端点：**

```bash
# Perplexity API（Sonar模型）
curl -X POST https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar-medium-online",
    "messages": [{"role": "user", "content": "您的查询"}]
  }'
```

**爬取策略：**

- 收藏需要认证
- 使用API获取结构化数据访问
- 遵守速率限制和服务条款
- 公开线程可通过URL访问

### Poe

**市场结构：**

Poe（由Quora创建）提供的机器人市场包括：

- **官方机器人**: Claude、GPT-4、ChatGPT等
- **用户创建的机器人**: 自定义提示和配置
- **服务器机器人**: API连接的机器人

**访问点：**
- **主URL**: [https://poe.com](https://poe.com)
- **机器人创建**: [https://poe.com/create_bot](https://poe.com/create_bot)
- **API**: [https://poe.com/api](https://poe.com/api)（受限访问）

**机器人元数据：**

```json
{
  "handle": "AssistantName",
  "displayName": "显示名称",
  "description": "机器人描述",
  "creator": "username",
  "messageCount": 10000,
  "likes": 500,
  "isOfficial": false,
  "baseModel": "claude-3-opus"
}
```

**数据采集策略：**

1. **公开机器人列表**: 无需登录即可访问
2. **机器人资料**: 解析HTML或使用GraphQL端点
3. **API方法**: 仅限机器人创建者
4. **速率限制**: Poe实施严格的反机器人措施

**GraphQL示例：**

```javascript
// Poe使用GraphQL获取机器人数据
const query = `
  query BotList($cursor: String) {
    bots(first: 50, after: $cursor) {
      edges {
        node {
          handle
          displayName
          description
          messageCount
          likes
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
```

**主要考虑：**

- 强大的反爬取保护
- 验证码挑战
- 基于会话的认证
- 基于IP的速率限制

### Hugging Face Spaces

**Spaces API使用：**

Hugging Face提供全面的API来访问Spaces：

**REST API端点：**

```bash
# 列出Spaces
GET https://huggingface.co/api/spaces

# 获取特定Space
GET https://huggingface.co/api/spaces/{owner}/{repo}

# 获取Space文件
GET https://huggingface.co/api/spaces/{owner}/{repo}/tree/main
```

**Python SDK：**

```python
from huggingface_hub import HfApi

api = HfApi()

# 列出公开的Spaces
spaces = api.list_spaces(limit=100, sort='likes')

for space in spaces:
    print(f"Space: {space.id}")
    print(f"作者: {space.author}")
    print(f"点赞: {space.likes}")
    print(f"SDK: {space.sdk}")
```

**模型和应用元数据：**

```json
{
  "id": "username/space-name",
  "author": "username",
  "sha": "commit_hash",
  "lastModified": "2024-01-15T10:00:00Z",
  "private": false,
  "gated": false,
  "disabled": false,
  "host": "https://huggingface.co",
  "subdomain": "username-space-name.hf.space",
  "tags": ["gradio", "text-generation", "llm"],
  "doi": null,
  "sdk": "gradio",
  "sdkVersion": "4.0.0",
  "appPort": 7860,
  "likes": 1500,
  "datasets": ["dataset/name"],
  "models": ["model/name"]
}
```

**元数据字段：**

| 字段 | 描述 |
|-------|-------------|
| `sdk` | 使用的框架（gradio、streamlit、docker、static） |
| `tags` | 用于搜索的分类标签 |
| `likes` | 社区参与度指标 |
| `subdomain` | 在线演示URL |
| `models` | 关联的模型依赖 |
| `datasets` | 关联的数据集依赖 |

**爬取策略：**

```python
import requests

# 基于API的爬取（推荐）
def scrape_hf_spaces(limit=1000):
    url = "https://huggingface.co/api/spaces"
    params = {
        "limit": limit,
        "sort": "likes",
        "direction": -1
    }
    
    response = requests.get(url, params=params)
    spaces = response.json()
    
    return [
        {
            "name": space["id"],
            "author": space["author"],
            "sdk": space.get("sdk"),
            "likes": space.get("likes", 0),
            "url": f"https://huggingface.co/spaces/{space['id']}",
            "demo_url": space.get("subdomain")
        }
        for space in spaces
    ]

# 网页爬取（仅在API不足时使用）
def scrape_space_details(space_id):
    url = f"https://huggingface.co/spaces/{space_id}"
    # 使用BeautifulSoup或类似工具
    # 从仓库解析README.md
    # 提取额外的元数据
```

**最佳实践：**

1. **使用官方API**: HF提供全面的API访问
2. **遵守速率限制**: 未认证用户1000次请求/小时
3. **认证**: 使用HF令牌获取更高的限制
4. **缓存**: 缓存响应以减少API调用

## 各平台的robots.txt分析

### 检查robots.txt的方法

**手动检查：**

```bash
# 使用curl
curl https://chat.openai.com/robots.txt
curl https://huggingface.co/robots.txt
curl https://poe.com/robots.txt

# 使用浏览器
# 导航到 https://domain.com/robots.txt
```

**程序化检查：**

```javascript
async function checkRobotsTxt(domain) {
  const response = await fetch(`https://${domain}/robots.txt`);
  const content = await response.text();
  
  // 解析robots.txt
  const rules = parseRobotsTxt(content);
  return rules;
}

function parseRobotsTxt(content) {
  const lines = content.split('\n');
  const rules = {
    userAgent: {},
    sitemaps: [],
    crawlDelay: {}
  };
  
  let currentUserAgent = '*';
  
  for (const line of lines) {
    const [key, value] = line.split(':').map(s => s.trim());
    
    if (key.toLowerCase() === 'user-agent') {
      currentUserAgent = value;
      rules.userAgent[currentUserAgent] = { allow: [], disallow: [] };
    } else if (key.toLowerCase() === 'disallow') {
      rules.userAgent[currentUserAgent]?.disallow.push(value);
    } else if (key.toLowerCase() === 'allow') {
      rules.userAgent[currentUserAgent]?.allow.push(value);
    } else if (key.toLowerCase() === 'sitemap') {
      rules.sitemaps.push(value);
    } else if (key.toLowerCase() === 'crawl-delay') {
      rules.crawlDelay[currentUserAgent] = parseInt(value);
    }
  }
  
  return rules;
}
```

### 各平台的爬取限制

**OpenAI (chat.openai.com):**

```
User-agent: *
Disallow: /auth/
Disallow: /api/
Disallow: /backend-api/
Allow: /
Crawl-delay: 10
```

- **限制**: 认证和API端点被阻止
- **爬取延迟**: 建议10秒
- **注意**: GPT Store内容在认证之后

**Hugging Face (huggingface.co):**

```
User-agent: *
Disallow: /api/links
Disallow: /settings
Disallow: /notify
Allow: /
Crawl-delay: 1
```

- **限制**: 最小限制
- **API访问**: 通过官方API鼓励
- **爬取延迟**: 最少1秒

**GitHub (github.com):**

```
User-agent: *
Disallow: /*/blob/
Disallow: /*/commit/
Disallow: /*/compare/
Disallow: /search/
Allow: /
```

- **限制**: blob、commit、search受限
- **优先使用API**: 使用GitHub API进行结构化访问
- **速率限制**: 未认证60次请求/小时，认证5000次请求/小时

**Perplexity (perplexity.ai):**

```
User-agent: *
Disallow: /search/
Disallow: /api/
Allow: /
```

- **限制**: 搜索和API端点
- **需要认证**: 大部分内容需要
- **建议**: 使用API而非爬取

**Poe (poe.com):**

```
User-agent: *
Disallow: /api/
Disallow: /login
Disallow: /signup
Crawl-delay: 5
```

- **限制**: API和认证端点
- **反机器人**: 除了robots.txt之外的强保护
- **爬取延迟**: 5秒

### 合规爬取建议

1. **始终遵守robots.txt**
   ```javascript
   // 爬取前检查
   const robots = await checkRobotsTxt('example.com');
   if (!isAllowed(robots, '/path', 'MyBot')) {
     console.log('路径被robots.txt禁止');
     return;
   }
   ```

2. **实施适当的延迟**
   ```javascript
   async function crawlWithDelay(urls, delayMs = 2000) {
     for (const url of urls) {
       await fetch(url);
       await sleep(delayMs);
     }
   }
   ```

3. **使用有意义的User-Agent**
   ```
   User-Agent: MyAIBot/1.0 (contact@example.com; https://mysite.com/bot-info)
   ```

4. **处理429响应**
   ```javascript
   async function fetchWithRetry(url, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       const response = await fetch(url);
       if (response.status === 429) {
         const retryAfter = response.headers.get('Retry-After') || 60;
         await sleep(retryAfter * 1000);
         continue;
       }
       return response;
     }
   }
   ```

5. **限制请求速率**
   - 请求之间最少2-3秒
   - 遵守Crawl-Delay指令
   - 在错误时实施指数退避

## 数据采集的法律和道德考虑

### 遵守服务条款

**关键原则：**

1. **阅读和理解服务条款**
   - 每个平台都有特定条款
   - 违规可能导致IP封禁或法律诉讼
   - 如有疑问，联系平台支持

2. **个人与商业用途**
   - 个人研究通常更宽容
   - 商业用途通常需要许可证
   - 在收集数据前明确意图

3. **署名要求**
   - 注明原始创建者
   - 包含来源URL
   - 遵循署名指南

### 版权和许可问题

**理解数据所有权：**

| 内容类型 | 所有权 | 使用权限 |
|--------------|-----------|--------------|
| GPT描述 | 原始创建者 | 重新分发需要许可 |
| MCP服务器代码 | MIT/Apache许可证 | 开源需署名 |
| HF Spaces | 各种许可证 | 检查单独的space许可证 |
| API响应 | 平台所有 | 受API条款约束 |

**最佳实践：**

```markdown
# 署名示例

此资源来源于：
- 平台: OpenAI GPT Store
- 创建者: [创建者名称]
- URL: [GPT URL]
- 许可证: [如适用]

数据采集日期: [日期]
采集方法: [手动/API/爬取]
```

### 用户隐私保护

**GDPR和隐私合规：**

1. **最小化数据收集**
   - 仅收集必要的元数据
   - 避免个人信息
   - 不要存储用户对话

2. **数据匿名化**
   - 如果非必要则删除用户ID
   - 尽可能聚合数据
   - 不要发布个人用户数据

3. **数据保留**
   - 定义保留期限
   - 删除过时数据
   - 提供删除机制

4. **透明度**
   - 记录数据来源
   - 披露收集方法
   - 提供退出选项

**隐私政策示例：**

```markdown
## 数据收集声明

本知识库收集AI平台上公开可用的元数据。
我们不收集：
- 个人用户信息
- 私人对话
- 认证凭据

数据来源：
- 公开的GPT描述和元数据
- 开源的MCP服务器仓库
- 公开的Hugging Face Spaces

联系删除数据: [email]
```

### API使用规范

**速率限制最佳实践：**

```javascript
class RateLimiter {
  constructor(requestsPerMinute, cooldownMs = 60000) {
    this.requestsPerMinute = requestsPerMinute;
    this.cooldownMs = cooldownMs;
    this.requests = [];
  }

  async makeRequest(url) {
    await this.waitForSlot();
    this.requests.push(Date.now());
    return fetch(url);
  }

  async waitForSlot() {
    const now = Date.now();
    this.requests = this.requests.filter(t => now - t < 60000);

    if (this.requests.length >= this.requestsPerMinute) {
      const oldestRequest = this.requests[0];
      const waitTime = 60000 - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// 使用方法
const limiter = new RateLimiter(30); // 每分钟30次请求
```

**API密钥管理：**

- 永远不要将API密钥提交到版本控制
- 使用环境变量
- 定期轮换密钥
- 监控使用情况和成本

### 数据用途限制

**允许的用途：**

- 个人研究和学习
- 学术研究（需适当署名）
- 内部工具和提高生产力
- 具有适当API访问的集成

**禁止的用途：**

- 构建竞争性服务
- 出售或重新分发数据
- 创建垃圾邮件或恶意工具
- 规避平台限制

## 示例资源链接

### OpenAI GPT Store示例

**精选GPTs（截至2024年）：**

- **创意写作助手**: [https://chat.openai.com/g/g-abc123](https://chat.openai.com/g/g-abc123)
- **代码审查员**: [https://chat.openai.com/g/g-def456](https://chat.openai.com/g/g-def456)
- **数据分析师**: [https://chat.openai.com/g/g-ghi789](https://chat.openai.com/g/g-ghi789)

*注意：URL为示例。访问需要订阅。*

### Claude MCP服务器示例

**官方服务器：**

- **Filesystem服务器**: [https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- **Git服务器**: [https://github.com/modelcontextprotocol/servers/tree/main/src/git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)
- **PostgreSQL服务器**: [https://github.com/modelcontextprotocol/servers/tree/main/src/postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres)
- **Google Drive服务器**: [https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive](https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive)

**社区服务器：**

- **Awesome MCP**: [https://github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
- **MCP服务器目录**: 各种社区维护的列表

### Hugging Face Spaces示例

**热门Spaces：**

- **文本生成**: [https://huggingface.co/spaces/huggingface-projects/repo-to-space](https://huggingface.co/spaces/huggingface-projects/repo-to-space)
- **图像生成**: [https://huggingface.co/spaces/stabilityai/stable-diffusion](https://huggingface.co/spaces/stabilityai/stable-diffusion)
- **代码助手**: [https://huggingface.co/spaces/bigcode/starcoder](https://huggingface.co/spaces/bigcode/starcoder)
- **音频处理**: [https://huggingface.co/spaces/facebook/seamless_m4t](https://huggingface.co/spaces/facebook/seamless_m4t)

**热门分类：**

- LLM聊天机器人
- 图像生成
- 代码生成
- 语音识别
- 文档分析

### Poe机器人示例

**官方机器人：**

- **Claude-instant**: Claude的快速响应
- **ChatGPT**: OpenAI的GPT模型
- **Assistant**: Poe的默认助手

**知名社区机器人：**

- 编程助手
- 写作助手
- 研究工具
- 创意生成器

*访问: [https://poe.com](https://poe.com)*

### Perplexity AI资源

**功能：**

- AI搜索: [https://www.perplexity.ai](https://www.perplexity.ai)
- API文档: [https://docs.perplexity.ai](https://docs.perplexity.ai)
- 收藏: 有组织的研究线程

**API访问：**

```bash
# 从以下地址获取API密钥: https://www.perplexity.ai/settings/api
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer YOUR_KEY"
```

## 总结

### 关键要点

1. **尽可能使用官方API**: Hugging Face、Perplexity提供良好的API访问
2. **遵守robots.txt和服务条款**: 法律和道德要求
3. **实施速率限制**: 保护平台和您的访问权限
4. **优先考虑隐私**: 不要不必要地收集个人数据
5. **记录来源**: 保持署名和来源追溯

### 推荐方法

对于AI知识采集系统：

1. **Hugging Face Spaces**: 使用官方API（最宽容）
2. **MCP服务器**: 解析GitHub仓库（开源）
3. **GPT Store**: 手动策划或谨慎的有限爬取
4. **Poe/Perplexity**: 尽可能使用API访问，最小化爬取

### 后续步骤

- 为具有公开API的平台实现API客户端
- 创建速率受限的爬取基础设施
- 开发元数据提取管道
- 建立数据质量验证
- 构建署名和来源追溯
