---
name: Manus Cue
summary: Manus 的托管个人 Agent 产品，为 Agent 配备邮箱、电话号码、钱包与电脑，支持独立执行任务及在群聊中围绕共同目标分工协作。
type: project
topic: runtime-and-orchestration
role: agent-product
delivery: managed
aliases: [Cue, Manus 个人 Agent]
keywords: [Personal Agent, 通用 Agent, 个人助理, 多 Agent 协作, 群聊, 托管服务]
url: https://cue.im/
anchor: resource-manus-cue
order: 41
links:
  - label: 产品官网
    url: https://cue.im/
  - label: Manus 2.0 与 Cue 发布介绍
    url: https://manus.im/blog/introducing-manus-2-0
  - label: Cue 使用说明
    url: https://help.manus.im/zh-CN/articles/17190150-manus-2-0-%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E5%8A%9F%E8%83%BD
  - label: Manus Agents API
    url: https://open.manus.ai/docs/v2/agents-overview
maintainer: Manus
form: 托管个人 Agent 应用
status:
  label: 早期访问，需要邀请码
  source: https://manus.im/blog/introducing-manus-2-0
  checked: '2026-09-29'
reviewedAt: '2026-09-29'
---

## 背景与目标

Cue 是 Manus 推出的独立个人 Agent 应用，与 Manus 共用基础设施。它面向直接委派任务的用户，将通信身份、执行电脑和协作入口组合成可以使用的个人助理。[发布介绍](https://manus.im/blog/introducing-manus-2-0)

## 核心能力

- **独立身份与执行环境**：每个 Agent 拥有邮箱、电话号码、钱包与电脑，能够代表用户处理通信和任务。[Cue 使用说明](https://help.manus.im/zh-CN/articles/17190150-manus-2-0-%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E5%8A%9F%E8%83%BD)
- **预算内行动**：用户设定支付预算，Agent 在该范围内支付；还可接听用户来电并在 Cue 中留下摘要。[发布介绍](https://manus.im/blog/introducing-manus-2-0)
- **围绕目标协作**：多个 Agent 在群聊中分工并移交工作，用户负责设定方向、查看进度及最终决定。[Cue 使用说明](https://help.manus.im/zh-CN/articles/17190150-manus-2-0-%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E5%8A%9F%E8%83%BD)

## 核心概念与工作方式

用户可以保留一个日常助理，也可以建立 Agent 团队，让调研、筛选和材料整理等步骤由不同成员接续完成。例如筹备活动时，一个 Agent 调研场地，另一个整理候选名单，第三个撰写演示材料；用户从手机跟踪进度。Cue 提供任务交互与协作产品界面。[帮助中心](https://help.manus.im/zh-CN/articles/17190150-manus-2-0-%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%B0%E5%8A%9F%E8%83%BD)

Manus 将 Cascade 称为内部 Agent Harness，用于按项目需要引入专业能力。Cue 是用户使用的产品，Cascade 是内部执行系统的名称。[架构介绍](https://manus.im/blog/introducing-manus-2-0)

## 使用场景与接入方式

适用于个人事务、提醒、资料调研，以及需要多个 Agent 分工的任务。通过 [Cue 官网](https://cue.im/) 进入产品；目前处于需要邀请码的早期访问阶段。[开放情况](https://manus.im/blog/introducing-manus-2-0)

需要程序化集成 Manus 时，可另查阅其 Agents API：接口支持列出、查看 Agent 及更新昵称和描述；主任务承载持续会话，执行中产生的子任务可以分别发送消息、读取回复和停止。这是 Manus 的开发者接入入口。[API 文档](https://open.manus.ai/docs/v2/agents-overview)
