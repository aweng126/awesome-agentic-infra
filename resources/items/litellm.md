---
name: LiteLLM
summary: 多模型服务接入 SDK 与网关，为 Agent 提供统一的模型访问层，支持路由、重试、回退和用量跟踪。
type: project
topic: inference-and-model-serving
aliases: ["LiteLLM Proxy"]
keywords: ["模型网关", "模型路由", "多模型", "重试回退", "虚拟密钥", "用量统计"]
role: model-gateway
delivery: self-hosted
url: https://github.com/BerriAI/litellm
anchor: resource-litellm
order: 2
links:
  - label: 官网
    url: https://www.litellm.ai/
  - label: 代码仓库
    url: https://github.com/BerriAI/litellm
  - label: 文档
    url: https://docs.litellm.ai/docs/
  - label: 网关快速开始
    url: https://docs.litellm.ai/docs/proxy/quick_start
  - label: 许可说明
    url: https://github.com/BerriAI/litellm/blob/main/LICENSE
maintainer: BerriAI 与 LiteLLM 社区
form: 开源多模型 SDK 与 AI 网关；另有企业功能
license: 核心 MIT；enterprise 目录采用单独许可
---

## 背景与目标

LiteLLM 面向应用需要同时接入多个模型服务商的情况，将不同提供方的请求格式、认证和错误处理封装到统一接口。开发者既可以在程序内使用 Python SDK，也可以部署集中式网关，让多个 Agent 应用共用模型入口和访问配置。[官方介绍](https://github.com/BerriAI/litellm)

## 核心能力

- **多模型接入**：通过统一调用接口访问云模型与兼容的自建模型端点，覆盖聊天、嵌入等多种请求类型。[SDK 文档](https://docs.litellm.ai/docs/)
- **路由与回退**：为同一逻辑模型配置多个实际部署，并使用负载均衡、重试、冷却和失败回退策略。[Router](https://docs.litellm.ai/docs/routing)
- **集中访问管理**：网关提供虚拟密钥、用量跟踪和日志等能力，供团队统一管理模型调用入口。[网关概览](https://github.com/BerriAI/litellm#what-is-litellm)

## 核心概念与工作方式

SDK 直接嵌入应用，将统一参数转换为目标提供方的调用；Proxy Server 作为独立服务接收请求，再根据配置转发到上游。网关使用模型名称映射具体服务部署，调用方可以面向稳定的名称发起请求，上游连接与凭据则由网关配置维护。[使用方式](https://docs.litellm.ai/docs/)

Router 将逻辑模型与一组实际部署关联，根据选定策略分配流量。重试和回退处理的是模型请求层的调用失败；模型权重的加载与计算仍发生在上游服务中。它在 Agent 基础设施中的主要位置是模型访问与治理入口。[路由说明](https://docs.litellm.ai/docs/routing)

## 使用场景与接入方式

LiteLLM 适合跨模型服务商开发、集中提供模型 API、为不同团队统计用量，以及为应用配置备用模型端点。可以先通过 SDK 替换应用中的模型调用，也可以部署网关后，将兼容客户端的服务地址指向网关。[网关入门](https://docs.litellm.ai/docs/proxy/quick_start)

项目同时提供开源代码和企业功能。仓库许可证明确区分：核心代码采用 MIT，`enterprise/` 目录采用单独许可。部署时应结合实际需要的认证、管理和支持功能，查看相应版本的功能与授权范围。[许可说明](https://github.com/BerriAI/litellm/blob/main/LICENSE)
