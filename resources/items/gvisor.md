---
name: gVisor
summary: 通过用户态应用内核处理工作负载系统调用的隔离运行时，可隔离 Agent 生成的代码及其依赖，通过 OCI 运行时 `runsc` 接入容器工具链。
type: project
topic: sandbox-and-execution
aliases: ["runsc"]
keywords: ["隔离", "应用内核", "OCI", "容器运行时", "Sentry", "Gofer", "系统调用"]
role: isolation-runtime
delivery: self-hosted
url: https://gvisor.dev/docs/
anchor: resource-gvisor
order: 5
links:
  - label: 官网
    url: https://gvisor.dev/
  - label: 代码仓库
    url: https://github.com/google/gvisor
  - label: 文档
    url: https://gvisor.dev/docs/
  - label: Docker 快速开始
    url: https://gvisor.dev/docs/user_guide/quick_start/docker/
  - label: 兼容性说明
    url: https://gvisor.dev/docs/user_guide/compatibility/
maintainer: Google gVisor 团队与社区
form: 开源应用内核与 OCI 容器运行时
license: Apache-2.0
---

## 背景与目标

gVisor 在应用与宿主操作系统之间提供额外隔离层，面向需要运行不可信代码或多租户容器的环境。它以用户态应用内核实现 Linux 系统接口，并通过 OCI 运行时 `runsc` 接入现有容器工具链。Agent 平台可以用它承载模型生成的代码及其依赖。[项目概览](https://gvisor.dev/docs/)

## 核心能力

- **系统接口隔离**：应用的系统调用由 gVisor 内核处理，宿主访问限制在实现这些功能所需的受控操作中。[安全架构](https://gvisor.dev/docs/architecture_guide/intro/)
- **容器工具兼容**：通过 `runsc` 运行 OCI 容器，可以接入 Docker、containerd 与 Kubernetes。[文档入口](https://gvisor.dev/docs/)
- **环境访问控制**：在容器配置指定的文件系统、网络和资源范围内运行工作负载，结合宿主的命名空间与权限限制形成执行边界。[运行方式](https://gvisor.dev/docs/architecture_guide/intro/)

## 核心概念与工作方式

Sentry 是沙箱中的应用内核，负责系统调用、进程、内存与网络等功能；Gofer 为需要访问宿主文件系统的操作提供中介；`runsc` 则负责按照 OCI 配置创建、启动和管理沙箱。应用通常保持原有 Linux 二进制形式，在这组组件提供的环境中运行。[组件概览](https://gvisor.dev/docs/)

gVisor 通过不同的平台机制截获系统调用和缺页事件，再交给 Sentry 处理。是否依赖硬件虚拟化取决于选用的平台。它的兼容范围由已实现的系统接口决定，接入具体语言运行时、依赖库或设备前，可以先查看官方兼容性列表。[平台机制](https://gvisor.dev/docs/architecture_guide/intro/)、[应用兼容性](https://gvisor.dev/docs/user_guide/compatibility/)

## 使用场景与接入方式

在 Agent 系统中，gVisor 适合作为代码执行容器的隔离运行时，配合上层沙箱管理服务使用。任务分配、用户身份、环境留存与工具接口由平台层组织，容器中的程序通过配置好的文件和网络入口访问外部资源。

本地入门可以安装 `runsc`，把它注册为 Docker 运行时，再选择该运行时启动容器。部署到 Kubernetes 时，则需要先配置相应容器运行时，再通过集群侧运行时设置为工作负载启用隔离。[Docker 快速开始](https://gvisor.dev/docs/user_guide/quick_start/docker/)
