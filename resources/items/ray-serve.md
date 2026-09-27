---
name: Ray Serve
summary: 将 Python 逻辑和模型组合为在线服务，可分别部署 Agent、模型与工具组件，支持服务组合、副本伸缩、资源配置和跨机器调度。
type: project
topic: deployment-and-scheduling
aliases: ["Ray Serve"]
keywords: ["分布式服务", "Python", "在线服务", "服务组合", "副本伸缩", "GPU 调度"]
role: service-deployment
delivery: self-hosted
url: https://docs.ray.io/en/latest/serve/index.html
anchor: resource-ray-serve
order: 9
links:
  - label: 官网
    url: https://www.ray.io/
  - label: 代码仓库
    url: https://github.com/ray-project/ray
  - label: 文档
    url: https://docs.ray.io/en/latest/serve/index.html
  - label: 快速开始
    url: https://docs.ray.io/en/latest/serve/getting_started.html
maintainer: Ray 团队与社区
form: 开源 Python 分布式服务框架
license: Apache-2.0
---

## 背景与目标

Ray Serve 是构建在线推理 API 的服务库，允许开发者用 Python 组织模型、预处理和业务逻辑，并将它们部署到 Ray 集群。它面向多个服务组件需要独立运行、组合调用和弹性伸缩的场景，可以承载 Agent 服务以及它使用的模型和工具组件。[官方概览](https://docs.ray.io/en/latest/serve/index.html)

## 核心能力

- **服务封装与组合**：把 Python 类或函数定义为 Deployment，再通过调用句柄将多个 Deployment 组合成应用。[核心概念](https://docs.ray.io/en/latest/serve/key-concepts.html)
- **独立副本伸缩**：按请求压力为各个 Deployment 增减副本，配置最小、最大副本数和并发目标。[自动伸缩](https://docs.ray.io/en/latest/serve/autoscaling-guide.html)
- **资源与接口管理**：利用 Ray 分配 CPU、GPU 等资源，通过 HTTP 或 Python 接口调用服务，并支持流式响应与批处理等服务能力。[能力概览](https://docs.ray.io/en/latest/serve/index.html)

## 核心概念与工作方式

Deployment 描述一个可独立部署和伸缩的组件；Replica 是它在独立 Ray Actor 进程中的运行副本；Application 由一个或多个 Deployment 组成，其中入口 Deployment 接收请求。其他组件通过 DeploymentHandle 被调用，开发者可以用普通 Python 控制流组合结果。[部署模型](https://docs.ray.io/en/latest/serve/key-concepts.html)

Ray Serve 根据服务请求量调整副本，Ray 集群层根据这些副本所需的计算资源决定是否增加节点。两层伸缩分别处理服务容量和集群容量，因此不同模型或工具组件可以配置各自的资源需求。[两层伸缩关系](https://docs.ray.io/en/latest/serve/autoscaling-guide.html)

## 使用场景与接入方式

它适用于把检索、模型推理、后处理和工具接口组织为在线服务，也可以将 Agent 业务逻辑作为入口组件。对于使用专用推理引擎的模型服务，Ray Serve 可以承担外部服务封装与分布式部署；Agent 的任务状态和执行流程由应用层继续定义。[服务范围](https://docs.ray.io/en/latest/serve/index.html)

接入时安装 Ray Serve，在 Python 类上声明 Deployment，通过 `bind` 组合应用，再使用 `serve.run` 或部署命令启动。官方入门从单机 HTTP 服务开始，后续可以配置副本、资源并部署到 Ray 集群。[快速开始](https://docs.ray.io/en/latest/serve/getting_started.html)

需要把 Agent、模型与工具拆成服务时，可继续阅读本站收录的 [Ray 官方 Agent 部署教程](build-a-tool-using-agent.md)。
