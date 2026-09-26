# Awesome Agentic Infra

面向 Agent 系统的基础设施资源索引与研究笔记，关注运行时、执行环境、状态管理、工具互联和可靠运行。

A curated collection of infrastructure resources and research notes for agentic systems.

**在线阅读**：[Agentic Infra](https://blog.kingwen.cn/awesome-agentic-infra/) · [更新日志](https://blog.kingwen.cn/awesome-agentic-infra/changelog/) · [站点开发与部署](site/README.md)

以中文介绍为主，保留英文项目名与技术术语。资源按基础设施能力分类，各主题按实际内容收录项目、论文、规范与技术资料。

## Scope

本仓库将 **Agentic Infrastructure** 定义为：支撑 Agent 持续执行任务、与工具和其他 Agent 交互、维护状态，并进行部署、观测与治理的系统组件及机制。这是本仓库的工作分类，可随研究内容调整。

重点收录：

- 面向 Agent 的运行时、编排框架、沙箱、记忆服务、工具协议与托管平台。
- 与 Agent 工作负载直接相关的推理服务、资源调度、观测、评估和安全机制。
- 解释上述系统设计的论文、官方文档、工程文章，以及本仓库的原创分析。

通用数据库、云计算和模型服务组件需要说明与 Agent 的具体关系；面向终端用户的应用、单纯的提示词合集、模型训练资料暂不作为主要收录对象。

## Topics

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
2. 搭建执行链路时，从 [运行时与编排](resources/runtime-and-orchestration.md) → [工具与协议](resources/tools-and-protocols.md) → [执行环境](resources/sandbox-and-execution.md) 阅读。
3. 研究长任务与规模化运行时，结合 [记忆与上下文](resources/memory-and-context.md)、[部署与调度](resources/deployment-and-scheduling.md) 和 [模型服务](resources/inference-and-model-serving.md)。
4. 设计验证与运行管理时，结合 [可观测性与评估](resources/observability-and-evaluation.md) 和 [安全与治理](resources/security-and-governance.md)。

以上是阅读路径，各主题可以独立查阅。具体系统需要哪些组件，取决于任务、部署方式和约束。

## Repository Layout

```text
awesome-agentic-infra/
├── README.md                 # 项目范围、主题导航与阅读路径
├── CHANGELOG.md              # 按发布日期整理的内容与站点更新
├── CONTRIBUTING.md           # 收录标准与维护方式
├── LICENSE                   # CC BY 4.0
├── resources/                # 八个主题的资源索引
├── notes/                    # 原创概览、解读与比较
│   ├── README.md
│   └── agentic-infra-overview.md
├── site/                     # Astro 静态站点，直接读取上述 Markdown
└── .github/workflows/        # 站点验证与 GitHub Pages 自动部署
```

资源的完整简介在所属主题维护，跨主题通过链接关联。较长的分析进入 [notes/](notes/README.md)；出现独立图片文件时再建立 `assets/`。

网页提供主题导航、资源搜索与筛选、深浅色切换，以及带目录的笔记阅读页。回访时可先查看 [更新日志](CHANGELOG.md)，直接前往新增或修改的内容。修改 Markdown 并同步补充日志后，推送到 `main` 会触发验证与发布；首次启用和本地预览方法见 [站点说明](site/README.md)。

## Curation

资源简介帮助判断项目解决什么问题，“关注”提供进一步阅读的切入点；需要理解机制、比较方案或复现实验时，可结合 [学习笔记](notes/README.md) 阅读。内容的新增与修订统一记录在 [更新日志](CHANGELOG.md)。

欢迎补充资源、修正介绍和提交研究笔记，详见 [贡献指南](CONTRIBUTING.md)。

相关资源库：[Awesome Agent Infrastructure](https://github.com/backblaze-labs/awesome-agent-infrastructure)、[Awesome Agent Runtime](https://github.com/sandbaseai/awesome-agent-runtime)。它们可作为扩展阅读与查漏的入口。

## License

本仓库原创文字与图示采用 [CC BY 4.0](LICENSE)，许可说明见 [Creative Commons 官方页面](https://creativecommons.org/licenses/by/4.0/)。所链接的项目、论文和其他第三方内容遵循各自的许可证或使用条款。
