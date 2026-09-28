# Runtime & Orchestration

收录 Agent 开发框架、工作流引擎与多 Agent 协作平台，覆盖执行编排、状态管理和任务恢复。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-agentscope"></a> [AgentScope](https://github.com/agentscope-ai/agentscope) — 以推理与工具执行循环为核心的开源 Agent 框架，支持事件流、实时中断与继续执行、工具权限管理及工作空间与沙箱。2.0 已整合原 AgentScope Runtime 的能力。 [项目介绍](items/agentscope.md)
- <a id="resource-autogen"></a> [AutoGen](https://github.com/microsoft/autogen) — 采用 Core 与 AgentChat 分层设计的多 Agent 框架，提供消息传递、事件驱动执行与分布式运行时。当前已进入维护模式，官方建议新用户使用 Microsoft Agent Framework。 [项目介绍](items/autogen.md)
- <a id="resource-cloudflare-agents"></a> [Cloudflare Agents](https://developers.cloudflare.com/agents/runtime/agents-api/) — 基于 Durable Objects 的有状态 Agent SDK，在 Cloudflare 托管环境中提供持久身份、SQLite 状态、事件驱动执行和定时任务，可与 Workflows 组合使用。 [项目介绍](items/cloudflare-agents.md)
- <a id="resource-google-adk"></a> [Google Agent Development Kit (ADK)](https://adk.dev/) — 用于组织 Agent、工具和多 Agent 工作流的开发工具包，支持图工作流、顺序与并行组合，以及会话事件管理和执行恢复。 [项目介绍](items/google-adk.md)
- <a id="resource-langgraph"></a> [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) — 面向有状态、长时间运行 Agent 的图编排框架，可组合确定性步骤与模型决策，支持状态持久化、执行恢复、流式输出与人工介入。 [项目介绍](items/langgraph.md)
- <a id="resource-microsoft-agent-framework"></a> [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) — Agent 与多 Agent 工作流开发框架，支持顺序、并行、移交和群组协作等图编排模式，并提供检查点、流式执行、人工介入和中间件。 [项目介绍](items/microsoft-agent-framework.md)
- <a id="resource-paperclip"></a> [Paperclip](https://github.com/paperclipai/paperclip) — 组织级多 Agent 协作平台，提供任务分配与委派、事件唤醒、审批和预算管理，通过 Adapter 对接已有 Agent Runtime 并衔接跨运行会话。接入方式见 [Adapter 文档](https://docs.paperclip.ing/reference/adapters/overview/)。 [项目介绍](items/paperclip.md)
- <a id="resource-strands-agents"></a> [Strands Agents（Harness SDK）](https://strandsagents.com/docs/user-guide/sdk/) — 开源的 Python / TypeScript Agent Harness SDK，提供执行循环、工具接入、上下文与会话管理等组件，并提供预装配的 Strands harness，支持快速构建和定制 Agent。 [项目介绍](items/strands-agents.md)
- <a id="resource-temporal"></a> [Temporal](https://docs.temporal.io/ai) — 通用持久执行平台，通过 Workflow 与 Activity 组织任务，支持失败重试及等待外部事件后继续执行。官方提供 Agent 循环、工具调用和人工审批的集成示例。 [项目介绍](items/temporal.md)
- <a id="resource-veadk"></a> [VeADK](https://github.com/volcengine/veadk-python) — 火山引擎的开源 Agent 开发工具包，提供 Agent、Runner、子 Agent 组织和会话存储，并支持 AgentKit 应用集成。 [项目介绍](items/veadk.md)

<!-- resources:end -->

## 方案总览

- [Agent Runtime 全景：开源框架、运行平台与云厂商产品](../notes/agent-runtime-landscape.md) — 汇总代表性开源框架、可自托管的运行平台与云厂商产品，介绍各方案的维护方、产品定位、主要特点和官方入口。

[返回首页](../README.md)
