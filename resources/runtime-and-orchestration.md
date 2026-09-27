# Runtime & Orchestration

收录支撑 Agent 执行循环、工作流、多 Agent 协作、持久执行与失败恢复的框架、运行时与协作平台。重点是任务如何推进、暂停和恢复；计算资源分配见 [Deployment & Scheduling](deployment-and-scheduling.md)，跨会话记忆的组织与检索见 [Memory & Context](memory-and-context.md)。

## 学习笔记

- [Agent Runtime 全景：开源框架、运行平台与云厂商产品](../notes/agent-runtime-landscape.md) — 汇总代表性开源框架、可自托管的运行平台与云厂商产品，介绍各方案的维护方、产品定位、主要特点和官方入口。

## Projects & Platforms

- <a id="resource-agentscope"></a> [AgentScope](https://github.com/agentscope-ai/agentscope) — 以推理与工具执行循环为核心的开源 Agent 框架，2.0 已整合原 AgentScope Runtime 的能力；关注：事件流、实时中断与继续执行、工具权限，以及工作空间与沙箱的分工。
- <a id="resource-autogen"></a> [AutoGen](https://github.com/microsoft/autogen) — 采用分层设计的多 Agent 框架，可用于研究消息传递、事件驱动 Agent 与分布式运行时；关注：Core 与 AgentChat 的抽象边界。官方已标注进入维护模式，并建议新用户使用 Microsoft Agent Framework。
- <a id="resource-cloudflare-agents"></a> [Cloudflare Agents](https://developers.cloudflare.com/agents/runtime/agents-api/) — 基于 Durable Objects 的有状态 Agent SDK，在 Cloudflare 托管环境中将逻辑、持久身份与本地状态组织为一个运行单元；关注：事件驱动执行、SQLite 状态、定时任务及与 Workflows 的组合。
- <a id="resource-google-adk"></a> [Google Agent Development Kit (ADK)](https://adk.dev/) — 提供 Agent、工具和多 Agent 工作流的组织方式，并通过运行时管理执行过程；关注：图工作流、顺序与并行组合、会话事件及执行恢复。
- <a id="resource-langgraph"></a> [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) — 面向有状态、长时间运行 Agent 的图编排框架，可在同一执行图中组合确定性步骤与模型决策；关注：状态持久化、执行恢复、流式输出与人工介入。
- <a id="resource-microsoft-agent-framework"></a> [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) — 提供 Agent 与多 Agent 工作流的开发基础，支持顺序、并行、移交和群组协作等图编排模式；关注：检查点、流式执行、人工介入和中间件。
- <a id="resource-paperclip"></a> [Paperclip](https://github.com/paperclipai/paperclip) — 组织级多 Agent 协作平台，通过任务分配、事件唤醒和 Adapter 对接已有 Agent Runtime；关注：任务领取与委派、跨运行的会话衔接、审批与预算，见 [Adapter 文档](https://docs.paperclip.ing/reference/adapters/overview/)。
- <a id="resource-strands-agents"></a> [Strands Agents](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/) — 由模型选择工具和推进任务的开源 Agent SDK，通过循环执行工具并将结果回送模型；关注：工具错误处理、调用预算、取消语义，以及执行循环与会话存储的边界。
- <a id="resource-temporal"></a> [Temporal](https://docs.temporal.io/ai) — 通用持久执行平台，官方提供 Agent 循环、工具调用和人工审批的集成示例；关注：Workflow 与 Activity 的职责划分、失败重试，以及等待外部事件后继续执行。
- <a id="resource-veadk"></a> [VeADK](https://github.com/volcengine/veadk-python) — 火山引擎的开源 Agent 开发工具包，提供 Agent、Runner 和 AgentKit 应用集成；关注：Agent 与子 Agent 的组织、会话存储，以及开发框架与托管 Runtime 的职责边界。

[返回首页](../README.md)
