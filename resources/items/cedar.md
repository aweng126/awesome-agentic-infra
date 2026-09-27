---
name: Cedar
summary: 授权策略语言与评估机制，使用主体、动作、资源和上下文表达 Agent 或用户的操作权限，并支持基于 schema 的策略验证。
type: project
topic: security-and-governance
aliases: ["Cedar Policy"]
keywords: ["授权", "策略语言", "权限", "Schema", "主体动作资源"]
role: policy-engine
delivery: library
url: https://docs.cedarpolicy.com/
anchor: resource-cedar
order: 1
links:
  - label: 文档
    url: https://docs.cedarpolicy.com/
  - label: 官网
    url: https://www.cedarpolicy.com/
  - label: 代码仓库
    url: https://github.com/cedar-policy/cedar
  - label: 授权流程
    url: https://docs.cedarpolicy.com/auth/authorization.html
maintainer: Cedar 项目维护者与社区
form: 开源授权策略语言与评估库
license: Apache-2.0
---

## 背景与目标

Cedar 将应用中的授权逻辑表达为独立策略，回答某个主体是否可以在特定上下文中对某个资源执行操作。业务代码在操作前调用评估引擎，根据结果决定是否继续。策略可以独立于应用代码维护，用于表达角色、属性和资源关系带来的细粒度权限。[官方介绍](https://docs.cedarpolicy.com/)

## 核心能力

- **权限表达**：用主体、动作、资源与条件描述允许或禁止的操作，支持基于角色和属性的授权模型。[项目概览](https://github.com/cedar-policy/cedar)
- **策略评估**：根据请求、策略和实体数据返回允许或拒绝结果，并提供参与决策的策略及错误诊断。[授权流程](https://docs.cedarpolicy.com/auth/authorization.html)
- **策略验证**：根据 Schema 检查实体类型、动作和属性使用是否一致，帮助在发布前发现策略问题。[验证说明](https://docs.cedarpolicy.com/policies/validation.html)

## 核心概念与工作方式

请求包含 Principal、Action、Resource、Context 四部分。Entity 数据补充主体与资源的属性及关系，Policy 描述授权规则。Cedar 默认拒绝没有匹配许可的请求；匹配的禁止策略优先于许可策略。应用需要提供相关实体数据，并在收到结果后执行相应控制。[请求与决策规则](https://docs.cedarpolicy.com/auth/authorization.html)

Schema 用于定义应用认可的类型和动作，主要服务于策略验证；执行授权请求时，引擎根据传入的策略与实体求值。这一区别有助于理解策略编写阶段与请求处理阶段各自需要哪些信息。[Schema 与验证](https://docs.cedarpolicy.com/policies/validation.html)

## 使用场景与接入方式

在 Agent 系统中，可以把调用方、工具操作和目标对象映射为 Cedar 的主体、动作和资源，由工具服务在执行前查询授权结果。这是将通用授权组件接入 Agent 的一种应用方式，身份识别与实际操作执行仍由应用承担。[应用接入模式](https://docs.cedarpolicy.com/)

项目提供 Rust 实现及命令行工具，可从定义实体模型、编写少量策略和测试授权请求开始。也有使用 Cedar 的托管授权服务；策略语言、开源评估库与托管服务是不同的交付层次。[代码与工具](https://github.com/cedar-policy/cedar) · [服务关系](https://docs.cedarpolicy.com/#services-that-use-cedar)
