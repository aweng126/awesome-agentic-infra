---
name: E2B
summary: 面向 Agent 的云沙箱，通过 SDK 和环境模板创建 Linux 执行环境，用于运行代码、处理数据和调用工具，支持保存文件系统与内存的暂停和恢复。
type: project
topic: sandbox-and-execution
url: https://docs.e2b.dev/
anchor: resource-e2b
order: 3
links:
  - label: 官网
    url: https://e2b.dev/
  - label: 代码仓库
    url: https://github.com/e2b-dev/E2B
  - label: 文档
    url: https://docs.e2b.dev/
  - label: 模板快速开始
    url: https://docs.e2b.dev/template/quickstart
  - label: 更新记录
    url: https://docs.e2b.dev/changelog
maintainer: E2B 团队与社区
form: 托管沙箱服务与开源 SDK
license: Apache-2.0（SDK 仓库）
status:
  label: 托管服务开放使用
  source: https://docs.e2b.dev/
  checked: 2026-09-27
---

## 背景与目标

E2B 为 Agent 提供可通过程序创建和管理的云端沙箱，用于运行生成的代码、处理数据和调用工具。应用通过 SDK 操作独立的 Linux 执行环境，把代码运行、文件处理和环境生命周期接入自己的 Agent 流程。[官方介绍](https://docs.e2b.dev/)

## 核心能力

- **命令与文件操作**：在沙箱内执行命令、读写文件，并把运行结果传回应用。[文件读写](https://docs.e2b.dev/filesystem/read-write)
- **环境模板**：预先定义基础镜像、依赖、环境变量、文件和启动命令，让新沙箱具有需要的工具环境。[模板说明](https://docs.e2b.dev/template/quickstart)
- **暂停与恢复**：暂停时保存文件系统和内存，之后恢复到保留的状态，包括运行中的进程和已加载的数据。[持久化说明](https://docs.e2b.dev/sandbox/persistence)
- **生命周期管理**：创建、连接、暂停或终止沙箱，并配置超时后的处理方式。[生命周期文档](https://docs.e2b.dev/sandbox)

## 核心概念与工作方式

Sandbox 是具体执行任务的 Linux 虚拟机；Template 是创建沙箱时采用的环境定义。应用可以从现有模板启动沙箱，也可以通过 CLI 或 SDK 构建包含专用依赖的模板，再按需创建实例。[模板快速开始](https://docs.e2b.dev/template/quickstart)

运行中，应用保存沙箱标识，就可以在后续请求中重新连接环境。任务暂时等待时可以暂停沙箱，继续工作时再恢复；完成后则主动终止并释放资源。暂停保留执行状态，终止意味着结束该沙箱的生命周期。[状态与恢复](https://docs.e2b.dev/sandbox/persistence)

## 使用场景与接入方式

E2B 的常见用途包括代码执行助手、数据分析 Agent，以及需要安装工具、操作项目文件的自动化流程。官方仓库提供 Python 和 JavaScript／TypeScript SDK，也收录与多种模型配合的示例。[官方仓库](https://github.com/e2b-dev/E2B)

使用托管服务时，先取得 API Key，在应用中安装 SDK，再创建沙箱并执行命令或代码。需要专用环境时可以补充自定义模板；需要跨请求继续工作时，可以结合沙箱标识和暂停、恢复接口管理执行环境。[接入示例](https://docs.e2b.dev/)
