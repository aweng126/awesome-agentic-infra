---
name: LlamaIndex OSS
summary: 提供数据连接器、索引与检索接口，将外部文档和数据组织为 Agent 可查询的上下文，支持检索器组合及索引存储与重载。
type: project
topic: memory-and-context
url: https://github.com/run-llama/llama_index
anchor: resource-llamaindex-oss
order: 3
links:
  - label: 代码仓库
    url: https://github.com/run-llama/llama_index
  - label: 官网
    url: https://www.llamaindex.ai/
  - label: OSS 文档
    url: https://developers.llamaindex.ai/python/framework/
  - label: 核心概念
    url: https://developers.llamaindex.ai/python/framework/getting_started/concepts/
maintainer: LlamaIndex 团队与社区
form: 开源数据接入与 Agent 开发框架
license: MIT
status:
  label: OSS 框架仍可用；团队重心转向文档处理产品
  source: https://github.com/run-llama/llama_index
  checked: 2026-09-27
---

## 背景与目标

LlamaIndex OSS 起步于让模型使用外部数据的问题：企业文档、数据库和私有资料需要先被读取、组织和检索，才能进入模型上下文。它提供从数据接入到查询接口的一组开发组件，帮助构建基于自有数据的问答与 Agent 应用。[项目背景](https://github.com/run-llama/llama_index#-overview)

## 核心能力

- **数据接入与组织**：通过连接器加载文档和数据源，使用索引组织后续检索需要的信息。[OSS 文档](https://developers.llamaindex.ai/python/framework/)
- **查询与上下文构建**：提供检索器、查询引擎和结果处理组件，可组合成面向应用的数据查询接口。[OSS 文档](https://developers.llamaindex.ai/python/framework/)
- **应用编排**：通过 Agent 的工具调用循环，以及 Workflow 中的步骤组织模型与业务逻辑。[核心概念](https://developers.llamaindex.ai/python/framework/getting_started/concepts/)
- **持久化接入**：保存并重新加载索引相关数据，也可以选择外部存储后端。[存储与加载](https://developers.llamaindex.ai/python/framework/module_guides/storing/save_load/)

## 核心概念与工作方式

典型的数据路径是先加载资料，构建索引，再以问题检索相关内容，最后将结果交给模型生成回答。检索接口还可以作为 Agent 的工具，与其他业务操作组合。框架采用核心包与集成包分离的方式，模型、嵌入与向量存储等组件可以按项目需要选择。[框架结构](https://github.com/run-llama/llama_index)

OSS 框架与 LlamaParse 产品有不同边界。官方已说明团队主要精力转向文档解析、提取及相关评测，OSS 工具包仍然提供使用；LlamaParse 可以与框架组合，也可以独立接入。[项目现状与产品关系](https://github.com/run-llama/llama_index)

## 使用场景与接入方式

已有私有知识库、文档检索或数据问答需求的应用，可以从 OSS 框架的数据链路开始。Python 用户可安装包含常用集成的 `llama-index`，也可安装 `llama-index-core` 后逐项添加模型和存储集成。数据保存位置、模型调用及外部系统凭据由应用配置；索引可以持久化后重新加载。[安装入口](https://developers.llamaindex.ai/python/framework/) · [持久化说明](https://developers.llamaindex.ai/python/framework/module_guides/storing/save_load/)
