---
name: Daytona
summary: 为 AI 生成代码和 Agent 工作流提供可编程沙箱的平台，支持文件系统、进程、代码执行、环境快照和生命周期管理，可通过 SDK、API 或 CLI 使用托管服务。
type: project
topic: sandbox-and-execution
url: https://www.daytona.io/docs/en/
anchor: resource-daytona
order: 2
links:
  - label: 官网
    url: https://www.daytona.io/
  - label: 文档与快速开始
    url: https://www.daytona.io/docs/en/
  - label: 客户端仓库
    url: https://github.com/daytona/clients
  - label: 原公开仓库
    url: https://github.com/daytonaio/daytona
maintainer: Daytona Platforms
form: 托管沙箱平台与公开客户端工具
license: SDK 与 API 客户端 Apache-2.0；CLI AGPL-3.0
status:
  label: 核心开发已转入私有代码库；原公开仓库停止维护
  source: https://github.com/daytonaio/daytona
  checked: '2026-09-27'
---

## 背景与目标

Daytona 为 AI 生成代码和 Agent 工作流提供可通过程序管理的计算环境。应用可以创建带有文件系统、网络和计算资源的沙箱，在其中安装依赖、启动进程并运行代码，让执行环境与调用它的 Agent 服务分别管理。[官方概览](https://www.daytona.io/docs/en/)

项目形态需要区分：官方在 2026 年 6 月将核心开发迁移到私有代码库，原公开仓库停止更新；当前托管平台继续通过 SDK、API 和 CLI 提供访问。公开客户端仓库中的 SDK、API 客户端采用 Apache-2.0，CLI 采用 AGPL-3.0。[原仓库说明](https://github.com/daytonaio/daytona)、[客户端许可](https://github.com/daytona/clients#license)

## 核心能力

- **代码与进程执行**：在沙箱中执行代码、运行命令和管理文件，供编码 Agent、数据处理等流程调用。[平台能力](https://www.daytona.io/docs/en/)
- **环境生命周期**：创建、查询、停止和删除沙箱，并按工作负载选择环境类型、资源与自动管理选项。[Sandboxes](https://www.daytona.io/docs/en/sandboxes/)
- **环境复用**：通过快照保存环境状态，使用同一快照创建多个沙箱；不同沙箱类型对应的快照与恢复能力有所区别。[Snapshots](https://www.daytona.io/docs/en/snapshots/)

## 核心概念与工作方式

Sandbox 是代码实际运行的环境，调用方通过其标识和客户端对象操作文件、进程及执行接口。应用先选择环境与资源配置，再创建沙箱，把生成的代码送入环境执行，并收集输出和产物。[沙箱管理](https://www.daytona.io/docs/en/sandboxes/)

Snapshot 是可重复使用的环境状态，包含文件、软件依赖与设置。它可以由镜像构建，支持的虚拟机沙箱也可以捕获已有环境的状态。快照用于生成新的执行环境，具体操作需要与所选沙箱类型匹配。[快照类型](https://www.daytona.io/docs/en/snapshots/)

## 使用场景与接入方式

Daytona 可用于编码助手执行测试、Agent 操作项目文件，以及需要反复创建相同工具环境的任务。开发者在平台创建 API Key 后，可以通过 Python、TypeScript 等 SDK 创建沙箱并调用代码执行接口，也可以使用 REST API 或 CLI。[快速开始](https://www.daytona.io/docs/en/)

应用负责选择生命周期与保存方式，例如任务完成后删除临时环境，或为后续操作保留需要的环境状态。公开 SDK 的许可与托管平台的服务条款分别适用。[客户端仓库](https://github.com/daytona/clients)
