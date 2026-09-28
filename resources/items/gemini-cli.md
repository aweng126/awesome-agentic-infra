---
name: Gemini CLI
summary: Google 开源的终端 Agent，组合 Gemini 模型、文件与命令工具、项目上下文和会话管理，可通过 Headless 模式接入脚本与自动化流程。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: ["Google Gemini CLI", "gemini-cli"]
keywords: ["Coding Agent", "Agent Harness", "Headless", "会话恢复", "MCP", "终端"]
url: https://github.com/google-gemini/gemini-cli
anchor: resource-gemini-cli
order: 24
links:
  - label: 官网与文档
    url: https://geminicli.com/docs/
  - label: 代码仓库
    url: https://github.com/google-gemini/gemini-cli
  - label: 快速开始
    url: https://geminicli.com/docs/get-started/
  - label: Headless 接口
    url: https://geminicli.com/docs/cli/headless/
maintainer: Google 与开源社区
form: 开源终端 Agent 与可程序化调用的 CLI
license: Apache-2.0（CLI）
reviewedAt: '2026-09-28'
---

## 背景与目标

Gemini CLI 把 Gemini 的模型能力带入开发者终端，面向代码理解、修改、调试及工作流自动化。它将模型调用、文件操作和命令执行组合成可直接使用的 Agent，也支持由外部脚本发起任务。CLI 采用 Apache-2.0 许可；模型访问通过配置的 Google 服务完成。[官方仓库](https://github.com/google-gemini/gemini-cli)

## 核心能力

- **代码与工具执行**：读取、编辑代码，运行 Shell 命令，使用搜索和网页获取工具，并通过 MCP 扩展外部能力。[能力概览](https://github.com/google-gemini/gemini-cli)
- **项目上下文与会话**：通过 `GEMINI.md` 提供项目指令，支持浏览历史会话、恢复对话及回退修改。[项目介绍](https://github.com/google-gemini/gemini-cli) · [会话管理](https://geminicli.com/docs/cli/tutorials/session-management/)
- **程序化调用**：Headless 模式返回文本、JSON 结果或 JSONL 事件流，便于调用方跟踪消息、工具请求和执行结果。[接口说明](https://geminicli.com/docs/cli/headless/)

## 核心概念与工作方式

交互模式在项目目录中接收任务，结合项目上下文调用工具，并支持用户继续补充指令。需要恢复工作时，可选择历史会话重新加载对话。[快速开始](https://geminicli.com/docs/get-started/) · [会话管理](https://geminicli.com/docs/cli/tutorials/session-management/)

程序调用使用同一个 CLI：传入 `-p` 提示词或在非交互终端中运行，便进入 Headless 模式。外部程序通过标准输出和退出码获取结果，无需驱动终端界面。[Headless 模式](https://geminicli.com/docs/cli/headless/)

## 使用场景与接入方式

适合本地开发辅助、代码库分析，以及脚本和 CI 中的 Agent 任务。安装 CLI 后，配置 Google 账户、Gemini API 或 Vertex AI 认证；交互任务直接运行 `gemini`，自动化任务按需选择结构化输出。[安装与认证](https://github.com/google-gemini/gemini-cli) · [上手指南](https://geminicli.com/docs/get-started/)
