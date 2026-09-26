# Tools & Protocols

关注 Agent 如何发现并调用外部能力，以及独立 Agent 之间如何描述能力、交换消息和协作。本页收录接口协议、连接器和工具适配层；沙箱与浏览器运行环境见执行环境主题。

> 最近整理：2026-09-26。条目依据所链接的一手来源整理，不代表实测。

## Projects & Platforms

- [Composio](https://github.com/ComposioHQ/composio) — 为 Agent 提供应用工具集、认证与按用户组织的会话，包含托管工具服务及配套 SDK 和框架适配器；关注：工具搜索、认证接入、工具执行与事件触发。
- [Playwright MCP](https://github.com/microsoft/playwright-mcp) — 将 Playwright 浏览器自动化能力封装为 MCP 服务，让 Agent 通过结构化无障碍快照理解页面并执行操作；关注：浏览器能力到工具接口的映射，以及页面状态的结构化表示。

## Specifications

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/specification/latest) — 规定 AI 应用与上下文、工具服务之间的通信方式，使宿主能够接入不同服务提供的能力；关注：宿主、客户端与服务端的角色划分，JSON-RPC 消息，以及 tools、resources 和 prompts 接口。
- [Agent2Agent Protocol (A2A)](https://a2a-protocol.org/latest/specification/) — 规定独立 Agent 系统间的能力发现、消息交换与任务协作方式；关注：Agent Card、任务生命周期、产物表示，以及流式和异步更新。

## Related Topics

- [Sandbox & Execution](sandbox-and-execution.md)：工具背后的代码执行和浏览器运行环境。
- [Runtime & Orchestration](runtime-and-orchestration.md)：工具调用与多 Agent 协作的执行流程。
- [Security & Governance](security-and-governance.md)：工具访问权限、凭证与调用策略。

[返回首页](../README.md)
