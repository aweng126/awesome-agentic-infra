---
name: Google AX
summary: Google 开源、可自托管的声明式 Agent 工作负载编排平台，通过 Task、Workspace 和 Model 管理任务、工作环境与模型配置，基于 Kubernetes 上的 Agent Substrate 执行。当前核心规范仍在演进，详见 [概念文档](https://github.com/google/ax/blob/main/docs/concepts.md)。
type: project
topic: deployment-and-scheduling
url: https://github.com/google/ax
anchor: resource-google-ax
order: 5
links:
  - label: 官网
    url: https://agentexecutor.io/
  - label: 代码仓库
    url: https://github.com/google/ax
  - label: 文档
    url: https://github.com/google/ax/blob/main/docs/concepts.md
  - label: 快速开始
    url: https://github.com/google/ax#quick-start
maintainer: Google 与社区
form: 开源自托管编排平台
license: Apache-2.0
status:
  label: 规范演进中（v1alpha1）
  source: https://github.com/google/ax#ax
  checked: 2026-09-27
---

## 背景与目标

AX 是 Google 开源的 Agent 工作负载编排平台。官方将 Agent 描述为会积累状态、调用模型和工具、需要隔离环境的新型工作负载，并希望用声明式资源统一描述它们的任务和运行条件。用户提交任务定义，平台负责准备环境、启动执行和管理生命周期。[项目介绍](https://agentexecutor.io/)

## 核心能力

- **任务管理**：声明执行镜像、命令及计算资源，查看任务状态，暂停、恢复或删除任务。
- **环境准备**：用 Workspace 配置代码仓库、MCP 服务和技能来源，并让多个任务复用同一份环境定义。
- **模型配置**：集中声明模型提供方、参数及凭据引用，供平台组件和任务环境使用。[概念文档](https://github.com/google/ax/blob/main/docs/concepts.md)
- **运行检查**：通过 CLI 观察状态变化，并在启用调试的任务中进入沙箱检查文件或执行命令。[CLI 用法](https://github.com/google/ax#cli-usage)

## 核心概念与工作方式

Task 是一次隔离执行的基本单元，可以绑定一个或多个 Workspace；Workspace 描述执行前需要准备的数据、工具和技能；Model 描述模型服务及其参数。任务可以独立完成工作，也可以由 Agent 按需组合成更大的任务集合。[概念文档](https://github.com/google/ax/blob/main/docs/concepts.md)

控制面接收资源定义，在 Redis 中保存状态并分发任务事件，控制器再通过 Agent Substrate 创建和管理隔离执行环境。AX 部署在 Kubernetes 上，任务资源由 AX 自身的控制面管理。[架构说明](https://github.com/google/ax/blob/main/DESIGN.md)

## 使用场景与接入方式

AX 面向需要在集群中运行、管理多个 Agent 任务的场景，例如为代码处理任务预备仓库和工具环境，再按声明启动隔离执行。开发者可以使用默认 Runner，也可以按官方约定提供自己的 Runner 镜像。[Runner 文档](https://github.com/google/ax/blob/main/docs/runner.md)

接入需要准备已安装 Agent Substrate 的 Kubernetes 集群，部署 AX 控制面并安装 CLI，然后用 YAML 定义资源，通过 `ax apply` 提交。当前接口使用 `v1alpha1`，官方说明核心概念和规范仍在完善，稳定版前可能出现重大变更。[快速开始与项目状态](https://github.com/google/ax#quick-start)
