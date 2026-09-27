---
name: Amazon Bedrock AgentCore Runtime
summary: AWS 的 Agent 与工具托管环境，支持多种框架、长时间运行的会话、microVM 和实例计算类型，提供按需资源供给与文件系统持久化。其中 microVM 的托管会话存储处于 Preview 阶段。
type: project
topic: deployment-and-scheduling
url: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html
anchor: resource-amazon-bedrock-agentcore-runtime
order: 4
links:
  - label: 官网
    url: https://aws.amazon.com/bedrock/agentcore/
  - label: 文档
    url: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html
  - label: 快速开始
    url: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-getting-started.html
  - label: 发布记录
    url: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html
maintainer: Amazon Web Services
form: 托管云服务
status:
  label: Runtime 正式可用（GA）
  source: https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available/
  checked: 2026-09-27
---

## 背景与目标

Amazon Bedrock AgentCore Runtime 是 AWS 提供的 Agent 与工具托管环境，面向把本地 Agent 代码部署为可调用服务的需求。它支持 LangGraph、Strands 等框架，也接受自定义 Agent；模型可以来自 Amazon Bedrock 或其他提供方。Runtime 主要承担执行环境和会话托管，应用继续决定 Agent 的业务逻辑。[产品概览](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html)

## 核心能力

- **运行托管**：部署 Agent 或工具服务，提供调用入口，并管理运行资源和会话生命周期。
- **多种通信方式**：支持 HTTP、WebSocket，以及 MCP、A2A 等 Agent 和工具协议。
- **身份与观测集成**：可结合 AgentCore Identity 管理访问身份，并接入日志、指标和执行追踪。[Runtime 能力](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html)
- **文件持久化**：按计算类型配置会话存储、实例卷或外部文件系统；其中 microVM 的托管会话存储仍为 Preview。[存储说明](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-filesystem-configurations.html)

## 核心概念与工作方式

Agent Runtime 保存已部署应用的配置，Version 标识具体部署版本，Endpoint 为调用方提供可指向版本的入口。应用请求通过会话标识关联到相应执行环境，在该会话的生命周期内保持交互上下文。[运行资源与会话](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html)

Runtime 提供两种计算类型。microVM 为会话提供隔离环境，由服务按需管理；Instances 在用户 AWS 账户中的托管 EC2 资源上运行，可支持更长时间的会话、GPU 工作负载和同实例的 Agent 协作。[计算类型说明](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-instances-how-it-works.html)

## 使用场景与接入方式

Runtime 可承载交互式助手、长任务 Agent，以及需要通过 MCP 或 A2A 对外提供能力的服务。开发者需要准备 AWS 账户、执行权限和符合 Runtime 接口约定的应用，再选择代码部署或容器等接入路径。[入门路径](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-getting-started.html)

AgentCore CLI 可以辅助创建项目、准备部署资源并发布应用。完成部署后，通过 Runtime 的调用接口访问 Agent，再按业务需要配置身份、网络和观测能力。[CLI 快速开始](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-get-started-cli.html)
