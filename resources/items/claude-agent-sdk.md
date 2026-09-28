---
name: Claude Agent SDK（Claude Code）
summary: 将 Claude Code 的执行循环、内置工具和上下文管理开放给 Python 与 TypeScript 应用，提供会话、权限、Hooks、MCP 与子 Agent 接口。
type: project
topic: runtime-and-orchestration
aliases: ["Claude Code SDK", "Claude Agent", "Claude Code"]
keywords: ["Agent Harness", "Coding Agent", "会话管理", "权限控制", "Hooks", "MCP"]
role: agent-harness
delivery: library
url: https://code.claude.com/docs/en/agent-sdk/overview
anchor: resource-claude-agent-sdk
order: 22
links:
  - label: 官方文档
    url: https://code.claude.com/docs/en/agent-sdk/overview
  - label: 快速开始
    url: https://code.claude.com/docs/en/agent-sdk/quickstart
  - label: Python SDK 仓库
    url: https://github.com/anthropics/claude-agent-sdk-python
  - label: TypeScript SDK 仓库
    url: https://github.com/anthropics/claude-agent-sdk-typescript
maintainer: Anthropic
form: 运行 Claude Code 执行组件的 Python / TypeScript SDK
license: Python SDK 源码为 MIT；Agent SDK 使用受 Anthropic 商业条款约束，各组件许可分别适用
reviewedAt: '2026-09-28'
---

## 背景与目标

Claude Agent SDK 将 Claude Code 使用的 Agent 循环、工具和上下文管理提供给应用开发者，支持以 Python 或 TypeScript 构建能够读写文件、执行命令和完成多步任务的 Agent。SDK 在开发者运行的进程环境中调用 Claude Code 执行组件。[产品概览](https://code.claude.com/docs/en/agent-sdk/overview)

## 核心能力

- **执行与上下文**：内置文件操作、命令执行等工具，由执行循环处理模型调用、工具结果与上下文。
- **会话与控制**：支持继续或分支会话，通过权限配置和 Hooks 控制工具使用及运行行为。
- **能力扩展**：接入自定义工具、MCP、技能和子 Agent，流式返回消息与任务结果。[能力说明](https://code.claude.com/docs/en/agent-sdk/overview)

## 核心概念与工作方式

应用通过 `query` 等接口提交输入及运行配置，消费异步消息流；SDK 调用 Claude Code 执行程序，由后者运行工具与 Agent 循环。Python 和 TypeScript 安装包在支持的平台上随包提供所需执行程序，也允许配置已有安装。[快速开始](https://code.claude.com/docs/en/agent-sdk/quickstart)

Python SDK 仓库源码采用 MIT；TypeScript SDK 仓库注明使用受 Anthropic 商业条款约束。官方同样为 Agent SDK 使用规定商业条款，具体组件另有许可证时分别适用。[Python 许可](https://github.com/anthropics/claude-agent-sdk-python/blob/main/LICENSE) · [TypeScript 条款](https://github.com/anthropics/claude-agent-sdk-typescript/blob/main/LICENSE.md)

## 使用场景与接入方式

可用于代码维护、文件处理和业务任务自动化。在自有应用中安装对应 SDK，配置模型访问凭证、工作目录和工具权限，再接收执行消息。Agent SDK 是程序化接入入口；终端交互使用 Claude Code CLI，官方托管执行则属于另一项 Managed Agents 服务。[接入与产品边界](https://code.claude.com/docs/en/agent-sdk/overview)
