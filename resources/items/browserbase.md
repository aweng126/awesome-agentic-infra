---
name: Browserbase
summary: 承载 Agent 网页交互任务的云浏览器平台，可通过 API 创建、控制和观察浏览器会话，并接入 Playwright、Puppeteer 和 Selenium。
type: project
topic: sandbox-and-execution
url: https://docs.browserbase.com/welcome/introduction
anchor: resource-browserbase
order: 1
links:
  - label: 官网
    url: https://www.browserbase.com/
  - label: 文档
    url: https://docs.browserbase.com/welcome/introduction
  - label: 快速开始
    url: https://docs.browserbase.com/welcome/quickstarts/playwright
  - label: API 与 SDK
    url: https://docs.browserbase.com/reference/introduction
maintainer: Browserbase
form: 托管浏览器与浏览器 Agent 平台
---

## 背景与目标

Browserbase 面向需要访问真实网页、填写表单和提取信息的应用，将浏览器运行环境以云服务方式提供给开发者。Agent 可以通过已有自动化代码连接远程浏览器，让网页操作成为任务流程中的一个执行步骤。平台还提供网页搜索、内容获取及浏览器 Agent 等入口；这里重点介绍其浏览器执行能力。[平台概览](https://docs.browserbase.com/welcome/introduction)

## 核心能力

- **会话管理**：通过 API 创建浏览器会话，取得连接地址，再接入 Playwright、Puppeteer 或 Selenium 等自动化工具。[Playwright 入门](https://docs.browserbase.com/welcome/quickstarts/playwright)
- **跨会话数据复用**：使用 Context 保存 Cookie、本地存储与网站认证数据，为后续会话延续已登录的浏览环境。[Contexts](https://docs.browserbase.com/platform/browser/core-features/contexts)
- **运行观察**：通过实时画面、会话回放、控制台日志和网络事件，查看网页交互的执行过程。[可观测性](https://docs.browserbase.com/platform/browser/observability/observability)

## 核心概念与工作方式

Session 是一次实际运行的浏览器会话。应用创建 Session 后，可以使用返回的连接地址控制网页，并以会话标识查询状态与日志。Browserbase 负责提供浏览器实例，页面点击、填写和信息读取则由连接它的代码或 Agent 驱动。[连接流程](https://docs.browserbase.com/welcome/quickstarts/playwright)

Context 独立于单次 Session，用于保存浏览器用户数据。创建新会话时指定 Context 标识即可恢复相关数据；需要把本次操作产生的变化保存下来时，还要启用持久化选项。网站自身仍可让登录凭据失效，应用需要识别重新认证的情况。[数据持久化](https://docs.browserbase.com/platform/browser/core-features/contexts)

## 使用场景与接入方式

典型用途包括网页资料收集、表单处理、浏览器 Agent 和端到端测试。需要自然语言驱动网页操作时，可以结合 Browserbase 的 Stagehand；已有自动化脚本也可以直接使用云浏览器。[平台与集成入口](https://docs.browserbase.com/welcome/introduction)

接入时创建账号和 API Key，安装 Browserbase SDK 与相应的浏览器控制库，完成“创建会话 → 连接浏览器 → 执行操作 → 结束会话”的调用流程。官方教程同时提供 Python 和 Node.js 示例。[快速开始](https://docs.browserbase.com/welcome/quickstarts/playwright)
