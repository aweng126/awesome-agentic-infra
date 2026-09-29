---
name: Meta Muse
summary: Meta 的托管个人 Agent，结合专属云端运行环境、长期记忆、浏览器与连接器，持续推进日常任务，并提供操作审批和活动记录。
type: project
topic: runtime-and-orchestration
role: agent-product
delivery: managed
aliases: [Muse, Meta 个人 Agent]
keywords: [Personal Agent, 通用 Agent, 后台任务, Muse Secure VM, Muse Spark, 连接器]
url: https://muse.ai/
anchor: resource-meta-muse
order: 40
links:
  - label: 产品官网
    url: https://muse.ai/
  - label: 官方发布
    url: https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
  - label: 产品设计说明
    url: https://introducing.muse.ai/
  - label: 运行环境与安全说明
    url: https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse
  - label: 连接器平台
    url: https://muse.ai/platform
maintainer: Meta
form: 托管个人 Agent 应用与连接器平台
reviewedAt: '2026-09-29'
---

## 背景与目标

Muse 是 Meta 于 2026 年 9 月发布的个人 Agent，面向日常事务与长期目标。用户通过对话交付任务，由它协调已连接的应用、浏览网页并推进工作，关闭应用后任务仍可继续。[Meta 官方发布](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)

## 核心能力

- **持续任务**：同时处理多个目标，按计划或相关事件继续工作，在需要输入或有新进展时通知用户。[产品设计说明](https://introducing.muse.ai/)
- **记忆与产物**：保留跨对话记忆，生成文档、网页等产物，并提供目标进度和活动记录。[产品设计说明](https://introducing.muse.ai/)
- **跨应用操作**：通过连接器、浏览器和终端执行任务，用户控制授权范围及敏感操作。[运行环境与安全说明](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)

## 核心概念与工作方式

**Muse** 是面向用户的完整产品；**Muse Spark** 是支持其推理与行动的模型；**Muse Secure VM** 是承载 Agent、数据和工具的专属云端环境。[Meta 官方发布](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)

Secure VM 内的 Hatch Harness 负责 Agent 执行，Sentinel 管理对外操作权限，凭据保存在与执行环境隔离的服务中。这些组件共同支撑 Muse 的托管运行。[运行环境与安全说明](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)

## 使用场景与接入方式

适用于日程协调、旅行安排、资料整理与长期个人计划，可从 Muse 应用、网页或 WhatsApp 交互入口使用。[Meta 官方发布](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)

服务提供方可向 **Muse Connector Platform** 提交连接器，通过审核后供用户在目录中发现。该入口用于把外部服务接入 Muse；Secure VM 则作为 Muse 产品的运行环境交付。[连接器平台](https://muse.ai/platform)
