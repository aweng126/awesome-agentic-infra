# Runtime & Orchestration

收录 Agent 开发框架、Agent Harness、工作流引擎与多 Agent 协作平台，覆盖执行循环、上下文与会话管理、任务编排和恢复。

同时介绍代表性的通用与个人 Agent 产品，了解这些执行能力如何组合成可直接委派任务的产品。

<!-- resources:start -->

## Projects & Platforms

- <a id="resource-agentscope"></a> [AgentScope](https://github.com/agentscope-ai/agentscope) — 以推理与工具执行循环为核心的开源 Agent 框架，支持事件流、实时中断与继续执行、工具权限管理及工作空间与沙箱。2.0 已整合原 AgentScope Runtime 的能力。 [项目介绍](items/agentscope.md)
- <a id="resource-autogen"></a> [AutoGen](https://github.com/microsoft/autogen) — 采用 Core 与 AgentChat 分层设计的多 Agent 框架，提供消息传递、事件驱动执行与分布式运行时。当前已进入维护模式，官方建议新用户使用 Microsoft Agent Framework。 [项目介绍](items/autogen.md)
- <a id="resource-cloudflare-agents"></a> [Cloudflare Agents](https://developers.cloudflare.com/agents/runtime/agents-api/) — 基于 Durable Objects 的有状态 Agent SDK，在 Cloudflare 托管环境中提供持久身份、SQLite 状态、事件驱动执行和定时任务，可与 Workflows 组合使用。 [项目介绍](items/cloudflare-agents.md)
- <a id="resource-google-adk"></a> [Google Agent Development Kit (ADK)](https://adk.dev/) — 用于组织 Agent、工具和多 Agent 工作流的开发工具包，支持图工作流、顺序与并行组合，以及会话事件管理和执行恢复。 [项目介绍](items/google-adk.md)
- <a id="resource-langgraph"></a> [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) — 面向有状态、长时间运行 Agent 的图编排框架，可组合确定性步骤与模型决策，支持状态持久化、执行恢复、流式输出与人工介入。 [项目介绍](items/langgraph.md)
- <a id="resource-microsoft-agent-framework"></a> [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) — Agent 与多 Agent 工作流开发框架，支持顺序、并行、移交和群组协作等图编排模式，并提供检查点、流式执行、人工介入和中间件。 [项目介绍](items/microsoft-agent-framework.md)
- <a id="resource-paperclip"></a> [Paperclip](https://github.com/paperclipai/paperclip) — 组织级多 Agent 协作平台，提供任务分配与委派、事件唤醒、审批和预算管理，通过 Adapter 对接已有 Agent Runtime 并衔接跨运行会话。接入方式见 [Adapter 文档](https://docs.paperclip.ing/reference/adapters/overview/)。 [项目介绍](items/paperclip.md)
- <a id="resource-strands-agents"></a> [Strands Agents（Harness SDK）](https://strandsagents.com/docs/user-guide/sdk/) — 开源的 Python / TypeScript Agent Harness SDK，提供执行循环、工具接入、上下文与会话管理等组件，并提供预装配的 Strands harness，支持快速构建和定制 Agent。 [项目介绍](items/strands-agents.md)
- <a id="resource-temporal"></a> [Temporal](https://docs.temporal.io/ai) — 通用持久执行平台，通过 Workflow 与 Activity 组织任务，支持失败重试及等待外部事件后继续执行。官方提供 Agent 循环、工具调用和人工审批的集成示例。 [项目介绍](items/temporal.md)
- <a id="resource-veadk"></a> [VeADK](https://github.com/volcengine/veadk-python) — 火山引擎的开源 Agent 开发工具包，提供 Agent、Runner、子 Agent 组织和会话存储，并支持 AgentKit 应用集成。 [项目介绍](items/veadk.md)
- <a id="resource-pi"></a> [Pi Agent Harness](https://pi.dev/docs/latest) — 可扩展的开源 Agent Harness，提供终端编码 Agent、TypeScript SDK 与 RPC 接口，组合工具执行、会话管理和上下文压缩，可嵌入自有应用。 [项目介绍](items/pi.md)
- <a id="resource-codex"></a> [Codex（Agent Harness）](https://developers.openai.com/blog/codex-as-a-platform) — OpenAI 的可复用 Agent Harness，通过 CLI、SDK 与 App Server 提供工具执行、会话状态、流式事件及审批接口，可接入自有产品和自动化流程。 [项目介绍](items/codex.md)
- <a id="resource-claude-agent-sdk"></a> [Claude Agent SDK（Claude Code）](https://code.claude.com/docs/en/agent-sdk/overview) — 将 Claude Code 的执行循环、内置工具和上下文管理开放给 Python 与 TypeScript 应用，提供会话、权限、Hooks、MCP 与子 Agent 接口。 [项目介绍](items/claude-agent-sdk.md)
- <a id="resource-opencode"></a> [OpenCode](https://opencode.ai/v2/docs/build/) — 开源编码 Agent，提供可独立运行的服务、客户端 API 与内嵌 SDK，支持围绕会话、工具和插件构建自定义 Agent 界面与自动化流程。 [项目介绍](items/opencode.md)
- <a id="resource-gemini-cli"></a> [Gemini CLI](https://github.com/google-gemini/gemini-cli) — Google 开源的终端 Agent，组合 Gemini 模型、文件与命令工具、项目上下文和会话管理，可通过 Headless 模式接入脚本与自动化流程。 [项目介绍](items/gemini-cli.md)
- <a id="resource-github-copilot"></a> [GitHub Copilot SDK（Copilot CLI）](https://github.com/github/copilot-sdk) — 将 Copilot CLI 的 Agent 执行能力开放给应用的多语言 SDK，支持会话、流式事件、自定义工具和 MCP，复用任务规划与工具执行能力。 [项目介绍](items/github-copilot.md)
- <a id="resource-qwen-code"></a> [Qwen Code](https://github.com/QwenLM/qwen-code) — 阿里 Qwen 团队的开源 Coding Agent，提供本地执行循环、工具与会话管理，可通过非交互 CLI、SDK 和 ACP 接入自动化流程。 [项目介绍](items/qwen-code.md)
- <a id="resource-kimi-code"></a> [Kimi Code CLI](https://github.com/MoonshotAI/kimi-code) — 月之暗面的开源本地 Coding Agent，提供工具执行、子 Agent、非交互命令和 ACP，并通过实验性本地 API 暴露会话控制能力。 [项目介绍](items/kimi-code.md)
- <a id="resource-codebuddy-code"></a> [CodeBuddy Code](https://www.codebuddy.cn/docs/cli/quickstart) — 腾讯的本地 Coding Agent CLI，支持无头执行、会话恢复、MCP 与权限控制，并提供 TypeScript、Python Agent SDK 接入研发自动化。 [项目介绍](items/codebuddy-code.md)
- <a id="resource-zcode"></a> [ZCode](https://github.com/zai-org/ZCode) — 智谱 Z.ai 的开源编程 Agent Harness，提供桌面、Web 与终端入口，公开 Agent CLI 和运行时源码，支持通过插件、MCP 与 Hooks 扩展执行能力。 [项目介绍](items/zcode.md)
- <a id="resource-trae-code-cli"></a> [TraeCode CLI](https://docs.trae.cn/cli_about-trae-code-cli-2) — 字节跳动 TRAE 的本地编程 Agent，支持交互式终端、脚本与 CI 非交互执行，通过 ACP 接入编辑器，并提供会话管理、工具扩展和权限控制。 [项目介绍](items/trae-code-cli.md)
- <a id="resource-muse-code"></a> [Muse Code](https://dev.meta.ai/docs/muse-code) — Meta 面向终端与 CI 的编程 Agent，提供本地执行、审批和沙箱，并通过会话协议及 SDK 支持应用驱动、任务控制与会话恢复。 [项目介绍](items/muse-code.md)
- <a id="resource-meta-muse"></a> [Meta Muse](https://muse.ai/) — Meta 的托管个人 Agent，结合专属云端运行环境、长期记忆、浏览器与连接器，持续推进日常任务，并提供操作审批和活动记录。 [项目介绍](items/meta-muse.md)
- <a id="resource-manus-cue"></a> [Manus Cue](https://cue.im/) — Manus 的托管个人 Agent 产品，为 Agent 配备邮箱、电话号码、钱包与电脑，支持独立执行任务及在群聊中围绕共同目标分工协作。 [项目介绍](items/manus-cue.md)

<!-- resources:end -->

## 方案总览

- [Agent Runtime 全景：框架、Harness、平台与产品](../notes/agent-runtime-landscape.md) — 汇总开发框架、Coding Agent 执行系统、运行平台与通用 Agent 产品，介绍各方案的定位、特点和接入入口。

[返回首页](../README.md)
