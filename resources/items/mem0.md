---
name: Mem0
summary: 面向 AI 应用的记忆层，支持记忆提取及按用户、会话和 Agent 组织信息，通过 API 写入与检索，为后续交互补充历史上下文。
type: project
topic: memory-and-context
url: https://github.com/mem0ai/mem0
anchor: resource-mem0
order: 4
links:
  - label: 代码仓库
    url: https://github.com/mem0ai/mem0
  - label: 官网
    url: https://mem0.ai/
  - label: 开源版文档
    url: https://docs.mem0.ai/open-source/overview
  - label: 托管版入门
    url: https://docs.mem0.ai/platform/quickstart
maintainer: Mem0 团队与社区
form: 开源记忆组件与托管记忆服务
license: Apache-2.0（开源仓库）
---

## 背景与目标

Mem0 为 AI 应用提供独立的记忆层，面向多次交互中需要复用的信息，例如用户偏好、历史问题和已确认的事实。应用可以把这些信息保存为可查询的记忆，在后续请求中取回相关内容，为模型补充上下文。[项目介绍](https://github.com/mem0ai/mem0)

## 核心能力

- **记忆提取**：从传入的对话中识别需要保存的事实，将一段交流拆成可独立使用的信息。[平台快速开始](https://docs.mem0.ai/platform/quickstart)
- **范围划分**：通过用户、Agent 和运行等标识组织记忆，并在查询时限定相应范围。[平台快速开始](https://docs.mem0.ai/platform/quickstart)
- **检索与维护**：根据当前问题查询相关记忆，提供更新、删除等接口处理发生变化的信息。[项目与接口概览](https://github.com/mem0ai/mem0)
- **部署选择**：既可以把开源库嵌入应用或自行部署服务，也可以使用托管平台。[开源版概览](https://docs.mem0.ai/open-source/overview)

## 核心概念与工作方式

应用通常先用当前问题搜索记忆，把相关结果加入模型上下文，完成交互后再提交需要保存的消息。记忆层负责信息保存与检索，主应用仍然负责模型对话、工具调用和业务流程。返回记录包含记忆内容及其关联标识，便于应用决定后续如何使用。[接入流程](https://docs.mem0.ai/platform/quickstart)

开源版使用可配置的模型、嵌入和存储组件，库模式与自托管服务的默认部署配置有所不同。托管平台通过 API 提供记忆能力，使用 `MemoryClient`；在自己的应用中运行开源引擎则使用 `Memory`。两种方式的运行环境与数据管理责任不同。[开源部署说明](https://docs.mem0.ai/open-source/overview)

## 使用场景与接入方式

需要延续用户偏好、复用客户支持记录或保留长期助手上下文的应用，可以在现有对话流程中加入记忆读写。接入时选择托管或自行运行，安装对应 SDK，配置凭据与用户标识，再验证写入和检索流程。自行运行还需要准备模型与存储后端；托管模式从平台账户和 API 密钥开始。[开源版入口](https://docs.mem0.ai/open-source/overview) · [托管版入门](https://docs.mem0.ai/platform/quickstart)
