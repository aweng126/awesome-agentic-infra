---
name: Agent2Agent Protocol (A2A)
summary: 面向独立 Agent 系统的通信与协作协议，定义 Agent Card、任务生命周期和产物表示，支持能力发现、消息交换及流式和异步更新。
type: spec
topic: tools-and-protocols
aliases: ["A2A", "Agent2Agent"]
keywords: ["Agent 互联", "Agent Card", "任务生命周期", "能力发现", "流式通信"]
url: https://a2a-protocol.org/latest/specification/
anchor: resource-a2a
order: 4
reviewedAt: '2026-09-27'
links:
  - label: 协议规范
    url: https://a2a-protocol.org/latest/specification/
  - label: 核心概念
    url: https://a2a-protocol.org/latest/topics/key-concepts/
  - label: 任务生命周期
    url: https://a2a-protocol.org/latest/topics/life-of-a-task/
  - label: SDK
    url: https://a2a-protocol.org/latest/sdk/
---

## 用途与范围

A2A 为独立的 Agent 系统提供发现、通信与协作接口。调用方可以了解远端 Agent 的能力、发出请求并接收进展与产物，远端如何组织模型、记忆和工具则由其自身实现。它适合跨服务或跨团队的 Agent 互联。[协议规范](https://a2a-protocol.org/latest/specification/)

## 关键概念

- **Agent Card**：描述 Agent 身份、服务地址、技能、能力与认证要求，帮助调用方发现和连接服务。
- **Message 与 Part**：Message 表示一次通信，Part 承载其中的文本、文件或结构化数据。
- **Task 与 Artifact**：Task 跟踪需要持续处理的工作及其状态，Artifact 表达文档等交付产物；`contextId` 可关联多轮消息和相关任务。[核心概念](https://a2a-protocol.org/latest/topics/key-concepts/)

## 基本交互与相关实现

客户端读取 Agent Card，按其公布的接口发送消息。远端可以直接回复 Message，也可以返回 Task，并在执行中报告状态、请求补充输入或交付产物。长任务可按服务能力通过查询、流式事件或推送获取更新；已结束任务的后续修改通过新的交互组织。[任务生命周期](https://a2a-protocol.org/latest/topics/life-of-a-task/) · [交互方式](https://a2a-protocol.org/latest/specification/)

[MCP](mcp.md) 连接应用与工具、上下文服务，A2A 连接独立 Agent；两者可以用于同一系统。[官方关系说明](https://a2a-protocol.org/latest/topics/a2a-and-mcp/) 本站的 [Amazon Bedrock AgentCore Runtime](amazon-bedrock-agentcore-runtime.md) 与 [AgentKit Runtime](volcengine-agentkit-runtime.md) 介绍了支持相应协议的运行接入方式。

## 阅读与接入

先阅读核心概念和任务生命周期，再通过官方 SDK 与教程实现 Agent Card、请求处理和任务更新。接入时按 Agent Card 选择双方支持的协议绑定、能力及认证方式；应用内部的任务执行仍由所用框架或服务负责。[SDK](https://a2a-protocol.org/latest/sdk/) · [完整规范](https://a2a-protocol.org/latest/specification/)
