---
name: Strands Agents（Harness SDK）
summary: 开源的 Python / TypeScript Agent Harness SDK，提供执行循环、工具接入、上下文与会话管理等组件，并提供预装配的 Strands harness，支持快速构建和定制 Agent。
type: project
topic: runtime-and-orchestration
aliases: ["Strands", "Strands Agents", "Strands Agents SDK", "Strands Harness SDK", "Strands harness", "harness-sdk"]
keywords: ["Agent Harness", "Agent SDK", "执行循环", "上下文管理", "会话存储", "运行控制", "MCP"]
role: agent-framework
delivery: library
url: https://strandsagents.com/docs/user-guide/sdk/
anchor: resource-strands-agents
order: 8
links:
  - label: 官网与文档
    url: https://strandsagents.com/
  - label: 代码仓库
    url: https://github.com/strands-agents/harness-sdk
  - label: Harness SDK 文档
    url: https://strandsagents.com/docs/user-guide/sdk/
  - label: Strands harness 文档
    url: https://strandsagents.com/docs/user-guide/harness/
  - label: Harness 快速开始
    url: https://strandsagents.com/docs/user-guide/harness/quickstart/
maintainer: Strands Agents 团队与社区
form: 开源 Agent Harness SDK 与预装配 Harness
license: Apache-2.0
reviewedAt: '2026-09-28'
---

## 背景与目标

Strands Agents 为开发者提供构建 Agent Harness 的组件：围绕模型组织执行循环、工具、上下文和状态，让模型能够持续调用工具并推进任务。它提供 Python 与 TypeScript SDK，在应用进程中运行，开发者可以选择模型提供方及部署位置。[项目介绍](https://github.com/strands-agents/harness-sdk)

项目提供两个使用入口：**Strands Harness SDK** 供开发者自行组合执行循环与各项组件；**Strands harness** 在 SDK 上预装配工具、上下文管理、会话、记忆及默认指令，便于从一个可运行的 Agent 开始定制。[SDK 概览](https://strandsagents.com/docs/user-guide/sdk/) · [Harness 概览](https://strandsagents.com/docs/user-guide/harness/)

## 核心能力

- **模型驱动执行**：向模型提供工具定义，执行返回的工具调用，再把结果加入消息历史，持续循环直至模型完成回复。[Agent Loop](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/)
- **运行控制**：提供轮次与 Token 预算、取消信号和结束原因，帮助调用方区分正常完成、主动取消及达到调用限制。[循环生命周期](https://strandsagents.com/docs/user-guide/sdk/agents/lifecycle-controls/)
- **上下文与记忆**：提供上下文管理和长期记忆组件；预装配 Harness 默认组合上下文管理、缓存和跨运行记忆，开发者可调整或替换这些配置。[Harness 能力](https://strandsagents.com/docs/user-guide/harness/)
- **会话持久化**：通过 Session Manager 保存消息与状态，按会话标识恢复；可选择本地文件、对象存储或自定义存储后端。[会话管理](https://strandsagents.com/docs/user-guide/sdk/agents/session-management/)
- **组合与扩展**：支持自定义工具、MCP、结构化输出和多 Agent 模式，通过 Hooks、插件和干预机制扩展执行行为，并提供追踪与评估集成。[能力概览](https://github.com/strands-agents/harness-sdk)

## 核心概念与工作方式

`Agent` 组合模型客户端、工具集合与对话管理器。每次输入启动一次调用，模型返回工具请求时，SDK 执行工具并重新调用模型；返回最终回复或触及终止条件时，调用结束并向应用交付结果。[Agent Loop](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/)

预装配的 Strands harness 使用同一套 SDK 组件。调用 `create_harness()` 或 `createHarness()` 后得到标准 Strands `Agent`，可以继续添加工具、插件和干预机制，或替换默认模型、上下文与记忆配置。[Harness 与 SDK 的组合关系](https://strandsagents.com/docs/user-guide/harness/composing-with-sdk/)

会话管理器把消息与状态写入配置的存储，并在同一会话再次启动时加载。直接使用 SDK 时按需配置会话管理器；预装配 Harness 默认启用本地会话持久化，指定相同会话 ID 可继续之前的对话。[SDK 会话管理](https://strandsagents.com/docs/user-guide/sdk/agents/session-management/) · [Harness 会话入门](https://strandsagents.com/docs/user-guide/harness/quickstart/)

## 使用场景与接入方式

可用于工具型助手、业务自动化及多 Agent 应用，根据需要选择起点：

- **自行组合 Agent**：安装 Harness SDK，配置模型、注册工具并创建 `Agent`，再按需接入上下文、会话及记忆组件。[SDK 快速开始](https://strandsagents.com/docs/user-guide/sdk/quickstart/python/)
- **从预装配方案开始**：安装 Strands harness，使用 `create_harness()` 或 `createHarness()` 创建 Agent，再覆盖需要调整的默认配置；也可通过官方 CLI 交互配置并导出代码。[Harness 快速开始](https://strandsagents.com/docs/user-guide/harness/quickstart/)
