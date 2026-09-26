# Deployment & Scheduling

收录 Agent 服务、工具服务和执行环境的托管、资源分配、生命周期管理与弹性伸缩方案。重点是任务在何处运行以及资源如何供给；任务步骤和恢复语义见 [Runtime & Orchestration](runtime-and-orchestration.md)，底层隔离机制见 [Sandbox & Execution](sandbox-and-execution.md)。通用基础设施的条目会说明其与 Agent 工作负载的具体联系。

## Projects & Platforms

- <a id="resource-agent-sandbox"></a> [Agent Sandbox](https://github.com/kubernetes-sigs/agent-sandbox) — 通过 Kubernetes 自定义资源和控制器管理有状态的单实例执行环境，可用于 Agent 运行环境及代码执行工作负载；关注：稳定身份、持久存储、生命周期管理与预热池。底层隔离由 RuntimeClass 对接的沙箱运行时提供。
- <a id="resource-amazon-bedrock-agentcore-runtime"></a> [Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) — AWS 提供的 Agent 与工具托管环境，支持不同 Agent 框架和长时间运行的会话；关注：会话生命周期、microVM 与实例计算类型、文件系统持久化及按需资源供给。
- <a id="resource-keda"></a> [KEDA](https://keda.sh/docs/latest/concepts/) — 根据队列或其他外部事件驱动 Kubernetes 工作负载伸缩，可作为异步 Agent 任务处理进程的资源供给组件；关注：ScaledObject、ScaledJob、事件触发器与 HPA 的协作。
- <a id="resource-ray-serve"></a> [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) — 将 Python 逻辑和模型组合为在线服务，可分别部署 Agent、模型与工具组件；关注：服务组合、副本伸缩、资源配置和跨机器调度。

## Articles & Documentation

- <a id="resource-build-a-tool-using-agent"></a> [Build a tool-using agent](https://docs.ray.io/en/latest/_collections/ray-overview/examples/langchain_agent_ray_serve/content/README.html) — Ray 官方教程，展示如何在 Anyscale 上将 Agent、模型和 MCP 工具分别部署为 Ray Serve 服务；关注：CPU 与 GPU 组件的拆分、独立伸缩和服务间调用。

[返回首页](../README.md)
