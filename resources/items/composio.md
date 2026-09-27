---
name: Composio
summary: 为 Agent 提供应用工具集、认证和按用户组织的会话，支持工具搜索、执行与事件触发，包含托管工具服务、配套 SDK 和框架适配器。
type: project
topic: tools-and-protocols
aliases: []
keywords: ["工具连接器", "OAuth", "认证", "Toolkit", "MCP", "外部应用"]
role: tool-integration
delivery: managed
url: https://github.com/ComposioHQ/composio
anchor: resource-composio
order: 1
links:
  - label: SDK 仓库
    url: https://github.com/ComposioHQ/composio
  - label: 官网
    url: https://composio.dev/
  - label: 文档
    url: https://docs.composio.dev/docs/how-composio-works
  - label: 快速开始
    url: https://docs.composio.dev/docs/quickstart
maintainer: Composio 团队与社区
form: 托管工具服务、开源 SDK 与框架适配器
license: MIT（SDK 仓库）
---

## 背景与目标

Composio 面向 Agent 接入外部应用时重复出现的工作：发现可用工具、连接用户账户、处理认证并执行操作。它把这些能力组织成可复用的服务与开发接口，使应用能够通过统一入口访问邮件、协作工具和业务系统。[项目介绍](https://github.com/ComposioHQ/composio)

## 核心能力

- **工具发现与调用**：按应用组织 Toolkit，并提供搜索与执行工具的接口，Agent 可以在运行时发现所需操作。[会话与工具](https://docs.composio.dev/docs/how-composio-works)
- **账户连接**：将外部应用连接关联到用户，处理 OAuth 流程及凭据刷新，也支持配置自己的认证应用。[认证概念](https://docs.composio.dev/docs/how-composio-works)
- **范围配置**：按会话限制可用工具集、具体工具和连接账户，适配不同用户与任务。[会话配置](https://docs.composio.dev/docs/configuring-sessions)
- **框架接入**：提供 Python、TypeScript SDK、多种框架适配器和会话级 MCP 接入方式。[SDK 与适配器](https://github.com/ComposioHQ/composio#providers)

## 核心概念与工作方式

Session 把一次任务中的用户标识、可用工具、认证配置和连接账户关联起来。Toolkit 表示某个应用的一组操作，Tool 则是具有输入与输出结构的具体动作。Agent 可以先搜索工具，在需要时引导账户授权，再通过同一 Session 执行；多轮任务可以复用已有会话。[工作方式](https://docs.composio.dev/docs/how-composio-works)

框架适配器负责把工具转换成对应 Agent 框架的格式，模型与主任务流程仍由应用组织。公开仓库提供 SDK、CLI 和适配器，其 MIT 许可不代表托管工具服务本身可以按同样方式自行部署。[仓库组成与许可](https://github.com/ComposioHQ/composio)

## 使用场景与接入方式

需要代表用户查询邮件、处理工单或操作协作系统的助手，可以使用 Composio 管理连接与工具调用。接入时创建项目并配置 API 密钥，为应用用户建立会话，再选择 SDK 适配器或 MCP 入口。明确任务需要的工具范围后，可以在会话配置中绑定相应账户和工具集。[快速开始](https://docs.composio.dev/docs/quickstart) · [配置说明](https://docs.composio.dev/docs/configuring-sessions)
