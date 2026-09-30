---
name: OpenAI Dots
summary: ChatGPT 中持续处理事务的个人 Agent，结合记忆、云电脑、应用连接与后台任务，在多轮交流之间推进工作，并可委派 ChatGPT Work 或 Codex 执行任务。
type: project
topic: runtime-and-orchestration
role: agent-product
delivery: managed
aliases: [Dots, ChatGPT Dots, OpenAI 个人 Agent]
keywords: [Personal Agent, 通用 Agent, 个人助理, 持续任务, 云电脑, 后台任务, 托管服务]
url: https://learn.chatgpt.com/docs/dots
anchor: resource-openai-dots
order: 42
links:
  - label: 产品概览
    url: https://learn.chatgpt.com/docs/dots
  - label: 入门文档
    url: https://learn.chatgpt.com/docs/dots/getting-started
  - label: 任务与记忆
    url: https://learn.chatgpt.com/docs/dots/tasks-and-memory
  - label: 权限与运行控制
    url: https://learn.chatgpt.com/docs/dots/controls
maintainer: OpenAI
form: ChatGPT 内的托管个人 Agent
status:
  label: 向符合条件的账户逐步开放
  source: https://learn.chatgpt.com/docs/dots#access
  checked: '2026-09-30'
reviewedAt: '2026-09-30'
---

## 背景与目标

Dots 是 ChatGPT 中面向持续事务的个人 Agent。用户可以交给它一项长期职责，例如跟进项目或准备会议材料，之后继续补充信息、调整方向，由同一个 dot 接续工作。[官方更新介绍](https://learn.chatgpt.com/docs/whats-new/september-28-october-2-2026)

## 核心能力

- **持续任务与记忆**：结合相关 ChatGPT 记忆和自身保存的笔记跟进工作，支持定时任务及受支持的事件触发。[任务与记忆](https://learn.chatgpt.com/docs/dots/tasks-and-memory)
- **云端执行与应用连接**：拥有云电脑和浏览器，通过插件使用已授权应用；也可连接用户电脑处理本地文件、代码与应用。[入门文档](https://learn.chatgpt.com/docs/dots/getting-started)
- **并行与委派**：将工作拆给后台 Agent，也可委派 ChatGPT Work 或 Codex。用户在 Activity 中查看进度、产物和需要介入的事项。[任务与记忆](https://learn.chatgpt.com/docs/dots/tasks-and-memory)

## 核心概念与工作方式

dot 是持续的任务交互入口，在 ChatGPT、Slack 或 Teams 中联系的是同一个 Agent。其云端任务可以在用户电脑关闭时继续；涉及本地执行时，连接的电脑需要在线并保持 ChatGPT 应用开启。[产品概览](https://learn.chatgpt.com/docs/dots)

用户通过对话设定职责，在 Activity 和 Scheduled 中管理执行与计划。涉及账户操作或信息共享时，系统依据指令、权限与规则进行操作审查，并在需要时请求用户决定。[运行控制](https://learn.chatgpt.com/docs/dots/controls)

## 使用场景与接入方式

适用于持续资料整理、项目跟进及需要多次补充信息的个人工作。在 ChatGPT 桌面应用或桌面浏览器中创建 dot，再连接所需应用和联系渠道；本地电脑连接是可选项。[开始使用](https://learn.chatgpt.com/docs/dots/getting-started)

Dots 通过 ChatGPT 提供产品入口，并按账户条件逐步开放。工作区还可能需要管理员启用，具体计划、地区与客户端要求见[开放范围](https://learn.chatgpt.com/docs/dots#access)。
