# Security & Governance

本主题关注 Agent、工具服务与数据系统之间的身份、授权和策略执行，以及 Agent 交互流程中的检查机制与威胁建模。对于通用安全组件，下文给出其在 Agent 基础设施中的可用位置；具体接入和策略执行仍由应用或平台实现。代码执行环境的隔离机制见 [Sandbox & Execution](sandbox-and-execution.md)。

> 最近整理：2026-09-26。条目依据所链接的一手来源整理，不代表实测。

## Projects & Platforms

- <a id="resource-cedar"></a> [Cedar](https://docs.cedarpolicy.com/) — 授权策略语言与评估机制，可用于表达某个 Agent 或用户在给定上下文中能够对哪些资源执行哪些操作；关注：主体、动作、资源和上下文模型，以及基于 schema 的策略验证。
- <a id="resource-nvidia-nemo-guardrails"></a> [NVIDIA NeMo Guardrails](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview) — 为 LLM 应用提供可编程检查流程，可在 Agent 的输入、检索、工具执行和输出阶段接入应用规则；关注：Colang 流程、execution rails 与自定义检查动作。
- <a id="resource-open-policy-agent-opa"></a> [Open Policy Agent (OPA)](https://www.openpolicyagent.org/docs) — 通用策略引擎，可供 Agent 工具网关或服务端查询访问决策，将策略判断从业务代码中提取出来；关注：Rego、结构化决策输入，以及策略决策与执行点的分工。
- <a id="resource-spire"></a> [SPIRE](https://spiffe.io/docs/latest/spire-about/) — SPIFFE 的工作负载身份实现，可为运行 Agent 的服务及其工具服务提供可验证身份；关注：节点与工作负载证明、SVID 签发和验证，以及服务间身份认证。

## Articles & Documentation

- <a id="resource-owasp-agentic-security-initiative"></a> [OWASP Agentic Security Initiative](https://genai.owasp.org/initiatives/agentic-security-initiative/) — 汇集面向自主 Agent 和多步骤工作流的安全资料，包括 Agentic Top 10 与 MCP 服务开发指南；关注：Agent 威胁分类、工具连接点的防护和系统控制要求，可作为架构分析与检查项设计的参考。

## Related Topics

- [Sandbox & Execution](sandbox-and-execution.md) — 代码与浏览器执行环境，以及面向宿主系统的隔离边界。
- [Tools & Protocols](tools-and-protocols.md) — 工具接入、发现和 Agent 间通信。
- [Observability & Evaluation](observability-and-evaluation.md) — 执行记录、行为分析与评测。

[返回首页](../README.md)
