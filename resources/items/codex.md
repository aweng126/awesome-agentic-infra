---
name: Codex（Agent Harness）
summary: OpenAI 的可复用 Agent Harness，通过 CLI、SDK 与 App Server 提供工具执行、会话状态、流式事件及审批接口，可接入自有产品和自动化流程。
type: project
topic: runtime-and-orchestration
aliases: ["Codex", "Codex CLI", "Codex SDK", "Codex App Server"]
keywords: ["Agent Harness", "Coding Agent", "会话管理", "审批", "SDK", "JSON-RPC"]
role: agent-harness
delivery: self-hosted
url: https://developers.openai.com/blog/codex-as-a-platform
anchor: resource-codex
order: 21
links:
  - label: Harness 介绍
    url: https://developers.openai.com/blog/codex-as-a-platform
  - label: SDK 文档
    url: https://learn.chatgpt.com/docs/codex-sdk
  - label: App Server 文档
    url: https://learn.chatgpt.com/docs/app-server
  - label: 开源组件说明
    url: https://learn.chatgpt.com/docs/open-source
maintainer: OpenAI
form: 开源 Agent Harness、CLI、SDK 与 App Server
reviewedAt: '2026-09-28'
---

## 背景与目标

Codex 的 Harness 是终端、编辑器等产品界面背后的执行系统，负责组织模型上下文、工具调用和连续任务。OpenAI 将 CLI、SDK 与 App Server 作为开源组件提供，供开发者把 Agent 接入已有产品；模型访问与托管服务另行提供。[平台介绍](https://developers.openai.com/blog/codex-as-a-platform) · [开源范围](https://learn.chatgpt.com/docs/open-source)

## 核心能力

- **任务执行**：运行工具并流式返回过程事件，保存会话状态，让应用继续或恢复任务。
- **执行边界**：使用配置的沙箱与审批策略，向客户端发出需要确认的操作请求。
- **程序化控制**：SDK 面向任务自动化，App Server 提供会话、轮次、中断与审批接口，应用可接入自有工具和界面。[Harness 能力](https://developers.openai.com/blog/codex-as-a-platform)

## 核心概念与工作方式

App Server 用 `Thread` 表示会话，`Turn` 表示一次输入及后续执行，`Item` 表示消息、命令或工具调用等内容。客户端通过双向 JSON-RPC 创建或恢复会话、启动轮次，并消费事件；遇到审批请求时回传决定。[App Server 协议](https://learn.chatgpt.com/docs/app-server)

官方提供 TypeScript 与 Python SDK，用于控制本地 Codex。TypeScript SDK 可启动和续接线程；Python SDK 通过 JSON-RPC 控制本地 App Server。[SDK 文档](https://learn.chatgpt.com/docs/codex-sdk)

## 使用场景与接入方式

可用于 CI 任务、代码维护、内部工具和嵌入式 Agent 产品。一次性自动化可使用 `codex exec`；应用代码可使用 SDK；需要自定义会话界面、流式展示和审批交互时可接入 App Server。[集成入口](https://developers.openai.com/blog/codex-as-a-platform)
