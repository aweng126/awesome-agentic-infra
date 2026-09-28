---
name: Kimi Code CLI
summary: 月之暗面的开源本地 Coding Agent，提供工具执行、子 Agent、非交互命令和 ACP，并通过实验性本地 API 暴露会话控制能力。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: ["Kimi CLI", "kimi-cli", "kimi-code"]
keywords: ["Coding Agent", "Agent Harness", "ACP", "headless", "会话", "Hooks"]
url: https://github.com/MoonshotAI/kimi-code
anchor: resource-kimi-code
order: 27
links:
  - label: 官方仓库
    url: https://github.com/MoonshotAI/kimi-code
  - label: 官方文档
    url: https://moonshotai.github.io/kimi-code/en/
  - label: 命令参考
    url: https://moonshotai.github.io/kimi-code/en/reference/kimi-command
  - label: 本地 Server API
    url: https://moonshotai.github.io/kimi-code/en/reference/server-api.html
  - label: 旧版迁移说明
    url: https://moonshotai.github.io/kimi-code/en/guides/migration.html
maintainer: Moonshot AI（月之暗面）与社区
form: 开源本地 Coding Agent 与 ACP 服务端
license: MIT（CLI 源码）；模型与云端服务分别适用其条款
reviewedAt: '2026-09-28'
---

## 背景与目标

Kimi Code CLI 在本地仓库中读取和修改代码、执行 Shell 命令，并根据工具反馈推进任务。当前维护入口为 `MoonshotAI/kimi-code`；旧 Python 实现 `MoonshotAI/kimi-cli` 已归档，新版转向 Node.js 实现并提供独立安装包。[官方仓库](https://github.com/MoonshotAI/kimi-code)、[旧仓库声明](https://github.com/MoonshotAI/kimi-cli)

## 核心能力

- **执行与协作**：通过子 Agent 分担探索、规划和编码任务，以 MCP、插件和技能接入工具，并使用生命周期 Hooks 扩展审批或审计行为。[能力说明](https://github.com/MoonshotAI/kimi-code)
- **自动化入口**：`kimi -p` 支持非交互任务及流式 JSON 输出；`kimi acp` 将会话暴露给支持 ACP 的编辑器或客户端。[命令参考](https://moonshotai.github.io/kimi-code/en/reference/kimi-command)

## 核心概念与工作方式

会话保存任务上下文，执行循环选择工具、接收结果并继续推理。`kimi web` 启动本地服务，同时提供 REST API 和 WebSocket 事件流，外部程序可以创建或驱动会话；这些接口仍属实验性，应以实际运行版本的 OpenAPI、AsyncAPI 定义为准。[Server API](https://moonshotai.github.io/kimi-code/en/reference/server-api.html)

## 使用场景与接入方式

适合本地研发、脚本中的代码分析，以及通过 ACP 将同一执行引擎接入不同编辑器。安装后配置模型凭证，再选择交互、非交互或本地服务入口。旧用户可用 `kimi migrate` 迁移配置、MCP 设置和会话历史，但登录授权需重新完成；模型订阅与 CLI 项目分别管理。[迁移指南](https://moonshotai.github.io/kimi-code/en/guides/migration.html)
