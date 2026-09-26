# 更新日志

按日期记录本站新增的资源、笔记和读者可感知的改进。日期为内容发布日，最新记录在前；点击条目链接即可查看相关内容。

## 2026-09-26

### 新增内容

- 在 [部署与调度](resources/deployment-and-scheduling.md#resource-google-ax) 中收录 Google AX，并在 [Runtime 全景](notes/agent-runtime-landscape.md#开源运行平台) 中增加开源运行平台分类，区分开发框架、自托管平台与云厂商产品。
- 新增 [Agent Runtime 全景：开源框架、运行平台与云厂商产品](notes/agent-runtime-landscape.md)，汇总代表性方案的维护方、产品定位、主要特点和官方入口，作为 [运行时与编排](resources/runtime-and-orchestration.md) 的学习笔记；同步补充该主题与 [部署与调度](resources/deployment-and-scheduling.md) 中的框架和托管平台资源。
- 新增 [任务失败后如何恢复：检查点、重试与外部副作用](notes/task-recovery-and-side-effects.md)，通过报告任务的故障窗口，解释状态持久化、重放、幂等键与人工审批，并附官方来源和验证检查表。
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
