# 在线站点

本目录使用 Astro 将仓库内容构建为静态网站。部署完成后的地址为：

**https://blog.kingwen.cn/awesome-agentic-infra/**

项目站点继承账号个人站点的自定义域名 `blog.kingwen.cn`，原地址 `https://aweng126.github.io/awesome-agentic-infra/` 会跳转到上述地址。这是 [GitHub Pages 的域名继承规则](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#using-a-custom-domain-across-multiple-repositories)。本仓库的 **Custom domain** 保持为空即可，路径前缀仍为 `/awesome-agentic-infra/`。

站点在构建时读取根目录的 `resources/`、`notes/`、`CHANGELOG.md` 和 `CONTRIBUTING.md`。日常整理资源或修改导览时，直接编辑这些 Markdown 文件即可，GitHub 文档和网页共用一份内容。

## 本地开发

使用 Node.js 24 LTS 和随附的 npm；CI 也使用 Node.js 24。Astro 当前要求 Node.js 至少为 22.12，且不支持奇数版本，详见 [Astro 安装要求](https://docs.astro.build/en/install-and-setup/#prerequisites)。

从仓库根目录运行：

```sh
cd site
npm ci
npm run dev
```

访问终端显示的地址，默认是 `http://localhost:4321/awesome-agentic-infra/`。修改仓库内容后若页面未自动刷新，重启开发服务即可。

提交前验证：

```sh
npm run check
npm test
npm run build
npm run preview
```

前三个命令分别执行 Astro / TypeScript 检查、内容处理测试和静态构建。最后一个命令用于查看 `dist/` 中的构建结果，访问地址同样保留 `/awesome-agentic-infra/` 前缀。构建目录和依赖目录由本地或 CI 生成，不需要提交。

## 更新内容

| 修改目标 | 编辑位置 |
| --- | --- |
| 资源元数据与项目介绍 | 根目录 `resources/items/*.md` |
| 主题范围与方案总览入口 | 根目录 `resources/<topic>.md` 的生成区域之外 |
| 领域导览与方案总览 | 根目录 `notes/*.md` |
| 常读博客、产品更新与研究入口 | 根目录 `SOURCES.md` |
| 内容与站点更新记录 | 根目录 `CHANGELOG.md` |
| 收录规则与贡献方式 | 根目录 `CONTRIBUTING.md` |
| 首页、布局与交互 | 本目录 `src/` |
| 站点域名、路径前缀与仓库地址 | 本目录 `site.config.json` |

部署到其他仓库或路径时，编辑 `site.config.json` 中的 `origin`、`base` 与 `repository`。Astro、Markdown 链接转换和构建检查共用这份配置；`title` 与 `description` 用于站点介绍。

Markdown 内继续使用仓库相对链接，站点构建负责转换对应的网页链接。资源条目格式与收录规则见 [贡献指南](../CONTRIBUTING.md)。

### 主题资源、资源库与导览

- 主题导航默认进入 `/topics/runtime-and-orchestration/`，直接展示“运行时与编排”的内容，通过侧栏切换其他主题。
- `/topics/<slug>/` 组合主题文件的范围说明、资源目录生成的清单及 `## 方案总览` 中的关联链接。项目清单按主要职责组织，保留原有资源定位锚点。
- `/resources/` 读取 `resources/items/*.md` 的名称、简介、别名、关键词和分类，提供搜索与筛选。有完整介绍的资源名称进入站内详情，来源链接保留直达官方资料的入口。
- `/resources/<slug>/` 展示同一资源文件中的完整正文、资料和官方链接；项目、规范等使用相应的介绍模板，没有正文的条目不生成详情页。
- `/notes/<slug>/` 展示领域导览或方案总览全文，正文来自根目录的 `notes/<slug>.md`。

主导航为首页、资源导览、主题导航、资源库、信息源和更新日志。`/notes/` 汇集领域导览和方案全景；主题导航复用具体主题页的侧栏与正文；`/resources/` 用于搜索和筛选具体资源；`/sources/` 直接展示常读网址和分组清单，名称直达外部网站。首页提供“按主题浏览”入口，并保留两篇导览与具体主题的快捷链接。移动端切换菜单显示当前主题；主题面包屑的栏目层级使用非链接文字，首页仍是返回链接。

`/topics/` 仅作为旧地址的兼容跳转，默认进入运行时主题，不收录到 sitemap；旧 `/topics/#related-infrastructure` 进入 `/topics/inference-and-model-serving/`。原有首页 `/#topics` 和 `/#related-infrastructure` 锚点继续可用。

资源详情页、资源库和全站搜索共用同一份资源数据，主题页不复制完整介绍或导览正文。现有 `/topics/<slug>/#resource-*` 定位链接继续有效，供日志、导览引用和全站搜索使用。

### 维护资源目录

资源文件使用 YAML frontmatter，名称、摘要、类型、主题、主来源、固定锚点和顺序是必填元数据。`aliases` 与 `keywords` 补充检索词，`role` 与 `delivery` 分别描述主要职责和交付方式，取值集中在 `src/lib/resource-taxonomy.ts`。`form` 保留面向读者的形态说明，不代替受控分类。资源详情可补充维护方、许可证、附来源与核验日期的状态，以及多种官方入口；格式与分类型正文要求见 [贡献指南](../CONTRIBUTING.md#entry-format)。

从 `site/` 目录运行：

```sh
npm run resources:sync
npm run resources:check
```

第一个命令更新主题 Markdown 的生成区域，使 GitHub 阅读入口与网页保持一致。第二个命令检测元数据、详情内容和索引漂移，`check` 与 `build` 也会执行该检查。开发时主题清单直接由资源目录生成，提交时仍需同步并提交 GitHub 索引。

主题的手写范围说明与方案总览保留在生成区域之外。正文链接可使用相对路径，例如从其他资源介绍引用 `langgraph.md`；站点将其转换为详情地址，尚未提供正文的资源链接指向原主题条目。

### 维护信息源

根目录 `SOURCES.md` 是信息源页面和全站搜索的共同来源。二级标题按“常读、工程博客、产品与版本更新、研究与论文、社区精选”分组，每条使用 `- [名称](https://...) — 关注理由`。常读入口置于首组，同一网址只维护一次。名称直接打开原站，不生成站内介绍页，也不计入资源库数量。

新增入口时实际核对发布方与页面内容，优先选择持续更新的官方栏目；具体项目或文章按资源目录规则收录。个人已读状态与访问记录不在该文件维护。构建会检查空分组、缺失描述和重复链接；全站搜索中的信息源带有外链标记，并在新窗口打开。

### 外部链接与事实复核

[资源巡检工作流](../.github/workflows/resource-audit.yml) 每周一 02:20 UTC 运行，也可在 Actions 中手动启动。它独立于站点发布，仅生成任务摘要与报告附件，不自动修改资源、创建 Issue 或发送消息。

从 `site/` 目录运行：

```sh
# 只核对资料日期、提取链接，不访问外部网站
npm run resources:audit -- --offline

# 抽查前三条去重后的链接
npm run resources:audit -- --limit 3

# 完整巡检，结果写入指定位置
npm run resources:audit -- --out-dir /tmp/agentic-infra-audit
```

默认报告为 `reports/resource-audit/report.md` 和 `report.json`。脚本从资源 frontmatter、简介和正文收集 HTTP(S) 链接，去除片段后按 URL 去重，保留引用位置；跟随并记录重定向，限制并发、超时和重试，拒绝本地或私有目标。`--concurrency` 可设为 1–8，`--timeout-ms` 为 1000–30000；完整巡检采用 15 分钟时间预算，未请求的链接明确标记为未巡检。

404、410 归为疑似失效；403、429、DNS 错误、超时和其他异常进入待复核，不自动当作死链。先检查是否存在官方新入口或访问限制，再修改内容。配置错误会使命令失败；在线巡检若没有任何选中链接被确认可达，也会在保存报告后以退出码 2 结束。访问结果、跳转链和事实待办全部保留在报告中，不能将部分抽样或离线报告解读为全部链接通过。

`reviewedAt` 是人工核对整条介绍的日期，`status.checked` 只标记对应状态声明的核验日期。默认超过 90 天进入复核清单，可用 `--max-age-days` 调整周期。缺少 `reviewedAt` 的既有内容列为待建档，只有实际核验后才填写；巡检不会把链接可达当作事实更新，也不会回填日期。

### 维护更新日志

导航中的“更新日志”指向 `/changelog/`，部署后完整路径为 `/awesome-agentic-infra/changelog/`。页面从根目录 [CHANGELOG.md](../CHANGELOG.md) 读取每日要点；首页展示最近三个日期，每天取前两条作为摘要，RSS 每天提供一项更新。

发布内容时同步更新日志：以 `## YYYY-MM-DD` 记录按北京时间确定的实际发布日，日期倒序、同一天一组，标题下直接使用平铺的无序列表。重要资源和内容更新放在前面，每条说明读者能看到的变化，并附相关内容的直达链接。同一天继续发布时直接补充或合并当天列表，同一功能的反复调整只保留最终结果。保留真实发布日期；资源移除时说明原因，并提供仍可访问的相关内容。

资源条目通过主题 Markdown 中的固定锚点定位，格式为 `- <a id="resource-langgraph"></a> [LangGraph](https://...) — 简介`，锚点与名称链接放在同一列表项中。标识以 `resource-` 开头，仅使用小写 ASCII 字母、数字与连字符，在本主题内唯一，更名时保留。根目录日志可写 `[LangGraph](resources/runtime-and-orchestration.md#resource-langgraph)`；从本说明链接同一条目则使用 [LangGraph](../resources/runtime-and-orchestration.md#resource-langgraph)。导览更新可直接链接到对应章节。构建验证会检查生成页面中的内部链接与锚点。

依赖由 `package-lock.json` 固定。Mermaid 的 `lodash-es` 传递依赖通过 `overrides` 固定到 4.18.1，以避开旧版本的已知安全问题；升级 Mermaid 时应同时检查上游依赖并重新运行验证。

## 首次发布

仓库已提供 [GitHub Actions 工作流](../.github/workflows/pages.yml)。首次使用需要在 GitHub 中启用 Pages 的 Actions 发布源：

1. 打开仓库的 [Settings → Pages](https://github.com/aweng126/awesome-agentic-infra/settings/pages)。
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。仓库已有工作流，无需再添加 GitHub 建议的模板。
3. 将站点代码推送到 `main`；如果代码已推送，在 **Actions → Build and deploy website → Run workflow** 中选择 `main` 手动运行一次。
4. 等待 **Check and build** 与 **Publish to GitHub Pages** 成功，在部署任务或 Pages 设置中打开站点地址。

当前站点已完成首次部署。保持 **Source → GitHub Actions**；若 **Enforce HTTPS** 可选，建议勾选以统一使用 HTTPS 访问。后续无需重新配置发布模板。

配置发布源需要仓库管理员、维护者或相应的 Pages 管理权限；GitHub 的默认工作流令牌不能代替这次启用操作。参见 [配置 Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) 和 [configure-pages 的启用参数](https://github.com/actions/configure-pages/blob/main/action.yml)。

后续每次推送 `main` 都会先验证再自动发布。Pull Request 运行相同的验证与构建，但不发布；只有独立的部署任务拥有 Pages 写权限。验证失败时不会更新线上站点，可在 Actions 的对应任务日志中查看原因。

站点只提供静态文件，无需自建服务器、数据库、额外后台账号或部署密钥。公开仓库可以使用 GitHub Free 提供的 Pages 托管，详见 [GitHub Pages 可用范围](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#who-can-use-this-feature)。
