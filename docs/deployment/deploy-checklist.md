---
sidebar_position: 3
---

# Deployment Checklist

Used for checking and verifying the preparation before deployment, configuration during deployment, and functionality after deployment in the CoStrict backend service deployment process.

## I. Pre-Deployment

### 1.1 Models

#### 1.1.1 Model GPU Resources (Recommended)

- **Chat Model**: `4 * H20` or `4 * RTX4090`
- **Code Review Model**: `2 * H20` or `2 * RTX4090`
- **Completion Model**: `1 * H20` or `1 * RTX4090`
- **Embedding Model**: `0.5 * H20` or `0.5 * RTX4090`
- **Rerank Model**: `0.5 * H20` or `0.5 * RTX4090`

#### 1.1.2 Model List (Recommended)

- **Chat Model**: `GLM-4.5-FP8`, `GLM-4.5-106B-A12B-FP8`
- **Code Review Model**: `Qwen2.5-Coder-32B-Instruct`
- **Completion Model**: `DeepSeek-Coder-V2-Lite-Base`
- **Embedding Model**: `gte-modernbert-baseRAG/Embedding`
- **Rerank Model**: `gte-reranker-modernbert-baseRAG/Rerank`

**Note**: Confirm and record the model `NAMES`, `APIKEYs`, and `CONTEXT LENGTHS` are accurate.

#### 1.1.3 Checks

- [ ] **GPU Resource Check**

  ```bash
  # Provided by the model deployment party (AICP or User)
  ```

- [ ] **Model Interfaces**
  
  - [ ] **Chat Model**: `/v1/chat/completions` interface
  - [ ] **Code Review Model**: `/v1/chat/completions` interface
  - [ ] **Completion Model**: `/v1/completions` interface
  - [ ] **Embedding Model**: `/v1/embeddings` interface
  - [ ] **Rerank Model**: `/v1/embeddings` interface

### 1.2 Backend Server

#### 1.2.1 Hardware Requirements

- **CPU**: Intel x64 architecture, minimum 16 cores
- **Memory**: Minimum 32GB RAM
- **Storage**: Minimum 512GB available storage space

#### 1.2.2 Software Requirements

- **Operating System**: CentOS 7+ or Ubuntu 18.04+
- **Container Runtime**: Docker 20.10+
- **Orchestration Tool**: Docker Compose 2.0+
- **Git**: Not required if obtaining [Deployment Project](https://github.com/zgsm-ai/zgsm-backend-deploy) offline

#### 1.2.3 Checks

- [ ] **Check CPU**

  ```bash
  lscpu
  ```

- [ ] **Check Memory**

  ```bash
  free -h
  ```

- [ ] **Check Storage**

  ```bash
  df -h
  ```

- [ ] **Check Operating System**

  ```bash
  cat /etc/os-release
  ```

- [ ] **Check Docker, Docker Compose**

  ```bash
  docker --version
  systemctl status docker
  docker-compose --version
  ```

### 1.3 Backend Services

#### 1.3.1 Deployment Project

Project URL: https://github.com/zgsm-ai/zgsm-backend-deploy

Project storage path: `/opt/zgsm-backend-deploy`

#### 1.3.2 Service Port Requirements

Local port list: `/opt/zgsm-backend-deploy/configure.sh`

Online port list: https://github.com/zgsm-ai/zgsm-backend-deploy/blob/main/configure.sh

- Port list: Lines `6~34`

#### 1.3.3 Checks

- [ ] **Project Check**

  ```bash
  ls /opt/zgsm-backend-deploy
  ```

- [ ] **Port Check**

  ```bash
  sudo ss -tlnp | grep -E ':(9180|9080|9091|9092|9093|2382|6379|5432|5003|9081|5000|8765|5001|9090|3000|9200|8080|8001|9001|5173|9003|9004|9005|9006|9007|9008|9009|9010|9011) '
  ```

## II. During Deployment

### 2.1 Startup Configuration

#### 2.1.1 Model Configuration

Local model configuration list: `/opt/zgsm-backend-deploy/configure.sh`

- Large model configuration: Lines `71~100`

#### 2.1.2 Backend Address Configuration

Local backend address configuration list: `/opt/zgsm-backend-deploy/configure.sh`

- Backend address configuration: Line `143`

#### 2.1.3 Checks

- [ ] **Check if file exists**

  ```bash
  ls -l /opt/zgsm-backend-deploy | grep configure.sh
  ```

- [ ] **View configuration file**

  ```bash
  cat /opt/zgsm-backend-deploy/configure.sh
  ```

### 2.2 Backend Images

Local image list: `/opt/zgsm-backend-deploy/scripts/newest-images.list`

Online image list: https://github.com/zgsm-ai/zgsm-backend-deploy/blob/main/scripts/newest-images.list

#### 2.2.1 Checks

- [ ] **Image Check**

  ```bash
  bash /opt/zgsm-backend-deploy/docker-download-images.sh
  ```

### 2.3 Execute Script

Execution script: `/opt/zgsm-backend-deploy/deploy.sh`

#### 2.3.1 Checks

- [ ] **Check if file exists and has executable permissions**

  ```bash
  ls -l /opt/zgsm-backend-deploy | grep deploy.sh
  ```

### 2.4 Service Configuration

#### 2.4.1 AI Gateway Configuration

Local AI gateway configuration: `/opt/zgsm-backend-deploy/docs/higress.zh-CN.md`

#### 2.4.2 Checks

- [ ] **AI Gateway Configuration**

  ```bash
  1. Access Higress page via browser
  http://{COSTRICT_BACKEND}:{PORT_HIGRESS_CONTROL}
  
  2. Check "AI Traffic Entry Management -> AI Service Provider Management" page
  
  3. Check "AI Traffic Entry Management -> AI Route Management" page
  
  4. Check "Plugin Configuration -> AI Quota Management" configuration
  ```

## III. Post-Deployment

### 3.1 Service Checks

#### 3.1.1 Backend Service Operation

Local service image list: `/opt/zgsm-backend-deploy/scripts/newest-images.list`

Online service image list: https://github.com/zgsm-ai/zgsm-backend-deploy/blob/main/scripts/newest-images.list

#### 3.1.2 Service Connectivity

apisix gateway service probe interface: http://\{COSTRICT_BACKEND\}:\{PORT_APISIX_ENTRY\}/health

#### 3.1.3 Checks

- [ ] **Backend Service Operation Check**

  ```bash
  docker ps
  ```

- [ ] **Backend Service Gateway Connectivity Check**

  ```bash
  curl -v http://{COSTRICT_BACKEND}:{PORT_APISIX_ENTRY}/health
  ```

### 3.2 Functionality Testing

#### 3.2.1 Login

Login Baseurl: \{COSTRICT_BACKEND_BASEURL\}

#### 3.2.2 Agent Mode

- Ask
- Code
- Architect
- Debug
- Orchestrator

#### 3.2.3 CodeReview

- File
- Directory
- Project

#### 3.2.4 Completion

- Code completion
- Text completion

#### 3.2.5 Checks

- [ ] **Login Function Verification**
- [ ] **Agent Model Function Verification**

  ````
  # Code
  ```
  In the current project, add a test.go file and implement a quick sort algorithm function
  ```
  
  # Ask
  ```
  Read the current project and provide a description of the main functions
  ```
  
  # Architect
  ```
  Based on the content of the @test.go file, design a complete sorting algorithm
  ```
  
  # Debug
  ```
  Check the content in the @test.go file to determine if the sorting logic is in descending order
  ```
  
  # Orchestrator
  ```
  Check the content in the @test.go file:
  1. Determine if all sorting algorithms exist, if not, design and implement complete sorting algorithms;
  2. Additionally, determine if all sorting algorithms are implemented in descending order, if not, adjust the code logic to implement descending order and modify the corresponding design documents
  ```
  ````

- [ ] **CodeReview Function Verification**
- [ ] **Completion Function Verification**

### 3.3 Log Checks

#### 3.3.1 Service List

Local service image list: `/root/zgsm-backend-deploy/scripts/newest-images.list`

Online service image list: https://github.com/zgsm-ai/zgsm-backend-deploy/blob/main/scripts/newest-images.list

#### 3.3.2 Checks

- [ ] **Service Log Check**

  ```bash
  docker-compose logs [service_name]
  ```