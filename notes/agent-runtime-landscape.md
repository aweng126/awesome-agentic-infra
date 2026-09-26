# Agent Runtime 全景：开源框架与云厂商产品

Agent Runtime 生态涵盖用于编写和组织 Agent 行为的开源框架，以及承载 Agent 应用的云端产品。本文汇总代表性方案，帮助读者了解有哪些项目、由谁维护、各自提供什么，以及从哪里继续阅读。

开源框架主要提供 Agent 开发与编排能力；云厂商产品主要提供构建、部署、运行和管理服务。两者可以配合使用：一个开源框架可以接入多个云平台，同一厂商也可能同时提供开源工具包和托管产品。下面按这两种形态组织清单。

## 开源框架与项目

这一组面向开发者，提供构建 Agent 应用所需的代码组件。既有专注流程编排的框架，也有覆盖工具接入、多 Agent 协作和应用服务的开发工具包。

| 项目 | 维护方 | 一句话定位 | 主要特点 | 官方入口 |
| --- | --- | --- | --- | --- |
| [LangGraph](../resources/runtime-and-orchestration.md#resource-langgraph) | LangChain 团队与社区 | 面向长期、有状态 Agent 的编排框架 | 图式流程、状态管理、人工介入；可独立使用或结合 LangChain 生态 | [文档](https://docs.langchain.com/oss/python/langgraph/overview) · [仓库](https://github.com/langchain-ai/langgraph) |
| [Google ADK](../resources/runtime-and-orchestration.md#resource-google-adk) | Google 团队与社区 | 覆盖 Agent 构建、评估与部署的开发工具包 | 多 Agent 与工作流、工具集成、开发调试界面；支持多种模型与部署环境 | [文档](https://adk.dev/) · [仓库](https://github.com/google/adk-python) |
| [Microsoft Agent Framework](../resources/runtime-and-orchestration.md#resource-microsoft-agent-framework) | Microsoft 团队与社区 | 用于构建 Agent 和多 Agent 工作流的框架 | 多模型接入、顺序与并发等编排方式、开发工具和观测集成 | [文档](https://learn.microsoft.com/en-us/agent-framework/overview/) · [仓库](https://github.com/microsoft/agent-framework) |
| [Strands Agents](../resources/runtime-and-orchestration.md#resource-strands-agents) | Strands 项目团队与社区 | 以模型驱动执行为中心的 Agent SDK | 多模型供应商、工具与 MCP 接入、多 Agent 协作；提供 Python 与 TypeScript SDK | [文档](https://strandsagents.com/) · [仓库](https://github.com/strands-agents/harness-sdk) |
| [AgentScope 2.0](../resources/runtime-and-orchestration.md#resource-agentscope) | AgentScope 项目团队与社区 | 从 Agent 编程组件延伸到应用服务的开发框架 | 模型与工具组件、多 Agent 协作、Web UI 与多会话应用服务 | [仓库与文档](https://github.com/agentscope-ai/agentscope) |
| [VeADK](../resources/runtime-and-orchestration.md#resource-veadk) | 火山引擎团队与社区 | 集成火山引擎能力的 Agent 开发工具包 | Agent 代码开发、模型与工具集成、Web UI、AgentKit 接入 | [仓库与文档](https://github.com/volcengine/veadk-python) |
| [Cloudflare Agents](../resources/runtime-and-orchestration.md#resource-cloudflare-agents) | Cloudflare 团队与社区 | 在 Cloudflare 平台构建有状态 Agent 的开源 SDK | 状态管理、实时通信、任务调度、模型与 MCP 集成 | [文档](https://developers.cloudflare.com/agents/) · [仓库](https://github.com/cloudflare/agents) |

旧 [AgentScope Runtime](https://github.com/agentscope-ai/agentscope-runtime) 的能力已整合进 AgentScope 2.0，因此这里作为一个项目介绍。

## 云厂商产品

这一组按厂商列出与 Agent 运行相关的产品。其中既有专门的运行托管服务，也有覆盖构建、运行与治理的平台；“产品定位”用于说明各自的覆盖范围。

| 云厂商 | 产品 | 产品定位 | 主要能力 | 官方入口 |
| --- | --- | --- | --- | --- |
| 阿里云 | [AgentCore](../resources/deployment-and-scheduling.md#resource-alibaba-cloud-agentcore) | 智能体构建与治理平台 | 多种构建方式、已有 Agent 接入、模型与工具集成、团队协作和运行管理 | [产品概述](https://help.aliyun.com/zh/agentcore/agentcore-product-overview) |
| 阿里云 | [AgentRun](../resources/deployment-and-scheduling.md#resource-alibaba-cloud-agentrun) | Serverless Agent 基础设施平台 | Agent 托管、沙箱、模型治理、工具管理与观测集成 | [产品概述](https://help.aliyun.com/zh/agentrun/what-is-agentrun) |
| 火山引擎（字节跳动） | [AgentKit Runtime](../resources/deployment-and-scheduling.md#resource-volcengine-agentkit-runtime) | AgentKit 中的 Agent 运行托管服务 | 多框架接入、代码包或镜像部署、弹性伸缩、会话服务配套 | [Runtime 概述](https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh) |
| AWS | [Amazon Bedrock AgentCore Runtime](../resources/deployment-and-scheduling.md#resource-amazon-bedrock-agentcore-runtime) | AgentCore 中的 Agent 与工具托管服务 | 多框架与多模型支持、长任务运行、会话隔离、身份与观测集成 | [Runtime 概述](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) |
| Google Cloud | [Agent Runtime](../resources/deployment-and-scheduling.md#resource-google-cloud-agent-runtime) | Gemini Enterprise Agent Platform 中的托管运行服务 | ADK 等框架接入、部署与伸缩、观测，以及配套的会话与记忆服务 | [产品与组件概览](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale) |
| Microsoft Azure | [Foundry Hosted Agents](../resources/deployment-and-scheduling.md#resource-microsoft-foundry-hosted-agents) | Foundry Agent Service 中的自定义代码托管服务 | 自带代码与框架部署、弹性运行、身份管理、工具与 Azure 服务集成 | [产品概述](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) |
| 腾讯云 | [Agent Runtime](../resources/deployment-and-scheduling.md#resource-tencent-cloud-agent-runtime) | Agent 运行基础设施平台 | 弹性部署、会话管理、沙箱；其中 Deployment 处于 Beta 阶段 | [平台概述](https://cloud.tencent.com/document/product/1814/129423) · [Deployment](https://cloud.tencent.com/document/product/1814/137850) |
| Cloudflare | Workers（配合 Agents SDK） | 前述 Cloudflare Agents 的云端运行平台 | 托管运行、Durable Objects 状态服务、实时连接与任务调度 | [Agents 平台文档](https://developers.cloudflare.com/agents/) |

几个容易混淆的名称与对应关系：

- **阿里云 AgentCore 与 AWS AgentCore** 是两家厂商各自的产品；阿里云的 AgentCore 与 AgentRun 也按各自定位分别列出。
- **VeADK 与 AgentKit Runtime** 分别对应开发工具包和云端运行服务；Cloudflare Agents 与 Workers 也分别出现在开发工具和运行平台的位置。
- **Google Cloud Agent Runtime** 的旧名称是 Vertex AI Agent Engine，查阅旧资料时可能仍会遇到该名称，见 [官方更名记录](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)。

## 参考清单与延伸阅读

以下两个社区清单可用于继续发现 Agent 基础设施与 Runtime 相关项目：

- [Awesome Agent Infrastructure](https://github.com/backblaze-labs/awesome-agent-infrastructure)
- [Awesome Agent Runtime](https://github.com/sandbaseai/awesome-agent-runtime)

本篇归属于 [运行时与编排](../resources/runtime-and-orchestration.md)，云端产品的资源索引在 [部署与调度](../resources/deployment-and-scheduling.md)。进一步阅读：

- **相关基础组件**：[Temporal](../resources/runtime-and-orchestration.md#resource-temporal) 是持久工作流平台，其官方 [AI 应用文档](https://docs.temporal.io/ai) 提供 Agent 集成入口。
- **机制专题**：[任务失败后如何恢复](task-recovery-and-side-effects.md)，讨论检查点、重试与外部副作用。

[返回笔记索引](README.md) · [返回首页](../README.md)
