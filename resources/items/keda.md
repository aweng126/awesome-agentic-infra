---
name: KEDA
summary: 根据队列或其他外部事件驱动 Kubernetes 工作负载伸缩，通过 ScaledObject、ScaledJob 和事件触发器为异步 Agent 任务处理进程提供弹性资源。
type: project
topic: deployment-and-scheduling
url: https://keda.sh/docs/latest/concepts/
anchor: resource-keda
order: 7
links:
  - label: 官网
    url: https://keda.sh/
  - label: 代码仓库
    url: https://github.com/kedacore/keda
  - label: 文档
    url: https://keda.sh/docs/latest/concepts/
  - label: 安装指南
    url: https://keda.sh/docs/latest/deploy/
maintainer: KEDA 社区
form: 开源 Kubernetes 事件驱动伸缩组件
license: Apache-2.0
status:
  label: CNCF 毕业项目
  source: https://keda.sh/
  checked: '2026-09-27'
---

## 背景与目标

KEDA 让 Kubernetes 工作负载根据消息队列、数据库或外部 API 的实际负载伸缩。项目由 Microsoft 与 Red Hat 发起，目前是 CNCF 毕业项目。对于以队列接收任务的 Agent 服务，它可以把等待处理的工作量转化为执行进程数量，连接任务入口与集群计算资源。[官方概览](https://keda.sh/docs/latest/concepts/)、[项目状态](https://keda.sh/)

## 核心能力

- **事件驱动副本伸缩**：使用 ScaledObject 把 Deployment 等工作负载连接到外部指标，可配置上下限、触发条件及空闲时缩容行为。[工作负载伸缩](https://keda.sh/docs/latest/concepts/scaling-deployments/)
- **批处理任务伸缩**：通过 ScaledJob 根据事件创建 Kubernetes Job，适用于独立执行并结束的后台任务。[Jobs](https://keda.sh/docs/latest/concepts/scaling-jobs/)
- **事件源与认证接入**：内置多种 Scaler，支持队列、数据库和监控指标，并通过认证资源配置对事件源的访问。[概念说明](https://keda.sh/docs/latest/concepts/)

## 核心概念与工作方式

Scaler 负责读取某种外部事件源的指标；ScaledObject 指定需要伸缩的工作负载及触发器；TriggerAuthentication 保存触发器使用的认证配置。用户将这些资源提交到 Kubernetes 后，KEDA 控制器开始监测事件并管理伸缩对象。[资源模型](https://keda.sh/docs/latest/concepts/scaling-deployments/)

对普通副本型工作负载，启用缩容至零时，KEDA 负责零副本与一个副本之间的启停；其余副本伸缩由 HPA 使用 KEDA 提供的外部指标处理。ScaledJob 则按照事件和伸缩策略创建批处理 Job。任务领取、处理与确认仍由消费者程序和消息系统完成。[启停与伸缩](https://keda.sh/docs/latest/concepts/scaling-deployments/#activating-and-scaling-thresholds) · [Job 处理流程](https://keda.sh/docs/latest/concepts/scaling-jobs/)

## 使用场景与接入方式

它适合异步 Agent 任务消费者、批量工具执行进程以及根据队列积压调节并发的服务。应用把任务放入选定事件源，执行进程处理任务，KEDA 根据观测到的工作量调整运行实例；具体任务恢复机制可以独立于伸缩配置组织。

接入时在集群安装 KEDA，为工作负载选择对应 Scaler，配置触发阈值、认证和副本范围，再创建 ScaledObject 或 ScaledJob。缩容到零依赖能够在无运行副本时继续观测的事件源，CPU、内存触发器本身无法提供这一唤醒信号。[部署入口](https://keda.sh/docs/latest/deploy/)、[伸缩机制](https://keda.sh/docs/latest/concepts/)
