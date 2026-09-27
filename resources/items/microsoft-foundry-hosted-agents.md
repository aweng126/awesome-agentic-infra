---
name: Microsoft Foundry Hosted Agents
summary: 在 Foundry Agent Service 中托管自带代码的 Agent 容器，由平台管理计算资源、会话和生命周期，并提供请求协议接入、独立 Agent 身份与会话文件持久化。
type: project
topic: deployment-and-scheduling
url: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
anchor: resource-microsoft-foundry-hosted-agents
order: 8
links:
  - label: 产品文档
    url: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
  - label: 快速开始
    url: https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent
  - label: 状态存储
    url: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-state-store
maintainer: Microsoft
form: Foundry Agent Service 的容器化 Agent 托管服务
---

## 背景与目标

使用开源框架开发 Agent 后，团队仍需要处理服务入口、容器运行、权限、状态和观测等上线工作。Foundry Hosted Agents 将这些能力整合到 Azure 的托管服务中：开发者提供自己的代码与容器，平台管理周围的运行环境。它支持 Microsoft Agent Framework、LangGraph 等框架及自定义代码，归入本仓库的部署与调度主题。参见 [产品文档](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents)。

## 核心能力

- **容器托管**：部署自带依赖的 Agent 镜像，为在线调用提供专属端点。
- **会话环境**：按会话提供虚拟机隔离的沙箱，在计算资源空闲释放后恢复会话文件。
- **身份接入**：为 Agent 分配独立身份，用于访问模型、工具及其他 Azure 服务。
- **协议与观测**：提供 Responses、Invocations 等接入方式，配套协议库处理服务和遥测接入。

部署时需要准备 Foundry 项目、镜像与权限配置，官方 [快速开始](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent) 展示了从应用到托管端点的完整流程。

## 核心概念与工作方式

Agent 的版本保存容器与运行配置，Session 表示带有持久状态的会话，Conversation 则保存对话历史。Responses 协议会管理对话历史及流式响应；Invocations 适合自定义请求格式，由应用自行管理对话数据。开发者需要按应用接口选择协议。

除会话文件外，平台还提供独立的键值状态存储，用于保存业务数据或框架检查点；该 State Store 文档标为预览功能。它让应用能够显式保存自身状态，具体数据组织与访问方式见 [状态存储说明](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-state-store)。

## 使用场景与接入方式

适合希望保留框架和代码控制权、同时接入 Foundry 模型与 Azure 服务的团队，可用于对话助手、带工具调用的业务应用及接收自定义事件的 Agent 服务。

接入时先在容器中配置协议处理程序，将镜像推送到 Azure Container Registry，再创建并部署 Agent 版本，通过端点进行调用。Python 与 C# 的示例及部署工具可从快速开始进入；任务编排仍在应用代码中实现，云平台提供运行和管理能力。
