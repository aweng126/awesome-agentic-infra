---
name: 腾讯云 Agent Runtime
summary: 通过弹性部署（Deployment）为自建 Agent 与工具服务提供稳定入口，支持会话亲和、并发容量配置，以及沙箱实例的调度、空闲释放或暂停保留状态。Deployment 当前为 Beta，官方建议用于测试与 PoC。
type: project
topic: deployment-and-scheduling
aliases: ["Tencent Cloud Agent Runtime", "腾讯 Agent Runtime"]
keywords: ["沙盒", "腾讯云", "Deployment", "会话亲和", "弹性伸缩", "沙箱调度", "暂停恢复"]
role: hosted-runtime
delivery: managed
url: https://cloud.tencent.com/document/product/1814/137850
anchor: resource-tencent-cloud-agent-runtime
order: 10
links:
  - label: 产品文档
    url: https://cloud.tencent.com/document/product/1814/137850
  - label: 部署快速开始
    url: https://cloud.tencent.com/document/product/1814/137829
  - label: 官方示例
    url: https://github.com/TencentCloudAgentRuntime/ags-cookbook/tree/main/examples/deployment-cookbook
maintainer: 腾讯云
form: 面向 Agent 与工具服务的云端运行平台
status:
  label: 弹性部署（Deployment）为 Beta，官方建议用于测试与 PoC
  source: https://cloud.tencent.com/document/product/1814/137850
  checked: '2026-09-27'
---

## 背景与目标

Agent 应用和 MCP 工具服务需要稳定的访问地址，而背后的计算实例可能随负载启动、暂停或释放。腾讯云 Agent Runtime 通过弹性部署（Deployment）连接这两部分，让开发者以一个长期存在的部署资源管理在线服务。本条目聚焦这项部署能力，在本仓库归入部署与调度。其 Beta 状态与使用范围见 [官方概述](https://cloud.tencent.com/document/product/1814/137850)。

## 核心能力

- **稳定服务入口**：部署地址保持不变，后端实例可按请求变化。
- **容量配置**：设置最小、最大实例数量与单实例请求并发上限。
- **空闲处理**：选择停止并释放实例，或暂停保留状态，等待后续请求恢复。
- **会话亲和**：按请求中的亲和标识复用或独占实例，供需要连续交互的应用使用。

这些能力既面向 Agent，也可承载 MCP Server 和普通 HTTP 服务。官方 [Deployment Cookbook](https://github.com/TencentCloudAgentRuntime/ags-cookbook/tree/main/examples/deployment-cookbook) 分别提供伸缩、生命周期、亲和及 MCP 服务示例。

## 核心概念与工作方式

沙箱工具定义应用的运行环境，Deployment 绑定该定义并保存容量与生命周期配置，沙箱实例则实际处理请求。客户端获取短期访问 Token 后调用部署的数据面地址，平台选择已有实例，或启动、恢复实例来承接请求。

创建部署需要已有的常驻型自定义沙箱工具。部署处于可接收请求状态时，实例仍可能正在按需启动，因此初次调用可能包含启动等待。创建、查询与访问过程见 [快速开始](https://cloud.tencent.com/document/product/1814/137829)。

## 使用场景与接入方式

适合验证自建 Agent 或工具服务的托管方式，尤其是希望观察同一会话如何复用环境、空闲时如何回收资源的团队。可从 Cookbook 的 HTTP 示例开始，再换成自己的 Agent 或 MCP 服务。

接入使用 `agr` 工具完成环境初始化、创建部署和调试。调试阶段可通过本地代理访问；正式的数据面调用使用带 Token 的部署地址。平台管理的是服务与实例，任务规划及模型调用仍由部署的应用负责。
