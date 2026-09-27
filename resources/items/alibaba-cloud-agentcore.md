---
name: 阿里云 AgentCore
summary: 阿里云的 Agent 构建、运行与治理平台，支持托管 Harness、高代码开发和已有 Agent 纳管，并提供 Workspace 资源与身份权限管理。
type: project
topic: deployment-and-scheduling
aliases: ["Alibaba Cloud AgentCore", "阿里 AgentCore"]
keywords: ["阿里云", "托管 Harness", "Agent 纳管", "工作空间", "团队协作", "身份权限"]
role: hosted-runtime
delivery: managed
url: https://help.aliyun.com/zh/agentcore/agentcore-product-overview
anchor: resource-alibaba-cloud-agentcore
order: 2
links:
  - label: 产品文档
    url: https://help.aliyun.com/zh/agentcore/agentcore-product-overview
  - label: 基本概念
    url: https://help.aliyun.com/zh/agentcore/agentcore-basic-concepts
  - label: Workspace 指南
    url: https://help.aliyun.com/zh/agentcore/manage-workspace
  - label: 控制台
    url: https://agentcore.console.aliyun.com
maintainer: 阿里云
form: Agent 构建、托管与治理云平台
---

## 背景与目标

当一个团队同时维护自建 Agent、现成的 Agent 执行框架以及外部工具时，模型配置、凭证和协作关系往往分散在多个系统中。阿里云 AgentCore 将这些资源放到统一的平台中，覆盖 Agent 构建、运行、协作和管理，面向企业数字员工、客服、数据查询与研发辅助等场景。它在本仓库归入部署与调度，阅读重点是平台如何承载和管理 Agent。参见 [产品概述](https://help.aliyun.com/zh/agentcore/agentcore-product-overview)。

## 核心能力

- **多种 Agent 接入方式**：支持直接配置托管 Harness、编写高代码 Agent，以及纳管已有 Agent，适应不同的开发起点。
- **复用能力资产**：统一管理模型连接、凭证、Skill 和 MCP 工具，将业务能力绑定到 Agent。
- **团队协作**：通过 Team 组织多个 Agent，并为 Agent 配置角色与子 Agent。
- **统一管理**：围绕工作空间组织资源、身份权限和观测入口，减少在多个系统之间分别维护配置的工作。

这些能力及接入模式在 [基本概念](https://help.aliyun.com/zh/agentcore/agentcore-basic-concepts) 中有集中说明。

## 核心概念与工作方式

Workspace 是资源的组织边界；Agent 是执行任务的单元；Team 则描述 Agent 之间的组织关系。模型连接保存供应商端点与访问配置，连接下的模型记录可供 Agent 选择的能力。Skill 和 MCP 工具作为可复用资产，为 Agent 增加业务操作入口。

因此，使用平台既可以从创建一个托管 Agent 开始，也可以从整理已有 Agent 与工具开始。Workspace 支持按项目或业务线拆分，并可配置 VPC 连接，具体创建步骤见 [Workspace 指南](https://help.aliyun.com/zh/agentcore/manage-workspace)。

## 使用场景与接入方式

适合需要统一管理多个 Agent、共享模型和工具配置，或让已有 Agent 加入团队协作的组织。初次使用可从 [控制台](https://agentcore.console.aliyun.com) 创建 Workspace，配置模型连接，再选择 Harness、高代码或纳管方式接入 Agent。

阿里云 AgentCore 与 [阿里云 AgentRun](alibaba-cloud-agentrun.md) 是独立条目：前者介绍统一构建与治理平台，后者介绍基于函数计算的运行时、沙箱及配套组件。它也与 AWS 的 [Amazon Bedrock AgentCore Runtime](amazon-bedrock-agentcore-runtime.md) 属于不同厂商的产品。
