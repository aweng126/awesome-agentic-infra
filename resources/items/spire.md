---
name: SPIRE
summary: SPIFFE 的工作负载身份实现，通过节点与工作负载证明、SVID 签发和验证，为 Agent 服务及其工具服务提供可验证身份。
type: project
topic: security-and-governance
aliases: ["SPIFFE Runtime Environment"]
keywords: ["工作负载身份", "SPIFFE", "SVID", "mTLS", "身份认证", "节点证明"]
role: workload-identity
delivery: self-hosted
url: https://spiffe.io/docs/latest/spire-about/
anchor: resource-spire
order: 4
links:
  - label: 文档
    url: https://spiffe.io/docs/latest/spire-about/
  - label: 官网
    url: https://spiffe.io/
  - label: 代码仓库
    url: https://github.com/spiffe/spire
  - label: 入门教程
    url: https://spiffe.io/docs/latest/try/
maintainer: SPIFFE / SPIRE 项目维护者与社区
form: 开源工作负载身份基础设施
license: Apache-2.0
status:
  label: CNCF 毕业项目
  source: https://github.com/spiffe/spire
  checked: 2026-09-27
---

## 背景与目标

SPIRE 为分布式系统中的软件工作负载提供可验证身份。它实现 SPIFFE 的相关接口，通过确认节点与运行进程的属性，向符合条件的工作负载签发身份证明，使服务能够在不同运行环境中识别彼此。[官方介绍](https://spiffe.io/docs/latest/spire-about/)

## 核心能力

- **节点与工作负载证明**：借助运行平台和操作系统信息验证身份条件，将实际运行的进程关联到预先登记的身份。[核心概念](https://spiffe.io/docs/latest/spire-about/spire-concepts/)
- **身份证明签发**：为工作负载提供 SVID，通过本地 Workload API 交付身份材料，支持 X.509 与 JWT 相关用法。[项目介绍](https://github.com/spiffe/spire)
- **服务互信**：支持基于身份建立 mTLS 连接，或使用 JWT 身份材料与其他服务集成。[集成范围](https://github.com/spiffe/spire)

## 核心概念与工作方式

SPIFFE ID 是身份标识，Trust Domain 表示身份管理的信任域，SVID 是证明该身份的材料。SPIRE Server 管理登记信息与签发，SPIRE Agent 部署在工作负载所在节点，验证调用方并提供本地接口。这里的 SPIRE Agent 是身份系统的节点组件，与使用模型执行任务的 AI Agent 是不同概念。[架构与组件](https://spiffe.io/docs/latest/spire-about/spire-concepts/)

管理员通过登记条目将身份与 Selector 条件关联起来。节点先完成证明，节点组件再根据进程属性识别工作负载；符合条件的进程可以获得对应 SVID。不同云平台、容器环境和主机系统可以通过相应插件提供证明依据。[身份签发流程](https://spiffe.io/docs/latest/spire-about/spire-concepts/)

## 使用场景与接入方式

在由多个服务组成的 Agent 平台中，可以把任务执行服务、工具服务等视为工作负载，为它们建立服务间身份。这是 SPIRE 通用能力在 Agent 系统中的应用：它负责身份与互信，业务层仍需决定已识别的调用方可以执行哪些操作。[能力范围](https://github.com/spiffe/spire)

接入时部署 Server 和各节点上的 Agent，配置证明插件，登记工作负载，再由应用或代理使用 Workload API 获取身份材料。官方提供本地和 Kubernetes 等入门路径，可先验证两个服务之间的身份获取与连接过程。[入门教程](https://spiffe.io/docs/latest/try/)
