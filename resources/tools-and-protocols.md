# Tools & Protocols

收录 Agent 工具接入、能力发现与跨 Agent 通信所需的接口协议、连接器和适配组件。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-composio"></a> [Composio](https://github.com/ComposioHQ/composio) — 为 Agent 提供应用工具集、认证和按用户组织的会话，支持工具搜索、执行与事件触发，包含托管工具服务、配套 SDK 和框架适配器。 [项目介绍](items/composio.md)
- <a id="resource-playwright-mcp"></a> [Playwright MCP](https://github.com/microsoft/playwright-mcp) — 将 Playwright 浏览器自动化能力封装为 MCP 服务，让 Agent 通过结构化无障碍快照读取页面状态并执行浏览器操作。 [项目介绍](items/playwright-mcp.md)

## Specifications

- <a id="resource-mcp"></a> [Model Context Protocol (MCP)](https://modelcontextprotocol.io/specification/latest) — 连接 AI 应用与上下文、工具服务的通信协议，以 JSON-RPC 消息定义 tools、resources 和 prompts 等接口，支持宿主通过客户端接入不同服务。
- <a id="resource-a2a"></a> [Agent2Agent Protocol (A2A)](https://a2a-protocol.org/latest/specification/) — 面向独立 Agent 系统的通信与协作协议，定义 Agent Card、任务生命周期和产物表示，支持能力发现、消息交换及流式和异步更新。

<!-- resources:end -->

[返回首页](../README.md)
