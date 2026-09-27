# Sandbox & Execution

收录 Agent 代码执行、文件操作与浏览器交互所需的沙箱平台、云浏览器和隔离运行时。身份与授权组件见 [Security & Governance](security-and-governance.md)，集群资源管理见 [Deployment & Scheduling](deployment-and-scheduling.md)。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-browserbase"></a> [Browserbase](https://docs.browserbase.com/welcome/introduction) — 承载 Agent 网页交互任务的云浏览器平台，可通过 API 创建、控制和观察浏览器会话，并接入 Playwright、Puppeteer 和 Selenium。
- <a id="resource-daytona"></a> [Daytona](https://www.daytona.io/docs/en/) — 为 AI 生成代码和 Agent 工作流提供可编程沙箱的平台，支持文件系统、进程、代码执行、环境快照和生命周期管理，可通过 SDK、API 或 CLI 使用托管服务。
- <a id="resource-e2b"></a> [E2B](https://docs.e2b.dev/) — 面向 Agent 的云沙箱，通过 SDK 和环境模板创建 Linux 执行环境，用于运行代码、处理数据和调用工具，支持保存文件系统与内存的暂停和恢复。 [项目介绍](items/e2b.md)
- <a id="resource-firecracker"></a> [Firecracker](https://github.com/firecracker-microvm/firecracker) — 基于 Linux KVM 的微虚拟机监控器，提供精简设备模型、独立客户机内核及 Jailer 权限限制，可作为自建 Agent 代码执行平台的隔离底座。
- <a id="resource-gvisor"></a> [gVisor](https://gvisor.dev/docs/) — 通过用户态应用内核处理工作负载系统调用的隔离运行时，可隔离 Agent 生成的代码及其依赖，通过 OCI 运行时 `runsc` 接入容器工具链。

<!-- resources:end -->

[返回首页](../README.md)
