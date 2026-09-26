# Agentic Infra 的范围、组件与分类边界

一个 Agent 从接收任务到完成执行，需要哪些基础设施能力？本文先区分 Agentic Infra、LLM Serving Infra 与 LLM Training Infra，再沿着一次任务的执行链路，介绍七个主要主题与关联基础设施的职责和联系。

## 三个基础设施领域

本仓库按主要职责组织内容：Agentic Infra 关心任务如何持续、可靠地完成，Serving 关心模型请求如何高效、稳定地执行，Training 关心模型如何训练与更新。

| 领域 | 处理的主要对象 | 典型能力 | 在本仓库中的位置 |
| --- | --- | --- | --- |
| **Agentic Infra** | 任务、会话、执行状态与工具操作 | 运行时与编排、任务恢复、记忆与上下文、工具互联、沙箱执行 | 核心内容 |
| **LLM Serving Infra** | 模型请求、推理批次与推理缓存 | 模型 API、路由、推理执行、批处理、KV cache 管理 | 关联基础设施，围绕 Agent 的模型调用需求展开 |
| **LLM Training Infra** | 训练数据、模型参数与训练状态 | 数据流水线、训练与微调、分布式训练、优化器、训练检查点与模型产物 | 上游背景，暂不单独设置资源主题 |

这些职责可以从具体系统中理解：[LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) 聚焦长时间、有状态的 Agent 编排与持久执行；[vLLM](https://docs.vllm.ai/en/latest/) 提供模型推理与服务能力；[Megatron Core](https://docs.nvidia.com/megatron-core/developer-guide/latest/user-guide/index.html) 提供大模型分布式训练组件。一个产品可能覆盖多个领域，阅读时需要进一步区分其中的机制。

## 从一次任务执行开始

设想一个需要查询资料、运行代码并输出报告的 Agent。为了完成任务，系统需要决定下一步操作，准备模型上下文，调用模型和外部工具，记录过程，并在中断后处理尚未完成的工作。这个场景可以帮助我们识别基础设施职责。

下面按三个领域展示协作关系。Agentic Infra 调用 Serving 并接收推理结果；Training 向 Serving 交付模型产物。图中的模型发布箭头表示模型生命周期中的交付过程，日常任务执行使用已经部署的模型服务。

```mermaid
flowchart TB
    accTitle: Agentic Infra 与模型基础设施的关系
    accDescr: Agentic Infra 内的运行时与记忆、工具和沙箱协作，向 LLM Serving Infra 发送模型请求并接收推理结果。LLM Training Infra 将训练或微调后的模型产物发布到 Serving。部署与调度、观测与评估、安全与治理是三个领域的跨领域能力。
    subgraph Agentic["Agentic Infra · 本站重点"]
        direction TB
        Runtime[运行时与编排 / 任务恢复]
        Runtime <--> Memory[记忆与上下文]
        Runtime <--> Tools[工具与协议]
        Tools <--> Sandbox[沙箱与执行环境]
    end
    subgraph Serving["LLM Serving Infra · 关联基础设施"]
        Models[模型 API 与路由 / 推理执行<br/>批处理 / KV cache]
    end
    subgraph Training["LLM Training Infra · 上游背景"]
        Train[数据 / 训练与微调<br/>分布式训练 / 训练检查点]
    end
    Runtime -->|模型请求| Models
    Models -->|推理结果| Runtime
    Train -->|模型产物发布| Models
    Shared[跨领域能力<br/>部署与调度 · 观测与评估 · 安全与治理]
    Shared -.-> Agentic
    Shared -.-> Serving
    Shared -.-> Training
```

这里按职责划分边界，同一进程或平台可以承担多个职责，三个领域也可以独立部署。图中实线表示组件交互与模型交付，虚线表示跨领域能力的作用范围。

部署与调度、观测与评估、安全与治理都服务于多个领域。本仓库侧重 Agent 工作负载中的问题，例如长任务与沙箱的资源供应、模型调用与工具操作的联合追踪、任务完成质量，以及操作授权与审计。通用的调度、遥测和策略机制可以复用，实际设计仍要明确管理对象与作用边界。

## 主题导航与关联基础设施

七个主要主题构成阅读目录：前四项展开 Agentic Infra 的核心能力，后三项讨论跨领域能力在 Agent 侧的应用。模型服务作为关联基础设施单独提供阅读入口，训练作为上游背景在本文说明。

| 主题 | 在示例任务中的职责 | 阅读入口 |
| --- | --- | --- |
| Runtime & Orchestration | 安排查询、执行和总结步骤，记录任务进度并决定重试 | [资源](../resources/runtime-and-orchestration.md) |
| Sandbox & Execution | 为生成的代码或浏览器操作提供执行环境与隔离边界 | [资源](../resources/sandbox-and-execution.md) |
| Memory & Context | 保存会话与长期信息，为下一次模型调用选择上下文 | [资源](../resources/memory-and-context.md) |
| Tools & Protocols | 描述工具接口，传递请求和结果，与其他 Agent 互联 | [资源](../resources/tools-and-protocols.md) |
| Deployment & Scheduling | 分配工作节点、执行环境和服务副本，处理伸缩 | [资源](../resources/deployment-and-scheduling.md) |
| Observability & Evaluation | 解释失败步骤，衡量任务成功率、耗时与资源消耗 | [资源](../resources/observability-and-evaluation.md) |
| Security & Governance | 确认调用主体、检查操作权限并记录审计信息 | [资源](../resources/security-and-governance.md) |

**关联基础设施：[Inference & Model Serving](../resources/inference-and-model-serving.md)。** 在示例任务中，模型服务接收 Agent 发出的请求，处理路由、批执行与推理缓存。这里围绕 Agent 的多轮调用、长上下文与并发需求阅读相关资料。

## 容易混淆的边界

**任务编排与资源调度。** 本仓库把“下一步执行什么、失败后从哪里继续”归入运行时，把“在哪个节点执行、需要几个副本、是否提前准备沙箱”归入部署与调度。一个系统可以同时解决这两类问题，主条目按其主要职责归类。

**任务状态、Agent 记忆与 KV cache。** 三者用于本仓库分类时分别表示：执行进度与恢复信息、可用于后续上下文的信息、推理引擎内部的注意力计算缓存。这些机制可能协同工作，但不应仅因名称里包含 memory 就归到同一主题。例如，LangGraph 的持久化文档讨论检查点和执行恢复，PagedAttention 论文讨论推理服务中的 KV cache 管理。[LangGraph 持久化文档](https://docs.langchain.com/oss/python/langgraph/persistence)、[PagedAttention 论文](https://arxiv.org/abs/2309.06180)。

**工具接口与执行环境。** 工具协议负责表达和交换调用信息，执行环境负责承载具体操作。以 MCP 为例，规范说明了客户端与服务器之间的工具交互；隔离代码执行所使用的沙箱属于另一项系统职责。[MCP 规范](https://modelcontextprotocol.io/specification/latest)。

**恢复任务与恢复外部副作用。** 任务能够从检查点恢复，还需要考虑重试是否再次发送请求或修改外部数据。分析持久执行系统时，应同时查看检查点、幂等性和副作用处理规则。例如，Temporal 的 Activity 文档说明了重试可能重复执行操作，以及幂等性设计的作用。[Temporal Activity 文档](https://docs.temporal.io/activity-definition)。

**执行隔离与操作授权。** 本仓库把隔离机制归入沙箱，把“某个主体是否能对某个资源执行某项操作”的规则归入安全与治理。阅读时可分别对照 gVisor 的执行隔离设计和 Cedar 的授权模型。[gVisor 官方说明](https://gvisor.dev/)、[Cedar 官方说明](https://docs.cedarpolicy.com/)。

## 后续分析可以怎样展开

比较项目时，建议围绕一个明确问题组织证据：

| 研究问题 | 值得记录的信息 |
| --- | --- |
| 长任务如何恢复？ | 持久化对象、恢复粒度、重放方式、外部副作用处理 |
| 沙箱如何供应和复用？ | 生命周期、隔离机制、预热策略、文件与进程状态 |
| 上下文如何持续更新？ | 信息来源、写入与检索时机、压缩策略、过期机制 |
| 多 Agent 如何共享资源？ | 并发模型、资源配额、排队方式、租户边界 |
| 优化是否改善任务体验？ | 完成率、端到端耗时、重试次数、模型与工具用量 |

研究记录可以按“问题 → 机制 → 证据 → 适用条件”展开，并链接到支持分析的文档或论文。开展实测时，固定模型、任务集、软件版本与资源配置，保存原始结果和复现步骤，让不同方案的比较有共同依据。

[返回笔记索引](README.md) · [返回首页](../README.md)
