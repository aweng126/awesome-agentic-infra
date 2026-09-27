---
name: Phoenix
summary: 提供基于 OpenTelemetry 的执行追踪，以及评估、数据集和实验管理，可结合执行记录与数据集比较 Agent 的运行结果。
type: project
topic: observability-and-evaluation
url: https://github.com/Arize-ai/phoenix
anchor: resource-phoenix
order: 3
links:
  - label: 代码仓库
    url: https://github.com/Arize-ai/phoenix
  - label: 文档
    url: https://arize.com/docs/phoenix
  - label: 追踪入门
    url: https://arize.com/docs/phoenix/get-started/get-started-tracing
  - label: 数据集与实验
    url: https://arize.com/docs/phoenix/datasets-and-experiments/overview-datasets
maintainer: Arize AI 团队与社区
form: 源码可用的自托管观测与评估平台
license: Elastic License 2.0（主仓库）
---

## 背景与目标

Phoenix 面向 AI 应用的实验、评估和问题排查，帮助开发者同时查看“任务如何执行”与“结果是否符合预期”。它接收应用的执行记录，再把这些记录与评估、提示词和测试数据组织到同一个工作环境中。[项目介绍](https://github.com/Arize-ai/phoenix)

## 核心能力

- **调用追踪**：基于 OpenTelemetry 和 OpenInference 接收模型、Agent 与工具调用，展示步骤关系及耗时。[追踪入门](https://arize.com/docs/phoenix/get-started/get-started-tracing)
- **数据集与实验**：管理带版本的数据样例，在同一批输入上运行不同应用配置，并记录输出与评价结果。[数据集与实验](https://arize.com/docs/phoenix/datasets-and-experiments/overview-datasets)
- **评估与提示词迭代**：提供评估工具、提示词版本和 Playground，用于检查结果、调整模型参数并重新尝试请求。[功能概览](https://github.com/Arize-ai/phoenix)

## 核心概念与工作方式

Trace 记录一次应用运行，Span 表示其中的具体步骤，例如一个 Agent、工具或模型调用。应用端通过对应框架的插桩组件生成数据，再发送到 Phoenix 实例；界面沿调用关系展示过程，便于从单个异常结果回到相关执行步骤。[追踪流程](https://arize.com/docs/phoenix/get-started/get-started-tracing)

Dataset 提供可复用的输入样例，Experiment 则记录某个任务实现对这些样例的运行结果。评估器进一步对输出打分或标注，使不同提示词、模型和检索配置能够在一致样例上比较。[实验组织](https://arize.com/docs/phoenix/datasets-and-experiments/overview-datasets)

## 使用场景与接入方式

Phoenix 可用于本地开发排查、Agent 回归验证和团队评估。可以安装 `arize-phoenix` 启动本地服务，也可以使用容器自行部署；应用安装相应 OpenInference 插桩包，配置实例地址后发送 Trace。[接入教程](https://arize.com/docs/phoenix/get-started/get-started-tracing)

Phoenix 主仓库采用 Elastic License 2.0，应按该许可理解代码使用范围。Arize 另有托管产品 Arize AX，两者的交付形态不同，不能把托管平台功能统一视为 Phoenix 自托管实例的能力。[产品边界与许可](https://github.com/Arize-ai/phoenix)
