# Deployment & Scheduling

收录 Agent 服务、工具服务和执行环境的托管、资源分配、生命周期管理与弹性伸缩方案。重点是任务在何处运行以及资源如何供给；任务步骤和恢复语义见 [Runtime & Orchestration](runtime-and-orchestration.md)，底层隔离机制见 [Sandbox & Execution](sandbox-and-execution.md)。通用基础设施的条目会说明其与 Agent 工作负载的具体联系。

## Projects & Platforms

- <a id="resource-agent-sandbox"></a> [Agent Sandbox](https://github.com/kubernetes-sigs/agent-sandbox) — 通过 Kubernetes 自定义资源和控制器管理有状态的单实例执行环境，可用于 Agent 运行环境及代码执行工作负载；关注：稳定身份、持久存储、生命周期管理与预热池。底层隔离由 RuntimeClass 对接的沙箱运行时提供。
- <a id="resource-alibaba-cloud-agentcore"></a> [阿里云 AgentCore](https://help.aliyun.com/zh/agentcore/agentcore-product-overview) — 阿里云的 Agent 构建、运行与治理平台，提供托管 Harness、高代码开发和已有 Agent 纳管等入口；关注：不同接入方式下的运行责任、Workspace 资源边界和身份权限管理。
- <a id="resource-alibaba-cloud-agentrun"></a> [阿里云 AgentRun](https://help.aliyun.com/zh/agentrun/what-is-agentrun) — 基于函数计算的 Serverless Agent 基础设施平台，可分别使用 Agent Runtime、Sandbox 与模型治理等组件；关注：会话亲和、实例生命周期、按需伸缩，以及 Agent 运行环境与工具沙箱的隔离。
- <a id="resource-amazon-bedrock-agentcore-runtime"></a> [Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) — AWS 提供的 Agent 与工具托管环境，支持不同 Agent 框架和长时间运行的会话；关注：会话生命周期、microVM 与实例计算类型、文件系统持久化及按需资源供给。其中 microVM 的托管会话存储处于 Preview 阶段。
- <a id="resource-google-ax"></a> [Google AX](https://github.com/google/ax) — Google 开源、可自托管的声明式 Agent 工作负载编排平台，通过 Task、Workspace 和 Model 声明任务、工作环境与模型配置，基于 Kubernetes 上的 Agent Substrate 执行；关注：任务生命周期、工作环境准备，以及任务与执行底座的职责划分，见 [概念文档](https://github.com/google/ax/blob/main/docs/concepts.md)。当前核心规范仍在演进。
- <a id="resource-google-cloud-agent-runtime"></a> [Google Cloud Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale) — Gemini Enterprise Agent Platform 的托管运行服务，原称 Vertex AI Agent Engine，可部署 ADK、LangGraph 等框架及自定义 Agent；关注：部署与伸缩、身份和网络接入，以及 Runtime、Sessions 与 Memory Bank 的分工。
- <a id="resource-keda"></a> [KEDA](https://keda.sh/docs/latest/concepts/) — 根据队列或其他外部事件驱动 Kubernetes 工作负载伸缩，可作为异步 Agent 任务处理进程的资源供给组件；关注：ScaledObject、ScaledJob、事件触发器与 HPA 的协作。
- <a id="resource-microsoft-foundry-hosted-agents"></a> [Microsoft Foundry Hosted Agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) — 在 Foundry Agent Service 中托管自带代码的 Agent 容器，由平台管理计算资源、会话和生命周期；关注：请求协议、独立 Agent 身份、会话文件持久化，以及平台状态与业务执行进度的边界。
- <a id="resource-ray-serve"></a> [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) — 将 Python 逻辑和模型组合为在线服务，可分别部署 Agent、模型与工具组件；关注：服务组合、副本伸缩、资源配置和跨机器调度。
- <a id="resource-tencent-cloud-agent-runtime"></a> [腾讯云 Agent Runtime](https://cloud.tencent.com/document/product/1814/137850) — 通过弹性部署（Deployment）为自建 Agent 与工具服务提供稳定入口，并按配置调度沙箱实例；关注：会话亲和、并发容量，以及空闲时释放实例或暂停保留状态的区别。Deployment 当前为 Beta，官方建议用于测试与 PoC。
- <a id="resource-volcengine-agentkit-runtime"></a> [火山引擎 AgentKit Runtime](https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh) — 托管 Agent 代码或镜像的 Serverless 运行环境，与 VeADK 集成并支持其他主流 Python Agent 框架；关注：版本发布、实例伸缩、入站与出站访问控制，以及会话与观测组件的接入。

## Articles & Documentation

- <a id="resource-build-a-tool-using-agent"></a> [Build a tool-using agent](https://docs.ray.io/en/latest/_collections/ray-overview/examples/langchain_agent_ray_serve/content/README.html) — Ray 官方教程，展示如何在 Anyscale 上将 Agent、模型和 MCP 工具分别部署为 Ray Serve 服务；关注：CPU 与 GPU 组件的拆分、独立伸缩和服务间调用。

[返回首页](../README.md)
