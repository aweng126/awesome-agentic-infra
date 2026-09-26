# Notes

这里保存本仓库的原创概览、论文解读、架构分析与技术比较。资源链接的简短介绍在 [主题索引](../README.md#topics) 维护。

| 笔记 | 内容 |
| --- | --- |
| [Agentic Infra 的范围、组件与分类边界](agentic-infra-overview.md) | 区分 Agentic、Serving 与 Training，沿任务执行链路理解八个阅读主题 |
| [Agent Runtime 实现方案：开源框架与云托管平台](agent-runtime-landscape.md) | 比较执行框架、持久执行与云托管方案，区分会话、任务进度、工作环境及外部副作用的恢复边界 |
| [任务失败后如何恢复：检查点、重试与外部副作用](task-recovery-and-side-effects.md) | 用报告任务理解状态持久化、重放与重试、幂等键和人工审批的恢复边界 |

[返回首页](../README.md)
