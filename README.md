# Awesome Agentic Infra

Awesome Agentic Infra 是面向 **Agent 持续、可靠运行** 的基础设施知识库，提供精选资源索引与原创学习笔记，覆盖任务执行、状态管理、工具交互和失败恢复。

资源索引帮助查找项目、论文、规范和官方文档，以一手来源为入口；学习笔记展开系统机制与设计取舍。内容以中文导读为主，保留英文项目名与技术术语。

A curated collection of infrastructure resources and original notes on building reliable agentic systems.

**在线阅读**：[Agentic Infra](https://blog.kingwen.cn/awesome-agentic-infra/)

[![Agentic Infra 首页概览与三领域基础设施关系图](assets/awesome-agentic-infra-page.jpg)](https://blog.kingwen.cn/awesome-agentic-infra/)

<a id="scope"></a>

以 **Agentic Infra** 为核心，**LLM Serving Infra** 为关联基础设施，**LLM Training Infra** 为上游背景。职责划分与协作关系见 [Agentic Infra 的范围、组件与分类边界](notes/agentic-infra-overview.md#三个基础设施领域)，资源收录标准见 [贡献指南](CONTRIBUTING.md#what-to-include)。

## Topics

以下八个主题是阅读目录：前四项覆盖 Agentic Infra 的核心能力，“推理与模型服务”属于关联的 Serving 领域，后三项讨论跨领域能力在 Agent 工作负载中的应用。

| 主题 | 核心问题 |
| --- | --- |
| [Runtime & Orchestration](resources/runtime-and-orchestration.md) | 任务如何推进、协作、中断与恢复？ |
| [Sandbox & Execution](resources/sandbox-and-execution.md) | 代码、命令和浏览器操作在哪里执行，如何隔离？ |
| [Memory & Context](resources/memory-and-context.md) | 状态如何保存，哪些信息进入下一轮上下文？ |
| [Tools & Protocols](resources/tools-and-protocols.md) | Agent 如何发现和调用工具，如何与其他 Agent 通信？ |
| [Inference & Model Serving](resources/inference-and-model-serving.md) | 模型请求如何接入、路由、批处理与复用缓存？ |
| [Deployment & Scheduling](resources/deployment-and-scheduling.md) | 工作负载如何部署、分配资源与弹性伸缩？ |
| [Observability & Evaluation](resources/observability-and-evaluation.md) | 如何解释执行过程并衡量任务质量、延迟与成本？ |
| [Security & Governance](resources/security-and-governance.md) | 谁能执行什么操作，如何实施策略与审计？ |

## Where to Start

1. 先读 [Agentic Infra 的范围、组件与分类边界](notes/agentic-infra-overview.md)，建立整体认识。
2. 研究长任务的执行机制时，阅读 [任务失败后如何恢复](notes/task-recovery-and-side-effects.md)，再结合 [运行时与编排](resources/runtime-and-orchestration.md) 中的项目资料理解具体实现。
3. 研究长任务与规模化运行时，结合 [记忆与上下文](resources/memory-and-context.md)、[部署与调度](resources/deployment-and-scheduling.md) 和 [模型服务](resources/inference-and-model-serving.md)。
4. 设计验证与运行管理时，结合 [可观测性与评估](resources/observability-and-evaluation.md) 和 [安全与治理](resources/security-and-governance.md)。

以上是阅读路径，各主题可以独立查阅。具体系统需要哪些组件，取决于任务、部署方式和约束。

## Curation

资源简介帮助判断项目解决什么问题，“关注”提供进一步阅读的切入点；需要理解机制、比较方案或复现实验时，可结合 [学习笔记](notes/README.md) 阅读。

欢迎补充资源、修正介绍和完善链接，详见 [贡献指南](CONTRIBUTING.md)。

相关资源库：[Awesome Agent Infrastructure](https://github.com/backblaze-labs/awesome-agent-infrastructure)、[Awesome Agent Runtime](https://github.com/sandbaseai/awesome-agent-runtime)。它们可作为扩展阅读与查漏的入口。

## License

本仓库原创文字与图示采用 [CC BY 4.0](LICENSE)，许可说明见 [Creative Commons 官方页面](https://creativecommons.org/licenses/by/4.0/)。所链接的项目、论文和其他第三方内容遵循各自的许可证或使用条款。
