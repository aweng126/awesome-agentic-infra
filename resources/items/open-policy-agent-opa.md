---
name: Open Policy Agent (OPA)
summary: 使用 Rego 和结构化输入进行策略决策的通用引擎，可由 Agent 工具网关或服务端调用，将策略判断与业务执行分开。
type: project
topic: security-and-governance
aliases: ["OPA", "Open Policy Agent"]
keywords: ["策略引擎", "Rego", "授权", "工具网关", "Sidecar", "WebAssembly"]
role: policy-engine
delivery: self-hosted
url: https://www.openpolicyagent.org/docs
anchor: resource-open-policy-agent-opa
order: 3
links:
  - label: 文档
    url: https://www.openpolicyagent.org/docs
  - label: 官网
    url: https://www.openpolicyagent.org/
  - label: 代码仓库
    url: https://github.com/open-policy-agent/opa
  - label: 接入指南
    url: https://www.openpolicyagent.org/docs/integration
maintainer: OPA 项目维护者与社区
form: 开源通用策略引擎
license: Apache-2.0
status:
  label: CNCF 毕业项目
  source: https://www.openpolicyagent.org/docs
  checked: 2026-09-27
---

## 背景与目标

Open Policy Agent（OPA）将策略判断从业务执行中分离出来，供 API 网关、微服务、部署系统等组件查询。应用提供结构化输入，OPA 结合策略和数据返回决策，再由应用执行对应操作。它面向通用规则与授权需求，并非只服务于 Agent。[官方概览](https://www.openpolicyagent.org/docs)

## 核心能力

- **策略即代码**：使用 Rego 表达对结构化数据的规则，输出可以是允许与拒绝，也可以是列表、对象等结构化结果。[策略模型](https://www.openpolicyagent.org/docs)
- **多种接入形式**：提供 HTTP API、Go API 和 SDK，也支持将策略编译为 WebAssembly 后嵌入其他环境。[接入指南](https://www.openpolicyagent.org/docs/integration)
- **策略验证与运维**：提供策略测试，以及策略包分发、状态上报和决策日志等管理接口。[策略测试](https://www.openpolicyagent.org/docs/policy-testing) · [管理接口](https://www.openpolicyagent.org/docs/integration)

## 核心概念与工作方式

Input 是本次请求携带的数据，Policy 是 Rego 编写的规则，Data 则提供决策需要的其他信息。应用选择一个决策入口并传入请求，OPA 计算规则结果。策略判断与动作执行有明确分工：引擎返回决策，网关或服务负责放行、拒绝或采取其他行为。[工作方式](https://www.openpolicyagent.org/docs)

典型部署可以把 OPA 作为同机进程或 Sidecar，由应用通过本地 HTTP 接口查询；也可以直接嵌入 Go 程序。策略与配套数据可以独立分发，多个接入方共享一致的策略管理方式。[部署与集成](https://www.openpolicyagent.org/docs/integration)

## 使用场景与接入方式

在 Agent 场景中，工具网关可以把用户身份、工具名称、目标资源及请求参数组织为输入，交给 OPA 判断调用范围。这是对通用策略接口的应用示例，所需输入和规则仍要由业务系统定义，不能由模型自行决定授权结果。[接口模式](https://www.openpolicyagent.org/docs/integration)

可以先用命令行或在线 Playground 验证 Rego 规则，再将评估入口接入业务服务，并为允许、拒绝和缺少字段等输入建立测试。项目属于 CNCF 毕业项目，代码采用 Apache-2.0。[项目入口](https://github.com/open-policy-agent/opa) · [测试指南](https://www.openpolicyagent.org/docs/policy-testing)
