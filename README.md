# Awesome Agentic Infra

Awesome Agentic Infra 是面向 **Agent 持续、可靠运行** 的基础设施资源导航，按主题整理开源项目、云厂商平台、论文、规范与官方文档。

通过中文项目介绍、领域导览与方案全景，了解各类基础设施的定位、主要能力、工作方式和官方入口。

A curated guide to agentic infrastructure projects, platforms, papers, and documentation.

**在线阅读**：[Agentic Infra](https://blog.kingwen.cn/awesome-agentic-infra/)

[![Agentic Infra 首页概览与三领域基础设施关系图](assets/awesome-agentic-infra-page.jpg)](https://blog.kingwen.cn/awesome-agentic-infra/)

<a id="scope"></a>

以 **Agentic Infra** 为核心，**LLM Serving Infra** 为关联基础设施，**LLM Training Infra** 为上游背景。职责划分与协作关系见 [Agentic Infra 领域导览](notes/agentic-infra-overview.md#三个基础设施领域)，资源收录标准见 [贡献指南](CONTRIBUTING.md#what-to-include)。

## Topics

以下七个主要主题构成阅读目录：前四项覆盖 Agentic Infra 的核心能力，后三项讨论跨领域能力在 Agent 工作负载中的应用。

| 主题 | 核心问题 |
| --- | --- |
| [Runtime & Orchestration](resources/runtime-and-orchestration.md) | 任务如何推进、协作、中断与恢复？ |
| [Sandbox & Execution](resources/sandbox-and-execution.md) | 代码、命令和浏览器操作在哪里执行，如何隔离？ |
| [Memory & Context](resources/memory-and-context.md) | 状态如何保存，哪些信息进入下一轮上下文？ |
| [Tools & Protocols](resources/tools-and-protocols.md) | Agent 如何发现和调用工具，如何与其他 Agent 通信？ |
| [Deployment & Scheduling](resources/deployment-and-scheduling.md) | 工作负载如何部署、分配资源与弹性伸缩？ |
| [Observability & Evaluation](resources/observability-and-evaluation.md) | 如何解释执行过程并衡量任务质量、延迟与成本？ |
| [Security & Governance](resources/security-and-governance.md) | 谁能执行什么操作，如何实施策略与审计？ |

**关联基础设施**：[Inference & Model Serving](resources/inference-and-model-serving.md) — 围绕 Agent 的模型调用，了解模型接入、请求路由与推理服务。

## Where to Start

- 了解领域划分：[Agentic Infra 领域导览](notes/agentic-infra-overview.md)，查看三类基础设施的关系与主题导航。
- 查找具体方案：在 [资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/) 按主题或关键词筛选，阅读项目介绍；运行时方案的集中梳理见 [Agent Runtime 全景](notes/agent-runtime-landscape.md)。

## License

本仓库原创文字与图示采用 [CC BY 4.0](LICENSE)，许可说明见 [Creative Commons 官方页面](https://creativecommons.org/licenses/by/4.0/)。所链接的项目、论文和其他第三方内容遵循各自的许可证或使用条款。
