# Inference & Model Serving

收录与 Agent 模型接入、多轮调用、长上下文和并发请求相关的模型网关、推理引擎与分布式服务资料。**LLM Serving Infra** 作为关联基础设施，在七个主要主题之外提供独立入口；它与 Agentic Infra、LLM Training Infra 的关系见 [领域导览](../notes/agentic-infra-overview.md)。

## Projects & Platforms

- <a id="resource-dynamo"></a> [Dynamo](https://github.com/ai-dynamo/dynamo) — 协调推理引擎的分布式服务框架，提供 prefill/decode 分离、感知 KV cache 的路由和缓存管理，用于多节点推理服务的请求调度。
- <a id="resource-litellm"></a> [LiteLLM](https://github.com/BerriAI/litellm) — 多模型服务接入 SDK 与网关，为 Agent 提供统一的模型访问层，支持路由、重试、回退和用量跟踪。
- <a id="resource-sglang"></a> [SGLang](https://github.com/sgl-project/sglang) — 大语言模型与多模态模型服务框架，支持结构化输出与工具调用，可为 Agent 提供推理服务。配置方式见 [官方文档](https://docs.sglang.io/)。
- <a id="resource-vllm"></a> [vLLM](https://github.com/vllm-project/vllm) — 大语言模型推理与服务引擎，提供连续批处理、前缀缓存和工具调用解析等能力，可承载 Agent 的多轮模型请求。

## Papers

- <a id="resource-pagedattention"></a> [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)（2023，SOSP）— 提出 PagedAttention，改进 LLM 服务中的 KV cache 内存管理，讨论长上下文和并发生成的服务端内存开销。

[返回首页](../README.md)
