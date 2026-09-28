---
name: Qwen Code
summary: 阿里 Qwen 团队的开源 Coding Agent，提供本地执行循环、工具与会话管理，可通过非交互 CLI、SDK 和 ACP 接入自动化流程。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: ["Qwen Code CLI", "qwen-code"]
keywords: ["Coding Agent", "Agent Harness", "headless", "SDK", "ACP", "子 Agent"]
url: https://github.com/QwenLM/qwen-code
anchor: resource-qwen-code
order: 26
links:
  - label: 官方仓库
    url: https://github.com/QwenLM/qwen-code
  - label: 官方文档
    url: https://qwenlm.github.io/qwen-code-docs/en/users/overview/
  - label: TypeScript SDK
    url: https://qwenlm.github.io/qwen-code-docs/en/developers/sdk-typescript/
  - label: Python SDK
    url: https://github.com/QwenLM/qwen-code/blob/main/docs/developers/sdk-python.md
maintainer: 阿里 Qwen 团队与社区
form: 开源本地 Coding Agent，附程序化 SDK
license: Apache-2.0（CLI 与 TypeScript SDK）；模型与外部服务分别适用其条款
reviewedAt: '2026-09-28'
---

## 背景与目标

Qwen Code 将模型调用、仓库上下文和工具执行组织成完整的编码任务循环，可在终端、编辑器或自动化程序中运行。它最初基于 Gemini CLI，后续独立演进；Qwen Code 是执行框架，Qwen Coder 则是可供其调用的模型系列。[官方仓库](https://github.com/QwenLM/qwen-code)

## 核心能力

- **任务执行与扩展**：支持子 Agent、技能、MCP、Hooks 和会话管理，在读取代码、修改文件及执行命令之间持续处理任务反馈。[能力概览](https://github.com/QwenLM/qwen-code)
- **程序化接入**：提供非交互 CLI 及 TypeScript、Python、Java SDK。TypeScript SDK 可接收流式消息、控制会话并自定义工具审批，官方将该 SDK 标为实验性。[SDK 文档](https://qwenlm.github.io/qwen-code-docs/en/developers/sdk-typescript/)

## 核心概念与工作方式

CLI 承担工作区中的 Agent 执行，SDK 将提示、模型选择、权限与 MCP 配置传给执行进程，再消费助手消息和最终结果。TypeScript SDK 默认使用随包提供的 CLI；Python SDK 当前依赖外部 `qwen` 可执行文件。[TypeScript SDK](https://qwenlm.github.io/qwen-code-docs/en/developers/sdk-typescript/)、[Python SDK](https://github.com/QwenLM/qwen-code/blob/main/docs/developers/sdk-python.md)

## 使用场景与接入方式

适合仓库维护、测试修复及 CI 中的批量编码任务。可在项目目录运行 `qwen`，通过 `qwen -p` 发起非交互任务，或把 SDK 嵌入自己的开发工具；官方也提供 ACP 与实验性服务模式入口。[使用入口](https://github.com/QwenLM/qwen-code)
