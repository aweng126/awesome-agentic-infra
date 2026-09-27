---
name: AgentScope
summary: 以推理与工具执行循环为核心的开源 Agent 框架，支持事件流、实时中断与继续执行、工具权限管理及工作空间与沙箱。2.0 已整合原 AgentScope Runtime 的能力。
type: project
topic: runtime-and-orchestration
aliases: ["AgentScope 2.0", "AgentScope Runtime"]
keywords: ["多 Agent", "Agent SDK", "工具调用", "中断恢复", "工作空间", "应用服务"]
role: agent-framework
delivery: library
url: https://github.com/agentscope-ai/agentscope
anchor: resource-agentscope
order: 1
links:
  - label: 代码仓库
    url: https://github.com/agentscope-ai/agentscope
  - label: 文档
    url: https://docs.agentscope.io/
  - label: 快速开始
    url: https://github.com/agentscope-ai/agentscope#quickstart
  - label: 服务架构
    url: https://docs.agentscope.io/latest/en/deploy/agent-service
maintainer: AgentScope 团队与社区
form: 开源开发框架与应用服务组件
license: Apache-2.0
status:
  label: 2.0 已整合原 Runtime 能力
  source: https://github.com/agentscope-ai/agentscope-runtime#archive-notice
  checked: 2026-09-27
---

## 背景与目标

AgentScope 围绕模型的推理和工具使用能力组织 Agent 应用，提供开发循环、上下文管理、执行环境及应用服务组件。开发者可以从单个 Agent 开始，逐步加入多会话、团队协作和外部通信渠道。[项目介绍](https://github.com/agentscope-ai/agentscope)

原 AgentScope Runtime 的沙箱、服务 API 和观测等能力已整合到 AgentScope 2.0，原仓库公告建议迁移到主框架。了解当前方案时，应从 2.0 文档进入。[Runtime 整合公告](https://github.com/agentscope-ai/agentscope-runtime#archive-notice)

## 核心能力

- **推理与执行循环**：组合模型、工具、结构化输出、事件流与上下文管理，支持工具顺序或并发执行，以及中断后继续处理。[Agent 概览](https://docs.agentscope.io/latest/en/building-blocks/agent/overview)
- **工具权限与人工介入**：在工具或资源访问时检查权限，允许应用向用户请求确认，并依据确认结果继续运行。[权限系统](https://docs.agentscope.io/latest/en/building-blocks/permission-system/overview)
- **应用服务**：提供多租户、多会话的服务后端，可组合持久化、工作空间、沙箱与团队协作，并连接 Web 界面或消息渠道。[服务架构](https://docs.agentscope.io/latest/en/deploy/agent-service)

## 核心概念与工作方式

核心 `Agent` 接收消息或事件，在模型推理、工具执行和结束之间推进循环；`Toolkit` 组织可调用工具，Middleware 在模型调用、权限检查和上下文整理等阶段插入应用逻辑。调用方可以获取最终回复，也可以消费执行期间产生的事件流。[Agent 概览](https://docs.agentscope.io/latest/en/building-blocks/agent/overview)

框架开发层负责构造 Agent 行为，Agent Service 层负责把这些 Agent 组织成应用，管理用户会话、资源访问和后台任务。工作空间与沙箱则承载需要文件或代码环境的工具操作。[服务架构](https://docs.agentscope.io/latest/en/deploy/agent-service)

## 使用场景与接入方式

可用于工具型助手、需要用户确认的自动化任务，以及带共享资源和多个会话的 Agent 应用。接入时安装 Python 包，配置模型凭证和 Toolkit，再通过控制台或自有程序运行；需要 Web 应用时，可从官方 Agent Service 与 Web UI 示例继续搭建。[快速开始](https://github.com/agentscope-ai/agentscope#quickstart)
