---
name: Cube Sandbox
summary: 腾讯云开源的 Agent 沙箱服务，基于 RustVMM 与 KVM 提供 MicroVM 执行环境，支持自部署、E2B 兼容接口，以及环境模板、暂停恢复、快照克隆与回滚。
type: project
topic: sandbox-and-execution
aliases: ["CubeSandbox", "腾讯 Cube Sandbox"]
keywords: ["沙盒", "沙箱", "MicroVM", "KVM", "RustVMM", "E2B 兼容", "快照", "回滚", "克隆"]
role: sandbox-service
delivery: self-hosted
url: https://github.com/TencentCloud/CubeSandbox
anchor: resource-cube-sandbox
order: 6
links:
  - label: 官网
    url: https://cubesandbox.com/
  - label: 代码仓库
    url: https://github.com/TencentCloud/CubeSandbox
  - label: 文档
    url: https://github.com/TencentCloud/CubeSandbox/blob/master/docs/index.md
  - label: 部署指南
    url: https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/bare-metal-deploy.md
  - label: 使用示例
    url: https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/tutorials/examples.md
  - label: 许可证
    url: https://github.com/TencentCloud/CubeSandbox/blob/master/LICENSE
maintainer: 腾讯云与社区
form: 开源自部署沙箱服务
license: Apache-2.0（第三方组件遵循各自许可证）
---

## 背景与目标

Cube Sandbox 是腾讯云开源的 Agent 执行环境项目，面向运行生成代码、调用命令行工具，以及承载持续运行的 Agent 或服务等场景。它把独立的 Linux 环境封装为可通过 API 管理的沙箱，支持从单机部署扩展到多节点集群。[官方仓库](https://github.com/TencentCloud/CubeSandbox)

## 核心能力

- **隔离执行与环境模板**：每个沙箱在 MicroVM 中运行自己的 Linux 内核；从 OCI 镜像制作包含依赖和预热状态的模板，再按需创建执行环境。[架构概览](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/architecture/overview.md) · [模板说明](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/templates.md)
- **代码与工具接入**：提供 E2B 兼容接口，用于代码执行、命令调用和文件操作；官方示例涵盖浏览器自动化及 Agent 框架接入。[使用示例](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/tutorials/examples.md)
- **执行状态管理**：支持暂停与恢复、按策略自动暂停和唤醒，并通过快照保存内存与文件系统状态。应用可以从已有状态克隆独立环境，或把当前沙箱回滚到保存点。[生命周期](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/lifecycle.md) · [快照、回滚与克隆](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/snapshot-rollback-clone.md)
- **网络访问控制**：通过沙箱网络策略与 CubeEgress 出站代理限制外部访问，支持按域名、路径和请求方法配置规则，并由代理注入凭证、记录访问日志。[安全代理](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/security-proxy.md)

## 核心概念与工作方式

Template 是创建沙箱的环境定义，包含从 OCI 镜像准备的文件系统、配置和预热后的虚拟机快照；Sandbox 则是从模板创建的具体执行实例。准备模板时会启动环境并等待就绪探针，再保存可复用的状态。[模板说明](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/templates.md)

应用通过 CubeAPI 请求创建或管理沙箱，CubeMaster 选择执行节点，节点上的 Cubelet 管理实例生命周期，CubeHypervisor 负责运行 MicroVM。需要保留阶段性成果时，应用可以创建快照；后续克隆拥有独立的执行状态，回滚则在原沙箱上恢复保存点。[架构概览](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/architecture/overview.md) · [状态管理接口](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/snapshot-rollback-clone.md)

## 使用场景与接入方式

Cube Sandbox 可用于为编码 Agent、数据分析助手或浏览器自动化提供执行环境，也适合需要从同一环境状态分出多个实验分支的任务。官方示例提供代码沙箱、Playwright 浏览器控制以及多种 Agent 框架的接入方式。[示例目录](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/tutorials/examples.md)

自部署时可使用具备 KVM 的 Linux 机器，按照部署指南安装服务并创建模板；普通云主机未开放 KVM 时，官方另提供需要安装宿主内核的 PVM 部署路径。应用连接自己的服务地址后，通过 E2B 兼容接口执行任务；快照、克隆与回滚等扩展操作使用 Cube Sandbox SDK。[Linux 部署](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/bare-metal-deploy.md) · [PVM 部署](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/pvm-deploy.md) · [扩展 SDK 接口](https://github.com/TencentCloud/CubeSandbox/blob/master/docs/guide/snapshot-rollback-clone.md)
