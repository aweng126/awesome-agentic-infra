---
name: NVIDIA NeMo Guardrails
summary: 为 LLM 应用提供可编程检查流程，通过 Colang、execution rails 和自定义动作，在 Agent 的输入、检索、工具执行与输出阶段接入应用规则。
type: project
topic: security-and-governance
url: https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview
anchor: resource-nvidia-nemo-guardrails
order: 2
links:
  - label: 文档
    url: https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview
  - label: 代码仓库
    url: https://github.com/NVIDIA-NeMo/Guardrails
  - label: 安装指南
    url: https://docs.nvidia.com/nemo/guardrails/get-started/installation-guide
  - label: 检查流程类型
    url: https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/rail-types
maintainer: NVIDIA NeMo 团队与社区
form: 开源 LLM 应用检查与控制库
license: Apache-2.0（Python 库）
---

## 背景与目标

NeMo Guardrails 为 LLM 应用增加可编程的检查与控制流程。应用可以配置输入检查、话题限制、检索内容处理和输出过滤，也可以在工具调用周围执行自定义规则。本条目聚焦开源 Python 库，NVIDIA 另提供基于相关配置模型的微服务交付方式。[官方概览](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview)

## 核心能力

- **分阶段检查**：在输入、检索、对话、工具执行和输出阶段接入不同的 Rail，按配置验证、修改或阻止内容。[Rail 类型](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/rail-types)
- **流程配置**：使用 YAML 配置模型、提示词与运行选项，通过 Colang 表达对话流程及事件驱动行为。[组件概览](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview)
- **自定义扩展**：通过 Python Action、工具或外部 API 接入业务检查，也可组合已有检测模型和服务。[项目能力](https://github.com/NVIDIA-NeMo/Guardrails)

## 核心概念与工作方式

Rail 表示应用交互中某个阶段的控制流程。Input Rail 处理用户输入，Retrieval Rail 处理检索内容，Execution Rail 面向工具参数与返回结果，Output Rail 处理模型输出；Dialog Rail 则组织多轮对话中的流程约束。[各阶段职责](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/rail-types)

应用加载配置后，通过 Python 接口或服务接口发送消息。运行库根据配置调用检查逻辑，并决定后续如何处理请求。具体效果取决于选择的规则、模型与集成方式；应用仍需要为工具本身实现权限控制和执行环境管理。[运行接口与集成](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview)

## 使用场景与接入方式

面向用户的助手、带检索的问答系统和会调用外部工具的 Agent，可以按所需阶段配置检查。接入时安装 `nemoguardrails`，准备配置目录，选择模型及所需检查组件，再通过 `RailsConfig` 与 `LLMRails` 接入 Python 应用，或启动 API Server。[安装指南](https://docs.nvidia.com/nemo/guardrails/get-started/installation-guide) · [接入示例](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview)

开源库的 Apache-2.0 许可与具体检测模型、外部 API、微服务产品的使用条件分别适用，部署所需组件由实际选择的 Rail 决定。[库许可](https://github.com/NVIDIA-NeMo/Guardrails#license)
