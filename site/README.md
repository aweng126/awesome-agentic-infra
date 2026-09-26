# 在线站点

本目录使用 Astro 将仓库内容构建为静态网站。部署完成后的地址为：

**https://blog.kingwen.cn/awesome-agentic-infra/**

项目站点继承账号个人站点的自定义域名 `blog.kingwen.cn`，原地址 `https://aweng126.github.io/awesome-agentic-infra/` 会跳转到上述地址。这是 [GitHub Pages 的域名继承规则](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#using-a-custom-domain-across-multiple-repositories)。本仓库的 **Custom domain** 保持为空即可，路径前缀仍为 `/awesome-agentic-infra/`。

站点在构建时读取根目录的 `resources/`、`notes/`、`CHANGELOG.md` 和 `CONTRIBUTING.md`。日常整理资源或修改笔记时，直接编辑这些 Markdown 文件即可，GitHub 文档和网页共用一份内容。

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
| 主题资源、论文与文章 | 根目录 `resources/*.md` |
| 专题分析与笔记 | 根目录 `notes/*.md` |
| 内容与站点更新记录 | 根目录 `CHANGELOG.md` |
| 收录规则与贡献方式 | 根目录 `CONTRIBUTING.md` |
| 首页、布局与交互 | 本目录 `src/` |
| 站点域名与路径前缀 | 本目录 `astro.config.mjs` |

部署到其他仓库或路径时，同时更新 `src/lib/content.ts` 中的 `basePath` 与 `repoUrl`，以及构建检查脚本 `scripts/verify-build.mjs` 中的 `base`。它们共同保证 Markdown 链接、资源路径与 GitHub 编辑入口一致。

Markdown 内继续使用仓库相对链接，站点构建负责转换对应的网页链接。资源条目格式与收录规则见 [贡献指南](../CONTRIBUTING.md)。

### 主题导读、资源库与笔记

- `/topics/<slug>/` 从对应的 `resources/<slug>.md` 生成导读、已关联的学习笔记与参考资料。`## 学习笔记` 中的本站 Markdown 链接决定笔记关联与顺序，其他资源分类继续生成固定锚点。
- `/resources/` 从同一批主题文件抽取资源，展示紧凑资料列表并提供搜索、主题与类型筛选。来源链接打开原始资料，“主题导读”链接进入对应主题页。
- `/notes/<slug>/` 展示笔记全文。新增笔记后更新 `notes/README.md`，并在相关主题中添加学习笔记链接。

主题页不复制笔记正文。现有 `/topics/<slug>/#resource-*` 定位链接继续有效，供日志、笔记引用和全站搜索使用；主题页的“在资源库筛选本主题”链接使用 `/resources/?topic=<slug>`。

### 维护更新日志

导航中的“更新日志”指向 `/changelog/`，部署后完整路径为 `/awesome-agentic-infra/changelog/`。页面从根目录 [CHANGELOG.md](../CHANGELOG.md) 读取内容，无需另行编辑网页。

每批发布内容时，同时更新日志：以 `## YYYY-MM-DD` 记录本站实际发布日，日期倒序、同一天一组；在日期下按需要使用 `### 新增内容`、`### 内容更新` 和 `### 站点改进`，用列表说明具体变化并提供直达链接。省略空类别，资源移除时说明原因并提供仍可访问的相关说明。

资源条目通过主题 Markdown 中的固定锚点定位，格式为 `- <a id="resource-langgraph"></a> [LangGraph](https://...) — 简介`，锚点与名称链接放在同一列表项中。标识以 `resource-` 开头，仅使用小写 ASCII 字母、数字与连字符，在本主题内唯一，更名时保留。根目录日志可写 `[LangGraph](resources/runtime-and-orchestration.md#resource-langgraph)`；从本说明链接同一条目则使用 [LangGraph](../resources/runtime-and-orchestration.md#resource-langgraph)。笔记更新可直接链接到对应章节。构建验证会检查生成页面中的内部链接与锚点。

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
