---
name: Pi Agent Harness
summary: 可扩展的开源 Agent Harness，提供终端编码 Agent、TypeScript SDK 与 RPC 接口，组合工具执行、会话管理和上下文压缩，可嵌入自有应用。
type: project
topic: runtime-and-orchestration
aliases: ["Pi", "pi-mono", "pi-coding-agent", "pi-agent-core"]
keywords: ["Agent Harness", "Coding Agent", "会话管理", "上下文压缩", "SDK", "RPC"]
role: agent-harness
delivery: library
url: https://pi.dev/docs/latest
anchor: resource-pi
order: 20
links:
  - label: 官网与文档
    url: https://pi.dev/docs/latest
  - label: 代码仓库
    url: https://github.com/earendil-works/pi
  - label: SDK 文档
    url: https://pi.dev/docs/latest/sdk
  - label: RPC 文档
    url: https://pi.dev/docs/latest/rpc
maintainer: Earendil 与社区
form: 开源 Agent Harness、终端 CLI 与可嵌入 SDK
license: MIT
reviewedAt: '2026-09-28'
---

## 背景与目标

Pi 将模型、工具和会话组合成可扩展的 Agent 执行系统。用户可以直接在终端中让它阅读项目、编辑文件和运行命令，也可以复用同一套能力构建自有应用。原 `badlogic/pi-mono` 仓库已迁至 `earendil-works/pi`，代码采用 MIT 许可证。[项目仓库](https://github.com/earendil-works/pi) · [许可证](https://github.com/earendil-works/pi/blob/main/LICENSE)

## 核心能力

- **工具与模型**：提供文件和命令工具，支持多种模型提供方，并允许通过扩展加入工具与自定义行为。
- **会话与上下文**：保存会话历史，支持继续、分支和上下文压缩；SDK 可订阅消息、工具调用及运行生命周期事件。
- **扩展资源**：通过技能、提示词模板和扩展定制任务执行与交互方式。[功能概览](https://pi.dev/docs/latest) · [SDK 文档](https://pi.dev/docs/latest/sdk)

## 核心概念与工作方式

`pi-agent-core` 提供有状态的 Agent 循环、工具执行与事件流；`pi-coding-agent` 在其上组合终端交互、会话和扩展资源。SDK 的 `AgentSession` 管理一次会话中的模型、工具、消息与上下文状态，应用通过提交输入和监听事件驱动执行。[Agent Core](https://github.com/earendil-works/pi/blob/main/packages/agent/README.md) · [会话生命周期](https://pi.dev/docs/latest/sdk)

## 使用场景与接入方式

可用于编码自动化、自定义 Agent 界面及后台任务。TypeScript SDK 将 Pi 嵌入 Node.js 或 Bun 进程；其他语言可通过 RPC 控制常驻子进程，以标准输入输出交换 JSONL 命令和事件。两种方式分别面向进程内集成与跨语言控制，工作目录、工具和会话存储由接入方配置。[SDK 接入](https://pi.dev/docs/latest/sdk) · [RPC 接入](https://pi.dev/docs/latest/rpc)
