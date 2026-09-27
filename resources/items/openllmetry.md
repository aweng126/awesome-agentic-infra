---
name: OpenLLMetry
summary: 基于 OpenTelemetry 的 LLM 应用插桩工具与 SDK，覆盖模型服务和向量数据库等调用，可将 Agent 依赖组件的遥测接入已有观测系统。
type: project
topic: observability-and-evaluation
aliases: ["OpenLLMetry", "Traceloop SDK"]
keywords: ["OpenTelemetry", "OTel", "插桩", "遥测", "Span", "Collector"]
role: telemetry-instrumentation
delivery: library
url: https://github.com/traceloop/openllmetry
anchor: resource-openllmetry
order: 2
links:
  - label: Python 仓库
    url: https://github.com/traceloop/openllmetry
  - label: 官网
    url: https://www.traceloop.com/openllmetry
  - label: Python 入门
    url: https://traceloop.com/docs/openllmetry/getting-started-python
  - label: Collector 接入
    url: https://www.traceloop.com/docs/openllmetry/integrations/otel-collector
maintainer: Traceloop 团队与社区
form: 开源 OpenTelemetry 插桩组件与 SDK
license: Apache-2.0
---

## 背景与目标

OpenLLMetry 为已有 OpenTelemetry 观测体系补充 LLM 应用相关的插桩能力。它记录模型服务、向量数据库和 Agent 框架中的调用，让应用团队可以把这些步骤与普通服务请求一起送入观测系统。项目由 Traceloop 维护，仓库提供独立插桩包及便于初始化的 SDK。[项目介绍](https://github.com/traceloop/openllmetry)

## 核心能力

- **依赖调用插桩**：为受支持的模型 SDK、向量存储和应用框架记录调用信息。[支持范围](https://github.com/traceloop/openllmetry#-what-do-we-instrument)
- **业务步骤关联**：通过装饰器标记工作流与自定义函数，使其与自动记录的模型调用形成完整 Trace。[Python 入门](https://traceloop.com/docs/openllmetry/getting-started-python)
- **标准格式导出**：输出 OpenTelemetry 数据，可以发送到 Collector，再转发给现有观测后端。[Collector 接入](https://www.traceloop.com/docs/openllmetry/integrations/otel-collector)

## 核心概念与工作方式

插桩代码在应用调用受支持组件时创建 Span，记录该步骤的属性和执行信息；多个关联 Span 描述一次工作流。SDK 负责初始化相关插桩与导出配置。已有 OpenTelemetry 配置的应用，也可以直接使用所需的独立插桩包。[组件组成](https://github.com/traceloop/openllmetry)

OpenLLMetry 提供的是数据采集与导出组件；Trace 的存储、检索和可视化由接收端承担。Traceloop 是可选择的后端之一，也可以配置标准 Collector 地址，将数据交给其他兼容系统。使用不同后端时，需要分别配置接收地址与认证信息。[导出设置](https://traceloop.com/docs/openllmetry/getting-started-python) · [Collector 说明](https://www.traceloop.com/docs/openllmetry/integrations/otel-collector)

## 使用场景与接入方式

已有统一监控平台、希望把 Agent 模型调用和检索步骤纳入现有链路的应用，可以使用 OpenLLMetry。Python 项目可安装 `traceloop-sdk` 并初始化，对业务函数补充工作流标记，再设置数据导出目的地。具体能自动记录哪些组件取决于所用语言、SDK 和集成版本；自定义步骤可以手动补充记录。[快速开始](https://traceloop.com/docs/openllmetry/getting-started-python)
