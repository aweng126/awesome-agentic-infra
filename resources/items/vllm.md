---
name: vLLM
summary: 大语言模型推理与服务引擎，提供连续批处理、前缀缓存和工具调用解析等能力，可承载 Agent 的多轮模型请求。
type: project
topic: inference-and-model-serving
url: https://github.com/vllm-project/vllm
anchor: resource-vllm
order: 4
links:
  - label: 官网
    url: https://vllm.ai/
  - label: 代码仓库
    url: https://github.com/vllm-project/vllm
  - label: 文档
    url: https://docs.vllm.ai/
  - label: 快速开始
    url: https://docs.vllm.ai/en/latest/getting_started/quickstart/
  - label: 工具调用配置
    url: https://docs.vllm.ai/en/latest/features/tool_calling/
maintainer: vLLM 团队与社区
form: 开源模型推理库与在线服务引擎
license: Apache-2.0
---

## 背景与目标

vLLM 起源于 UC Berkeley 的 Sky Computing Lab，面向大语言模型推理中的吞吐与内存管理需求。它将模型执行封装为可嵌入 Python 的推理库和在线 API 服务，让应用在自有计算资源上提供模型能力。对于 Agent，vLLM 承担多轮对话与工具决策所需的模型推理。[项目概览](https://github.com/vllm-project/vllm)

## 核心能力

- **模型请求调度**：使用连续批处理和分块 Prefill 等方式处理并发请求，并提供分布式推理和多种硬件支持。[能力列表](https://github.com/vllm-project/vllm)
- **KV 缓存复用**：管理推理过程中产生的注意力状态，通过自动前缀缓存复用已有请求的相同输入部分。[前缀缓存](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/)
- **应用接口**：提供兼容 OpenAI 的服务接口、流式输出，以及结构化输出和工具调用解析等能力。[工具调用](https://docs.vllm.ai/en/latest/features/tool_calling/)

## 核心概念与工作方式

离线模式下，应用通过 Python 中的模型对象提交输入并获得生成结果；在线模式下，服务进程加载模型，接收 API 请求并将其交给推理引擎。客户端可以使用已有的兼容 SDK，将服务地址指向 vLLM 端点。[两种接入模式](https://docs.vllm.ai/en/latest/getting_started/quickstart/)

自动前缀缓存保留已计算输入的 KV 状态，新请求具有相同前缀时可以复用相应计算。对于反复携带共同系统提示词或文档内容的请求，这提供了重复输入的计算复用能力；具体收益取决于前缀重合和工作负载。[缓存说明](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/)

## 使用场景与接入方式

vLLM 可用于自建模型 API、Agent 多轮交互和离线批量生成。启用工具调用时，需要匹配模型、聊天模板与解析器；模型返回函数名称和参数后，由调用方执行实际工具，并将结果加入后续消息。[调用方职责](https://docs.vllm.ai/en/latest/features/tool_calling/)

入门可以安装对应运行环境的软件包，使用 `vllm serve` 指定模型启动服务，随后调用聊天或文本生成 API。模型文件的许可与 vLLM 引擎的 Apache-2.0 许可分别适用，部署时需选择兼容的模型、计算资源和运行配置。[快速开始](https://docs.vllm.ai/en/latest/getting_started/quickstart/)
