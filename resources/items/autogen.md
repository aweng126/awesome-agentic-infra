---
name: AutoGen
summary: 采用 Core 与 AgentChat 分层设计的多 Agent 框架，提供消息传递、事件驱动执行与分布式运行时。当前已进入维护模式，官方建议新用户使用 Microsoft Agent Framework。
type: project
topic: runtime-and-orchestration
aliases: ["Microsoft AutoGen", "AutoGen AgentChat"]
keywords: ["多 Agent", "消息驱动", "AgentChat", "分布式运行时", "维护模式", "迁移"]
role: agent-framework
delivery: library
url: https://github.com/microsoft/autogen
anchor: resource-autogen
order: 2
links:
  - label: 代码仓库
    url: https://github.com/microsoft/autogen
  - label: 文档
    url: https://microsoft.github.io/autogen/stable/
  - label: AgentChat 入门
    url: https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html
  - label: 迁移指南
    url: https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/
maintainer: Microsoft 与社区
form: 开源多 Agent 开发框架
license: MIT（代码）；CC BY 4.0（文档）
status:
  label: 维护模式，新项目建议使用 Microsoft Agent Framework
  source: https://github.com/microsoft/autogen
  checked: 2026-09-27
---

## 背景与目标

AutoGen 用于构建多个 Agent 自主协作或与人共同完成任务的应用。它把消息通信、Agent 生命周期与上层协作方式分开，既提供可直接使用的对话组件，也允许开发者定义事件驱动的 Agent 系统。[项目介绍](https://github.com/microsoft/autogen)

项目已进入维护模式，官方说明后续由社区维护，不再增加新功能，并建议新用户采用 Microsoft Agent Framework。现有使用者仍可通过原文档理解系统，并参考迁移指南调整应用。[维护声明与迁移入口](https://github.com/microsoft/autogen)

## 核心能力

- **多 Agent 对话**：AgentChat 提供预设 Agent 与 Team，支持轮流发言、选择下一位参与者、任务移交及图形工作流等组织方式。[AgentChat 文档](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html)
- **事件驱动通信**：Core 提供异步消息、请求响应及发布订阅，便于组合自定义 Agent 和外部组件。[Core 文档](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/index.html)
- **运行时与扩展**：提供单进程及分布式运行时，并通过扩展组件连接模型、工具、MCP 服务和代码执行环境。[运行时架构](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/core-concepts/architecture.html)

## 核心概念与工作方式

Core 中的 Agent 接收消息并执行处理逻辑，Runtime 负责消息投递以及身份和生命周期管理。单进程实现把 Agent 放在同一程序内；分布式实现由 Host 协调连接，由不同 Worker 执行 Agent。[运行时架构](https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/core-concepts/architecture.html)

AgentChat 建立在 Core 上，使用 Agent 表达角色，使用 Team 表达协作和结束规则。开发者配置模型客户端、工具和参与者后，向团队提交任务并消费回复或执行事件。[AgentChat 文档](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html)

## 使用场景与接入方式

适合阅读已有多 Agent 应用、维护基于 AutoGen 的系统，或了解消息驱动的协作编程方式。Python 应用通常安装 `autogen-agentchat` 和所需的 `autogen-ext` 扩展；需要底层消息控制时使用 Core。已有应用迁移时，可对照官方指南中的 Agent、工具、状态与工作流映射逐步替换。[迁移指南](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)
