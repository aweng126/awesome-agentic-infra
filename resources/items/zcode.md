---
name: ZCode
summary: 智谱 Z.ai 的开源编程 Agent Harness，提供桌面、Web 与终端入口，公开 Agent CLI 和运行时源码，支持通过插件、MCP 与 Hooks 扩展执行能力。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: [Z Code, 智谱 ZCode, 智谱编程智能体]
keywords: [Coding Agent, Agent Harness, 编程智能体, 终端, 工作台, MCP, Hooks]
url: https://github.com/zai-org/ZCode
anchor: resource-zcode
order: 29
links:
  - label: 产品官网
    url: https://zcode.z.ai/
  - label: 代码仓库与运行说明
    url: https://github.com/zai-org/ZCode
  - label: Agent CLI 与扩展文档
    url: https://github.com/zai-org/ZCode/blob/main/apps/zcode-cli/README.md
  - label: 许可证
    url: https://github.com/zai-org/ZCode/blob/main/LICENSE
maintainer: 智谱 Z.ai
form: 开源 Agent Harness、编程工作台与本地 CLI
license: Apache-2.0（ZCode 仓库；第三方组件按各自许可）
reviewedAt: '2026-09-28'
---

## 背景与目标

ZCode 面向代码理解、修改和持续任务执行，将编程 Agent 与工作区管理结合，提供桌面应用、浏览器界面及终端入口。官方公开仓库包含客户端、后端、共享界面以及 Agent CLI 和运行时源码，可作为构建、扩展编程执行系统的起点。[项目说明](https://github.com/zai-org/ZCode)

## 核心能力

- **多种运行入口**：桌面版提供图形工作台，命令行发行包组合终端界面、Web 服务与 Agent，在本机运行。[运行方式](https://github.com/zai-org/ZCode#开发与运行)
- **工具与技能扩展**：插件可包含 Skills、自定义命令和 MCP 配置；CLI 支持连接本地进程或远程 MCP 工具服务。[扩展文档](https://github.com/zai-org/ZCode/blob/main/apps/zcode-cli/README.md)
- **执行事件定制**：Hooks 覆盖会话启动、提示提交、工具调用、权限请求与当前轮次结束，可补充上下文或参与工具执行决策。[Hooks 说明](https://github.com/zai-org/ZCode/blob/main/apps/zcode-cli/README.md#hooks-configuration)
- **长任务组织**：产品通过 Goals 组织复杂目标的规划、执行和验证，并提供远程控制入口。[产品介绍](https://zcode.z.ai/)

## 核心概念与工作方式

界面承担任务交互，后端提供 HTTP / WebSocket 服务，Agent CLI 与运行时负责执行及工具调用。共享协议、客户端和持久化组件连接这些部分；桌面、Web 与终端是同一项目的不同使用入口。[仓库结构](https://github.com/zai-org/ZCode#仓库结构)

插件向运行时提供工具和技能，Hooks 在执行事件发生时调用配置的处理程序。需要扩展 Agent 行为时，可从这些公开入口和运行时源码开始。[CLI 文档](https://github.com/zai-org/ZCode/blob/main/apps/zcode-cli/README.md)

## 使用场景与接入方式

适用于本地代码开发、带自定义工具的编程任务，以及基于公开源码构建工作台。可安装官方客户端，或按仓库说明构建；`zcode` 进入终端界面，`zcode --web` 启动浏览器入口。模型服务接入与客户端运行分别配置，GLM Coding Plan 是模型服务套餐。[官网](https://zcode.z.ai/) · [构建与启动](https://github.com/zai-org/ZCode#初始化)
