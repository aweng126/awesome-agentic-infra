---
name: Model Context Protocol (MCP)
summary: 连接 AI 应用与上下文、工具服务的通信协议，以 JSON-RPC 消息定义 tools、resources 和 prompts 等接口，支持宿主通过客户端接入不同服务。
type: spec
topic: tools-and-protocols
aliases: ["MCP", "Model Context Protocol"]
keywords: ["工具协议", "上下文协议", "工具发现", "JSON-RPC", "resources", "prompts", "Streamable HTTP"]
url: https://modelcontextprotocol.io/specification/latest
anchor: resource-mcp
order: 3
reviewedAt: '2026-09-27'
links:
  - label: 协议规范
    url: https://modelcontextprotocol.io/specification/latest
  - label: 架构概览
    url: https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture
  - label: 服务端概念
    url: https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts
  - label: SDK 与接入
    url: https://modelcontextprotocol.io/docs/2026-07-28/sdk
---

## 用途与范围

MCP 为 AI 应用连接工具、数据和上下文服务提供统一接口。应用可以接入不同团队提供的服务，通过相同的消息格式发现能力、读取资料或发起操作。协议定义这些组件如何通信，模型选择与任务流程仍由宿主应用组织。[协议概览](https://modelcontextprotocol.io/specification/latest)

## 关键概念

- **Host、Client 与 Server**：Host 是面向用户的 AI 应用；其中的 Client 负责与 Server 通信；Server 暴露具体能力，可以运行在本地或远程。[架构概览](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)
- **Tools**：带有名称、说明和输入结构的操作，例如查询数据库或控制浏览器。
- **Resources 与 Prompts**：前者提供可读取的上下文数据，后者提供可复用的交互模板，分别由应用或用户选择使用。[服务端能力](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts)

## 基本交互与相关实现

一次工具交互通常从获取服务能力和工具列表开始，应用随后通过 `tools/call` 传入工具名称与参数，服务执行操作并返回结果。消息采用 JSON-RPC；本地服务可使用 stdio，远程服务可使用 Streamable HTTP。调用结果是否进入下一轮模型上下文，由宿主应用决定。[交互示例](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)

本站收录的 [Playwright MCP](playwright-mcp.md) 将浏览器操作封装为 MCP 工具，[Composio](composio.md) 提供带账户连接的工具接入能力。与独立 Agent 系统协作时，还可继续了解 [A2A](a2a.md) 的任务与消息接口。

## 阅读与接入

先从服务端概念理解工具、资源与提示词的区别，再选择对应语言的官方 SDK 实现客户端或服务端。应用需配置可用服务、访问权限和调用入口；协议版本及扩展支持以双方实现为准。[SDK 入口](https://modelcontextprotocol.io/docs/2026-07-28/sdk) · [规范入口](https://modelcontextprotocol.io/specification/latest)
