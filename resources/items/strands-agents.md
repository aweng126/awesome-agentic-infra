---
name: Strands Agents
summary: 由模型选择工具和推进任务的开源 Agent SDK，循环执行工具并将结果回送模型，提供工具错误处理、调用预算、取消和会话存储能力。
type: project
topic: runtime-and-orchestration
aliases: ["Strands", "Strands Agents SDK"]
keywords: ["Agent SDK", "模型驱动", "工具循环", "会话存储", "调用预算", "MCP"]
role: agent-framework
delivery: library
url: https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/
anchor: resource-strands-agents
order: 8
links:
  - label: 官网与文档
    url: https://strandsagents.com/
  - label: 代码仓库
    url: https://github.com/strands-agents/harness-sdk
  - label: Agent Loop
    url: https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/
  - label: 快速开始
    url: https://strandsagents.com/docs/user-guide/sdk/quickstart/overview/
maintainer: Strands Agents 团队与社区
form: 开源 Agent SDK
license: Apache-2.0
---

## 背景与目标

Strands Agents 为开发者提供可直接嵌入应用的 Agent 循环：配置模型、指令和工具后，由模型决定调用哪些工具及何时结束任务。SDK 承担循环、上下文、会话和运行控制等公共部分，让应用代码集中描述可用能力。[项目介绍](https://github.com/strands-agents/harness-sdk)

它提供 Python 与 TypeScript SDK，在应用进程中运行。开发者可以选择模型提供方及部署位置；SDK 本身不要求使用某个托管控制面。[项目定位](https://github.com/strands-agents/harness-sdk)

## 核心能力

- **模型驱动执行**：向模型提供工具定义，执行返回的工具调用，再把结果加入消息历史，持续循环直至模型完成回复。[Agent Loop](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/)
- **运行控制**：提供轮次与 Token 预算、取消信号和结束原因，帮助调用方区分正常完成、主动取消及达到调用限制。[循环生命周期](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/)
- **会话持久化**：通过 Session Manager 保存消息与状态，按会话标识恢复；可选择本地文件、对象存储或自定义存储后端。[会话管理](https://strandsagents.com/docs/user-guide/sdk/agents/session-management/)
- **组合与扩展**：支持自定义工具、MCP、结构化输出和多 Agent 模式，并提供追踪与评估集成。[能力概览](https://github.com/strands-agents/harness-sdk)

## 核心概念与工作方式

`Agent` 组合模型客户端、工具集合与对话管理器。每次输入启动一次调用，模型返回工具请求时，SDK 执行工具并重新调用模型；返回最终回复或触及终止条件时，调用结束并向应用交付结果。[Agent Loop](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/)

会话管理器把执行中的消息与状态写入配置的存储，并在同一会话再次启动时恢复。多 Agent 的 Graph 或 Swarm 由编排层统一管理会话快照，具体保存时机随所选会话管理器和配置而定。[会话管理](https://strandsagents.com/docs/user-guide/sdk/agents/session-management/)

## 使用场景与接入方式

可用于工具型助手、业务自动化及由模型动态选择操作步骤的应用。先安装相应 SDK、配置模型访问方式，再注册工具并创建 Agent；需要跨进程重启继续会话时，额外配置 Session Manager 和持久化存储。官方入门覆盖从简单调用到工具接入的基本路径。[快速开始](https://strandsagents.com/docs/user-guide/sdk/quickstart/overview/)
