# Sandbox & Execution

本主题关注 Agent 执行代码、操作文件和使用浏览器时所依赖的运行环境，包括环境创建与回收、状态保存、执行接口，以及进程、容器和微虚拟机的隔离机制。跨组件的身份与授权策略见 [Security & Governance](security-and-governance.md)，集群中的沙箱资源管理见 [Deployment & Scheduling](deployment-and-scheduling.md)。

## Projects & Platforms

- <a id="resource-browserbase"></a> [Browserbase](https://docs.browserbase.com/welcome/introduction) — 提供可通过 API 创建、控制和观察的云浏览器会话，承载 Agent 的网页交互任务；关注：浏览器会话管理，以及 Playwright、Puppeteer 和 Selenium 等控制接口。
- <a id="resource-daytona"></a> [Daytona](https://www.daytona.io/docs/en/) — 为 AI 生成代码和 Agent 工作流提供可编程沙箱的平台，提供托管服务及文件系统、进程和代码执行接口；关注：沙箱生命周期管理、环境快照，以及 SDK、API 与 CLI 的操作方式。
- <a id="resource-e2b"></a> [E2B](https://docs.e2b.dev/) — 面向 Agent 的云沙箱，通过 SDK 创建 Linux 执行环境，用于运行代码、处理数据和调用工具；关注：环境模板、命令执行，以及保存文件系统与内存的暂停和恢复机制。
- <a id="resource-firecracker"></a> [Firecracker](https://github.com/firecracker-microvm/firecracker) — 基于 Linux KVM 的微虚拟机监控器，可作为自建 Agent 代码执行平台的隔离底座；关注：精简设备模型、独立客户机内核，以及 Jailer 的权限收缩与隔离机制。
- <a id="resource-gvisor"></a> [gVisor](https://gvisor.dev/docs/) — 通过用户态应用内核处理工作负载的系统调用，可用于隔离 Agent 生成的代码及其依赖；关注：Sentry 与 Gofer 的职责划分，以及 OCI 运行时 `runsc` 与容器工具链的集成。

[返回首页](../README.md)
