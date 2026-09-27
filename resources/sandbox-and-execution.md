# Sandbox & Execution

收录 Agent 代码执行、文件操作与浏览器交互所需的沙箱环境与服务、云浏览器，以及容器执行和隔离底座；也关注执行环境的状态检查点、回滚与分支机制。身份与授权组件见 [Security & Governance](security-and-governance.md)，集群资源管理见 [Deployment & Scheduling](deployment-and-scheduling.md)。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-browserbase"></a> [Browserbase](https://docs.browserbase.com/welcome/introduction) — 承载 Agent 网页交互任务的云浏览器平台，可通过 API 创建、控制和观察浏览器会话，并接入 Playwright、Puppeteer 和 Selenium。 [项目介绍](items/browserbase.md)
- <a id="resource-daytona"></a> [Daytona](https://www.daytona.io/docs/en/) — 为 AI 生成代码和 Agent 工作流提供可编程沙箱的平台，支持文件系统、进程、代码执行、环境快照和生命周期管理，可通过 SDK、API 或 CLI 使用托管服务。 [项目介绍](items/daytona.md)
- <a id="resource-e2b"></a> [E2B](https://docs.e2b.dev/) — 面向 Agent 的云沙箱，通过 SDK 和环境模板创建 Linux 执行环境，用于运行代码、处理数据和调用工具，支持保存文件系统与内存的暂停和恢复。 [项目介绍](items/e2b.md)
- <a id="resource-firecracker"></a> [Firecracker](https://github.com/firecracker-microvm/firecracker) — 基于 Linux KVM 的微虚拟机监控器，提供精简设备模型、独立客户机内核及 Jailer 权限限制，可作为自建 Agent 代码执行平台的隔离底座。 [项目介绍](items/firecracker.md)
- <a id="resource-gvisor"></a> [gVisor](https://gvisor.dev/docs/) — 通过用户态应用内核处理工作负载系统调用的隔离运行时，可隔离 Agent 生成的代码及其依赖，通过 OCI 运行时 `runsc` 接入容器工具链。 [项目介绍](items/gvisor.md)
- <a id="resource-cube-sandbox"></a> [Cube Sandbox](https://github.com/TencentCloud/CubeSandbox) — 腾讯云开源的 Agent 沙箱服务，基于 RustVMM 与 KVM 提供 MicroVM 执行环境，支持自部署、E2B 兼容接口，以及环境模板、暂停恢复、快照克隆与回滚。 [项目介绍](items/cube-sandbox.md)
- <a id="resource-docker-engine"></a> [Docker Engine](https://docs.docker.com/engine/) — 通用容器引擎，通过镜像、容器、网络和卷组织执行环境，可作为 Agent 代码与工具执行的基础组件；普通 Linux 容器共享其宿主内核，权限和挂载由环境配置控制。 [项目介绍](items/docker-engine.md)
- <a id="resource-docker-sandboxes"></a> [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/) — 面向 AI 编码 Agent 的沙箱产品，通过 sbx CLI 管理本地或 Docker 托管云端环境；本地采用 microVM 与独立 Docker daemon，支持工作目录接入、网络策略和环境留存，云端另提供 API 与 SDK。 [项目介绍](items/docker-sandboxes.md)

## Papers

- <a id="resource-deltabox"></a> [DeltaBox: Scaling Stateful AI Agents with Millisecond-Level Sandbox Checkpoint/Rollback](https://arxiv.org/abs/2605.22781)（2026，ACM SIGOPS ATC 已接收）— 面向 Agent 树搜索与强化学习采样中的高频状态探索，通过 DeltaFS 与 DeltaCR 增量保存文件系统和进程状态，降低沙箱检查点与回滚开销。系统概览见 [作者项目页](https://dongyunpeng-sjtu.github.io/deltabox/)，ATC26 接收信息见 [IPADS 公告](https://ipads.sjtu.edu.cn/zh/news/)。

<!-- resources:end -->

[返回首页](../README.md)
