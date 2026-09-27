---
name: Firecracker
summary: 基于 Linux KVM 的微虚拟机监控器，提供精简设备模型、独立客户机内核及 Jailer 权限限制，可作为自建 Agent 代码执行平台的隔离底座。
type: project
topic: sandbox-and-execution
aliases: ["Firecracker MicroVM"]
keywords: ["沙盒", "microVM", "虚拟化", "KVM", "隔离", "Jailer", "沙箱底座"]
role: isolation-runtime
delivery: self-hosted
url: https://github.com/firecracker-microvm/firecracker
anchor: resource-firecracker
order: 4
links:
  - label: 官网
    url: https://firecracker-microvm.github.io/
  - label: 代码仓库
    url: https://github.com/firecracker-microvm/firecracker
  - label: 设计文档
    url: https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md
  - label: 快速开始
    url: https://github.com/firecracker-microvm/firecracker/blob/main/docs/getting-started.md
  - label: 发布记录
    url: https://github.com/firecracker-microvm/firecracker/releases
maintainer: AWS Firecracker 团队与社区
form: 开源微虚拟机监控器与隔离底座
license: Apache-2.0
---

## 背景与目标

Firecracker 起源于 AWS 对多租户函数和容器工作负载的需求，目标是在提供硬件虚拟化隔离的同时，降低单个执行环境的资源开销。它通过精简的虚拟机监控器创建 microVM，可作为自建 Agent 代码执行平台的底层组件。[项目概览](https://github.com/firecracker-microvm/firecracker)

## 核心能力

- **微虚拟机执行**：使用 Linux KVM 运行带有独立客户机内核的轻量虚拟机，并提供必要的虚拟设备。[设计文档](https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md)
- **程序化配置**：通过 API 指定 vCPU、内存、磁盘、网络接口和启动参数，控制单个 microVM 的运行。[API 与能力](https://github.com/firecracker-microvm/firecracker#features--capabilities)
- **宿主侧权限限制**：配套 Jailer 设置命名空间、资源控制与运行身份，再启动 Firecracker 进程。[Jailer](https://github.com/firecracker-microvm/firecracker/blob/main/docs/jailer.md)

## 核心概念与工作方式

一个 Firecracker 进程负责一个 microVM。客户机内核和根文件系统由使用者提供；宿主上的控制程序调用本地 API，配置所需资源并启动客户机，代码随后在客户机内部执行。虚拟机设备模型保持精简，面向函数与容器类工作负载。[运行设计](https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md)

Jailer 是启动 Firecracker 的配套工具，负责准备受限的宿主执行环境。围绕 Agent 提供完整沙箱服务时，平台层还需组织镜像、任务分配、环境清理与访问接口；Firecracker 提供的是其中的虚拟化执行单元。[启动与隔离](https://github.com/firecracker-microvm/firecracker/blob/main/docs/jailer.md)

## 使用场景与接入方式

适合需要自行管理隔离环境的平台团队，例如把用户代码、模型生成脚本或函数任务放入独立客户机执行。它在本仓库中属于沙箱与执行环境的基础组件，上层可据此构建面向 Agent 的会话和代码执行 API。

入门需要具备 KVM 的 Linux 主机、对 `/dev/kvm` 的访问权限，以及客户机内核和根文件系统镜像。官方教程演示下载二进制、配置 microVM 和启动客户机；实际部署还需按宿主配置文档设置运行环境。[快速开始](https://github.com/firecracker-microvm/firecracker/blob/main/docs/getting-started.md)、[宿主配置](https://github.com/firecracker-microvm/firecracker/blob/main/docs/prod-host-setup.md)
