---
name: GitHub Copilot SDK（Copilot CLI）
summary: 将 Copilot CLI 的 Agent 执行能力开放给应用的多语言 SDK，支持会话、流式事件、自定义工具和 MCP，复用任务规划与工具执行能力。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: library
aliases: ["GitHub Copilot", "Copilot SDK", "Copilot CLI", "github/copilot-sdk"]
keywords: ["Coding Agent", "Agent Harness", "Agent SDK", "会话", "JSON-RPC", "MCP"]
url: https://github.com/github/copilot-sdk
anchor: resource-github-copilot
order: 25
links:
  - label: SDK 代码仓库
    url: https://github.com/github/copilot-sdk
  - label: SDK 文档
    url: https://docs.github.com/en/copilot/how-tos/copilot-sdk
  - label: SDK 快速开始
    url: https://github.com/github/copilot-sdk/blob/main/docs/getting-started.md
  - label: Copilot CLI 文档
    url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
  - label: CLI 许可
    url: https://github.com/github/copilot-cli/blob/main/LICENSE.md
maintainer: GitHub
form: 多语言 SDK 与 Copilot CLI 运行组件
license: MIT（SDK）；CLI 使用独立产品许可
status:
  label: SDK 已正式发布
  source: https://github.com/github/copilot-sdk#is-the-sdk-production-ready
  checked: '2026-09-28'
reviewedAt: '2026-09-28'
---

## 背景与目标

GitHub Copilot SDK 将 Copilot CLI 背后的 Agent 运行能力提供给应用开发者，复用其任务规划、工具调用与文件修改能力。CLI 是面向终端用户的入口，SDK 则支持把同类执行能力集成到自己的应用与服务。[官方仓库](https://github.com/github/copilot-sdk)

SDK 采用 MIT 许可；CLI 使用独立的产品许可，接入的模型与服务另有相应条款。SDK 开源不等于整个 Copilot 产品开源。[SDK 许可](https://github.com/github/copilot-sdk/blob/main/LICENSE) · [CLI 许可](https://github.com/github/copilot-cli/blob/main/LICENSE.md)

## 核心能力

- **会话与事件**：创建会话、发送任务，并订阅流式消息，在应用中展示执行结果。[快速开始](https://github.com/github/copilot-sdk/blob/main/docs/getting-started.md)
- **工具扩展**：注册自己的工具处理函数或接入 MCP，配置自定义 Agent、Skills 及权限处理逻辑。[能力概览](https://github.com/github/copilot-sdk)
- **多语言接入**：提供 TypeScript、Python、Go、.NET、Java 与 Rust SDK。[SDK 列表](https://github.com/github/copilot-sdk)

## 核心概念与工作方式

常规接入由应用调用 SDK，SDK 通过 JSON-RPC 与服务模式的 Copilot CLI 通信，并管理 CLI 进程生命周期。应用创建 Session，配置模型、工具和权限；SDK 将任务交给运行组件，并把消息与工具调用事件交回应用。[架构说明](https://github.com/github/copilot-sdk) · [入门示例](https://github.com/github/copilot-sdk/blob/main/docs/getting-started.md)

也可以连接独立运行的 CLI 服务，或按官方支持方式在应用进程中加载运行组件。[部署方式](https://docs.github.com/en/copilot/how-tos/copilot-sdk/setup)

## 使用场景与接入方式

适合内部开发助手、后台自动化和带工具的业务应用。安装对应语言 SDK，完成认证后创建会话；模型访问可使用 Copilot 账户，也可按 BYOK 配置支持的模型提供方。仅需一次性脚本任务时，可直接使用 CLI 的程序化模式。[SDK 接入](https://github.com/github/copilot-sdk) · [CLI 使用方式](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)
