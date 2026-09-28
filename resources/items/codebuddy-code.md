---
name: CodeBuddy Code
summary: 腾讯的本地 Coding Agent CLI，支持无头执行、会话恢复、MCP 与权限控制，并提供 TypeScript、Python Agent SDK 接入研发自动化。
type: project
topic: runtime-and-orchestration
role: agent-harness
delivery: self-hosted
aliases: ["腾讯 CodeBuddy Code", "CodeBuddy CLI", "CodeBuddy Agent SDK"]
keywords: ["Coding Agent", "Agent Harness", "headless", "SDK", "MCP", "会话恢复"]
url: https://www.codebuddy.cn/docs/cli/quickstart
anchor: resource-codebuddy-code
order: 28
links:
  - label: CLI 快速开始
    url: https://www.codebuddy.cn/docs/cli/quickstart
  - label: 无头模式
    url: https://www.codebuddy.cn/docs/cli/headless
  - label: Agent SDK
    url: https://www.codebuddy.cn/docs/cli/sdk
  - label: TypeScript SDK 包
    url: https://www.npmjs.com/package/@tencent-ai/agent-sdk
  - label: 服务条款
    url: https://www.codebuddy.cn/document/term
maintainer: 腾讯
form: 本地 Coding Agent CLI，配套 TypeScript 与 Python SDK
license: MIT（TypeScript Agent SDK 包）；CLI 与云端服务按腾讯服务条款
reviewedAt: '2026-09-28'
---

## 背景与目标

CodeBuddy Code 是腾讯面向终端工作流的 Coding Agent。本条目关注本地 CLI 与其程序化执行接口，开发者可把仓库分析、代码修改和测试任务接入脚本或自己的工具。它与 CodeBuddy IDE、编辑器插件共享产品生态，但接入入口各自独立。[快速开始](https://www.codebuddy.cn/docs/cli/quickstart)

## 核心能力

- **无头执行**：通过 `codebuddy -p` 发起任务，可选择文本、JSON 或流式 JSON 输出，并使用会话 ID 继续任务及配置工具权限。[无头模式](https://www.codebuddy.cn/docs/cli/headless)
- **SDK 控制**：官方提供 TypeScript 与 Python SDK，支持流式消息、多轮会话、Hooks、子 Agent 和 MCP；Agent SDK 当前处于 Preview 阶段。[Agent SDK](https://www.codebuddy.cn/docs/cli/sdk)

## 核心概念与工作方式

SDK 驱动 CLI 执行任务，把消息和工具结果交回应用。应用通过工作目录、模型、权限与会话参数约束运行；SDK 默认不读取文件系统中的用户及项目配置，需要使用 `settingSources` 显式加载，避免把交互终端中的设置自动带入服务程序。[SDK 配置说明](https://www.codebuddy.cn/docs/cli/sdk)

## 使用场景与接入方式

适合自动代码检查、测试修复和企业研发工具集成。可安装 CLI 后登录，再通过命令行或 SDK 使用；接入时需选择对应的国内、国际或企业服务认证方式。[安装与认证](https://www.codebuddy.cn/docs/cli/quickstart)

TypeScript SDK 包标注 MIT；这不代表 CLI、模型及云端服务整体开源，其使用仍应分别查看包内许可和腾讯服务条款。[SDK 包](https://www.npmjs.com/package/@tencent-ai/agent-sdk)、[服务条款](https://www.codebuddy.cn/document/term)
