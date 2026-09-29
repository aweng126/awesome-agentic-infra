# Agent Runtime 全景：框架、Harness、平台与产品

Agent Runtime 生态涵盖开发框架、可以直接使用或集成的 Agent Harness、自托管与云端运行平台，以及将这些能力组合起来的通用与个人 Agent 产品。本文汇总代表性方案，帮助读者了解有哪些项目、由谁维护、各自提供什么，以及从哪里继续阅读。

下面按主要使用方式组织清单：开发框架供开发者组合 Agent 行为；Harness 提供已经组合好的执行系统，包含许多 Coding Agent；运行平台管理工作负载和运行环境；云厂商产品提供托管能力。随后补充协调 Agent 团队的上层协作平台，以及供用户直接委派任务的 Agent 产品。分类之间可能有能力重叠，同一厂商也可能同时提供 SDK、本地产品与云端服务。

## 开源框架与项目

这一组面向开发者，提供构建 Agent 应用所需的代码组件。既有专注流程编排的框架，也有覆盖工具接入、多 Agent 协作和应用服务的开发工具包。

| 项目 | 维护方 | 一句话定位 | 主要特点 | 官方入口 |
| --- | --- | --- | --- | --- |
| [LangGraph](../resources/items/langgraph.md) | LangChain 团队与社区 | 面向长期、有状态 Agent 的编排框架 | 图式流程、状态管理、人工介入；可独立使用或结合 LangChain 生态 | [文档](https://docs.langchain.com/oss/python/langgraph/overview) · [仓库](https://github.com/langchain-ai/langgraph) |
| [Google ADK](../resources/items/google-adk.md) | Google 团队与社区 | 覆盖 Agent 构建、评估与部署的开发工具包 | 多 Agent 与工作流、工具集成、开发调试界面；支持多种模型与部署环境 | [文档](https://adk.dev/) · [仓库](https://github.com/google/adk-python) |
| [Microsoft Agent Framework](../resources/items/microsoft-agent-framework.md) | Microsoft 团队与社区 | 用于构建 Agent 和多 Agent 工作流的框架 | 多模型接入、顺序与并发等编排方式、开发工具和观测集成 | [文档](https://learn.microsoft.com/en-us/agent-framework/overview/) · [仓库](https://github.com/microsoft/agent-framework) |
| [Strands Agents（Harness SDK）](../resources/items/strands-agents.md) | Strands 项目团队与社区 | 用于构建 Agent Harness 的开源 SDK | 执行循环、工具与上下文／会话管理；提供预装配 Strands harness 及 Python／TypeScript SDK | [文档](https://strandsagents.com/docs/user-guide/sdk/) · [仓库](https://github.com/strands-agents/harness-sdk) |
| [AgentScope 2.0](../resources/items/agentscope.md) | AgentScope 项目团队与社区 | 从 Agent 编程组件延伸到应用服务的开发框架 | 模型与工具组件、多 Agent 协作、Web UI 与多会话应用服务 | [仓库与文档](https://github.com/agentscope-ai/agentscope) |
| [VeADK](../resources/items/veadk.md) | 火山引擎团队与社区 | 集成火山引擎能力的 Agent 开发工具包 | Agent 代码开发、模型与工具集成、Web UI、AgentKit 接入 | [仓库与文档](https://github.com/volcengine/veadk-python) |
| [Cloudflare Agents](../resources/items/cloudflare-agents.md) | Cloudflare 团队与社区 | 在 Cloudflare 平台构建有状态 Agent 的开源 SDK | 状态管理、实时通信、任务调度、模型与 MCP 集成 | [文档](https://developers.cloudflare.com/agents/) · [仓库](https://github.com/cloudflare/agents) |

旧 [AgentScope Runtime](https://github.com/agentscope-ai/agentscope-runtime) 的能力已整合进 AgentScope 2.0，因此这里作为一个项目介绍。

## Agent Harness 与 Coding Agent

这一组将模型调用、工具执行、上下文和会话组合成可运行的 Agent 系统。Coding Agent 描述其编程用途；SDK、程序化 CLI 和客户端协议则是复用执行能力的不同方式。表中区分各项目的接入入口，开源范围、产品形态及使用条件见各自介绍。

| 项目 | 维护方 | 一句话定位 | 接入与扩展方式 | 官方入口 |
| --- | --- | --- | --- | --- |
| [Pi](../resources/items/pi.md) | Earendil 与社区 | 可扩展的编程 Harness 与 Agent 组件 | 终端、TypeScript SDK、RPC；会话管理与扩展 | [仓库](https://github.com/earendil-works/pi) · [SDK](https://pi.dev/docs/latest/sdk) |
| [Codex](../resources/items/codex.md) | OpenAI | 支撑 Codex 多种产品入口的执行系统 | 非交互 CLI、SDK、app-server；线程、工具与审批交互 | [平台说明](https://developers.openai.com/blog/codex-as-a-platform) |
| [Claude Agent SDK（Claude Code）](../resources/items/claude-agent-sdk.md) | Anthropic | 在程序中使用 Claude Code 的执行能力 | Python / TypeScript SDK；工具、会话、权限与 Hooks | [SDK 文档](https://code.claude.com/docs/en/agent-sdk/overview) |
| [OpenCode](../resources/items/opencode.md) | OpenCode 团队与社区 | 可嵌入应用的开源编程 Agent | SDK 内嵌运行、客户端接口与插件扩展 | [SDK 文档](https://opencode.ai/v2/docs/build/sdk) |
| [Gemini CLI](../resources/items/gemini-cli.md) | Google 与社区 | 终端中的开源编程 Agent | 交互 CLI、Headless 模式及 JSON / JSONL 输出 | [文档](https://geminicli.com/docs/) |
| [GitHub Copilot SDK](../resources/items/github-copilot.md) | GitHub | 将 Copilot CLI 的 Agent 能力集成到应用 | 多语言 SDK；会话、工具及执行事件 | [SDK 仓库](https://github.com/github/copilot-sdk) |
| [Qwen Code](../resources/items/qwen-code.md) | 阿里巴巴 Qwen 团队与社区 | 面向代码任务的开源 Agent | Headless CLI、SDK、MCP 与编辑器集成 | [仓库](https://github.com/QwenLM/qwen-code) |
| [Kimi Code CLI](../resources/items/kimi-code.md) | 月之暗面 Moonshot AI | 面向终端及编辑器的编程 Agent | 命令行、ACP 与程序化接入 | [仓库](https://github.com/MoonshotAI/kimi-code) |
| [CodeBuddy Code](../resources/items/codebuddy-code.md) | 腾讯 | 可接入研发流程的编程 Agent | Headless CLI、Agent SDK、工具与会话控制 | [CLI 文档](https://www.codebuddy.cn/docs/cli/quickstart) |
| [ZCode](../resources/items/zcode.md) | 智谱 Z.ai | 开源编程 Harness 与多入口工作台 | 桌面、Web 与 CLI；公开运行时源码、插件、MCP 与 Hooks | [仓库](https://github.com/zai-org/ZCode) |
| [TraeCode CLI](../resources/items/trae-code-cli.md) | 字节跳动 TRAE 团队 | 用于终端和自动化流程的编程 Agent | 非交互 `exec`、ACP、插件与 MCP；CLI 2.0 面向企业版旗舰版客户 | [CLI 文档](https://docs.trae.cn/cli_about-trae-code-cli-2) |
| [Muse Code](../resources/items/muse-code.md) | Meta | 面向终端与 CI 的编程 Agent Harness | 本地 CLI、`muse serve` 会话协议、TypeScript / Python SDK；开发者文档处于预览阶段 | [官方文档](https://dev.meta.ai/docs/muse-code) · [SDK 文档](https://meta-models.github.io/muse-code-sdk/next/) |

前述 [Strands Agents](../resources/items/strands-agents.md) 同时提供可组合的 Harness SDK 与预装配 Harness，因此保留在开发框架分组介绍。SDK 是否开源、Agent 在何处运行以及模型如何接入，是需要分别了解的三个方面。

## 开源运行平台

这一组面向需要自行部署和管理 Agent 运行环境的团队，提供任务托管与生命周期管理能力。它们承载开发框架构建的 Agent 应用，由使用方维护运行基础设施。

| 项目 | 维护方 | 一句话定位 | 主要特点 | 官方入口 |
| --- | --- | --- | --- | --- |
| [Google AX](../resources/items/google-ax.md) | Google 团队与社区 | 可自托管的声明式 Agent 工作负载编排平台 | 任务生命周期管理、工作空间准备与模型配置；通过 Kubernetes 上的 Agent Substrate 提供隔离执行 | [仓库](https://github.com/google/ax) · [概念说明](https://github.com/google/ax/blob/main/docs/concepts.md) |

AX 当前接口为 `v1alpha1`，核心概念与规范仍在演进，见 [项目说明](https://github.com/google/ax#ax)。

## 云厂商产品

这一组按厂商列出与 Agent 运行相关的产品。其中既有专门的运行托管服务，也有覆盖构建、运行与治理的平台；“产品定位”用于说明各自的覆盖范围。

| 云厂商 | 产品 | 产品定位 | 主要能力 | 官方入口 |
| --- | --- | --- | --- | --- |
| 阿里云 | [AgentCore](../resources/items/alibaba-cloud-agentcore.md) | 智能体构建与治理平台 | 多种构建方式、已有 Agent 接入、模型与工具集成、团队协作和运行管理 | [产品概述](https://help.aliyun.com/zh/agentcore/agentcore-product-overview) |
| 阿里云 | [AgentRun](../resources/items/alibaba-cloud-agentrun.md) | Serverless Agent 基础设施平台 | Agent 托管、沙箱、模型治理、工具管理与观测集成 | [产品概述](https://help.aliyun.com/zh/agentrun/what-is-agentrun) |
| 火山引擎（字节跳动） | [AgentKit Runtime](../resources/items/volcengine-agentkit-runtime.md) | AgentKit 中的 Agent 运行托管服务 | 多框架接入、代码包或镜像部署、弹性伸缩、会话服务配套 | [Runtime 概述](https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh) |
| AWS | [Amazon Bedrock AgentCore Runtime](../resources/items/amazon-bedrock-agentcore-runtime.md) | AgentCore 中的 Agent 与工具托管服务 | 多框架与多模型支持、长任务运行、会话隔离、身份与观测集成 | [Runtime 概述](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) |
| Google Cloud | [Agent Runtime](../resources/items/google-cloud-agent-runtime.md) | Gemini Enterprise Agent Platform 中的托管运行服务 | ADK 等框架接入、部署与伸缩、观测，以及配套的会话与记忆服务 | [产品与组件概览](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale) |
| Microsoft Azure | [Foundry Hosted Agents](../resources/items/microsoft-foundry-hosted-agents.md) | Foundry Agent Service 中的自定义代码托管服务 | 自带代码与框架部署、弹性运行、身份管理、工具与 Azure 服务集成 | [产品概述](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) |
| 腾讯云 | [Agent Runtime](../resources/items/tencent-cloud-agent-runtime.md) | Agent 运行基础设施平台 | 弹性部署、会话管理、沙箱；其中 Deployment 处于 Beta 阶段 | [平台概述](https://cloud.tencent.com/document/product/1814/129423) · [Deployment](https://cloud.tencent.com/document/product/1814/137850) |
| Cloudflare | Workers（配合 Agents SDK） | 前述 Cloudflare Agents 的云端运行平台 | 托管运行、Durable Objects 状态服务、实时连接与任务调度 | [Agents 平台文档](https://developers.cloudflare.com/agents/) |

几个容易混淆的名称与对应关系：

- **阿里云 AgentCore 与 AWS AgentCore** 是两家厂商各自的产品；阿里云的 AgentCore 与 AgentRun 也按各自定位分别列出。
- **VeADK 与 AgentKit Runtime** 分别对应开发工具包和云端运行服务；Cloudflare Agents 与 Workers 也分别出现在开发工具和运行平台的位置。
- **Google ADK、AX 与 Google Cloud Agent Runtime** 分别对应开发工具包、可自托管的开源运行平台和云端托管服务。Google Cloud Agent Runtime 的旧名称是 Vertex AI Agent Engine，查阅旧资料时可能仍会遇到该名称，见 [官方更名记录](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)。

## 上层协作平台

这一组以组织、目标和任务为管理对象，通过已有 Agent Runtime 执行具体工作，提供团队分工、任务委派与交付管理能力。按主要职责，这里将其归入 [运行时与编排](../resources/runtime-and-orchestration.md) 中的组织级多 Agent 协作。

| 项目 | 维护方 | 一句话定位 | 主要特点 | 官方入口 |
| --- | --- | --- | --- | --- |
| [Paperclip](../resources/items/paperclip.md) | Paperclip 团队与社区 | 开源、可自托管的组织级多 Agent 协作平台 | 目标与任务分工、事件唤醒、审批与预算；通过适配器接入已有 Agent Runtime 并衔接会话状态 | [仓库](https://github.com/paperclipai/paperclip) · [适配器文档](https://docs.paperclip.ing/reference/adapters/overview/) · [执行策略](https://docs.paperclip.ing/guides/power/execution-policy/) |

Paperclip 也可通过 [Sandbox Provider 插件](https://docs.paperclip.ing/reference/adapters/sandbox-providers/) 接入和管理外部执行环境。阅读时可区分两类编排：Paperclip 主要协调 Agent 团队的任务与组织规则，AX 主要管理任务执行单元及其工作环境。

## 通用与个人 Agent 产品

这一组将任务执行、工具、状态与运行环境组合成面向用户的完整产品。用户通过应用委派目标并参与授权，服务方负责运行 Agent；公开的开发者接入方式在各产品介绍中单独说明。

| 产品 | 维护方 | 一句话定位 | 主要能力与使用入口 | 官方入口 |
| --- | --- | --- | --- | --- |
| [Meta Muse](../resources/items/meta-muse.md) | Meta | 在专属云端环境中持续工作的个人 Agent | 后台任务、记忆、浏览器与应用连接、操作审批；通过网页、App 与 WhatsApp 交互 | [产品介绍](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) · [设计概览](https://introducing.muse.ai/) |
| [Manus Cue](../resources/items/manus-cue.md) | Manus | 具有独立身份、工作环境与协作能力的个人 Agent 产品 | 每个 Agent 拥有邮箱、电话、钱包与电脑，可围绕群聊中的共同目标分工；通过 Cue 应用使用 | [官网](https://cue.im/) · [发布说明](https://manus.im/blog/introducing-manus-2-0) |

Muse Secure VM 是 Muse 的内置运行环境；Manus 将 Cascade 称为内部 Agent Harness，Cue 与 Manus 共用基础设施。各产品介绍分别说明内置组件、使用入口和公开的扩展方式。

## 参考清单与延伸阅读

以下两个社区清单可用于继续发现 Agent 基础设施与 Runtime 相关项目：

- [Awesome Agent Infrastructure](https://github.com/backblaze-labs/awesome-agent-infrastructure)
- [Awesome Agent Runtime](https://github.com/sandbaseai/awesome-agent-runtime)

本篇、上层协作平台及通用与个人 Agent 产品的主条目归属于 [运行时与编排](../resources/runtime-and-orchestration.md)，AX 与云端运行托管产品的资源索引在 [部署与调度](../resources/deployment-and-scheduling.md)。进一步阅读：

- **相关基础组件**：[Temporal](../resources/items/temporal.md) 是持久工作流平台，其官方 [AI 应用文档](https://docs.temporal.io/ai) 提供 Agent 集成入口。

[返回资源导览](README.md) · [返回首页](../README.md)
