---
name: Dynamo
summary: 协调推理引擎的分布式服务框架，提供 prefill/decode 分离、感知 KV cache 的路由和缓存管理，用于多节点推理服务的请求调度。
type: project
topic: inference-and-model-serving
url: https://github.com/ai-dynamo/dynamo
anchor: resource-dynamo
order: 1
links:
  - label: 代码仓库
    url: https://github.com/ai-dynamo/dynamo
  - label: 官方文档
    url: https://docs.nvidia.com/dynamo/
  - label: 架构概览
    url: https://docs.nvidia.com/dynamo/latest/knowledge-base/overview
  - label: 快速开始
    url: https://github.com/ai-dynamo/dynamo#quick-start
  - label: 后端能力矩阵
    url: https://docs.nvidia.com/dynamo/resources/feature-matrix
maintainer: NVIDIA 与 Dynamo 社区
form: 开源分布式模型推理服务框架
license: Apache-2.0
---

## 背景与目标

Dynamo 面向跨 GPU、跨节点部署模型时的请求路由、缓存利用和资源协调需求。它位于 vLLM、SGLang、TensorRT-LLM 等推理引擎之上，将多个执行进程组织成模型服务系统。在 Agent 系统中，它服务于多轮、长上下文和并发模型请求，归入关联的 LLM Serving 基础设施。[项目定位](https://github.com/ai-dynamo/dynamo)

## 核心能力

- **分离式推理**：将处理输入的 Prefill 与生成输出的 Decode 放入独立工作进程池，分别配置和调整资源。[总体架构](https://docs.nvidia.com/dynamo/latest/knowledge-base/overview)
- **感知缓存的路由**：结合工作进程负载与已有 KV 缓存的前缀重合情况，为请求选择执行位置。[KV 路由](https://docs.nvidia.com/dynamo/dev/knowledge-base/concepts/system-architecture/kv-aware-routing)
- **缓存与资源协调**：通过 KV 缓存管理、跨进程数据传输和 Planner 等组件连接推理执行与部署控制；具体支持范围取决于所选后端。[能力矩阵](https://docs.nvidia.com/dynamo/resources/feature-matrix)

## 核心概念与工作方式

Frontend 接收并规范化模型请求，Router 选择工作进程，后端推理引擎执行模型计算。在 Prefill、Decode 分离的部署中，前者生成输入对应的 KV 状态，后者获取状态并继续生成 Token，结果经入口流式返回。[请求路径](https://docs.nvidia.com/dynamo/dev/knowledge-base/concepts/architecture)

运行平面之外，Planner 根据指标提出容量调整目标，Kubernetes Operator 协调集群资源。KV 事件使路由层感知缓存变化，NIXL 等传输组件负责工作进程间的数据移动，KVBM 提供缓存块的复用与分层管理。[组件分工](https://docs.nvidia.com/dynamo/latest/knowledge-base/overview)

## 使用场景与接入方式

适合需要集中管理多个模型执行进程、利用重复上下文，或分别扩展 Prefill 与 Decode 的模型服务平台。上层 Agent 通过模型 API 获取推理结果，工具执行、记忆和任务编排则使用 Agent 侧组件。

官方提供按推理后端组织的容器、安装包和部署示例。可以先启动 Frontend 与一个后端 Worker 验证请求，再扩展为多节点或 Kubernetes 部署。选择配置时，应结合模型、硬件和后端支持矩阵确认缓存、并行与传输功能。[快速开始](https://github.com/ai-dynamo/dynamo#quick-start)、[兼容范围](https://docs.nvidia.com/dynamo/resources/feature-matrix)
