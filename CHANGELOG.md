# 更新日志

按发布批次记录本站新增的资源、导览和读者可感知的改进，最新记录在前；点击条目链接即可查看相关内容。日期与时间为本站发布时的北京时间。

## 2026-09-28

### 17:43 · 精简主题范围介绍

精简[运行时与编排](resources/runtime-and-orchestration.md)等主题页的范围介绍，集中说明本主题收录的内容。

#### 内容更新

- 移除运行时、部署、沙箱与安全主题开头对其他主题的引用，并精简模型服务页的关联范围介绍；主题切换统一通过侧栏导航完成。

### 17:29 · 主题导航直接进入内容

点击“主题导航”直接阅读[运行时与编排](resources/runtime-and-orchestration.md)的范围说明与资源清单，通过侧栏继续浏览其他主题。

#### 站点改进

- 首页入口改为“按主题浏览”，具体主题卡片保留直达链接；手机端切换菜单显示当前主题。
- 主题面包屑以文字显示栏目层级，首页仍可点击返回。
- 旧主题总览地址继续可用，原关联基础设施入口进入[推理与模型服务](resources/inference-and-model-serving.md)主题。

### 17:15 · 新增独立主题导航页

[主题导航](https://blog.kingwen.cn/awesome-agentic-infra/topics/)现在进入独立总览页，按 Agent 核心能力、跨领域支撑和关联基础设施选择具体主题。

#### 站点改进

- 各主题展示范围说明、资源数量及对应页面入口；主导航、搜索和主题面包屑统一连接总览页。
- 首页保留具体主题的快捷入口，并提供“查看全部主题”链接；原有页面地址与首页定位锚点继续可用。

### 16:56 · 突出资源导览入口

[首页](https://blog.kingwen.cn/awesome-agentic-infra/)直接展示[领域导览](notes/agentic-infra-overview.md)与 [Runtime 全景](notes/agent-runtime-landscape.md)，从了解领域全貌进入主题资源与项目介绍。

#### 站点改进

- 主导航新增[资源导览](notes/README.md)，导览列表与文章统一显示当前栏目，文档侧栏前移导览入口。
- 首页在主题列表之前展示两篇总览，首屏提供“浏览资源导览”和“探索资源库”两个入口；手机端先展示导览，再展示基础设施关系图。
- 缩减首屏留白，将资源统计与范围说明合并进导览区，保留原有主题、页面地址及定位链接。

### 16:38 · 完善 Strands Harness 介绍

更新 [Strands Agents（Harness SDK）](resources/items/strands-agents.md) 介绍，区分用于自行组合 Agent 的 Harness SDK 与预装配的 Strands harness，补充主要能力和官方接入入口。

#### 内容更新

- 补充上下文、会话与运行控制说明，分别提供 SDK 和预装配 Harness 的阅读路径；支持通过 Harness 相关名称搜索该资源。
- 同步[运行时与编排](resources/runtime-and-orchestration.md)主题索引和 [Runtime 全景](notes/agent-runtime-landscape.md)中的名称与定位。

## 2026-09-27

### 22:00 · 精简仓库首页

精简 [README](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md)，集中展示项目定位、阅读入口和主题导航。

#### 内容更新

- 合并重复介绍和阅读指引，将主题目录改为中文链接列表，保留网站截图、独立的模型服务入口及简短许可说明；旧章节锚点继续可用。

### 21:40 · 补充 Docker 执行环境

新增 [Docker Engine](resources/items/docker-engine.md) 与 [Docker Sandboxes](resources/items/docker-sandboxes.md) 介绍，分别了解容器执行底座和面向 Agent 的本地、云端沙箱产品。

#### 新增内容

- 在[沙箱与执行环境](resources/sandbox-and-execution.md)中收录 Docker Engine 与 Docker Sandboxes，补充定位、主要能力、工作方式及官方接入资料，并关联两者与 gVisor 的阅读入口。

#### 内容更新

- 主题内分组使用“沙箱环境与服务”和“执行与隔离底座”，覆盖本地工具、托管沙箱与容器基础组件；资源库、搜索和首页资源数量同步更新。

### 21:10 · 资源发现与阅读体验更新

在[资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/)按组件角色与交付方式查找方案，通过中文别名和能力关键词搜索资源；新增 [MCP](resources/items/mcp.md)、[A2A](resources/items/a2a.md) 与 [OpenTelemetry GenAI](resources/items/opentelemetry-genai-semantic-conventions.md) 规范导读，并可通过 RSS 订阅后续更新。

#### 新增内容

- 新增 [MCP](resources/items/mcp.md)、[A2A](resources/items/a2a.md) 和 [OpenTelemetry GenAI](resources/items/opentelemetry-genai-semantic-conventions.md) 规范导读，介绍用途、关键角色、基本交互及相关实现。

#### 内容更新

- 为现有资源补充别名、能力关键词、组件角色及交付方式；[Runtime 全景](notes/agent-runtime-landscape.md) 直接连接项目介绍，补充框架、运行平台与隔离组件之间的阅读链接。

#### 站点改进

- 主题页按资源角色组织清单，项目名称统一进入站内介绍；资源库展示具名官方资料、角色与交付方式，支持组合筛选和移除单个条件。
- 搜索支持中文别名与能力关键词，名称匹配优先，可展开全部结果；从介绍页返回资源库时保留本次筛选与阅读位置，手机端可收起筛选面板。
- 更新日志按发布批次组织，首页展示批次摘要，新增 [RSS 订阅](https://blog.kingwen.cn/awesome-agentic-infra/feed.xml)、站点地图及分享图片。
- 增加独立的每周资源巡检，生成外链状态与待复核事实报告；统一站点地址配置并更新维护说明。

### 新增内容

- 在 [沙箱与执行环境](resources/sandbox-and-execution.md) 中新增腾讯云 [Cube Sandbox 项目介绍](resources/items/cube-sandbox.md)，了解自托管 MicroVM 沙箱与状态管理能力；收录 [DeltaBox](resources/sandbox-and-execution.md#resource-deltabox) 论文，介绍面向 Agent 状态探索的增量检查点与回滚，并补充 ATC26 接收来源。
- 补齐其余 39 个项目与平台的介绍页，现有 43 项均可在站内阅读背景、能力、核心概念和接入方式。覆盖 [记忆与上下文](resources/memory-and-context.md)、[工具与协议](resources/tools-and-protocols.md)、[可观测性与评估](resources/observability-and-evaluation.md) 和 [安全与治理](resources/security-and-governance.md) 中的全部项目，并保留官方资料入口。
- 完成 [运行时框架](resources/runtime-and-orchestration.md) 与 [云端部署方案](resources/deployment-and-scheduling.md) 介绍，包括 [Paperclip](resources/items/paperclip.md)、[阿里云 AgentCore](resources/items/alibaba-cloud-agentcore.md)、[Google Cloud Agent Runtime](resources/items/google-cloud-agent-runtime.md)、[Microsoft Foundry Hosted Agents](resources/items/microsoft-foundry-hosted-agents.md) 和 [火山引擎 AgentKit Runtime](resources/items/volcengine-agentkit-runtime.md)，区分应用框架、组织协作与托管运行服务。
- 补齐 [沙箱与执行环境](resources/sandbox-and-execution.md) 及关联的 [推理与模型服务](resources/inference-and-model-serving.md) 项目介绍，说明托管平台、隔离组件与模型服务各自的用途。
- 新增 [LangGraph](resources/items/langgraph.md) 与 [Google AX](resources/items/google-ax.md) 项目介绍，了解开发框架与声明式运行平台的背景、能力、核心概念和接入方式。
- 新增 [E2B](resources/items/e2b.md) 与 [AWS AgentCore Runtime](resources/items/amazon-bedrock-agentcore-runtime.md) 项目介绍，了解代码执行沙箱与托管运行服务，并提供官网、文档和快速开始入口。

### 内容更新

- 根据官方资料补充 [AutoGen](resources/items/autogen.md) 的维护模式、[Daytona](resources/items/daytona.md) 的仓库迁移，以及 [腾讯云 Agent Runtime](resources/items/tencent-cloud-agent-runtime.md) 弹性部署的 Beta 状态；介绍页分别说明项目、客户端与托管服务的形态和许可。
- 更新 [领域导览](notes/agentic-infra-overview.md)，集中介绍三类基础设施的关系、七个主要主题与关联的模型服务；[Runtime 全景](notes/agent-runtime-landscape.md) 保留为运行时主题下的方案总览。
- 调整 [各主题资源简介](README.md#topics)，以项目定位、主要能力和方案形态帮助读者认识现有资源，移除统一的研究切入点；[贡献指南](CONTRIBUTING.md) 同步更新条目模板。
- 移除《任务失败后如何恢复：检查点、重试与外部副作用》，同步清理主题页、导览索引与延伸阅读入口，保留 [Agent Runtime 全景](notes/agent-runtime-landscape.md) 作为现有框架与平台的汇总。

### 站点改进

- 精简 [主题导航页](resources/memory-and-context.md) 的资源清单，移除重复说明和“在资源库筛选这些资料”链接，直接展示资源条目。
- [首页](https://blog.kingwen.cn/awesome-agentic-infra/) 明确中文项目介绍的阅读入口，展示项目介绍数量并支持直接筛选项目与平台；[README](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md#where-to-start) 同步更新阅读路径与首页截图。
- [资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/)、主题索引与全站搜索接入项目介绍页，保留官方资料直达入口。资源元数据与介绍集中维护，主题资源清单自动同步。
- 主导航调整为首页、主题导航、资源库与 [更新日志](CHANGELOG.md)。首页突出主题与资源，增加最近更新；主题页先展示资源清单，再提供方案总览入口。[资源导览](notes/README.md) 保留已有访问地址。

## 2026-09-26

### 新增内容

- 在 [运行时与编排](resources/runtime-and-orchestration.md#resource-paperclip) 中收录 Paperclip，并在 [Runtime 全景](notes/agent-runtime-landscape.md#上层协作平台) 中补充上层协作平台，介绍组织级多 Agent 协作及其与任务执行平台的分工。
- 在 [部署与调度](resources/deployment-and-scheduling.md#resource-google-ax) 中收录 Google AX，并在 [Runtime 全景](notes/agent-runtime-landscape.md#开源运行平台) 中增加开源运行平台分类，区分开发框架、自托管平台与云厂商产品。
- 新增 [Agent Runtime 全景：开源框架、运行平台与云厂商产品](notes/agent-runtime-landscape.md)，汇总代表性方案的维护方、产品定位、主要特点和官方入口，作为 [运行时与编排](resources/runtime-and-orchestration.md) 的学习笔记；同步补充该主题与 [部署与调度](resources/deployment-and-scheduling.md) 中的框架和托管平台资源。
- 曾发布《任务失败后如何恢复：检查点、重试与外部副作用》，通过报告任务的故障窗口介绍恢复机制；该文章已于 2026-09-27 移除。
- 首次收录 40 项基础设施资源，覆盖 [运行时与编排](resources/runtime-and-orchestration.md)、[沙箱与执行](resources/sandbox-and-execution.md)、[记忆与上下文](resources/memory-and-context.md)、[工具与协议](resources/tools-and-protocols.md)、[推理与模型服务](resources/inference-and-model-serving.md)、[部署与调度](resources/deployment-and-scheduling.md)、[可观测性与评估](resources/observability-and-evaluation.md)、[安全与治理](resources/security-and-governance.md) 八个主题，每项提供简介、一手来源和研究切入点。
- 发布概览笔记 [Agentic Infra 的范围、组件与分类边界](notes/agentic-infra-overview.md)，介绍基础设施能力、执行链路与主题间的关系，作为首次阅读的起点。

### 内容更新

- 精简 [GitHub README](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md) 的在线入口，移除目录树与站点维护说明，将贡献介绍统一为资源补充、事实与链接修正；[贡献指南](CONTRIBUTING.md) 同步移除笔记投稿相关说明。
- 精简 [GitHub README](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md)，移除重复的 Scope 章节，通过图下入口阅读 [范围与分类边界](notes/agentic-infra-overview.md#三个基础设施领域)；资源收录标准集中在 [贡献指南](CONTRIBUTING.md#what-to-include)。
- 在 [GitHub README](https://github.com/aweng126/awesome-agentic-infra/blob/main/README.md) 中展示首页介绍与三领域基础设施关系图，并更新项目介绍，说明资源索引、原创学习笔记与仓库的关注范围。
- 在 [概览笔记](notes/agentic-infra-overview.md) 与 [仓库范围](README.md#scope) 中区分 Agentic Infra、LLM Serving Infra 和 LLM Training Infra，说明任务执行、模型服务与模型产物发布的关系；八个阅读主题同步标明核心能力、跨领域能力和关联基础设施。
- 精简八个主题的资源索引，移除重复的相关主题列表与统一整理提示，保留资源简介、研究切入点和固定定位链接；可从 [主题导航](README.md#topics) 查阅。
- 调整 [概览笔记](notes/agentic-infra-overview.md) 的开篇与研究记录建议，直接说明讨论问题及证据组织方法；简化 [笔记索引](notes/README.md)，在 [贡献指南](CONTRIBUTING.md#where-to-put-it) 中明确相关学习笔记的关联方式。

### 站点改进

- 将 [主题导航](README.md#topics) 调整为七个主要主题与独立的“关联基础设施”入口，突出 Agent 核心能力和跨领域支撑；[推理与模型服务](resources/inference-and-model-serving.md) 保留原有资料与链接，作为关联资料查阅。[概览笔记](notes/agentic-infra-overview.md#主题导航与关联基础设施) 和 [贡献指南](CONTRIBUTING.md#where-to-put-it) 同步说明分类边界。
- 重绘 [首页](README.md) 基础设施关系图：突出 Agentic Infra，独立展示 Serving 与 Training，标明模型请求、推理结果和模型产物发布方向；部署、观测与治理作为跨领域能力展示。
- 将 [资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/) 改为紧凑资料列表，明确区分外部来源与主题导读入口；保留搜索、筛选与同步计数。
- 主题页按导读、学习笔记和参考资料组织内容，简化导航并保留既有资源定位链接。[运行时与编排](resources/runtime-and-orchestration.md) 已接入恢复机制笔记，首页可直接进入阅读。
- 修正 [资源库](https://blog.kingwen.cn/awesome-agentic-infra/resources/) 的筛选数量：主题旁的数字随搜索词和资料类型同步更新，选中主题的数量与右侧结果保持一致，清除筛选后恢复完整数量。
- [在线站点](README.md) 上线，提供主题导航、资源搜索与筛选、深浅色切换及带目录的笔记阅读页。
- 增加导航中的 [更新日志](CHANGELOG.md) 入口，集中展示每批内容变化，并链接到相关资源和笔记。
- 为资源条目增加固定定位链接，从日志或其他页面可直接跳到具体条目，例如 [LangGraph](resources/runtime-and-orchestration.md#resource-langgraph)。后续条目更名时保留原有定位链接。
