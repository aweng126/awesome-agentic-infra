---
name: Paperclip
summary: 组织级多 Agent 协作平台，提供任务分配与委派、事件唤醒、审批和预算管理，通过 Adapter 对接已有 Agent Runtime 并衔接跨运行会话。接入方式见 [Adapter 文档](https://docs.paperclip.ing/reference/adapters/overview/)。
type: project
topic: runtime-and-orchestration
aliases: ["Paperclip AI"]
keywords: ["组织协作", "多 Agent", "任务委派", "审批", "预算", "Heartbeat", "Adapter"]
role: collaboration-platform
delivery: self-hosted
url: https://github.com/paperclipai/paperclip
anchor: resource-paperclip
order: 7
links:
  - label: 官网
    url: https://paperclip.ing/
  - label: 代码仓库
    url: https://github.com/paperclipai/paperclip
  - label: 文档
    url: https://docs.paperclip.ing/
  - label: 快速开始
    url: https://docs.paperclip.ing/guides/getting-started/five-minute-path/
  - label: Adapter 文档
    url: https://docs.paperclip.ing/reference/adapters/overview/
maintainer: Paperclip Labs 与社区
form: 开源组织级 Agent 协作平台
license: MIT
---

## 背景与目标

Paperclip 面向同时管理多个 Agent 的场景，把目标、成员职责、任务进展和成本放进同一个工作界面。项目提供 Node.js 服务端与 React 界面，让用户为已有 Agent 分配工作、观察产出并参与审批。[项目介绍](https://github.com/paperclipai/paperclip)

在本仓库的分类中，它位于运行时与编排的组织协作层：管理谁承担任务、何时执行及如何审查结果，实际模型推理和工具执行由接入的 Agent Runtime 承担。[Adapter 职责](https://docs.paperclip.ing/reference/adapters/overview/)

## 核心能力

- **目标与任务管理**：使用 Company、Project、Goal 和任务关联工作背景，让任务分配与组织目标保持联系。[核心概念](https://docs.paperclip.ing/guides/welcome/key-concepts/)
- **成员与运行协调**：为 Agent 设置角色和汇报关系，通过 Heartbeat 唤醒处理工作，并记录每次运行的结果及会话信息。[核心概念](https://docs.paperclip.ing/guides/welcome/key-concepts/)
- **审批与预算**：提供审批关口、成本记录及 Agent 预算，用户可以检查进度、干预工作或暂停成员。[项目能力](https://github.com/paperclipai/paperclip)
- **多种执行端接入**：通过 Adapter 连接本地 Agent、命令行程序或 HTTP 服务，也支持独立开发适配插件。[Adapter 文档](https://docs.paperclip.ing/reference/adapters/overview/)

## 核心概念与工作方式

Company 是一组目标、成员、任务和预算的组织边界，Agent 是其中承担职责的成员；一次 Heartbeat 对应一次唤醒和执行机会。任务板保存工作上下文，用户可以看到任务分配、评论和产出，而不必只依赖某个终端中的对话。[核心概念](https://docs.paperclip.ing/guides/welcome/key-concepts/)

Adapter 在运行前检查环境，启动或调用实际执行端，传递任务与唤醒上下文，再收集结果、会话状态和使用量。执行端如何启动及继续会话，由具体适配器实现。[Adapter 文档](https://docs.paperclip.ing/reference/adapters/overview/)

## 使用场景与接入方式

适合把多个编程或业务 Agent 组织为持续协作团队，也可用于需要审批和费用可见性的自动化工作。安装服务后，创建 Company、配置成员及其 Adapter，设置目标与预算，再从任务板发起工作；官方入门示例从创建组织和首位负责协调的 Agent 开始。[快速开始](https://docs.paperclip.ing/guides/getting-started/five-minute-path/)
