---
name: 火山引擎 AgentKit Runtime
summary: 托管 Agent 代码或镜像的 Serverless 运行环境，与 VeADK 集成并支持其他主流 Python Agent 框架，提供版本发布、实例伸缩、访问控制及会话与观测组件接入。
type: project
topic: deployment-and-scheduling
aliases: ["AgentKit Runtime", "Volcengine AgentKit Runtime", "字节 AgentKit"]
keywords: ["字节跳动", "火山引擎", "Serverless", "托管运行时", "VeADK", "会话服务"]
role: hosted-runtime
delivery: managed
url: https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh
anchor: resource-volcengine-agentkit-runtime
order: 11
links:
  - label: 产品文档
    url: https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh
  - label: SDK 概览
    url: https://docs.volcengine.com/docs/agentkit/SDK_overview?lang=zh
  - label: SDK 快速开始
    url: https://docs.volcengine.com/docs/agentkit/Runtime_SDK?lang=zh
  - label: 平台组件
    url: https://docs.volcengine.com/docs/agentkit/Product_features?lang=zh
maintainer: 火山引擎
form: AgentKit 平台的 Serverless Agent 托管运行服务
---

## 背景与目标

AgentKit Runtime 是火山引擎 AgentKit 中负责部署与运行 Agent 的组件。开发者提供代码或镜像及其配置，平台提供调用入口、运行实例和发布管理，将本地开发的 Agent 转为在线服务。它在本仓库归入部署与调度，与负责应用开发的 [VeADK](veadk.md) 分开介绍。参见 [运行时概述](https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh)。

## 核心能力

- **托管与伸缩**：按业务请求管理运行实例，也可配置常驻容量。
- **框架接入**：与 VeADK 集成，并可托管经过接口适配的其他 Python Agent 应用。
- **权限与观测**：配置运行时身份和访问规则，查看日志、指标与调用链。
- **平台组合**：按需关联会话、记忆、知识库和工具组件，为应用提供配套能力。

Runtime 负责运行应用，模型推理由火山方舟或其他模型服务提供；会话与长期记忆也由各自组件管理。组件范围见 [平台功能说明](https://docs.volcengine.com/docs/agentkit/Product_features?lang=zh)。

## 核心概念与工作方式

Runtime 是部署与版本管理单元，实例是实际执行代码的环境。应用通过标准服务接口接收请求，在业务代码中调用模型和工具，再把结果返回客户端。

AgentKit SDK 提供多种应用封装：常规 Agent 可使用 `AgentkitSimpleApp`，将函数注册为调用入口并定义健康检查；工具服务和 Agent 互联还可使用 MCP、A2A 对应的封装。SDK 也提供平台资源客户端及 OpenTelemetry 接入，见 [SDK 概览](https://docs.volcengine.com/docs/agentkit/SDK_overview?lang=zh)。

## 使用场景与接入方式

适合需要在火山引擎部署 VeADK 应用，或希望为已有 Python Agent 接入托管运行环境的团队。可以先使用 CLI 模板创建项目，在本地验证调用和流式响应，再将代码或镜像部署到 Runtime，配置模型连接、环境变量和访问权限。

官方 [SDK 快速开始](https://docs.volcengine.com/docs/agentkit/Runtime_SDK?lang=zh) 展示了用 VeADK 编写 Agent、由 AgentKit SDK 封装服务的接入过程。长期会话、记忆或知识检索需要在应用中接入相应组件；关联资源后，具体调用流程仍由应用代码组织。
