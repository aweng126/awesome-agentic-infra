---
name: Graphiti
summary: 构建和查询随时间变化的上下文图，支持事实有效时间、来源追溯、增量更新和混合检索，为 Agent 组织持续积累的事实、关系与历史交互。
type: project
topic: memory-and-context
url: https://github.com/getzep/graphiti
anchor: resource-graphiti
order: 1
links:
  - label: 代码仓库
    url: https://github.com/getzep/graphiti
  - label: 文档
    url: https://help.getzep.com/graphiti/getting-started/welcome
  - label: 快速开始
    url: https://help.getzep.com/graphiti/getting-started/quick-start
maintainer: Zep 团队与社区
form: 开源时序知识图谱框架
license: Apache-2.0
---

## 背景与目标

Graphiti 面向事实会随交互不断变化的 Agent 应用：用户偏好、组织关系和业务信息不仅需要被保存，还需要区分它们在什么时间成立。项目将对话与业务数据组织成可查询的上下文图，支持随着新信息到达逐步更新，而无需每次重新构建全部图谱。[项目介绍](https://github.com/getzep/graphiti)

## 核心能力

- **增量建图**：接收文本或 JSON 形式的信息片段，提取实体与关系，并与已有图谱整合。[快速开始](https://help.getzep.com/graphiti/getting-started/quick-start)
- **时间与来源**：为事实保留有效时间及来源片段，区分当前事实与已被后续信息替代的历史关系。[概念概览](https://help.getzep.com/graphiti/getting-started/overview)
- **混合检索**：组合向量相似度、关键词与图结构，提供节点、关系的检索策略以及结果重排。[检索说明](https://help.getzep.com/graphiti/working-with-data/searching)

## 核心概念与工作方式

Episode 是原始信息的入口，可以是一段对话、一条事件或结构化记录。Entity 表示人物、产品等对象，关系边记录对象之间的事实；图中的事实可以关联回产生它的 Episode。开发者也可以定义领域实体和关系类型，约束图中使用的概念。[概念概览](https://help.getzep.com/graphiti/getting-started/overview)

写入阶段借助模型处理新信息，检索阶段返回与问题相关的关系或节点，再由应用将它们组织到 Agent 上下文中。Graphiti 是可自行集成的框架；Zep 是围绕上下文管理提供的产品，两者的数据库、用户管理和运维边界并不相同。[框架与 Zep 的区别](https://github.com/getzep/graphiti#graphiti-and-zep)

## 使用场景与接入方式

需要持续积累客户交互、查询实体关系或回看事实变化的应用，可以用 Graphiti 组织记忆。接入时安装 `graphiti-core`，准备受支持的图数据库与模型服务，初始化索引后写入 Episode，再通过搜索接口读取相关事实。官方入门展示了写入、检索与按图距离重排的完整过程。[快速开始](https://help.getzep.com/graphiti/getting-started/quick-start)
