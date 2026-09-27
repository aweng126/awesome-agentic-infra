---
name: Playwright MCP
summary: 将 Playwright 浏览器自动化能力封装为 MCP 服务，让 Agent 通过结构化无障碍快照读取页面状态并执行浏览器操作。
type: project
topic: tools-and-protocols
aliases: ["Playwright MCP Server"]
keywords: ["浏览器自动化", "MCP", "无障碍快照", "网页操作", "浏览器扩展"]
role: tool-server
delivery: self-hosted
url: https://github.com/microsoft/playwright-mcp
anchor: resource-playwright-mcp
order: 2
links:
  - label: 代码与文档
    url: https://github.com/microsoft/playwright-mcp
  - label: Playwright 官网
    url: https://playwright.dev/
  - label: 快速开始
    url: https://github.com/microsoft/playwright-mcp#getting-started
  - label: 浏览器扩展
    url: https://github.com/microsoft/playwright/tree/main/packages/extension
maintainer: Microsoft Playwright 团队与社区
form: 开源浏览器自动化 MCP 服务
license: Apache-2.0
---

## 背景与目标

Playwright MCP 将浏览器自动化作为工具提供给支持 MCP 的 Agent。项目在 Playwright 与模型客户端之间增加协议接口，让 Agent 获取页面的结构化状态并发起操作，适用于需要访问网页、填写表单或检查页面流程的任务。[项目介绍](https://github.com/microsoft/playwright-mcp)

## 核心能力

- **读取页面状态**：通过结构化无障碍快照描述页面，帮助模型识别按钮、链接、输入框等元素。[MCP 概览](https://github.com/microsoft/playwright-mcp#playwright-mcp)
- **执行浏览器操作**：提供导航、点击、输入等工具，并包含截图、控制台与网络信息等辅助能力。[工具列表](https://github.com/microsoft/playwright-mcp#tools)
- **管理会话环境**：可以使用持久浏览器配置、隔离会话，或通过扩展连接已有浏览器。[浏览器配置](https://github.com/microsoft/playwright-mcp#user-profile)

## 核心概念与工作方式

Playwright 提供的无障碍快照用树形结构表达元素角色、名称、状态与层级，因此页面中的“提交按钮”和“搜索输入框”能够以结构化文字被描述。这是理解 MCP 服务如何向模型呈现页面的重要背景。[无障碍快照说明](https://playwright.dev/docs/aria-snapshots)

MCP 客户端把工具请求交给服务，服务调用 Playwright 操作浏览器，再返回执行结果与页面状态。通过官方浏览器扩展，客户端还能连接用户已有的浏览器标签页，使用其中的登录状态；扩展连接默认需要用户在浏览器侧确认。[扩展工作方式](https://github.com/microsoft/playwright/tree/main/packages/extension)

## 使用场景与接入方式

Playwright MCP 可以作为网页任务与浏览器验证的执行工具。常见接入方式是在 MCP 客户端中配置 `npx @playwright/mcp@latest`，由客户端启动服务；也可以按文档配置独立服务。部署时选择合适的浏览器配置目录或隔离模式，决定会话状态是否保留。[入门与配置](https://github.com/microsoft/playwright-mcp#getting-started)

这里的“隔离会话”主要用于分开浏览器状态，服务本身不构成安全沙箱。Agent 是否可以访问某个账户、执行某项操作，仍由上层应用的授权与运行环境控制。[官方安全边界](https://github.com/microsoft/playwright-mcp#security)
