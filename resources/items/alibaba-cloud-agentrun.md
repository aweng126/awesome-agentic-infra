---
name: 阿里云 AgentRun
summary: 基于函数计算的 Serverless Agent 基础设施平台，提供可分别使用的 Agent Runtime、Sandbox 与模型治理组件，支持会话亲和、实例生命周期管理和按需伸缩。
type: project
topic: deployment-and-scheduling
url: https://help.aliyun.com/zh/agentrun/what-is-agentrun
anchor: resource-alibaba-cloud-agentrun
order: 3
links:
  - label: 产品文档
    url: https://help.aliyun.com/zh/agentrun/what-is-agentrun
  - label: 代码部署指南
    url: https://help.aliyun.com/zh/functioncompute/create-agent-by-code-high-code
  - label: SDK 快速开始
    url: https://docs.agent.run/docs/tutorial/quick-start
  - label: 控制台
    url: https://functionai.console.aliyun.com
maintainer: 阿里云
form: 基于函数计算的 Serverless Agent 云服务
---

## 背景与目标

Agent 从本地代码变成在线服务后，还需要运行环境、模型访问、工具执行、凭证管理与运行观测。AgentRun 基于阿里云函数计算提供这些基础设施，目标是让开发者使用熟悉的框架编写 Agent，再按需接入托管能力。平台同时提供无代码、低代码和高代码入口；本条目主要介绍与自建 Agent 相关的运行服务。参见 [产品介绍](https://help.aliyun.com/zh/agentrun/what-is-agentrun)。

## 核心能力

- **托管执行**：部署 Agent 服务，管理计算实例、版本和访问入口，根据负载伸缩。
- **会话亲和**：让同一会话的请求尽量复用运行实例，配合并发会话数与空闲时间配置管理资源。
- **工具执行**：通过独立 Sandbox 组件提供代码解释器和浏览器操作环境。
- **配套服务**：接入模型、工具和凭证管理，结合日志与调用链观察运行过程。

组件可按需使用。需要自定义业务逻辑时，高代码模式支持代码包、OSS 代码包、在线编辑或容器镜像，并可配置网络、执行角色和启动方式。参见 [代码部署指南](https://help.aliyun.com/zh/functioncompute/create-agent-by-code-high-code)。

## 核心概念与工作方式

Agent Runtime 承载 Agent 应用，Sandbox 承载由 Agent 调用的代码或浏览器任务，模型与工具配置则提供外部能力的连接信息。运行时负责接收请求和管理实例，任务步骤仍由部署的应用决定。

会话亲和描述请求与实例之间的关联，业务需要长期保存的状态则应通过应用及存储组件管理。开发者可以沿用已有框架，通过 AgentRun SDK 调用平台能力，再将服务发布到运行时。SDK 的基本调用路径见 [快速开始](https://docs.agent.run/docs/tutorial/quick-start)。

## 使用场景与接入方式

适合已有 Agent 代码、希望接入阿里云 Serverless 环境的团队，也适合只需要托管沙箱或模型访问组件的应用。可先按 SDK 示例在本地运行，再通过代码或镜像创建 Agent，设置资源规格、网络与凭证，完成调试后发布版本。

在本仓库中，AgentRun 属于部署与调度主题；[运行时与编排](../runtime-and-orchestration.md) 中的框架决定任务逻辑，而这里的云服务提供应用上线后的执行与管理环境。
