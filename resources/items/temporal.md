---
name: Temporal
summary: 通用持久执行平台，通过 Workflow 与 Activity 组织任务，支持失败重试及等待外部事件后继续执行。官方提供 Agent 循环、工具调用和人工审批的集成示例。
type: project
topic: runtime-and-orchestration
url: https://docs.temporal.io/ai
anchor: resource-temporal
order: 9
links:
  - label: 官网
    url: https://temporal.io/
  - label: 服务端仓库
    url: https://github.com/temporalio/temporal
  - label: 文档
    url: https://docs.temporal.io/
  - label: Agent 场景
    url: https://docs.temporal.io/ai
  - label: 快速开始
    url: https://docs.temporal.io/quickstarts
maintainer: Temporal Technologies 与社区
form: 开源持久执行平台与托管云服务
license: MIT（服务端）
---

## 背景与目标

Temporal 为长时间运行的应用提供持久执行能力，使业务流程可以跨越进程失败、网络问题和外部等待继续推进。项目源自 Uber Cadence，提供开源服务端、多语言 SDK 和 Temporal Cloud 托管服务。[项目介绍](https://github.com/temporalio/temporal)

它面向通用业务流程。在 Agent 应用中，可以用它组织模型调用、工具操作和人工审批，把需要持续推进的任务放进可追踪的工作流；具体 Agent 推理逻辑仍由应用或接入的框架提供。[Agent 场景](https://docs.temporal.io/ai)

## 核心能力

- **代码定义流程**：通过 Workflow 表达分支、等待和多步骤任务，服务记录执行历史，支持中断后继续推进。[Workflow 概览](https://docs.temporal.io/workflows)
- **外部操作管理**：把模型 API、业务服务或其他有副作用的操作放入 Activity，配置超时和重试策略。[Activity 概览](https://docs.temporal.io/activities)
- **任务分发与执行**：Worker 从 Task Queue 获取工作，用不同队列和 Worker 配置承载不同工作负载。[Worker 概览](https://docs.temporal.io/workers)
- **Agent 流程集成**：官方提供循环调用模型、工具执行、等待人工审批，以及多步骤数据处理的模式与示例。[Durable AI](https://docs.temporal.io/ai)

## 核心概念与工作方式

Workflow 定义任务的推进逻辑，Activity 承担具体操作，Worker 执行应用代码，Temporal Service 保存历史并协调任务分发。客户端发起 Workflow 后，Worker 持续处理相应任务，操作结果回到工作流并决定下一步。[Workflow](https://docs.temporal.io/workflows)、[Worker](https://docs.temporal.io/workers)

例如 Agent 可在 Workflow 中循环选择下一步，将模型请求和工具调用封装为 Activity，并在需要批准时等待外部事件。Activity 可能因失败而重试，因此涉及写入、发消息等操作时，应用需要按业务定义幂等处理。[Activity 说明](https://docs.temporal.io/activities)

## 使用场景与接入方式

可用于跨分钟或数天的 Agent 任务、带人工审批的业务自动化，以及需要失败恢复的处理流水线。开发者选择 SDK，编写 Workflow、Activity 和 Worker，连接本地开发服务、自建集群或 Temporal Cloud；云服务承载协调层，应用 Worker 按所选部署方式运行。[快速开始](https://docs.temporal.io/quickstarts)、[执行模型](https://docs.temporal.io/workers)
