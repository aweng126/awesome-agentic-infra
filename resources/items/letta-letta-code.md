---
name: Letta / Letta Code
summary: 支持持久记忆的 Agent 执行框架，允许 Agent 修改记忆块、检索历史对话并管理跨会话状态，另提供基于 Git 跟踪上下文的 MemFS。
type: project
topic: memory-and-context
url: https://github.com/letta-ai/letta-code
anchor: resource-letta-letta-code
order: 2
links:
  - label: Letta Code 仓库
    url: https://github.com/letta-ai/letta-code
  - label: 官网
    url: https://www.letta.com/agent
  - label: 文档
    url: https://docs.letta.com/
  - label: CLI 入门
    url: https://docs.letta.com/platform/cli
maintainer: Letta 团队与社区
form: 有状态 Agent 运行框架与配套云服务
license: Apache-2.0（Letta Code）
---

## 背景与目标

Letta 围绕能够跨会话保留记忆与身份的 Agent 展开。本条目以 Letta Code 为主要入口：它是运行有状态 Agent 的开源 Harness，可以交互使用，也可以支持持续运行的任务。其目标是让 Agent 随长期交互更新自己的记忆、技能和工作上下文。[项目介绍](https://github.com/letta-ai/letta-code)

## 核心能力

- **持久记忆**：Agent 可以用文件工具读取和修改 MemFS 中的长期信息，常用内容与按需读取的材料分开组织。[MemFS](https://docs.letta.com/concepts/memfs)
- **持续交互**：支持跨对话继续使用同一个 Agent，检索历史消息，并通过 CLI 等入口与其交互。[CLI 入门](https://docs.letta.com/platform/cli)
- **扩展执行**：支持技能、子 Agent 和定时任务；权限配置决定哪些操作需要确认或可以自动执行。[功能概览](https://github.com/letta-ai/letta-code#feature-overview)

## 核心概念与工作方式

Letta Code 是实际运行 Agent 的组件，Letta Cloud 则提供配套的云端状态与交互服务。运行程序可以位于本机或远程计算机；选择云端模式时，记忆、身份和对话由 Cloud 保存。代码仓库的 Apache-2.0 许可证适用于 Letta Code，云产品有独立的使用方式。[组件关系](https://github.com/letta-ai/letta-code#letta-cloud)

MemFS 把长期记忆呈现为带版本历史的文件。`system/` 下的内容持续进入提示词，其余材料按需要读取；目录结构帮助 Agent 找到相关信息。记忆文件与对话历史是不同的数据来源，普通文件检索与历史消息检索也有各自的接口。[记忆组织方式](https://docs.letta.com/concepts/memfs)

## 使用场景与接入方式

Letta Code 可用于需要记住项目背景、用户偏好和历史工作的长期助手。接入时安装 `@letta-ai/letta-code`，在工作目录启动 `letta`，连接模型服务并初始化记忆。可以使用本地状态，也可以登录 Letta 接入云端能力；自动化任务可使用非交互模式。实际运行所需的模型配置与计算环境由所选模式决定。[安装与使用](https://docs.letta.com/platform/cli)
