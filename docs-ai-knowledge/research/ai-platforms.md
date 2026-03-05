---
sidebar_position: 3
---

# AI Platform Official Markets Research

This document provides comprehensive research on major AI platform markets, including their access methods, data structures, scraping strategies, and legal considerations for data collection.

## OpenAI GPT Store

### Access Methods and URLs

- **Main URL**: [https://chat.openai.com/gpts](https://chat.openai.com/gpts)
- **GPT Store Landing**: [https://openai.com/gpt-store](https://openai.com/gpt-store)
- **API Documentation**: No public API for GPT Store browsing

:::note
GPT Store requires a ChatGPT Plus, Team, or Enterprise subscription to access custom GPTs.
:::

### GPTs Metadata Structure

Each GPT in the store contains the following metadata fields:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name of the GPT |
| `description` | string | Brief description (max ~500 chars) |
| `author` | string | Creator name or organization |
| `category` | string | Primary category (e.g., "Productivity", "Education") |
| `rating` | number | Average user rating (0-5 scale) |
| `conversations` | integer | Number of conversations initiated |
| `profile_image` | URL | GPT icon or profile picture |
| `gpt_id` | string | Unique identifier (e.g., `g-abc123`) |

### Classification and Tagging System

OpenAI organizes GPTs into several main categories:

- **Featured**: Staff picks and trending GPTs
- **DALL·E**: Image generation tools
- **Writing**: Content creation and editing
- **Productivity**: Workflow automation
- **Research & Analysis**: Data analysis and research tools
- **Programming**: Coding assistants
- **Education**: Learning and tutoring
- **Lifestyle**: Personal tools and entertainment

### Scraping Strategy (Page Analysis)

:::warning Legal Notice
Always review OpenAI's Terms of Service and robots.txt before any scraping activities.
:::

**Technical Approach:**

1. **Dynamic Content**: GPT Store uses client-side rendering with React
2. **Authentication Required**: Must be logged in to access store content
3. **Rate Limiting**: OpenAI implements strict rate limiting

**Recommended Tools:**

- **Puppeteer**: For handling dynamic content and authentication
- **Playwright**: Alternative with better mobile emulation
- **Browserbase/Browserless**: Managed browser instances

**Puppeteer Example for Dynamic Content:**

```javascript
const puppeteer = require('puppeteer');

async function scrapeGPTStore() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport and user agent
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  
  // Navigate to GPT Store (requires manual login first)
  await page.goto('https://chat.openai.com/gpts', { waitUntil: 'networkidle2' });
  
  // Wait for GPT cards to load
  await page.waitForSelector('[data-testid="gpt-card"]', { timeout: 30000 });
  
  // Extract GPT data
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

**Key Challenges:**

- Session management and cookie handling
- Cloudflare protection
- Dynamic class names and selectors
- Pagination and infinite scroll

### Public API Availability

As of 2024, OpenAI **does not provide** a public API for:
- Browsing GPT Store
- Retrieving GPT metadata
- Searching GPTs
- Accessing GPT ratings and reviews

**Available APIs:**
- **Assistants API**: Create custom assistants (different from GPTs)
- **Chat Completions API**: Interact with GPTs you have access to

### Legal and Ethical Considerations for GPT Store

1. **Terms of Service Compliance**
   - Review: [OpenAI Terms of Use](https://openai.com/policies/terms-of-use)
   - Scraping may violate ToS
   - Personal use only for data collection

2. **Copyright Issues**
   - GPT descriptions are copyrighted by creators
   - Respect intellectual property rights
   - Don't republish GPT content without permission

3. **Rate Limiting Respect**
   - Implement delays between requests (minimum 2-3 seconds)
   - Honor HTTP 429 (Too Many Requests) responses
   - Use exponential backoff strategies

4. **Data Usage Limitations**
   - Collected data for personal research only
   - Don't build competing services
   - Don't sell or redistribute scraped data

## Claude MCP Market

### MCP Server Publishing Mechanism

Model Context Protocol (MCP) servers are published through:

1. **Official Repository**: [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
2. **Community Repositories**: Various GitHub repositories
3. **NPM Registry**: Some MCP servers published as packages
4. **Manual Configuration**: Direct JSON configuration

### Market Data Acquisition Methods

**Primary Sources:**

| Source | Method | Update Frequency |
|--------|--------|------------------|
| GitHub Repository | Clone/fetch repository | On-demand |
| README files | Parse markdown | On-demand |
| Package registries | API calls (npm, pypi) | Real-time |
| Community lists | Web scraping | Periodic |

**GitHub API Approach:**

```javascript
// Fetch MCP servers from official repository
const response = await fetch(
  'https://api.github.com/repos/modelcontextprotocol/servers/contents/'
);
const servers = await response.json();

// Parse each server directory for metadata
for (const server of servers) {
  if (server.type === 'dir') {
    const readme = await fetch(
      `https://api.github.com/repos/modelcontextprotocol/servers/contents/${server.name}/README.md`
    );
    // Parse README for metadata
  }
}
```

### MCP Configuration Format Standard

MCP servers use a standardized JSON configuration format:

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

**Configuration Fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `command` | Yes | Executable command (npx, python, node, etc.) |
| `args` | Yes | Array of command-line arguments |
| `env` | No | Environment variables object |

**Common Server Types:**

- **Filesystem**: File and directory operations
- **Git**: Repository management
- **Database**: SQL and NoSQL database connectors
- **Web Search**: Search engine integrations
- **API Connectors**: REST/GraphQL API wrappers

### Official Repository Address

- **Main Repository**: [https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- **Documentation**: [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Protocol Spec**: [https://spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)

### Server Information Extraction Methods

**1. README Parsing:**

```javascript
function parseMCPReadme(markdown) {
  const metadata = {
    name: '',
    description: '',
    version: '',
    author: '',
    capabilities: []
  };
  
  // Extract name from first heading
  const nameMatch = markdown.match(/^#\s+(.+)$/m);
  if (nameMatch) metadata.name = nameMatch[1];
  
  // Extract description from first paragraph
  const descMatch = markdown.match(/^#\s+.+\n\n(.+)$/m);
  if (descMatch) metadata.description = descMatch[1];
  
  return metadata;
}
```

**2. Package.json Analysis:**

```bash
# Clone repository
git clone https://github.com/modelcontextprotocol/servers.git

# Find all package.json files
find servers -name "package.json" -exec jq '{name, version, description, author}' {} \;
```

**3. API-based Extraction:**

```javascript
// Using GitHub API to list servers
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

## Other AI Platform Markets

### Perplexity AI

**Platform Characteristics:**
- AI-powered search engine with citations
- Real-time web search capabilities
- Collection and thread features

**Resource Types:**
- AI search collections
- Custom threads
- Shared conversations
- AI-generated summaries

**Data Acquisition Methods:**

| Method | Access | Rate Limit |
|--------|--------|------------|
| Web Interface | Requires login | Standard |
| API (Sonar) | API key required | 1000 req/hour |
| Browser Extension | Public | N/A |

**API Endpoint:**

```bash
# Perplexity API (Sonar models)
curl -X POST https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar-medium-online",
    "messages": [{"role": "user", "content": "Your query"}]
  }'
```

**Scraping Strategy:**

- Collections require authentication
- Use API for structured data access
- Respect rate limits and ToS
- Public threads can be accessed via URL

### Poe

**Market Structure:**

Poe (by Quora) offers a bot marketplace with:

- **Official Bots**: Claude, GPT-4, ChatGPT, etc.
- **User-Created Bots**: Custom prompts and configurations
- **Server Bots**: API-connected bots

**Access Points:**
- **Main URL**: [https://poe.com](https://poe.com)
- **Bot Creation**: [https://poe.com/create_bot](https://poe.com/create_bot)
- **API**: [https://poe.com/api](https://poe.com/api) (limited access)

**Bot Metadata:**

```json
{
  "handle": "AssistantName",
  "displayName": "Display Name",
  "description": "Bot description",
  "creator": "username",
  "messageCount": 10000,
  "likes": 500,
  "isOfficial": false,
  "baseModel": "claude-3-opus"
}
```

**Data Collection Strategy:**

1. **Public Bot Lists**: Accessible without login
2. **Bot Profiles**: Parse HTML or use GraphQL endpoints
3. **API Method**: Limited to bot creators
4. **Rate Limiting**: Poe implements aggressive anti-bot measures

**GraphQL Example:**

```javascript
// Poe uses GraphQL for bot data
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

**Key Considerations:**

- Strong anti-scraping protections
- Captcha challenges
- Session-based authentication
- IP-based rate limiting

### Hugging Face Spaces

**Spaces API Usage:**

Hugging Face provides comprehensive APIs for accessing Spaces:

**REST API Endpoints:**

```bash
# List Spaces
GET https://huggingface.co/api/spaces

# Get specific Space
GET https://huggingface.co/api/spaces/{owner}/{repo}

# Get Space files
GET https://huggingface.co/api/spaces/{owner}/{repo}/tree/main
```

**Python SDK:**

```python
from huggingface_hub import HfApi

api = HfApi()

# List public spaces
spaces = api.list_spaces(limit=100, sort='likes')

for space in spaces:
    print(f"Space: {space.id}")
    print(f"Author: {space.author}")
    print(f"Likes: {space.likes}")
    print(f"SDK: {space.sdk}")
```

**Model and Application Metadata:**

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

**Metadata Fields:**

| Field | Description |
|-------|-------------|
| `sdk` | Framework used (gradio, streamlit, docker, static) |
| `tags` | Category tags for searchability |
| `likes` | Community engagement metric |
| `subdomain` | Live demo URL |
| `models` | Associated model dependencies |
| `datasets` | Associated dataset dependencies |

**Scraping Strategy:**

```python
import requests

# API-based scraping (recommended)
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

# Web scraping (use only when API insufficient)
def scrape_space_details(space_id):
    url = f"https://huggingface.co/spaces/{space_id}"
    # Use BeautifulSoup or similar
    # Parse README.md from repository
    # Extract additional metadata
```

**Best Practices:**

1. **Use Official API**: HF provides comprehensive API access
2. **Respect Rate Limits**: 1000 requests/hour for unauthenticated
3. **Authentication**: Use HF token for higher limits
4. **Caching**: Cache responses to minimize API calls

## Robots.txt Analysis

### How to Check robots.txt

**Manual Checking:**

```bash
# Using curl
curl https://chat.openai.com/robots.txt
curl https://huggingface.co/robots.txt
curl https://poe.com/robots.txt

# Using browser
# Navigate to https://domain.com/robots.txt
```

**Programmatic Checking:**

```javascript
async function checkRobotsTxt(domain) {
  const response = await fetch(`https://${domain}/robots.txt`);
  const content = await response.text();
  
  // Parse robots.txt
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

### Platform-Specific Crawling Restrictions

**OpenAI (chat.openai.com):**

```
User-agent: *
Disallow: /auth/
Disallow: /api/
Disallow: /backend-api/
Allow: /
Crawl-delay: 10
```

- **Restrictions**: Auth and API endpoints blocked
- **Crawl Delay**: 10 seconds recommended
- **Notes**: GPT Store content behind authentication

**Hugging Face (huggingface.co):**

```
User-agent: *
Disallow: /api/links
Disallow: /settings
Disallow: /notify
Allow: /
Crawl-delay: 1
```

- **Restrictions**: Minimal restrictions
- **API Access**: Encouraged via official API
- **Crawl Delay**: 1 second minimum

**GitHub (github.com):**

```
User-agent: *
Disallow: /*/blob/
Disallow: /*/commit/
Disallow: /*/compare/
Disallow: /search/
Allow: /
```

- **Restrictions**: Blobs, commits, search limited
- **API Preferred**: Use GitHub API for structured access
- **Rate Limit**: 60 req/hour unauthenticated, 5000 req/hour authenticated

**Perplexity (perplexity.ai):**

```
User-agent: *
Disallow: /search/
Disallow: /api/
Allow: /
```

- **Restrictions**: Search and API endpoints
- **Authentication Required**: For most content
- **Recommendation**: Use API instead of scraping

**Poe (poe.com):**

```
User-agent: *
Disallow: /api/
Disallow: /login
Disallow: /signup
Crawl-delay: 5
```

- **Restrictions**: API and auth endpoints
- **Anti-Bot**: Strong protections beyond robots.txt
- **Crawl Delay**: 5 seconds

### Compliant Crawling Recommendations

1. **Respect robots.txt Always**
   ```javascript
   // Check before crawling
   const robots = await checkRobotsTxt('example.com');
   if (!isAllowed(robots, '/path', 'MyBot')) {
     console.log('Path disallowed by robots.txt');
     return;
   }
   ```

2. **Implement Proper Delays**
   ```javascript
   async function crawlWithDelay(urls, delayMs = 2000) {
     for (const url of urls) {
       await fetch(url);
       await sleep(delayMs);
     }
   }
   ```

3. **Use Meaningful User-Agent**
   ```
   User-Agent: MyAIBot/1.0 (contact@example.com; https://mysite.com/bot-info)
   ```

4. **Handle 429 Responses**
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

5. **Limit Request Rate**
   - Minimum 2-3 seconds between requests
   - Honor Crawl-Delay directives
   - Implement exponential backoff on errors

## Legal and Ethical Considerations

### Terms of Service Compliance

**Key Principles:**

1. **Read and Understand ToS**
   - Each platform has specific terms
   - Violations can result in IP bans or legal action
   - When in doubt, contact platform support

2. **Personal vs Commercial Use**
   - Personal research often more permissive
   - Commercial use typically requires licenses
   - Clarify intent before collecting data

3. **Attribution Requirements**
   - Credit original creators
   - Include source URLs
   - Follow attribution guidelines

### Copyright and Licensing

**Understanding Data Ownership:**

| Content Type | Ownership | Usage Rights |
|--------------|-----------|--------------|
| GPT Descriptions | Original creators | Permission required for redistribution |
| MCP Server Code | MIT/Apache licenses | Open source with attribution |
| HF Spaces | Various licenses | Check individual space licenses |
| API Responses | Platform owned | Subject to API terms |

**Best Practices:**

```markdown
# Example Attribution

This resource was sourced from:
- Platform: OpenAI GPT Store
- Creator: [Creator Name]
- URL: [GPT URL]
- License: [If applicable]

Data collected on: [Date]
Collection method: [Manual/API/Scraping]
```

### User Privacy Protection

**GDPR and Privacy Compliance:**

1. **Minimize Data Collection**
   - Only collect necessary metadata
   - Avoid personal information
   - Don't store user conversations

2. **Data Anonymization**
   - Remove user IDs if not essential
   - Aggregate data when possible
   - Don't publish individual user data

3. **Data Retention**
   - Define retention periods
   - Delete outdated data
   - Provide deletion mechanisms

4. **Transparency**
   - Document data sources
   - Disclose collection methods
   - Provide opt-out options

**Example Privacy Policy:**

```markdown
## Data Collection Notice

This knowledge base collects publicly available metadata from AI platforms.
We do not collect:
- Personal user information
- Private conversations
- Authentication credentials

Data sources:
- Public GPT descriptions and metadata
- Open source MCP server repositories
- Public Hugging Face Spaces

Contact for data removal: [email]
```

### API Usage Standards

**Rate Limiting Best Practices:**

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

// Usage
const limiter = new RateLimiter(30); // 30 requests per minute
```

**API Key Management:**

- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Monitor usage and costs

### Data Usage Limitations

**Permitted Uses:**

- Personal research and learning
- Academic research with proper attribution
- Internal tooling and productivity
- Integration with proper API access

**Prohibited Uses:**

- Building competing services
- Reselling or redistributing data
- Creating spam or malicious tools
- Circumventing platform restrictions

## Example Resource Links

### OpenAI GPT Store Examples

**Featured GPTs (as of 2024):**

- **Creative Writing Assistant**: [https://chat.openai.com/g/g-abc123](https://chat.openai.com/g/g-abc123)
- **Code Reviewer**: [https://chat.openai.com/g/g-def456](https://chat.openai.com/g/g-def456)
- **Data Analyst**: [https://chat.openai.com/g/g-ghi789](https://chat.openai.com/g/g-ghi789)

*Note: URLs are examples. Access requires subscription.*

### Claude MCP Server Examples

**Official Servers:**

- **Filesystem Server**: [https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- **Git Server**: [https://github.com/modelcontextprotocol/servers/tree/main/src/git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)
- **PostgreSQL Server**: [https://github.com/modelcontextprotocol/servers/tree/main/src/postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres)
- **Google Drive Server**: [https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive](https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive)

**Community Servers:**

- **Awesome MCP**: [https://github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
- **MCP Server Directory**: Various community-maintained lists

### Hugging Face Spaces Examples

**Popular Spaces:**

- **Text Generation**: [https://huggingface.co/spaces/huggingface-projects/repo-to-space](https://huggingface.co/spaces/huggingface-projects/repo-to-space)
- **Image Generation**: [https://huggingface.co/spaces/stabilityai/stable-diffusion](https://huggingface.co/spaces/stabilityai/stable-diffusion)
- **Code Assistant**: [https://huggingface.co/spaces/bigcode/starcoder](https://huggingface.co/spaces/bigcode/starcoder)
- **Audio Processing**: [https://huggingface.co/spaces/facebook/seamless_m4t](https://huggingface.co/spaces/facebook/seamless_m4t)

**Trending Categories:**

- LLM Chatbots
- Image Generation
- Code Generation
- Speech Recognition
- Document Analysis

### Poe Bot Examples

**Official Bots:**

- **Claude-instant**: Fast responses with Claude
- **ChatGPT**: OpenAI's GPT models
- **Assistant**: Poe's default assistant

**Notable Community Bots:**

- Programming helpers
- Writing assistants
- Research tools
- Creative generators

*Access: [https://poe.com](https://poe.com)*

### Perplexity AI Resources

**Features:**

- AI Search: [https://www.perplexity.ai](https://www.perplexity.ai)
- API Documentation: [https://docs.perplexity.ai](https://docs.perplexity.ai)
- Collections: Organized research threads

**API Access:**

```bash
# Get API key from: https://www.perplexity.ai/settings/api
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer YOUR_KEY"
```

## Summary

### Key Takeaways

1. **Use Official APIs When Available**: Hugging Face, Perplexity provide good API access
2. **Respect robots.txt and ToS**: Legal and ethical requirements
3. **Implement Rate Limiting**: Protect platforms and your access
4. **Prioritize Privacy**: Don't collect personal data unnecessarily
5. **Document Sources**: Maintain attribution and provenance

### Recommended Approach

For the AI Knowledge Collection System:

1. **Hugging Face Spaces**: Use official API (most permissive)
2. **MCP Servers**: Parse GitHub repositories (open source)
3. **GPT Store**: Manual curation or limited scraping with caution
4. **Poe/Perplexity**: API access where possible, minimal scraping

### Next Steps

- Implement API clients for platforms with public APIs
- Create rate-limited scraping infrastructure
- Develop metadata extraction pipelines
- Establish data quality validation
- Build attribution and provenance tracking
