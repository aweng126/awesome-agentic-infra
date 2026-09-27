---
name: Google Agent Development Kit (ADK)
summary: 用于组织 Agent、工具和多 Agent 工作流的开发工具包，支持图工作流、顺序与并行组合，以及会话事件管理和执行恢复。
type: project
topic: runtime-and-orchestration
url: https://adk.dev/
anchor: resource-google-adk
order: 4
links:
  - label: 官网与文档
    url: https://adk.dev/
  - label: Python 仓库
    url: https://github.com/google/adk-python
  - label: 快速开始
    url: https://adk.dev/get-started/
  - label: 图工作流
    url: https://adk.dev/graphs/
maintainer: Google 与社区
form: 开源 Agent 开发工具包
license: Apache-2.0（Python SDK）
---

## 背景与目标

Google ADK 为 Agent 的开发、调试、评估和部署提供统一工具，采用代码定义模型、工具及协作流程。它既支持由模型决定下一步的 Agent，也支持把普通函数和 Agent 放进明确的工作流，方便从单个助手扩展到多步骤应用。[官方介绍](https://adk.dev/)

ADK 属于应用开发框架，模型服务和最终运行环境可以分别选择。官方提供多个语言 SDK，各语言支持的具体能力和版本可在对应文档中查看。[开发入口](https://adk.dev/get-started/)

## 核心能力

- **Agent 与工具组合**：为 Agent 配置模型、指令和工具，组织子 Agent，让不同角色承担检索、处理或回复等任务。[技术概览](https://adk.dev/get-started/about/)
- **多种流程表达**：提供顺序、并行与循环模板，以及由节点和连线表达条件分支的图工作流；也可以使用代码组织动态流程。[工作流文档](https://adk.dev/graphs/)
- **会话与事件管理**：以事件表达消息、工具调用和状态变更，将执行过程交给 Runner 与会话服务协调，供应用获取回复及中间结果。[事件说明](https://adk.dev/events/)
- **开发与评估工具**：提供命令行和本地 Web 开发界面，以及评估和部署入口，帮助开发者检查 Agent 行为。[项目仓库](https://github.com/google/adk-python)

## 核心概念与工作方式

Agent 描述单个任务角色的行为，Tool 提供外部能力，Session 保存一次交互的状态与事件。应用向 Runner 传入用户消息，Runner 驱动 Agent 执行并产出事件，事件再用于更新会话和向客户端返回结果。[技术概览](https://adk.dev/get-started/about/)、[事件说明](https://adk.dev/events/)

图工作流进一步把 Agent、代码函数、工具及人工输入放到同一执行图中，由明确的连线决定后续步骤。这与顺序或并行 Agent 模板共同构成不同粒度的编排方式。[图工作流](https://adk.dev/graphs/)

## 使用场景与接入方式

可用于带业务工具的助手、多角色协作及需要固定处理环节的业务流程。先选择语言 SDK，配置模型凭证并定义 Agent，在本地工具中测试；需要上线时，再选择相应的服务封装和部署环境。Python 项目可从 `google-adk` 包和官方快速开始进入。[快速开始](https://adk.dev/get-started/)
