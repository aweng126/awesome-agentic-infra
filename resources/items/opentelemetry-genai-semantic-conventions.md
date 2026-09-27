---
name: OpenTelemetry GenAI Semantic Conventions
summary: 为生成式 AI 遥测定义共享的语义约定，统一表达模型、Agent 和工具调用的观测数据。具体字段的稳定性状态见对应规范。
type: spec
topic: observability-and-evaluation
aliases: ["OTel GenAI", "OpenTelemetry GenAI", "GenAI SemConv"]
keywords: ["语义约定", "遥测规范", "Trace", "Span", "gen_ai", "模型调用", "工具执行"]
url: https://github.com/open-telemetry/semantic-conventions-genai
anchor: resource-opentelemetry-genai-semantic-conventions
order: 6
reviewedAt: '2026-09-27'
links:
  - label: 规范仓库
    url: https://github.com/open-telemetry/semantic-conventions-genai
  - label: 文档目录
    url: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md
  - label: Agent 与工具调用
    url: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md
  - label: 模型调用
    url: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md
---

## 用途与范围

OpenTelemetry GenAI Semantic Conventions 为模型、Agent、工具与 MCP 操作定义遥测数据的共同表达方式。它约定哪些操作应记录、字段如何命名及各字段的含义，帮助插桩组件和观测后端理解同一类数据。规范由独立的 GenAI 仓库维护。[规范仓库](https://github.com/open-telemetry/semantic-conventions-genai) · [范围说明](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/README.md)

## 关键概念

- **Span**：描述一次操作及其上下文，规范分别定义模型调用、Agent 调用、工作流和工具执行等操作。
- **属性**：通过 `gen_ai.operation.name`、`gen_ai.request.model` 等字段描述操作名称、模型及相关信息，让不同实现能够使用共同含义。[Agent 与工具 Span](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md)
- **指标与事件**：为调用耗时、Token 用量、输入输出等遥测提供相应定义，与执行追踪一起组织观测数据。[信号目录](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md)

## 基本交互与相关实现

在模型或工具调用发生时，应用侧插桩记录对应 Span 和属性，再通过 OpenTelemetry 组件导出，由后端存储与展示。语义约定提供数据表达规则，采集、传输与可视化由实际接入的组件承担。[模型调用约定](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)

本站的 [OpenLLMetry](openllmetry.md) 介绍了插桩与导出组件，[Langfuse](langfuse.md) 和 [Phoenix](phoenix.md) 介绍了可接收 OpenTelemetry 数据的观测平台。阅读这些实现时，可对照其具体字段与支持范围理解数据如何衔接。

## 阅读与接入

从信号目录找到需要记录的模型、Agent 或工具操作，再查看属性要求及所用插桩库的支持情况。当前 GenAI 规范总览及 Agent Span 文档标为 Development；接入时需对齐所用版本和字段定义。输入输出内容等可选数据按相应规范及应用配置采集。[文档目录](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md) · [模型字段定义](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)
