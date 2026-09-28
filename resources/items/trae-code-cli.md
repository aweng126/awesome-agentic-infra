---
name: TraeCode CLI
summary: 字节跳动 TRAE 的本地编程 Agent，支持交互式终端、脚本与 CI 非交互执行，通过 ACP 接入编辑器，并提供会话管理、工具扩展和权限控制。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: [TRAE CLI, TraeCode, traecli, 字节编程智能体]
keywords: [Coding Agent, Agent Harness, 编程智能体, ACP, 非交互执行, CI, MCP]
url: https://docs.trae.cn/cli_about-trae-code-cli-2
anchor: resource-trae-code-cli
order: 30
links:
  - label: 产品官网
    url: https://www.trae.cn/
  - label: CLI 概述
    url: https://docs.trae.cn/cli_about-trae-code-cli-2
  - label: 快速开始
    url: https://docs.trae.cn/cli_get-started-with-trae-cli
  - label: 命令行与自动化
    url: https://docs.trae.cn/cli_command-line-parameters
  - label: ACP 接入
    url: https://docs.trae.cn/cli_agent-client-protocol
maintainer: 字节跳动 TRAE 团队
form: 商业编程产品的本地 CLI 与 ACP 服务端
reviewedAt: '2026-09-28'
---

## 背景与目标

TraeCode CLI 将 TRAE 的编程 Agent 能力带到本地终端，围绕项目代码完成理解、修改、命令执行和变更评审。它提供交互式对话与程序化任务入口，方便团队将编程 Agent 接入日常开发和自动化流程。[CLI 概述](https://docs.trae.cn/cli_about-trae-code-cli-2)

## 核心能力

- **代码任务执行**：读取工作区、修改代码、运行项目命令，根据测试结果继续处理任务。[能力介绍](https://docs.trae.cn/cli_about-trae-code-cli-2)
- **非交互自动化**：`traecli exec` 可由脚本和 CI 调用，支持 JSONL 事件输出及按 JSON Schema 约束最终响应。[命令行参数](https://docs.trae.cn/cli_command-line-parameters)
- **会话与运行控制**：支持恢复、分叉会话，配置工具访问、审批与沙箱策略，并可在 Git worktree 中开展任务。[命令行参数](https://docs.trae.cn/cli_command-line-parameters)
- **扩展与编辑器接入**：通过插件、Skills 和 MCP 接入外部能力，通过 ACP 向兼容客户端提供 Agent 执行服务。[概述](https://docs.trae.cn/cli_about-trae-code-cli-2) · [ACP 文档](https://docs.trae.cn/cli_agent-client-protocol)

## 核心概念与工作方式

同一 CLI 可以承担终端交互、一次非交互任务，或编辑器背后的 Agent 服务端。ACP 模式将交互界面与执行进程分开：客户端启动或连接 CLI，由它在工作区内执行任务并返回过程与结果。[ACP 接入](https://docs.trae.cn/cli_agent-client-protocol)

在自动化场景中，调用方传入任务并消费结构化输出；会话、工具范围和运行策略由 CLI 参数及配置控制。[自动化参数](https://docs.trae.cn/cli_command-line-parameters)

## 使用场景与接入方式

适用于代码修复、测试与评审任务、研发流水线和编辑器集成。安装后在项目目录运行 `traecli`，脚本使用 `traecli exec`，ACP 客户端使用 `traecli acp serve`。[快速开始](https://docs.trae.cn/cli_get-started-with-trae-cli) · [ACP 接入](https://docs.trae.cn/cli_agent-client-protocol)

官方文档当前将 CLI 2.0 的使用范围限定为 TRAE 企业版旗舰版套餐客户；接入前需确认账号权限。本条介绍 CLI 的执行能力，TRAE 的 IDE 和插件属于同一产品体系的其他入口。[使用范围](https://docs.trae.cn/cli_about-trae-code-cli-2#使用限制)
