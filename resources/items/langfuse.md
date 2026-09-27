---
name: Langfuse
summary: LLM 应用观测与评估平台，提供执行追踪、数据集和提示词管理，可将模型调用、检索和 Agent 操作关联到同一次执行。
type: project
topic: observability-and-evaluation
url: https://github.com/langfuse/langfuse
anchor: resource-langfuse
order: 1
links:
  - label: 代码仓库
    url: https://github.com/langfuse/langfuse
  - label: 官网
    url: https://langfuse.com/
  - label: 观测文档
    url: https://langfuse.com/docs/observability/overview
  - label: 自托管文档
    url: https://langfuse.com/self-hosting
maintainer: Langfuse 团队（ClickHouse）与社区
form: 可自托管的观测与评估平台，另提供云服务
license: MIT（核心）；EE 目录使用独立许可
---

## 背景与目标

Langfuse 面向 LLM 应用开发和运行中的观测需求：一次回答可能经过多次模型请求、检索和工具调用，仅查看最终文本难以知道各环节发生了什么。它把执行过程组织成可浏览的记录，并连接提示词管理、数据集和评估流程。[观测概览](https://langfuse.com/docs/observability/overview)

## 核心能力

- **执行追踪**：记录模型调用、工具步骤、输入输出、耗时和 Token 使用量，查看一次任务中的调用关系。[观测概览](https://langfuse.com/docs/observability/overview)
- **评估与反馈**：支持模型评分、代码评估、人工标注和用户反馈，将质量信息关联到执行记录。[评估说明](https://langfuse.com/docs/evaluation/overview)
- **提示词与数据集管理**：保存提示词版本，组织测试数据并开展实验，为应用修改提供可重复的比较入口。[功能介绍](https://github.com/langfuse/langfuse#-core-features)

## 核心概念与工作方式

Observation 表示一个模型调用、检索或工具操作；Trace 将同一次请求的多个步骤关联起来，Session 则可以把多轮交互中的 Trace 组织在一起。应用通过 SDK、框架集成或 OpenTelemetry 发送数据，平台按这些关系展示执行过程。[数据模型](https://langfuse.com/docs/observability/data-model)

追踪数据在应用侧可以批量发送，短生命周期程序需要在结束前处理尚未发出的记录。Langfuse 提供自托管部署和 Cloud 服务；核心代码采用 MIT，仓库中 EE 目录的功能使用独立许可证。[数据发送](https://langfuse.com/docs/observability/data-model) · [许可范围](https://github.com/langfuse/langfuse/blob/main/LICENSE)

## 使用场景与接入方式

需要查看 Agent 调用链、定位失败步骤或持续评估应用结果的团队，可以从一个任务的完整 Trace 开始接入。先选择 Cloud 或自行部署，创建项目后配置 SDK 与凭据，再按用户、会话和任务组织记录。自托管支持 Docker Compose、Kubernetes 等方式，所需存储与运行组件由官方部署文档说明。[部署入口](https://langfuse.com/self-hosting) · [接入概览](https://langfuse.com/docs/observability/overview)
