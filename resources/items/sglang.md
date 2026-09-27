---
name: SGLang
summary: 大语言模型与多模态模型服务框架，支持结构化输出与工具调用，可为 Agent 提供推理服务。配置方式见 [官方文档](https://docs.sglang.io/)。
type: project
topic: inference-and-model-serving
url: https://github.com/sgl-project/sglang
anchor: resource-sglang
order: 3
links:
  - label: 官网
    url: https://www.sglang.io/
  - label: 代码仓库
    url: https://github.com/sgl-project/sglang
  - label: 文档
    url: https://docs.sglang.io/
  - label: 快速开始
    url: https://docs.sglang.io/docs/basic_usage/send_request
  - label: 工具调用配置
    url: https://docs.sglang.io/docs/advanced_features/tool_parser
maintainer: SGLang 社区；项目由 LMSYS 托管
form: 开源大模型与多模态推理服务框架
license: Apache-2.0
---

## 背景与目标

SGLang 面向大语言模型与多模态模型的推理服务，关注从单机到分布式部署中的请求处理、缓存复用和模型执行。项目由 LMSYS 开源组织托管，提供兼容常见模型生态与 API 的服务能力，可作为 Agent 应用调用模型的后端。[官方概览](https://docs.sglang.io/)

## 核心能力

- **推理与缓存管理**：通过 RadixAttention 复用请求前缀的 KV 缓存，结合连续批处理、分块 Prefill 和并行执行处理模型请求。[项目能力](https://github.com/sgl-project/sglang)
- **结构化输出**：按照 JSON Schema、正则表达式或语法约束组织生成结果，方便应用读取结构化数据。[输出约束](https://docs.sglang.io/docs/advanced_features/structured_outputs)
- **工具调用解析**：针对支持的模型配置相应解析器，把模型生成的工具调用表示转换为接口返回中的调用信息。[Tool Parser](https://docs.sglang.io/docs/advanced_features/tool_parser)

## 核心概念与工作方式

应用向模型服务发送提示词或消息列表，服务加载指定模型，处理输入并生成结果。开发者可以使用兼容 OpenAI 的聊天接口，也可以调用原生生成接口，选择一次性返回或流式接收输出。[请求教程](https://docs.sglang.io/docs/basic_usage/send_request)

缓存机制复用的是模型推理过程中的中间状态。工具解析器则负责识别模型输出中的函数名称与参数。应用收到工具调用后，仍需要接入真实工具执行并组织后续请求；Agent 的会话记忆与任务流程可以在调用 SGLang 的上层服务中维护。[工具调用流程](https://docs.sglang.io/docs/advanced_features/tool_parser)

## 使用场景与接入方式

SGLang 适合自建 Agent 模型端点、需要结构化响应的业务服务，以及多个请求共享较长提示词前缀的推理场景。支持的模型和硬件范围由版本与相应配置决定，可以从官方文档选择模型部署方式。[模型与运行环境](https://docs.sglang.io/)

接入时安装对应硬件环境的依赖，指定模型路径启动服务，然后通过 HTTP 或兼容客户端发送请求。若应用需要工具调用，应同时选择模型适用的解析器；需要固定数据结构时，传入输出约束并在应用中处理返回结果。[快速开始](https://docs.sglang.io/docs/basic_usage/send_request)、[结构化输出](https://docs.sglang.io/docs/advanced_features/structured_outputs)
