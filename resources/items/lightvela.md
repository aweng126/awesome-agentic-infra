---
name: LightVela
summary: 腾讯轻量云团队的托管个人 Agent 产品，在云端持续运行 Hermes Agent，通过网页和聊天软件接收任务，支持长期记忆、技能扩展与定时执行。
type: project
topic: runtime-and-orchestration
role: agent-product
delivery: managed
aliases: [腾讯 LightVela, 云端 Hermes Agent]
keywords: [Personal Agent, 通用 Agent, Hermes Agent, 长期记忆, 定时任务, 聊天通道]
url: https://lightvela.com/
anchor: resource-lightvela
order: 43
links:
  - label: 产品官网
    url: https://lightvela.com/
  - label: 产品介绍
    url: https://lightvela.com/docs/overview
  - label: 配置文档
    url: https://lightvela.com/docs/configuration
  - label: 更新日志
    url: https://lightvela.com/changelog
maintainer: 腾讯轻量云团队
form: 托管个人 Agent 服务与可视化管理台
status:
  label: 中国站正式上线，提供订阅服务
  source: https://lightvela.com/changelog
  checked: '2026-09-30'
reviewedAt: '2026-09-30'
---

## 背景与目标

LightVela 面向希望直接使用个人 Agent、无需自行管理服务器的用户。腾讯轻量云团队将 Hermes Agent 的部署、运行与维护整合为托管服务，用户通过网页配置自己的 Agent，再从日常聊天软件交付任务。[产品介绍](https://lightvela.com/docs/overview)

## 核心能力

- **持续在线与记忆**：Agent 在专属云端环境中持续运行，保留跨会话记忆与文件，不依赖个人电脑保持开机。[产品介绍](https://lightvela.com/docs/overview)
- **多入口交互**：支持网页对话，以及微信、QQ、企业微信、飞书、钉钉等聊天通道；管理台提供通道测试和运行诊断。[配置文档](https://lightvela.com/docs/configuration)
- **可配置的任务能力**：选择模型、安装技能、调整人设，并设置按计划执行的任务。定时任务还支持直接发送通知或运行预设脚本。[配置文档](https://lightvela.com/docs/configuration)、[更新日志](https://lightvela.com/changelog)
- **多个专用 Bot**：在同一个云端 Agent 中配置不同用途的 Bot，各自维护记忆、技能、定时任务、模型和通道配置。[更新日志](https://lightvela.com/changelog)

## 核心概念与工作方式

**LightVela** 提供托管产品和管理界面，**Hermes Agent** 是其托管运行的 Agent，**模型**负责推理与生成，**通道**连接用户所在的聊天软件。用户可以使用套餐提供的模型能力，也可以配置自己的模型服务；技能用于扩展任务能力。[产品介绍](https://lightvela.com/docs/overview)

管理台围绕具体 Bot 组织配置。首次使用先确认模型可用，再连接聊天通道并验证消息收发，之后按需补充技能、人设、记忆与定时任务。[配置文档](https://lightvela.com/docs/configuration)

## 使用场景与接入方式

适用于个人资料整理、定期信息汇总、提醒与日常事务处理。用户从 [产品官网](https://lightvela.com/) 开通服务，通过网页或已连接的聊天软件使用，模型和任务配置在管理台维护。[配置文档](https://lightvela.com/docs/configuration)

中国站已正式上线并提供订阅服务，首次开通需要完成实名认证。产品面向直接使用云端 Agent 的用户；官方介绍将“把 Agent 集成到自有网站或应用”列为当前不适合的场景。[产品介绍](https://lightvela.com/docs/overview)、[更新日志](https://lightvela.com/changelog)
