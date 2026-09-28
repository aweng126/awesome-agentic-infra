# 更新日志

按日期记录新增资源、内容更新与站点改进，最新记录在前。点击条目链接可直接阅读相关内容。

## 2026-09-28

- 在[运行时与编排](resources/runtime-and-orchestration.md)新增 Agent Harness 分类及 11 篇项目介绍，覆盖 Pi、Codex、Claude Agent SDK、OpenCode、Gemini CLI、GitHub Copilot SDK，以及 Qwen Code、Kimi Code CLI、CodeBuddy Code、[ZCode](resources/items/zcode.md) 和 TraeCode CLI；[Runtime 全景](notes/agent-runtime-landscape.md#agent-harness-与-coding-agent)同步汇总各方案定位与接入方式。
- 完善 [Strands Agents（Harness SDK）](resources/items/strands-agents.md) 介绍，区分可组合的 SDK 与预装配 Harness，补充上下文、会话和运行控制说明；同步 [Runtime 全景](notes/agent-runtime-landscape.md)中的名称与定位。
- 在[首页](https://blog.kingwen.cn/awesome-agentic-infra/)直接展示[领域导览](notes/agentic-infra-overview.md)与 [Runtime 全景](notes/agent-runtime-landscape.md)，主导航和文章侧栏提供[资源导览](notes/README.md)入口。
- 主题导航直接进入[运行时与编排](resources/runtime-and-orchestration.md)，通过侧栏切换主题；精简范围介绍，首页提供“按主题浏览”入口，手机菜单显示当前主题。
- 更新日志按天合并为要点清单，首页展示最近三个日期的重点内容，[RSS](https://blog.kingwen.cn/awesome-agentic-infra/feed.xml) 同步按天提供更新。

## 2026-09-27

- 补齐各主题项目与平台的站内介绍，主题清单按资源角色组织；从[资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/)可查阅方案定位、核心能力、工作方式与接入资料。
- 新增 [Docker Engine](resources/items/docker-engine.md)、[Docker Sandboxes](resources/items/docker-sandboxes.md)、[Cube Sandbox](resources/items/cube-sandbox.md) 介绍与 [DeltaBox](resources/sandbox-and-execution.md#resource-deltabox) 论文，丰富沙箱执行及环境状态管理资料，并补充 DeltaBox 的 ATC26 接收来源。
- 新增 [MCP](resources/items/mcp.md)、[A2A](resources/items/a2a.md) 和 [OpenTelemetry GenAI](resources/items/opentelemetry-genai-semantic-conventions.md) 规范导读，介绍用途、关键概念与相关实现。
- 根据官方资料补充 [AutoGen](resources/items/autogen.md) 的维护模式、[Daytona](resources/items/daytona.md) 的仓库迁移，以及[腾讯云 Agent Runtime](resources/items/tencent-cloud-agent-runtime.md) 弹性部署的 Beta 状态。
- 更新[领域导览](notes/agentic-infra-overview.md)与 [Runtime 全景](notes/agent-runtime-landscape.md)，明确领域关系和方案分类，并连接对应项目介绍；各主题简介聚焦项目定位、能力与交付形态。
- 为聚焦资源发现与基本介绍，移除《任务失败后如何恢复：检查点、重试与外部副作用》，同步清理相关入口；现有框架和平台的汇总保留在 [Runtime 全景](notes/agent-runtime-landscape.md)。
- [资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/)增加组件角色与交付方式筛选，搜索支持中文别名和能力关键词；从介绍页返回时保留筛选和阅读位置，手机端支持收起筛选面板。
- 精简[仓库首页](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md)，集中展示项目定位、阅读入口、中文主题导航与网站截图；网站首页同步突出项目介绍和资源数量。
- 新增 [RSS 订阅](https://blog.kingwen.cn/awesome-agentic-infra/feed.xml)、站点地图与分享图片，并增加每周外链巡检和内容复核报告。

## 2026-09-26

- 首次整理 40 项基础设施资源，提供简介与一手来源；发布[领域导览](notes/agentic-infra-overview.md)，区分 Agentic、Serving 与 Training 的职责，按七个主要主题及关联模型服务组织[资源目录](README.md#topics)。
- 新增 [Agent Runtime 全景](notes/agent-runtime-landscape.md)，汇总开源框架、运行平台和云厂商产品；收录 [Paperclip](resources/items/paperclip.md) 与 [Google AX](resources/items/google-ax.md)，补充组织协作和开源运行平台分类。
- [在线站点](https://blog.kingwen.cn/awesome-agentic-infra/)上线，提供主题浏览、资源搜索与筛选、深浅色切换、导览阅读和更新日志；首页展示三类基础设施的关系图。
- [资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/)采用紧凑资料列表，主题数量随搜索和类型筛选同步变化；为条目增加固定定位链接，例如 [LangGraph](resources/runtime-and-orchestration.md#resource-langgraph)。
- 精简[仓库首页](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md)和主题索引，移除重复的目录说明、相关主题列表与统一整理提示；[贡献指南](CONTRIBUTING.md)聚焦资源补充、事实修正和链接完善。
- 发布《任务失败后如何恢复：检查点、重试与外部副作用》，介绍任务恢复机制；该文章已于 2026-09-27 移除。
