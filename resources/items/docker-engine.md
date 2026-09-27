---
name: Docker Engine
summary: 通用容器引擎，通过镜像、容器、网络和卷组织执行环境，可作为 Agent 代码与工具执行的基础组件；普通 Linux 容器共享其宿主内核，权限和挂载由环境配置控制。
type: project
topic: sandbox-and-execution
aliases: ["Docker", "Docker 容器引擎", "dockerd"]
keywords: ["容器", "容器沙箱", "沙盒", "代码执行", "镜像", "卷", "环境管理", "cgroups"]
role: isolation-runtime
delivery: self-hosted
url: https://docs.docker.com/engine/
anchor: resource-docker-engine
order: 8
links:
  - label: 官方文档
    url: https://docs.docker.com/engine/
  - label: 安装指南
    url: https://docs.docker.com/engine/install/
  - label: API 与 SDK
    url: https://docs.docker.com/reference/api/engine/
  - label: 容器基础
    url: https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/
  - label: 安全机制
    url: https://docs.docker.com/engine/security/
  - label: Engine 许可证
    url: https://github.com/moby/moby/blob/master/LICENSE
maintainer: Docker 与开源社区
form: 开源容器引擎与执行环境管理组件
license: Apache-2.0（Docker Engine）；Docker Desktop 使用独立产品条款
reviewedAt: '2026-09-27'
---

## 背景与目标

Docker Engine 是用于构建和运行容器化应用的开源引擎，管理镜像、容器、网络与卷。本仓库关注它作为 Agent 执行基础组件的用途：将代码依赖和工具环境封装为镜像，再由上层程序创建、运行和清理容器。[官方概览](https://docs.docker.com/engine/)

## 核心能力

- **环境管理**：以镜像组织应用与依赖，管理容器生命周期，并通过网络和卷连接服务与数据。[Engine 概览](https://docs.docker.com/engine/)
- **程序化控制**：提供 Engine API、命令行以及 Go、Python SDK，可将容器操作接入 Agent 的工具执行流程。[API 与 SDK](https://docs.docker.com/reference/api/engine/)
- **资源与权限配置**：利用命名空间划分进程和网络视图，通过 cgroups 计量与限制资源，并配置容器的 Linux capabilities。[安全机制](https://docs.docker.com/engine/security/)

## 核心概念与工作方式

`dockerd` 接收客户端或 API 请求，创建和管理容器对象。普通 Linux 容器是共享宿主内核的隔离进程；若 Engine 运行在虚拟机内，共享的是该虚拟机的内核。容器的访问范围还受权限、挂载和守护进程配置影响。[容器与虚拟机](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) · [安全机制](https://docs.docker.com/engine/security/)

容器内进程权限与 Engine 控制权限是两类不同的配置。控制守护进程的程序可以创建容器并指定宿主目录挂载，挂载又决定容器能够访问哪些宿主文件。[守护进程控制接口](https://docs.docker.com/engine/security/#docker-daemon-attack-surface)

Engine 可在 Linux 上单独安装，也可随 Docker Desktop 提供。Desktop 是包含 Engine 的发行产品，使用其独立产品条款；Engine 的 Apache-2.0 许可不能代指 Desktop。[安装方式](https://docs.docker.com/engine/install/) · [Engine 许可](https://docs.docker.com/engine/#licensing) · [Desktop 许可](https://docs.docker.com/subscription-billing/desktop-license/)

## 使用场景与接入方式

可用于自建 Agent 的代码运行、工具进程和测试环境，由上层程序组织任务与环境回收。接入从受支持的 Linux 安装方式开始，再通过 CLI、API 或 SDK 管理环境。[安装指南](https://docs.docker.com/engine/install/) · [API 文档](https://docs.docker.com/reference/api/engine/)

需要组合其他隔离机制时，官方快速开始提供将 [gVisor](gvisor.md) 的 `runsc` 配置为 Docker 运行时的方式。[gVisor 接入说明](https://gvisor.dev/docs/user_guide/quick_start/docker/) 面向 Agent 的本地与云沙箱产品则见 [Docker Sandboxes](docker-sandboxes.md)。
