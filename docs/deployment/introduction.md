---
sidebar_position: 1
---

# CoStrict Backend Deployment Tool

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-required-blue.svg)](https://docs.docker.com/get-docker/)
[![Docker Compose](https://img.shields.io/badge/docker--compose-required-blue.svg)](https://docs.docker.com/compose/install/)

## Project Overview

CoStrict Backend Deployment Tool is an enterprise-level AI code assistant backend service deployment solution based on Docker Compose. This project provides a complete microservice architecture, including core components such as AI gateway, identity authentication, code analysis, and chat services, supporting both private deployment and cloud service modes.

### Core Features

- **Microservice Architecture**: Containerized distributed service architecture
- **AI Gateway Integration**: Support for multiple large language model access
- **Identity Authentication System**: Integrated with Casdoor for enterprise-level identity management
- **Intelligent Code Analysis**: Provides code review, completion, optimization and other functions
- **Scalable Design**: Support for horizontal scaling and custom plugins

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  VSCode Plugin  │────│   API Gateway   │────│ Backend Services│
│   (CoStrict)    │    │ (Apache APISIX) │    │ (Microservices) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │                        │
                        ┌─────────────────┐    ┌─────────────────┐
                        │   AI Gateway    │    │ Database Cluster│
                        │   (Higress)     │    │   (PostgreSQL)  │
                        └─────────────────┘    └─────────────────┘
```

## System Requirements

### Model Requirements

The core functions of CoStrict all depend on large language models, and the following model services need to be **prepared in total**:

```
1. Chat model (providing complete http://chat_model_ip:chat_model_port/v1/chat/completions interface)
2. Code review model (providing complete http://review_model_ip:review_model_port/v1/chat/completions interface)
3. Embedding model (providing complete http://embedding_model_ip:embedding_model_port/v1/embeddings interface)
4. Rerank model (providing complete http://rerank_model_ip:rerank_model_port/v1/rerank interface)
5. Completion model (providing complete http://completion_model_ip:completion_model_port/v1/completions interface)
```

**Note**: Provide and record accurate `MODEL NAMES`, `APIKEYs`, and `CONTEXT LENGTHS` information. Used for configuration during service deployment.

**Recommended Models** and **Download Addresses**:

- **Chat Model**: `GLM-4.5-FP8`, `GLM-4.5-106B-A12B-FP8`

- **Code Review Model**: `Qwen2.5-Coder-32B-Instruct`, `Qwen3.0-Coder-30B-A3B-Instruct`

- **Completion Model**: `DeepSeek-Coder-V2-Lite-Base`

- **Embedding Model**: `gte-modernbert-baseRAG/Embedding`

- **Rerank Model**: `gte-reranker-modernbert-baseRAG/Rerank`

- **Download Addresses**:

```
https://modelscope.cn/models/ZhipuAI/GLM-4.5-FP8
https://modelscope.cn/models/ZhipuAI/GLM-4.5-Air-FP8
https://modelscope.cn/models/Qwen/Qwen2.5-Coder-32B-Instruct
https://modelscope.cn/models/Qwen/Qwen3-Coder-30B-A3B-Instruct
https://modelscope.cn/models/deepseek-ai/DeepSeek-Coder-V2-Lite-Base
https://modelscope.cn/models/iic/gte-modernbert-base
https://modelscope.cn/models/iic/gte-reranker-modernbert-base
```

**Recommended Model Deployment Resources**:

- **Chat Model**: `4 * H20` or `4 * RTX4090`

- **Code Review Model**: `2 * H20` or `2 * RTX4090`

- **Completion Model**: `1 * H20` or `1 * RTX4090`

- **Embedding Model**: `0.5 * H20` or `0.5 * RTX4090`

- **Rerank Model**: `0.5 * H20` or `0.5 * RTX4090`

**Trial Reminder**:

- If you have resources, to try the complete functionality, please ensure **all models meet the above requirements when deployed**.
- If you don't have resources, we can provide two options:
  - Use our officially released CoStrict directly without additional deployment to experience all CoStrict features.
  - We provide **time-limited** online `conversation` and `code review` model interfaces for short-term experience of CoStrict's main `AGENT` and `CODE REVIEW` features.

| Feature | Self-deployed (Models Meet Requirements) | Official CoStrict Release | Time-limited Interface |
|---------|------------------------------------------|---------------------------|------------------------|
| AGENT(Vibe) | ✅ Full functionality | ✅ Full functionality | ✅ Time-limited experience (Missing Codebase) |
| AGENT(Strict) | ✅ Full functionality | ✅ Full functionality | ✅ Time-limited experience (Missing Codebase) |
| CODE REVIEW | ✅ Full functionality | ✅ Full functionality | ✅ Time-limited experience |
| Code Completion | ✅ Full functionality | ✅ Full functionality | ❌ Not supported |
| CoStrict Online Interface Access | ✅ No need to access CoStrict online interface | ❌ Requires access to CoStrict online interface | ❌ Requires access to CoStrict online interface |


### Self-deployed Backend Service Instance Environment

**Hardware Requirements**:
- CPU: Intel x64 architecture, minimum 16 cores
- Memory: Minimum 32GB RAM
- Storage: Minimum 512GB available storage space

**Software Requirements**:
- Operating System: CentOS 7+ or Ubuntu 18.04+ (WSL supported)
- Container Runtime: Docker 20.10+ (refer to [Offline Docker Installation](./how-to-install-docker-offline.md) for offline installation)
- Orchestration Tool: Docker Compose 2.0+

## Deployment Checklist

Before starting the deployment, please **simultaneously open and view the [Deployment Checklist](./deploy-checklist.md)** and **check and complete all checklist items** throughout the deployment process to ensure a successful final deployment.

## Quick Start

### 1. Get Deployment Code

**Method 1: Git Clone**

```bash
git clone https://github.com/zgsm-ai/zgsm-backend-deploy.git
cd zgsm-backend-deploy
```

**Method 2: Download ZIP Package**

```bash
# Download the latest version branch ZIP package
wget https://github.com/zgsm-ai/zgsm-backend-deploy/archive/refs/heads/v4.zip -O zgsm-backend-deploy-4.zip

# Extract the ZIP package
unzip zgsm-backend-deploy-4.zip

# Enter the extracted directory (GitHub default extraction directory name is repository-name-branch-name)
cd zgsm-backend-deploy-4
```

### 2. Environment Configuration

Edit the configuration file:

```bash
vim configure.sh
```

**Key Configuration Parameters**:

| Parameter Name | Description | Default Value | Required |
|---------|------|--------|----------|
| `COSTRICT_BACKEND_BASEURL` | Backend service base URL | - | ✅ |
| `COSTRICT_BACKEND` | Backend service host address | - | ✅ |
| `PORT_APISIX_ENTRY` | API gateway entry port | 9080 | ❌ |
| `PORT_HIGRESS_CONTROL` | Higress console port | 8001 | ❌ |
| `PORT_CASDOOR` | Casdoor authentication system port | 9009 | ❌ |

Model Settings:

| Parameter Name | Description | Default Value | Required |
|---------|------|--------|----------|
| `CHAT_MODEL_HOST` | IP+PORT of chat model | - | ✅ |
| `CHAT_BASEURL` | Access address of chat model | - | ✅ |
| `CHAT_DEFAULT_MODEL` | Name of chat model | - | ✅ |
| `CHAT_MODEL_CONTEXTSIZE` | Context length of chat model | - | ✅ |
| `CHAT_MODEL_DESC` | Description of chat model | - | ❌ |
| `CHAT_APIKEY` | APIKEY of chat model, required if the model enables APIKEY authentication | - | ❌ |
| `CODEREVIEW_MODEL_HOST` | IP+PORT of Codereview model | - | ✅ |
| `CODEREVIEW_BASEURL` | Access address of Codereview model | - | ✅ |
| `CODEREVIEW_MODEL` | Name of Codereview model | - | ✅ |
| `CODEREVIEW_MODEL_CONTEXTSIZE` | Context length of Codereview model | - | ✅ |
| `CODEREVIEW_MODEL_DESC` | Description of Codereview model | - | ❌ |
| `CODEREVIEW_APIKEY` | APIKEY of Codereview model, required if the model enables APIKEY authentication | - | ❌ |
| `COMPLETION_BASEURL` | Access address of code completion model | - | ✅ |
| `COMPLETION_MODEL` | Name of code completion model | - | ✅ |
| `COMPLETION_APIKEY` | APIKEY of code completion model, required if the model enables APIKEY authentication | - | ❌ |
| `EMBEDDER_BASEURL` | Access address of vector embedding model | - | ✅ |
| `EMBEDDER_MODEL` | Name of vector embedding model | - | ✅ |
| `EMBEDDER_APIKEY` | APIKEY of vector embedding model, required if the model enables APIKEY authentication | - | ❌ |
| `RERANKER_BASEURL` | Access address of rerank model | - | ✅ |
| `RERANKER_MODEL` | Name of rerank model | - | ✅ |
| `RERANKER_APIKEY` | APIKEY of rerank model, required if the model enables APIKEY authentication | - | ❌ |

**Note**: Code completion, vector embedding, and rerank models are for internal use by CoStrict only and will not appear in the user-selectable model list.

### 3. Prepare Backend Service Images

CoStrict backend images are mainly stored in the docker hub image repository docker.io/zgsm.

Before deployment, you need to ensure that the images required for backend deployment can be pulled from the image repository normally.

The images required by CoStrict backend can be found in the scripts/newest-images.list file for a complete list.

You can get this list file from the cloud with the following command.

```bash
bash scripts/get-images-list.sh -o scripts
```

The deployment script will automatically pull all images required for backend deployment during the deployment process.

However, if the deployment server cannot access the docker hub image repository, you need to download the images in advance and save them to the specified directory of the deployment machine (assuming saved in /root/images). Then run the following command to preload them.

```bash
bash scripts/load-images.sh -l /root/images
```

In addition to pulling and exporting image files from the docker image repository, you can also download all image files required for CoStrict backend deployment from Baidu Netdisk.

Netdisk address:

```
https://pan.baidu.com/s/12kP5VyQinFNrXFsKEWFGJw?pwd=k2dh
```

### 4. Service Deployment

**Note**: Before executing the `automated deployment script` below, please ensure that **checklist items in sections 1.1~2.2 of the [Deployment Checklist](./deploy-checklist.md) have been completed**.

Execute the automated deployment script:

```bash
bash deploy.sh
```

The deployment process includes the following steps:

1. Environment check and dependency verification
2. Docker image pulling and building
3. Database initialization
4. Service container startup
5. Health check and status verification

## Service Configuration

### AI Gateway Configuration (Higress)

After deployment, access the Higress console at the following address to configure the `chat` and `code review` models:

```
http://{COSTRICT_BACKEND}:{PORT_HIGRESS_CONTROL}
```

**Default admin username and password** (please change it after login):

```
Username: admin
Password: test123
```

Configuration steps:
1. Access the Higress management interface
2. Configure upstream LLM service providers
3. Set routing rules and load balancing strategies
4. Configure rate limiting and security policies

Detailed configuration guide: [Higress Configuration Document](./higress.md)

### Optional: Identity Authentication System Configuration (Casdoor)

Access the Casdoor management interface at the following address:

```
http://{COSTRICT_BACKEND}:{PORT_CASDOOR}
```

**Test Account** (for development and testing environments only):
```
Username: demo
Password: test123
```

Configuration features:
- User management and permission control
- Third-party identity provider integration (OIDC/SAML)
- Multi-factor authentication (MFA)
- Session management and security policies

Detailed configuration guide: [Casdoor Configuration Document](./casdoor.md)

## Client Integration

### CoStrict Plugin Configuration

1. Install the CoStrict VSCode extension
2. Open the "Provider" page in the extension settings
3. Select the API provider as "CoStrict"
4. Configure the backend service address:
   ```
   CoStrict Base URL: {COSTRICT_BACKEND_BASEURL}
   ```
5. Click "Login CoStrict" to complete authentication

Detailed installation guide: [CoStrict Download and Installation Documentation](https://costrict.ai/download) (includes `VSCode` and `JetBrains` IDE)

**Service Access Address**:
```
Default backend entry: http://{COSTRICT_BACKEND}:{PORT_APISIX_ENTRY}
```

### Domain Binding and Load Balancing

For production environments, it is recommended to access services through reverse proxy or load balancer:

```bash
# Nginx configuration example
upstream costrict_backend {
    server {COSTRICT_BACKEND}:{PORT_APISIX_ENTRY};
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://costrict_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Operations Management

### Service Status Monitoring

Check service running status:

```bash
# View all service status
docker-compose ps

# View service logs
docker-compose logs -f [service_name]

# View resource usage
docker stats
```

### Data Backup and Recovery

```bash
# Database backup
bash ./scripts/backup.sh

# Database recovery
bash ./scripts/restore.sh [backup_file]
```

### Service Scaling

```bash
# Scale service instances
docker-compose up -d --scale chatgpt=3

# Update service configuration
docker-compose up -d --force-recreate [service_name]
```

## Troubleshooting

### Common Issues

**1. Container startup failure**
```bash
# Check port occupancy
netstat -tlnp | grep {port}

# Check disk space
df -h

# View detailed error logs
docker-compose logs [service_name]
```

**2. Network connection issues**
```bash
# Test service connectivity
curl -v http://{COSTRICT_BACKEND}:{PORT_APISIX_ENTRY}/health

# Check Docker network
docker network ls
docker network inspect {network_name}
```

**3. Database connection issues**
```bash
# Check database service status
docker-compose exec postgres pg_isready

# View database logs
docker-compose logs postgres
```

### Log Collection

System log locations:
- Application logs: `./logs/`
- Database logs: `/var/log/postgresql/` inside container
- Gateway logs: `/var/log/apisix/` inside container

## Security Notes

1. **Production Environment Deployment**:
   - Change all default passwords
   - Configure HTTPS certificates
   - Enable firewall and access control
   - Regularly update systems and dependencies

2. **Network Security**:
   - Only open necessary ports
   - Configure VPN or intranet access
   - Enable API rate limiting and protection

3. **Data Protection**:
   - Regularly backup important data
   - Enable database encryption
   - Configure access audit logs

---

**CoStrict** - Let AI power your code development journey