---
name: LangGraph
summary: 面向有状态、长时间运行 Agent 的图编排框架，可组合确定性步骤与模型决策，支持状态持久化、执行恢复、流式输出与人工介入。
type: project
topic: runtime-and-orchestration
aliases: ["LangGraph OSS"]
keywords: ["图编排", "持久执行", "检查点", "Checkpointer", "人工介入", "状态管理"]
role: agent-framework
delivery: library
url: https://docs.langchain.com/oss/python/langgraph/overview
anchor: resource-langgraph
order: 5
links:
  - label: 官网
    url: https://www.langchain.com/langgraph
  - label: 代码仓库
    url: https://github.com/langchain-ai/langgraph
  - label: 文档
    url: https://docs.langchain.com/oss/python/langgraph/overview
  - label: 快速开始
    url: https://docs.langchain.com/oss/python/langgraph/quickstart
  - label: 发布记录
    url: https://github.com/langchain-ai/langgraph/releases
maintainer: LangChain 团队与社区
form: 开源开发框架
license: MIT
status:
  label: 已发布稳定版
  source: https://docs.langchain.com/oss/python/releases/langgraph-v1
  checked: 2026-09-27
---

## 背景与目标

LangGraph 面向需要多步执行、保留状态和接受人工介入的 Agent。开发者可以把固定业务步骤与模型决策放进同一个流程，明确控制何时调用模型、执行工具或等待外部输入。项目由 LangChain 团队开发，可以独立使用，也可以结合 LangChain 的模型和工具组件。[官方概览](https://docs.langchain.com/oss/python/langgraph/overview)

## 核心能力

- **流程编排**：通过节点与连线表达顺序、分支、循环和并行步骤，也提供使用普通函数组织流程的 Functional API。[快速开始](https://docs.langchain.com/oss/python/langgraph/quickstart)
- **状态与记忆**：通过 Checkpointer 保存当前执行线程的状态，通过 Store 保存跨线程使用的信息。[持久化说明](https://docs.langchain.com/oss/python/langgraph/persistence)
- **人工介入与持续执行**：支持在流程中暂停，检查或修改状态后继续推进，并向调用方流式输出执行过程。[能力概览](https://docs.langchain.com/oss/python/langgraph/overview)

## 核心概念与工作方式

Graph API 由三个基本概念组成：State 保存任务当前的数据；Node 接收状态，执行模型调用、工具操作或普通代码，并返回更新；Edge 决定下一步运行哪个节点。开发者先定义状态结构和节点关系，再编译为可调用的图。[Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api)

需要跨次调用继续任务时，可以为图配置 Checkpointer，并使用线程标识关联检查点。跨会话的偏好、事实和共享知识则可以放在 Store 中。这两类存储分别服务于当前任务的连续性和跨任务的信息复用。[持久化说明](https://docs.langchain.com/oss/python/langgraph/persistence)

## 使用场景与接入方式

LangGraph 可用于带审批环节的业务流程、多轮工具调用，以及需要自定义执行路径的 Agent。官方快速开始以计算器 Agent 演示“模型选择工具 → 工具返回结果 → 模型继续处理”的循环，适合建立对编排方式的初步认识。[快速开始](https://docs.langchain.com/oss/python/langgraph/quickstart)

接入时，在应用中安装开发库，配置模型与工具，然后调用或流式执行图。正式使用前还需要为持久化选择相应存储后端；追踪、评估和托管部署可以结合 LangSmith 等配套服务。[生态与部署入口](https://docs.langchain.com/oss/python/langgraph/overview)
