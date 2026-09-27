---
name: Cloudflare Agents
summary: 基于 Durable Objects 的有状态 Agent SDK，在 Cloudflare 托管环境中提供持久身份、SQLite 状态、事件驱动执行和定时任务，可与 Workflows 组合使用。
type: project
topic: runtime-and-orchestration
url: https://developers.cloudflare.com/agents/runtime/agents-api/
anchor: resource-cloudflare-agents
order: 3
links:
  - label: 文档
    url: https://developers.cloudflare.com/agents/
  - label: 代码仓库
    url: https://github.com/cloudflare/agents
  - label: Agents API
    url: https://developers.cloudflare.com/agents/runtime/agents-api/
  - label: 快速开始
    url: https://github.com/cloudflare/agents#cloudflare-agents
maintainer: Cloudflare 与社区
form: 开源 SDK 与 Cloudflare 托管运行环境
license: MIT（SDK）
---

## 背景与目标

Cloudflare Agents 面向需要持续保留会话状态、接收外部事件并执行后台工作的 Agent 应用。它基于 Durable Objects，为每个 Agent 提供身份、存储和生命周期，使聊天、定时任务及外部渠道能够围绕同一实例协作。[产品概览](https://developers.cloudflare.com/agents/)

SDK 是应用代码中的开发组件，实际部署依托 Cloudflare 的托管环境。开发者定义 Agent 行为，平台承载实例和相关基础设施；模型选择与任务循环仍可由应用自行组织。[项目介绍](https://github.com/cloudflare/agents)

## 核心能力

- **持久状态与实时同步**：提供实例级状态、SQLite 查询和客户端同步，让网页能够订阅 Agent 的状态变化。[状态管理](https://developers.cloudflare.com/agents/runtime/lifecycle/state/)
- **通信与工具接入**：支持 HTTP、WebSocket、可调用方法和 MCP，可连接聊天界面、外部系统及工具服务。[Agents API](https://developers.cloudflare.com/agents/runtime/agents-api/)
- **后台工作**：支持延迟、一次性和周期调度，并可组合 Cloudflare Workflows 处理多步任务及等待人工输入。[任务调度](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/)、[能力列表](https://github.com/cloudflare/agents)

## 核心概念与工作方式

开发者继承 `Agent` 类，将业务方法与状态放入实例。请求经路由映射到指定 Agent，状态更新可以同步给连接的客户端；实例内部可查询 SQLite、调用模型、执行工具或安排后续任务。[Agents API](https://developers.cloudflare.com/agents/runtime/agents-api/)

官方把应用分为通信渠道、Agent Harness、SDK Runtime 和工具四部分：渠道负责输入输出，Harness 组织模型与工具循环，Runtime 提供身份、状态、连接和调度，工具提供浏览器或沙箱等操作能力。[组成说明](https://developers.cloudflare.com/agents/)

## 使用场景与接入方式

可用于长期会话助手、实时协作界面、定期处理任务及连接外部事件的自动化应用。可从官方 starter 创建项目，或在现有 Workers 项目中安装 `agents`，配置 Durable Object 绑定及 SQLite migration，再进行本地开发和部署。SDK 的 MIT 许可适用于代码，托管运行资源使用 Cloudflare 服务。[仓库示例](https://github.com/cloudflare/agents)
