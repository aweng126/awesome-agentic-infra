---
name: Agent Sandbox
summary: 通过 Kubernetes 自定义资源与控制器管理有状态的单实例执行环境，为 Agent 和代码执行工作负载提供稳定身份、持久存储、生命周期管理与预热池。底层隔离由 RuntimeClass 对接的沙箱运行时提供。
type: project
topic: deployment-and-scheduling
url: https://github.com/kubernetes-sigs/agent-sandbox
anchor: resource-agent-sandbox
order: 1
links:
  - label: 官网
    url: https://agent-sandbox.sigs.k8s.io/
  - label: 代码仓库
    url: https://github.com/kubernetes-sigs/agent-sandbox
  - label: 文档
    url: https://agent-sandbox.sigs.k8s.io/docs/
  - label: 安装与入门
    url: https://github.com/kubernetes-sigs/agent-sandbox#installation
maintainer: Kubernetes SIG Apps 与 Agent Sandbox 社区
form: 开源 Kubernetes CRD、控制器与客户端 SDK
license: Apache-2.0
---

## 背景与目标

Agent Sandbox 面向需要稳定身份、持久文件和独立生命周期的单实例工作负载。Agent 执行环境、云开发空间和交互式代码会话往往需要组合 Pod、存储和网络对象；该项目将这些需求封装为 Kubernetes 中的声明式沙箱资源，方便平台统一创建和管理。[项目定位](https://github.com/kubernetes-sigs/agent-sandbox)

## 核心能力

- **有状态环境管理**：为单个沙箱提供稳定身份、可配置的持久存储及创建、暂停、恢复、定期清理等生命周期操作。[文档概览](https://agent-sandbox.sigs.k8s.io/docs/)
- **模板与预热池**：通过可复用模板定义环境，预先准备可分配的沙箱，再根据用户申请分配实例。[扩展资源](https://github.com/kubernetes-sigs/agent-sandbox#extensions)
- **运行时接入**：通过 Pod 的 RuntimeClass 等配置对接 gVisor、Kata Containers 等隔离运行时；底层隔离能力由所选运行时提供。[职责范围](https://github.com/kubernetes-sigs/agent-sandbox#agent-sandbox)

## 核心概念与工作方式

`Sandbox` 描述一个具有稳定身份的有状态执行环境，控制器持续协调它与底层 Pod 等资源。`SandboxTemplate` 保存环境模板，`SandboxWarmPool` 维持预热实例，`SandboxClaim` 表达使用者的申请，使调用方可以领取环境而无需逐项创建底层对象。[资源关系](https://agent-sandbox.sigs.k8s.io/docs/)

平台管理员负责准备集群、存储、网络和隔离运行时，并定义可供使用的模板。应用随后通过 Kubernetes API 或 Python、Go 客户端创建和管理沙箱。项目提供执行环境编排，Agent 的模型决策、任务流程和业务状态仍在相应应用组件中组织。[客户端与安装](https://github.com/kubernetes-sigs/agent-sandbox#installation)

## 使用场景与接入方式

官方示例覆盖代码执行、编码 Agent、浏览器操作、开发环境和强化学习评估沙箱。在本仓库中，它属于部署与调度主题，连接上层 Agent 请求与集群中的执行环境。[场景示例](https://agent-sandbox.sigs.k8s.io/docs/use-cases/)

接入时先安装核心 CRD 与控制器，再按需要安装模板、申请和预热池扩展。初次使用可从指定镜像的单个 Sandbox 开始，之后再增加持久卷和预热池配置；需要较强执行隔离时，同步为节点与 Pod 配置相应运行时。[安装与入门](https://github.com/kubernetes-sigs/agent-sandbox#installation)
