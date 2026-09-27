# Memory & Context

收录 Agent 记忆管理、上下文存储、数据接入与检索组件，以及相关论文。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-graphiti"></a> [Graphiti](https://github.com/getzep/graphiti) — 构建和查询随时间变化的上下文图，支持事实有效时间、来源追溯、增量更新和混合检索，为 Agent 组织持续积累的事实、关系与历史交互。
- <a id="resource-letta-letta-code"></a> [Letta / Letta Code](https://github.com/letta-ai/letta-code) — 支持持久记忆的 Agent 执行框架，允许 Agent 修改记忆块、检索历史对话并管理跨会话状态，另提供基于 Git 跟踪上下文的 MemFS。
- <a id="resource-llamaindex-oss"></a> [LlamaIndex OSS](https://github.com/run-llama/llama_index) — 提供数据连接器、索引与检索接口，将外部文档和数据组织为 Agent 可查询的上下文，支持检索器组合及索引存储与重载。
- <a id="resource-mem0"></a> [Mem0](https://github.com/mem0ai/mem0) — 面向 AI 应用的记忆层，支持记忆提取及按用户、会话和 Agent 组织信息，通过 API 写入与检索，为后续交互补充历史上下文。

## Papers

- <a id="resource-memgpt-towards-llms-as-operating-systems"></a> [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560)（2023，arXiv 预印本；2024 年修订）— 借鉴操作系统的分层存储思想，在有限上下文窗口内管理不同层级的记忆，提出虚拟上下文管理、记忆层间数据移动和流程中断机制。

<!-- resources:end -->

[返回首页](../README.md)
