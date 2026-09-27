---
name: Docker Sandboxes
summary: 面向 AI 编码 Agent 的沙箱产品，通过 sbx CLI 管理本地或 Docker 托管云端环境；本地采用 microVM 与独立 Docker daemon，支持工作目录接入、网络策略和环境留存，云端另提供 API 与 SDK。
type: project
topic: sandbox-and-execution
aliases: ["Docker Sandbox", "Docker 沙箱", "Docker 沙盒", "sbx"]
keywords: ["沙箱", "沙盒", "microVM", "编码 Agent", "本地执行", "云沙箱", "工作目录", "网络策略", "凭证注入"]
role: sandbox-service
delivery: hybrid
url: https://docs.docker.com/ai/sandboxes/
anchor: resource-docker-sandboxes
order: 9
links:
  - label: 产品文档
    url: https://docs.docker.com/ai/sandboxes/
  - label: 安装指南
    url: https://docs.docker.com/ai/sandboxes/install/
  - label: 本地快速开始
    url: https://docs.docker.com/ai/sandboxes/get-started/
  - label: 云端快速开始
    url: https://docs.docker.com/ai/sandboxes/cloud/
  - label: 云端 API 与 SDK
    url: https://docs.docker.com/ai/sandboxes-api/
maintainer: Docker
form: 本地 Agent 沙箱工具与云端托管沙箱服务
status:
  label: 云端 API 与 SDK 标记为实验性
  source: https://docs.docker.com/ai/sandboxes-api/
  checked: '2026-09-27'
reviewedAt: '2026-09-27'
---

## 背景与目标

Docker Sandboxes 为 AI 编码 Agent 提供专用执行环境，让 Agent 在其中安装依赖、修改项目和运行开发工具。产品包含本地沙箱与 Docker 托管云端沙箱，两者通过 `sbx` CLI 创建和管理；应用也可以通过 API 或 SDK 接入云端环境。[产品概览](https://docs.docker.com/ai/sandboxes/)

## 核心能力

- **本地 microVM 执行**：每个本地沙箱拥有独立的 Docker daemon、文件系统与网络环境，Agent 可以在其中构建镜像和运行容器。[本地快速开始](https://docs.docker.com/ai/sandboxes/get-started/)
- **项目文件接入**：本地环境支持直接挂载工作目录，或使用私有 Git 克隆开展任务。直接挂载时，Agent 的修改会反映到宿主项目文件中。[工作目录与存储](https://docs.docker.com/ai/sandboxes/architecture/)
- **网络与凭证管理**：本地沙箱的出站 TCP 流量经过宿主侧代理执行网络策略，HTTP／HTTPS 代理还可在请求离开沙箱后注入凭证。[网络架构](https://docs.docker.com/ai/sandboxes/architecture/)
- **云端程序化接入**：REST API 和 TypeScript SDK 提供环境创建、命令执行、文件传输，以及镜像、快照和卷等资源的管理接口。[API 与 SDK](https://docs.docker.com/ai/sandboxes-api/)

## 核心概念与工作方式

本地工作流由 `sbx` 启动沙箱及所选 Agent，执行过程使用沙箱内部的 [Docker Engine](docker-engine.md) 管理容器。本地沙箱停止后仍保留已安装软件、Docker 镜像和内部文件，可在后续任务中继续使用；删除沙箱时移除这些内部状态。[生命周期与架构](https://docs.docker.com/ai/sandboxes/architecture/)

云端模式把受支持的命令交给 Docker 管理的基础设施执行。本地与云端分别维护凭证、网络策略和环境状态，云端无法直接挂载本机目录；文件需传入云端或在沙箱中克隆仓库，生命周期按云端的过期设置管理。[本地与云端的区别](https://docs.docker.com/ai/sandboxes/cloud/local-vs-cloud/)

## 使用场景与接入方式

本地模式适合编码 Agent 修改项目、运行测试或构建容器；安装 `sbx`、登录 Docker 并配置 Agent 的认证方式后即可创建环境。CLI 可独立安装，使用它不要求预先安装 Docker Desktop 或 Docker Engine；运行本地沙箱需满足操作系统和虚拟化要求。[安装指南](https://docs.docker.com/ai/sandboxes/install/)

需要远程执行任务时，可开通 Docker Agentic Platform 的云端访问，再通过 `sbx --cloud`、REST API 或 TypeScript SDK 接入。官方将 CLI 云模式及云端 API／SDK 标记为实验性，具体可用接口与本地能力分别维护。[云端入门](https://docs.docker.com/ai/sandboxes/cloud/) · [API 与 SDK](https://docs.docker.com/ai/sandboxes-api/)
