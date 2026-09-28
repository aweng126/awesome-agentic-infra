---
name: OpenCode
summary: 开源编码 Agent，提供可独立运行的服务、客户端 API 与内嵌 SDK，支持围绕会话、工具和插件构建自定义 Agent 界面与自动化流程。
type: project
topic: runtime-and-orchestration
aliases: ["OpenCode SDK", "opencode-ai", "@opencode/sdk", "@opencode/client"]
keywords: ["Agent Harness", "Coding Agent", "会话管理", "插件", "HTTP API", "内嵌 SDK"]
role: agent-harness
delivery: self-hosted
url: https://opencode.ai/v2/docs/build/
anchor: resource-opencode
order: 23
links:
  - label: 开发者文档
    url: https://opencode.ai/v2/docs/build/
  - label: 代码仓库
    url: https://github.com/anomalyco/opencode
  - label: 内嵌 SDK
    url: https://opencode.ai/v2/docs/build/sdk
  - label: JavaScript 客户端
    url: https://opencode.ai/v2/docs/build/client/
maintainer: Anomaly 与社区
form: 开源编码 Agent、独立服务与可嵌入 SDK
license: MIT（OpenCode 仓库）
reviewedAt: '2026-09-28'
---

## 背景与目标

OpenCode 是开源编码 Agent，除终端和桌面交互外，也提供供其他应用复用的执行能力。开发者可以扩展现有 Agent、连接独立服务，或把 OpenCode 嵌入自己的程序，构建定制界面和工作流。项目仓库采用 MIT 许可证。[项目仓库](https://github.com/anomalyco/opencode) · [开发入口](https://opencode.ai/v2/docs/build/) · [许可证](https://github.com/anomalyco/opencode/blob/dev/LICENSE)

## 核心能力

- **会话执行**：创建会话、提交任务并订阅执行事件，让外部应用展示和控制 Agent 工作。
- **插件扩展**：通过插件增加工具、命令、Agent 及自定义行为，也可调整模型与工具配置。
- **程序化接入**：提供 HTTP API 的 TypeScript 客户端，以及直接在应用进程中运行的 SDK。[客户端](https://opencode.ai/v2/docs/build/client/) · [SDK](https://opencode.ai/v2/docs/build/sdk)

## 核心概念与工作方式

v2 的 `@opencode/client` 通过网络连接 OpenCode 服务，调用会话等 API 并消费事件流。`@opencode/sdk` 则在应用内创建宿主，通过内存中的 HTTP 路由处理调用，不另外打开 HTTP 监听端口。两者共享接口约定，分别面向独立服务与进程内嵌入。[客户端机制](https://opencode.ai/v2/docs/build/client/) · [SDK 机制](https://opencode.ai/v2/docs/build/sdk)

## 使用场景与接入方式

可用于自定义编码界面、内部开发工具和自动化任务。已有 OpenCode 服务时，使用客户端连接其地址；需要控制整个宿主生命周期时，使用 SDK 创建实例，配置工作目录和插件，并在结束时关闭实例。插件也可直接扩展现有 OpenCode 交互，而不另建应用。[接入方式](https://opencode.ai/v2/docs/build/) · [宿主管理](https://opencode.ai/v2/docs/build/sdk)
