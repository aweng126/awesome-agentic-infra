# Deployment & Scheduling

收录 Agent 与工具服务的运行平台、工作负载编排和弹性伸缩组件。开发框架见 [Runtime & Orchestration](runtime-and-orchestration.md)，沙箱与隔离组件见 [Sandbox & Execution](sandbox-and-execution.md)。

## Projects & Platforms

- <a id="resource-agent-sandbox"></a> [Agent Sandbox](https://github.com/kubernetes-sigs/agent-sandbox) — 通过 Kubernetes 自定义资源与控制器管理有状态的单实例执行环境，为 Agent 和代码执行工作负载提供稳定身份、持久存储、生命周期管理与预热池。底层隔离由 RuntimeClass 对接的沙箱运行时提供。
- <a id="resource-alibaba-cloud-agentcore"></a> [阿里云 AgentCore](https://help.aliyun.com/zh/agentcore/agentcore-product-overview) — 阿里云的 Agent 构建、运行与治理平台，支持托管 Harness、高代码开发和已有 Agent 纳管，并提供 Workspace 资源与身份权限管理。
- <a id="resource-alibaba-cloud-agentrun"></a> [阿里云 AgentRun](https://help.aliyun.com/zh/agentrun/what-is-agentrun) — 基于函数计算的 Serverless Agent 基础设施平台，提供可分别使用的 Agent Runtime、Sandbox 与模型治理组件，支持会话亲和、实例生命周期管理和按需伸缩。
- <a id="resource-amazon-bedrock-agentcore-runtime"></a> [Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html) — AWS 的 Agent 与工具托管环境，支持多种框架、长时间运行的会话、microVM 和实例计算类型，提供按需资源供给与文件系统持久化。其中 microVM 的托管会话存储处于 Preview 阶段。
- <a id="resource-google-ax"></a> [Google AX](https://github.com/google/ax) — Google 开源、可自托管的声明式 Agent 工作负载编排平台，通过 Task、Workspace 和 Model 管理任务、工作环境与模型配置，基于 Kubernetes 上的 Agent Substrate 执行。当前核心规范仍在演进，详见 [概念文档](https://github.com/google/ax/blob/main/docs/concepts.md)。
- <a id="resource-google-cloud-agent-runtime"></a> [Google Cloud Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale) — Gemini Enterprise Agent Platform 的托管运行服务，原称 Vertex AI Agent Engine，可部署 ADK、LangGraph 等框架及自定义 Agent，提供伸缩、身份和网络接入，并与 Sessions、Memory Bank 配合使用。
- <a id="resource-keda"></a> [KEDA](https://keda.sh/docs/latest/concepts/) — 根据队列或其他外部事件驱动 Kubernetes 工作负载伸缩，通过 ScaledObject、ScaledJob 和事件触发器为异步 Agent 任务处理进程提供弹性资源。
- <a id="resource-microsoft-foundry-hosted-agents"></a> [Microsoft Foundry Hosted Agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) — 在 Foundry Agent Service 中托管自带代码的 Agent 容器，由平台管理计算资源、会话和生命周期，并提供请求协议接入、独立 Agent 身份与会话文件持久化。
- <a id="resource-ray-serve"></a> [Ray Serve](https://docs.ray.io/en/latest/serve/index.html) — 将 Python 逻辑和模型组合为在线服务，可分别部署 Agent、模型与工具组件，支持服务组合、副本伸缩、资源配置和跨机器调度。
- <a id="resource-tencent-cloud-agent-runtime"></a> [腾讯云 Agent Runtime](https://cloud.tencent.com/document/product/1814/137850) — 通过弹性部署（Deployment）为自建 Agent 与工具服务提供稳定入口，支持会话亲和、并发容量配置，以及沙箱实例的调度、空闲释放或暂停保留状态。Deployment 当前为 Beta，官方建议用于测试与 PoC。
- <a id="resource-volcengine-agentkit-runtime"></a> [火山引擎 AgentKit Runtime](https://docs.volcengine.com/docs/agentkit/Agent_runtime_overview?lang=zh) — 托管 Agent 代码或镜像的 Serverless 运行环境，与 VeADK 集成并支持其他主流 Python Agent 框架，提供版本发布、实例伸缩、访问控制及会话与观测组件接入。

## Articles & Documentation

- <a id="resource-build-a-tool-using-agent"></a> [Build a tool-using agent](https://docs.ray.io/en/latest/_collections/ray-overview/examples/langchain_agent_ray_serve/content/README.html) — Ray 官方教程，展示如何在 Anyscale 上将 Agent、模型和 MCP 工具分别部署为 Ray Serve 服务，涵盖 CPU 与 GPU 组件拆分、独立伸缩和服务间调用。

[返回首页](../README.md)
