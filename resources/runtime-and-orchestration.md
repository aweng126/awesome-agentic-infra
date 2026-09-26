# Runtime & Orchestration

收录支撑 Agent 执行循环、工作流、多 Agent 协作、持久执行与失败恢复的框架和运行时。重点是任务如何推进、暂停和恢复；计算资源分配见 [Deployment & Scheduling](deployment-and-scheduling.md)，跨会话记忆的组织与检索见 [Memory & Context](memory-and-context.md)。

> 最近整理：2026-09-26。条目依据所链接的一手来源整理，不代表实测。

## Projects & Platforms

- [AutoGen](https://github.com/microsoft/autogen) — 采用分层设计的多 Agent 框架，可用于研究消息传递、事件驱动 Agent 与分布式运行时；关注：Core 与 AgentChat 的抽象边界。官方已标注进入维护模式，并建议新用户使用 Microsoft Agent Framework。
- [Google Agent Development Kit (ADK)](https://adk.dev/) — 提供 Agent、工具和多 Agent 工作流的组织方式，并通过运行时管理执行过程；关注：图工作流、顺序与并行组合、会话事件及执行恢复。
- [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) — 面向有状态、长时间运行 Agent 的图编排框架，可在同一执行图中组合确定性步骤与模型决策；关注：状态持久化、执行恢复、流式输出与人工介入。
- [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) — 提供 Agent 与多 Agent 工作流的开发基础，支持顺序、并行、移交和群组协作等图编排模式；关注：检查点、流式执行、人工介入和中间件。
- [Temporal](https://docs.temporal.io/ai) — 通用持久执行平台，官方提供 Agent 循环、工具调用和人工审批的集成示例；关注：Workflow 与 Activity 的职责划分、失败重试，以及等待外部事件后继续执行。

## Related Topics

- [Deployment & Scheduling](deployment-and-scheduling.md) — Agent 服务的托管、资源分配与弹性伸缩。
- [Memory & Context](memory-and-context.md) — 会话状态、长期记忆与上下文组织。
- [Tools & Protocols](tools-and-protocols.md) — 工具发现、调用接口与 Agent 间通信。
- [Observability & Evaluation](observability-and-evaluation.md) — 执行追踪、调试与行为评测。

[返回首页](../README.md)
