---
name: Google Cloud Agent Runtime
summary: Gemini Enterprise Agent Platform 的托管运行服务，原称 Vertex AI Agent Engine，可部署 ADK、LangGraph 等框架及自定义 Agent，提供伸缩、身份和网络接入，并与 Sessions、Memory Bank 配合使用。
type: project
topic: deployment-and-scheduling
url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale
anchor: resource-google-cloud-agent-runtime
order: 6
links:
  - label: 产品文档
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale
  - label: 部署指南
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent
  - label: 版本与流量管理
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic
  - label: 发布说明
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes
maintainer: Google Cloud
form: Gemini Enterprise Agent Platform 的托管运行服务
status:
  label: Agent Engine 已更名为 Agent Runtime
  source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes
  checked: '2026-09-27'
---

## 背景与目标

Agent Runtime 是 Google Cloud 为 Agent 应用提供的托管执行服务，负责将开发完成的应用部署到云上并管理运行资源。它属于 Gemini Enterprise Agent Platform，原名 Agent Engine；名称变化见 [官方发布说明](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)。

它面向需要保留自有 Agent 代码、同时希望使用云端伸缩和运维能力的开发者。在本仓库中，它位于部署与调度主题，与用于编写 Agent 的 [Google ADK](google-adk.md) 分开介绍。

## 核心能力

- **托管多种框架**：支持 ADK、LangGraph 等框架构建的应用，以及符合运行接口的自定义 Agent。
- **部署与发布**：提供多种部署方式；版本与版本间流量管理当前为预览功能。
- **云资源接入**：通过 Agent 身份、服务账号与网络配置管理应用访问。
- **运行观测**：连接 Cloud Logging、Cloud Trace 和监控指标，查看调用与资源使用情况。

平台另外提供 Sessions、Memory Bank 和沙箱等服务，可与运行时组合使用。各组件的职责与入口见 [平台概览](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale)。

## 核心概念与工作方式

Agent 应用包含业务代码及依赖，部署后成为可被远程调用的 Runtime 资源。开发者可按项目形态选择源代码、Dockerfile 或已构建的容器镜像等路径；容器部署需要满足平台的运行接口约定。具体差异见 [部署指南](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)。

Revision 记录一次运行版本的配置。预览中的版本管理功能支持查看历史并调整流量比例，便于逐步发布与回退。Sessions 管理对话状态，Memory Bank 管理长期记忆，二者与部署资源承担不同职责。版本操作及功能状态见 [版本与流量管理](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic)。

## 使用场景与接入方式

适合已使用 Google Cloud、准备将 ADK 或其他框架应用发布为在线服务的团队，也适合需要自定义容器环境的 Agent。通常先完成本地运行，再准备云项目、权限与依赖，按部署指南创建 Runtime，通过客户端调用已部署的 Agent，并接入观测服务。

阅读时可将它与 Google ADK 配合理解：ADK 提供应用开发抽象，Agent Runtime 提供云端部署载体；模型推理由相应模型服务承担。
