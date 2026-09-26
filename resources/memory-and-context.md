# Memory & Context

关注 Agent 如何组织当前上下文、保存跨会话记忆，并从外部数据中检索所需信息。收录记忆管理、上下文存储和检索组件；执行检查点与失败恢复见运行时主题。

> 最近整理：2026-09-26。条目依据所链接的一手来源整理，不代表实测。

## Projects & Platforms

- <a id="resource-graphiti"></a> [Graphiti](https://github.com/getzep/graphiti) — 构建和查询随时间变化的上下文图，适用于 Agent 需要持续吸收新事实、关系与历史交互的场景；关注：事实有效时间、来源追溯、增量更新和混合检索。
- <a id="resource-letta-letta-code"></a> [Letta / Letta Code](https://github.com/letta-ai/letta-code) — 支持持久记忆的 Agent 执行框架，允许 Agent 修改自身的记忆块并检索历史对话；关注：memory blocks、通过 Git 跟踪上下文的 MemFS，以及跨会话状态管理。
- <a id="resource-llamaindex-oss"></a> [LlamaIndex OSS](https://github.com/run-llama/llama_index) — 提供数据连接器、索引与检索接口，将外部文档和数据组织为 Agent 可查询的上下文；关注：数据接入、检索器组合，以及索引存储与重载。
- <a id="resource-mem0"></a> [Mem0](https://github.com/mem0ai/mem0) — 面向 AI 应用的记忆层，通过 API 写入与检索用户、会话及 Agent 相关信息，为后续交互补充历史上下文；关注：记忆提取、按身份组织记忆和检索接口。

## Papers

- <a id="resource-memgpt-towards-llms-as-operating-systems"></a> [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560)（2023，arXiv 预印本；2024 年修订）— 借鉴操作系统的分层存储思想，在有限上下文窗口内管理不同层级的记忆；关注：虚拟上下文管理、记忆层间数据移动，以及用于控制流程的中断机制。

## Related Topics

- [Runtime & Orchestration](runtime-and-orchestration.md)：执行状态、检查点和恢复流程。
- [Tools & Protocols](tools-and-protocols.md)：将检索能力和外部数据暴露给 Agent 的接口。
- [Observability & Evaluation](observability-and-evaluation.md)：检查记忆检索、上下文选择对任务结果的影响。

[返回首页](../README.md)
