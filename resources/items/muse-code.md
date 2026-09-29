---
name: Muse Code
summary: Meta 面向终端与 CI 的编程 Agent，提供本地执行、审批和沙箱，并通过会话协议及 SDK 支持应用驱动、任务控制与会话恢复。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: [Meta Muse Code, Muse Code SDK]
keywords: [Agent Harness, Coding Agent, 编程智能体, CLI, MSP, 会话协议, SDK]
url: https://dev.meta.ai/docs/muse-code
anchor: resource-muse-code
order: 31
links:
  - label: 官方文档与安装
    url: https://dev.meta.ai/docs/muse-code
  - label: SDK 与会话协议
    url: https://meta-models.github.io/muse-code-sdk/next/
  - label: 扩展与 CI 接入
    url: https://dev.meta.ai/docs/muse-code/extending
  - label: 权限与沙箱
    url: https://dev.meta.ai/docs/muse-code/permissions
maintainer: Meta
form: 本地编程 Agent CLI、会话协议与 SDK
reviewedAt: '2026-09-29'
---

## 背景与目标

Muse Code 将 Muse 模型接入项目目录，完成规划、修改文件与命令执行，面向终端开发和 CI 自动化。它提供可直接运行的编程 Agent，也允许其他应用控制 Agent 会话；模型 API 则用于开发者自行构建应用或执行系统。[产品概览](https://dev.meta.ai/docs/muse-code)

## 核心能力

- **受控执行**：默认启用审批和操作系统沙箱，分别控制工具调用决策、文件写入及网络访问。[权限说明](https://dev.meta.ai/docs/muse-code/permissions)
- **工具与任务扩展**：支持 Skills、Hooks、MCP 和子 Agent；`muse exec` 可在脚本或 CI 中执行任务并输出事件。[扩展与自动化](https://dev.meta.ai/docs/muse-code/extending)
- **程序化会话**：TypeScript 和 Python SDK 提供启动会话、提交任务、读取流式结果、处理审批、取消与恢复会话的接入路径。[SDK 快速开始](https://meta-models.github.io/muse-code-sdk/next/guides/quickstart/)

## 核心概念与工作方式

应用启动 `muse serve` 进程，通过 Muse Session Protocol（MSP）交互。协议基于标准输入输出传递 JSON-RPC 消息，区分客户端命令、执行事件和审批等请求；SDK 封装客户端连接，实际执行由本机的 `muse` 程序承担。[会话协议](https://meta-models.github.io/muse-code-sdk/next/guides/msp-concepts/)

开发者文档目前标为 Developer Preview，MSP 处于 pre-1.0 阶段。集成时需要匹配 SDK、主机程序与协议版本，`serve` 的可用性也受安装版本的实验功能开关影响。[文档状态](https://meta-models.github.io/muse-code-sdk/next/) · [接入要求](https://meta-models.github.io/muse-code-sdk/next/guides/quickstart/)

## 使用场景与接入方式

适用于交互式代码修改、持续集成任务，以及编辑器或自有工作台中的编程执行。官方提供 macOS、Linux 与 Windows 安装入口；在项目中运行 `muse` 并完成登录，或为自动化环境配置 API Key。需要程序化控制时，安装 SDK 并连接本机执行程序。[安装与认证](https://dev.meta.ai/docs/muse-code) · [SDK 文档](https://meta-models.github.io/muse-code-sdk/next/)
