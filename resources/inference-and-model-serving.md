# Inference & Model Serving

本主题属于 **LLM Serving Infra**，作为 Agentic Infra 的关联基础设施收录。它负责处理模型请求，涵盖统一 API、请求路由、推理执行、批处理、KV cache 管理和分布式服务。阅读重点是这些机制如何支持 Agent 的多轮调用、长上下文与并发任务。

Agentic Infra 决定任务下一步做什么、向模型提供哪些上下文，并处理模型结果；Serving 接收请求并执行推理。模型的训练、微调与训练检查点属于 **LLM Training Infra**，通过模型产物发布与 Serving 衔接。三者的关系见 [概览笔记](../notes/agentic-infra-overview.md)。

Agent 的任务推进与失败恢复在“运行时与编排”主题讨论，工作节点和沙箱的部署生命周期在“部署与调度”主题讨论。推理引擎内部的批处理、显存与 KV cache 调度仍在本主题讨论。

## Projects & Platforms

- <a id="resource-dynamo"></a> [Dynamo](https://github.com/ai-dynamo/dynamo) — 协调推理引擎的分布式服务框架，提供 prefill/decode 分离、感知 KV cache 的路由和缓存管理；关注：多节点推理中的请求调度与缓存位置。
- <a id="resource-litellm"></a> [LiteLLM](https://github.com/BerriAI/litellm) — 提供多模型服务接入的 SDK 与网关，支持路由、重试、回退和用量跟踪；关注：Agent 的模型访问层与后端服务解耦。
- <a id="resource-sglang"></a> [SGLang](https://github.com/sgl-project/sglang) — 大语言模型与多模态模型服务框架；关注：Agent 所需的结构化输出、工具调用支持和推理服务配置，见 [官方文档](https://docs.sglang.io/)。
- <a id="resource-vllm"></a> [vLLM](https://github.com/vllm-project/vllm) — 大语言模型推理与服务引擎，提供连续批处理、前缀缓存和工具调用解析等能力；关注：多轮 Agent 请求的模型服务端如何管理吞吐与显存。

## Papers

- <a id="resource-pagedattention"></a> [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)（2023，SOSP）— 研究 LLM 服务中的 KV cache 内存管理，并提出 PagedAttention；关注：理解长上下文和并发生成的服务端内存开销，是分析 Agent 推理负载的基础材料。

[返回首页](../README.md)
