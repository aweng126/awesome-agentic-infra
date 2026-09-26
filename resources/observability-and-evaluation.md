# Observability & Evaluation

关注 Agent 执行过程的追踪与调试、模型和工具调用的度量，以及任务质量和重复运行可靠性的评估。既收录观测与实验平台，也收录可研究其环境和指标设计的基准。

> 最近整理：2026-09-26。条目依据所链接的一手来源整理，不代表实测。

可观测性解释执行过程中发生了什么，评估判断结果是否达到目标。基准任务的得分不能直接代表基础设施性能；比较运行时或沙箱时，还需控制模型、提示词、任务和资源配置。本主题关注测量，访问控制与策略执行归安全与治理。

## Projects & Platforms

- [Langfuse](https://github.com/langfuse/langfuse) — 提供 LLM 应用追踪、评估、数据集与提示词管理；关注：把模型调用、检索和 Agent 操作关联到一次执行过程。
- [OpenLLMetry](https://github.com/traceloop/openllmetry) — 基于 OpenTelemetry 的 LLM 应用插桩与 SDK，覆盖模型服务和向量数据库等调用；关注：将 Agent 依赖组件的遥测接入已有观测系统。
- [Phoenix](https://github.com/Arize-ai/phoenix) — 提供基于 OpenTelemetry 的追踪，以及评估、数据集和实验管理；关注：通过执行记录与数据集分析 Agent 变化带来的影响。

## Papers

- [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2308.03688)（2024，ICLR；预印本首发于 2023 年）— 在多种交互环境中评估 LLM 作为 Agent 的能力；关注：环境接口、任务执行与评测组织方式。附 [官方实现](https://github.com/THUDM/AgentBench)。
- [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045)（2024，arXiv 预印本）— 研究用户交互、工具调用和领域规则约束下的任务完成情况；关注：重复运行的一致性与工具执行结果。附 [官方实现](https://github.com/sierra-research/tau-bench)。

## Specifications

- [OpenTelemetry GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions-genai) — 为生成式 AI 遥测定义共享的语义约定；关注：模型、Agent 和工具调用的观测数据如何统一表达。采用具体字段前需查看对应规范的稳定性状态。

## Related Topics

- [Runtime & Orchestration](runtime-and-orchestration.md)：执行步骤、重试与恢复形成的事件。
- [Inference & Model Serving](inference-and-model-serving.md)：模型调用的服务端行为。
- [Security & Governance](security-and-governance.md)：审计、敏感数据和策略执行。

[返回首页](../README.md)
