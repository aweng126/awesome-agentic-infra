# Inference & Model Serving

关注 Agent 的模型访问入口与推理执行：统一 API、请求路由、批处理、KV cache 管理和分布式服务。通用推理系统在此的收录理由，是它们为 Agent 的多轮调用、长上下文或并发任务提供模型服务基础。

> 最近整理：2026-09-26。条目依据所链接的一手来源整理，不代表实测。

本主题关注模型请求如何被处理；Agent 的任务推进属于运行时与编排，工作节点和沙箱的部署生命周期属于部署与调度。推理系统内部的资源管理仍在本主题讨论。

## Projects & Platforms

- <a id="resource-dynamo"></a> [Dynamo](https://github.com/ai-dynamo/dynamo) — 协调推理引擎的分布式服务框架，提供 prefill/decode 分离、感知 KV cache 的路由和缓存管理；关注：多节点推理中的请求调度与缓存位置。
- <a id="resource-litellm"></a> [LiteLLM](https://github.com/BerriAI/litellm) — 提供多模型服务接入的 SDK 与网关，支持路由、重试、回退和用量跟踪；关注：Agent 的模型访问层与后端服务解耦。
- <a id="resource-sglang"></a> [SGLang](https://github.com/sgl-project/sglang) — 大语言模型与多模态模型服务框架；关注：Agent 所需的结构化输出、工具调用支持和推理服务配置，见 [官方文档](https://docs.sglang.io/)。
- <a id="resource-vllm"></a> [vLLM](https://github.com/vllm-project/vllm) — 大语言模型推理与服务引擎，提供连续批处理、前缀缓存和工具调用解析等能力；关注：多轮 Agent 请求的模型服务端如何管理吞吐与显存。

## Papers

- <a id="resource-pagedattention"></a> [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)（2023，SOSP）— 研究 LLM 服务中的 KV cache 内存管理，并提出 PagedAttention；关注：理解长上下文和并发生成的服务端内存开销，是分析 Agent 推理负载的基础材料。

## Related Topics

- [Runtime & Orchestration](runtime-and-orchestration.md)：模型调用在 Agent 任务执行链路中的位置。
- [Memory & Context](memory-and-context.md)：上下文如何构造与保留；与推理引擎内部的 KV cache 区分。
- [Deployment & Scheduling](deployment-and-scheduling.md)：服务副本、集群与弹性伸缩。
- [Observability & Evaluation](observability-and-evaluation.md)：端到端任务质量、延迟与用量的观测。

[返回首页](../README.md)
