---
name: Microsoft Agent Framework
summary: Agent 与多 Agent 工作流开发框架，支持顺序、并行、移交和群组协作等图编排模式，并提供检查点、流式执行、人工介入和中间件。
type: project
topic: runtime-and-orchestration
url: https://github.com/microsoft/agent-framework
anchor: resource-microsoft-agent-framework
order: 6
links:
  - label: 代码仓库
    url: https://github.com/microsoft/agent-framework
  - label: 文档
    url: https://learn.microsoft.com/en-us/agent-framework/overview/
  - label: 工作流概念
    url: https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/
  - label: AutoGen 迁移指南
    url: https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/
maintainer: Microsoft 与社区
form: 开源 Agent 与工作流开发框架
license: MIT
---

## 背景与目标

Microsoft Agent Framework 为单个 Agent 和多 Agent 工作流提供公共开发基础，面向需要从原型走向应用的团队。框架支持多种模型提供方，并为本地运行和云端部署提供集成方式。AutoGen 官方已将它列为后续迁移方向。[项目介绍](https://github.com/microsoft/agent-framework)、[迁移指南](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)

## 核心能力

- **Agent 开发组件**：组合模型客户端、工具、MCP、会话和上下文提供器，支持流式回复及状态管理。[官方概览](https://learn.microsoft.com/en-us/agent-framework/overview/)
- **多 Agent 工作流**：表达顺序、并行、移交和群组协作，提供检查点、执行事件与人工输入接口。[工作流概念](https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/)
- **应用扩展与观测**：通过中间件介入调用过程，并使用 OpenTelemetry 记录追踪信息；开发界面和示例帮助检查 Agent 与工作流行为。[能力列表](https://github.com/microsoft/agent-framework)

## 核心概念与工作方式

单个 Agent 负责调用模型、使用工具和产生回复，Session 保存交互状态，Context Provider 向模型调用补充记忆或其他上下文。开发者可以更换这些组件，在同一应用接口下组合不同模型和服务。[官方概览](https://learn.microsoft.com/en-us/agent-framework/overview/)

工作流由 Executor 和 Edge 组成：前者接收输入、执行 Agent 或代码并发出结果，后者负责路由；执行过程产生事件并维护工作流状态。图模式通过连线表达分支与汇合，检查点记录推进位置。各语言 SDK 的功能范围有差异，例如 Python 的函数式工作流仍被文档标为实验功能。[工作流概念](https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/)

## 使用场景与接入方式

可用于混合业务代码与模型决策的流程、带人工审批的 Agent 应用，以及多角色协作。先安装对应 SDK、配置模型客户端和工具，再选择直接运行 Agent 或把它嵌入工作流；需要托管时，可以结合 Microsoft Foundry 等部署方式。[仓库示例](https://github.com/microsoft/agent-framework)

框架本身负责应用开发与执行组织，托管服务则负责承载部署后的应用。已有 AutoGen 项目可按官方映射迁移 Agent、工具、消息与状态，而不必把历史组件名称直接套到新框架上。[迁移指南](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)
