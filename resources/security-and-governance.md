# Security & Governance

收录 Agent 身份、授权、策略决策和交互检查组件，以及威胁分类与安全指南。代码执行环境的隔离组件见 [Sandbox & Execution](sandbox-and-execution.md)。

## Projects & Platforms

- <a id="resource-cedar"></a> [Cedar](https://docs.cedarpolicy.com/) — 授权策略语言与评估机制，使用主体、动作、资源和上下文表达 Agent 或用户的操作权限，并支持基于 schema 的策略验证。
- <a id="resource-nvidia-nemo-guardrails"></a> [NVIDIA NeMo Guardrails](https://docs.nvidia.com/nemo/guardrails/about-nemo-guardrails-library/overview) — 为 LLM 应用提供可编程检查流程，通过 Colang、execution rails 和自定义动作，在 Agent 的输入、检索、工具执行与输出阶段接入应用规则。
- <a id="resource-open-policy-agent-opa"></a> [Open Policy Agent (OPA)](https://www.openpolicyagent.org/docs) — 使用 Rego 和结构化输入进行策略决策的通用引擎，可由 Agent 工具网关或服务端调用，将策略判断与业务执行分开。
- <a id="resource-spire"></a> [SPIRE](https://spiffe.io/docs/latest/spire-about/) — SPIFFE 的工作负载身份实现，通过节点与工作负载证明、SVID 签发和验证，为 Agent 服务及其工具服务提供可验证身份。

## Articles & Documentation

- <a id="resource-owasp-agentic-security-initiative"></a> [OWASP Agentic Security Initiative](https://genai.owasp.org/initiatives/agentic-security-initiative/) — 面向自主 Agent 和多步骤工作流的安全资料集合，包括 Agentic Top 10 与 MCP 服务开发指南，涵盖威胁分类、工具连接防护和系统控制要求。

[返回首页](../README.md)
