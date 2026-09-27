---
name: VeADK
summary: 火山引擎的开源 Agent 开发工具包，提供 Agent、Runner、子 Agent 组织和会话存储，并支持 AgentKit 应用集成。
type: project
topic: runtime-and-orchestration
aliases: ["火山引擎 ADK", "VeADK Python"]
keywords: ["字节跳动", "火山引擎", "Agent SDK", "Google ADK", "Runner", "AgentKit"]
role: agent-framework
delivery: library
url: https://github.com/volcengine/veadk-python
anchor: resource-veadk
order: 10
links:
  - label: 代码仓库
    url: https://github.com/volcengine/veadk-python
  - label: 文档
    url: https://volcengine.github.io/veadk-python/
  - label: 快速开始
    url: https://github.com/volcengine/veadk-python#have-a-try
  - label: 交互教程
    url: https://github.com/volcengine/veadk-python/blob/main/veadk_tutorial.ipynb
maintainer: 火山引擎与社区
form: 开源 Python Agent 开发工具包
license: Apache-2.0
---

## 背景与目标

VeADK 是火山引擎提供的开源 Agent 开发工具包，将模型访问、工具、会话及云服务集成放到 Python 开发接口中。开发者可以从一个简单 Agent 开始，再接入知识库、记忆、子 Agent 和应用服务。[项目介绍](https://github.com/volcengine/veadk-python)

工具包的 Agent 与 Runner 扩展自 [Google ADK](google-adk.md) 对应组件，并加入火山引擎相关能力。它承担应用开发和执行组织；[AgentKit Runtime](volcengine-agentkit-runtime.md) 则是可以接入的部署及运行平台，两者处于不同层面。[Agent 定义](https://github.com/volcengine/veadk-python/blob/main/veadk/agent.py)、[Runner 定义](https://github.com/volcengine/veadk-python/blob/main/veadk/runner.py)

## 核心能力

- **Agent 与模型配置**：在 Agent 中配置模型、工具和指令，连接模型 API，也可添加知识库、子 Agent 和追踪组件。[Agent 组件](https://github.com/volcengine/veadk-python/blob/main/veadk/agent.py)
- **会话与记忆**：Runner 关联用户及会话标识，通过会话服务管理交互，并连接配置的短期或长期记忆组件。[Runner 组件](https://github.com/volcengine/veadk-python/blob/main/veadk/runner.py)
- **多种执行组织**：提供顺序、并行和循环 Agent 组件，组合多个处理环节；Runner 也支持文本及多模态输入。[执行入口](https://github.com/volcengine/veadk-python/blob/main/veadk/runner.py)
- **AgentKit 应用集成**：通过应用工厂包装根 Agent，提供平台 API、Web UI、健康检查及 Agent 拓扑接口。[应用集成](https://github.com/volcengine/veadk-python#agentkit-application)

## 核心概念与工作方式

Agent 描述行为和可用能力，Runner 驱动一次交互，把输入转换为消息，并在会话上下文中运行 Agent、消费事件和提取回复。应用可直接调用 Agent 的简化入口，也可以显式创建 Runner 来控制会话及执行配置。[运行过程](https://github.com/volcengine/veadk-python/blob/main/veadk/runner.py)

模型与服务连接信息可以通过配置文件提供，业务代码则定义工具和 Agent 关系。需要面向平台提供服务时，再使用 AgentKit 应用工厂接入路由和生命周期管理。[配置与应用示例](https://github.com/volcengine/veadk-python)

## 使用场景与接入方式

可用于接入火山引擎模型与相关服务的业务助手、多 Agent 应用及 AgentKit 部署项目。安装 `veadk-python`，配置模型名称、API 地址和凭证后运行最小示例；再按实际需求加入存储、追踪和平台集成组件。[快速开始](https://github.com/volcengine/veadk-python#have-a-try)
