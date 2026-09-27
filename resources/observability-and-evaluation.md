# Observability & Evaluation

收录 Agent 执行追踪、模型与工具调用观测、任务评估和实验管理平台，以及基准论文与遥测规范。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-langfuse"></a> [Langfuse](https://github.com/langfuse/langfuse) — LLM 应用观测与评估平台，提供执行追踪、数据集和提示词管理，可将模型调用、检索和 Agent 操作关联到同一次执行。 [项目介绍](items/langfuse.md)
- <a id="resource-openllmetry"></a> [OpenLLMetry](https://github.com/traceloop/openllmetry) — 基于 OpenTelemetry 的 LLM 应用插桩工具与 SDK，覆盖模型服务和向量数据库等调用，可将 Agent 依赖组件的遥测接入已有观测系统。 [项目介绍](items/openllmetry.md)
- <a id="resource-phoenix"></a> [Phoenix](https://github.com/Arize-ai/phoenix) — 提供基于 OpenTelemetry 的执行追踪，以及评估、数据集和实验管理，可结合执行记录与数据集比较 Agent 的运行结果。 [项目介绍](items/phoenix.md)

## Papers

- <a id="resource-agentbench"></a> [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2308.03688)（2024，ICLR；预印本首发于 2023 年）— 在多种交互环境中评估 LLM 作为 Agent 的能力，提供环境接口、任务执行与评测流程。附 [官方实现](https://github.com/THUDM/AgentBench)。
- <a id="resource-tau-bench"></a> [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045)（2024，arXiv 预印本）— 评估用户交互、工具调用和领域规则约束下的任务完成情况，涵盖工具执行结果与重复运行的一致性。附 [官方实现](https://github.com/sierra-research/tau-bench)。

## Specifications

- <a id="resource-opentelemetry-genai-semantic-conventions"></a> [OpenTelemetry GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions-genai) — 为生成式 AI 遥测定义共享的语义约定，统一表达模型、Agent 和工具调用的观测数据。具体字段的稳定性状态见对应规范。 [规范导读](items/opentelemetry-genai-semantic-conventions.md)

<!-- resources:end -->

[返回首页](../README.md)
