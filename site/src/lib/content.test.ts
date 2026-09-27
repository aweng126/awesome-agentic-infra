import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  extractResources,
  getGuide,
  getNotes,
  getResources,
  getResourceProfiles,
  getTopics,
  getTopicSections,
  renderMarkdown,
  resourcePath,
  repoUrl,
  rewriteMarkdownUrl,
  sitePath,
  topics,
  type Note,
} from './content';

const repositoryRoot = fileURLToPath(new URL('../../../', import.meta.url));

test('topic sources produce nonempty, unique resources in metadata order', async () => {
  const loaded = await getTopics();
  const resources = await getResources();
  assert.equal(loaded.length, topics.length);
  assert.deepEqual(loaded.map((topic) => topic.slug), topics.map((topic) => topic.slug));
  assert.ok(resources.length > 0);
  assert.equal(new Set(resources.map((resource) => resource.id)).size, resources.length);
  assert.deepEqual(resources, loaded.flatMap((topic) => topic.entries));
  for (const topic of loaded) {
    assert.ok(topic.entries.length > 0);
    assert.equal(topic.sourcePath, `resources/${topic.slug}.md`);
    const source = await readFile(`${repositoryRoot}/${topic.sourcePath}`, 'utf8');
    for (const resource of topic.entries) {
      assert.ok(resource.name.length > 0);
      assert.ok(resource.description.length > 0);
      assert.ok(source.includes(resource.url), 'each primary URL must exist in its source document');
      assert.equal(resource.topicSlug, topic.slug);
      assert.equal(resource.topicTitle, topic.title);
      assert.equal(resource.topicZhTitle, topic.zhTitle);
      assert.ok(topic.html.includes(`id="${resource.anchor}"`), 'every resource has a direct target in its topic');
      assert.equal(resourcePath(resource), resource.hasProfile ? sitePath(`resources/${resource.slug}/`) : sitePath(`topics/${topic.slug}/#${resource.anchor}`));
    }
    assert.doesNotMatch(topic.html, /<h1(?:\s|>)/u);
    assert.doesNotMatch(topic.html, /返回首页/u);
    for (const resource of topic.entries) {
      assert.ok(topic.resourceHtml.includes(`id="${resource.anchor}"`), 'the reference section retains each published resource target');
    }
    assert.doesNotMatch(topic.resourceHtml, /<h2(?:\s|>)/u);
  }
});

test('topic introductions, linked solution overviews and resource sections share one Markdown source', async () => {
  const note: Note = {
    slug: 'runtime-options', title: 'Runtime 方案', description: '了解项目定位', html: '<p>开源框架与云平台</p>',
    headings: [], sourcePath: 'notes/runtime-options.md', readingMinutes: 3,
  };
  const markdown = `# 运行时
理解 **持久执行**。

## 方案总览
- [Runtime 方案](../notes/runtime-options.md) — 开源框架与云平台。

## Projects & Platforms
- <a id="resource-example"></a> [Example](https://example.org) — 执行系统。

[返回首页](../README.md)
`;
  const sections = await getTopicSections(markdown, 'resources/runtime-and-orchestration.md', [note]);
  assert.match(sections.introHtml, /<strong>持久执行<\/strong>/u);
  assert.doesNotMatch(sections.introHtml, /Runtime 方案|Example/u);
  assert.deepEqual(sections.learningNotes, [note]);
  assert.match(sections.resourceHtml, /<h3 id="projects--platforms">/u);
  assert.match(sections.resourceHtml, /<li id="resource-example">/u);
  assert.doesNotMatch(sections.resourceHtml, /方案总览|Runtime 方案|返回首页/u);
  assert.equal(extractResources(markdown, topics[0]).length, 1);
  const overviewLast = await getTopicSections(`# 运行时\n## Projects & Platforms\n- <a id="resource-example"></a> [Example](https://example.org)\n## 方案总览\n- [Runtime 方案](../notes/runtime-options.md)\n\n[返回首页](../README.md)`, 'resources/runtime-and-orchestration.md', [note]);
  assert.deepEqual(overviewLast.learningNotes, [note], 'return navigation after a final overview section is not a guide link');
  const withoutNotes = await getTopicSections(markdown.replace(/## 方案总览[\s\S]*?(?=## Projects)/u, ''), 'resources/runtime-and-orchestration.md', [note]);
  assert.deepEqual(withoutNotes.learningNotes, []);
  await assert.rejects(getTopicSections(markdown, 'resources/runtime-and-orchestration.md', []), /existing notes\/\*\.md guide/);
});

test('resource sections classify all four types without counting implementation or solution-overview links', () => {
  const resources = extractResources(`
# Test
## Projects & Platforms
- <a id="resource-project"></a> [Project](https://example.org/project) — A project.
## Papers
- <a id="resource-paper"></a> [Paper](https://example.org/paper)（2026，SOSP）— A **useful** result. 附 [实现](https://example.org/code)。
## Specifications
- <a id="resource-specification"></a> [Specification](https://example.org/specification) — A specification.
## Articles & Documentation
- <a id="resource-article"></a> [Article](https://example.org/article) — An article.
## 方案总览
- [相关方案](https://example.org/note) — not a resource.
`, topics[0]);
  assert.equal(resources.length, 4);
  assert.deepEqual(resources.map((resource) => resource.type), ['project', 'paper', 'spec', 'article']);
  assert.equal(resources[1].name, 'Paper');
  assert.equal(resources[1].url, 'https://example.org/paper');
  assert.equal(resources[1].description, '（2026，SOSP）— A useful result. 附 实现。');
});

test('Markdown routes respect the GitHub Pages base, source folder, query, and fragment', () => {
  assert.equal(sitePath(), '/awesome-agentic-infra/');
  assert.equal(sitePath('/notes/'), '/awesome-agentic-infra/notes/');
  assert.equal(rewriteMarkdownUrl('memory-and-context.md#papers', 'resources/runtime-and-orchestration.md'), sitePath('topics/memory-and-context/#papers'));
  assert.equal(rewriteMarkdownUrl('../resources/tools-and-protocols.md?mode=all#specifications', 'notes/overview.md'), sitePath('topics/tools-and-protocols/?mode=all#specifications'));
  assert.equal(rewriteMarkdownUrl('../README.md#scope', 'notes/overview.md'), sitePath('#scope'));
  assert.equal(rewriteMarkdownUrl('README.md', 'notes/overview.md'), sitePath('notes/'));
  assert.equal(rewriteMarkdownUrl('notes/agentic-infra-overview.md', 'CONTRIBUTING.md'), sitePath('notes/agentic-infra-overview/'));
  assert.equal(rewriteMarkdownUrl('../CONTRIBUTING.md#what-to-include', 'notes/overview.md'), sitePath('contributing/#what-to-include'));
  assert.equal(rewriteMarkdownUrl('../CHANGELOG.md', 'notes/overview.md'), sitePath('changelog/'));
  assert.equal(rewriteMarkdownUrl('resources/runtime-and-orchestration.md#resource-langgraph', 'CHANGELOG.md'), sitePath('topics/runtime-and-orchestration/#resource-langgraph'));
  assert.equal(rewriteMarkdownUrl('items/langgraph.md?source=index#核心能力', 'resources/runtime-and-orchestration.md'), sitePath('resources/langgraph/?source=index#核心能力'));
  assert.equal(rewriteMarkdownUrl('../resources/items/autogen.md?source=guide', 'notes/overview.md'), sitePath('resources/autogen/?source=guide'));
  assert.equal(rewriteMarkdownUrl('../resources/items/build-a-tool-using-agent.md?source=guide', 'notes/overview.md'), sitePath('topics/deployment-and-scheduling/?source=guide#resource-build-a-tool-using-agent'));
  assert.throws(() => rewriteMarkdownUrl('resources/items/missing-project.md', 'CHANGELOG.md'), /Unknown resource document/);
  assert.equal(rewriteMarkdownUrl('LICENSE', 'CONTRIBUTING.md'), `${repoUrl}/blob/main/LICENSE`);
  assert.equal(rewriteMarkdownUrl('../../outside.md', 'notes/overview.md'), null);
  for (const url of ['https://example.com/README.md#scope', '//example.com/a.md', 'mailto:hello@example.com', '#本地标题']) {
    assert.equal(rewriteMarkdownUrl(url, 'notes/overview.md'), url);
  }
});

test('profile routes contain full introductions while metadata-only resources keep their topic fallback', async () => {
  const resources = await getResources();
  const profiles = await getResourceProfiles();
  assert.equal(resources.length, 54);
  assert.deepEqual(profiles.map(profile => profile.slug).sort(), resources.filter(resource => resource.type === 'project').map(resource => resource.slug).sort(), 'every project and platform has a complete introduction');
  assert.equal(resources.filter(resource => resource.hasProfile).length, profiles.length);
  for (const profile of profiles) {
    assert.equal(profile.sourcePath, `resources/items/${profile.slug}.md`);
    assert.match(profile.html, /<h2 id="核心能力">/u);
    assert.equal(resourcePath(profile), sitePath(`resources/${profile.slug}/`));
    assert.ok(profile.links.length > 1);
  }
  for (const resource of resources.filter(resource => !resource.hasProfile)) {
    assert.equal(resourcePath(resource), sitePath(`topics/${resource.topicSlug}/#${resource.anchor}`));
  }
});

test('fixed resource anchors survive renamed entries and only promote safe empty markers', async () => {
  const source = '# Topic\n## Projects & Platforms\n- <a id="resource-stable"></a> [Original](https://example.org) — Useful.\n';
  const renamed = source.replace('Original', 'Renamed');
  const before = extractResources(source, topics[0])[0];
  const after = extractResources(renamed, topics[0])[0];
  assert.equal(after.id, before.id);
  assert.equal(resourcePath(after), resourcePath(before));
  const rendered = await renderMarkdown(renamed, 'resources/runtime-and-orchestration.md');
  assert.match(rendered.html, /<li id="resource-stable">/u);
  assert.doesNotMatch(rendered.html, /<a id=/u);
  assert.throws(() => extractResources(source.replace('id="resource-stable"', 'id="resource-stable" onclick="alert(1)"'), topics[0]), /fixed/);
  assert.throws(() => extractResources(source + '- <a id="resource-stable"></a> [Duplicate](https://example.org/second)\n', topics[0]), /Duplicate resource anchor/);
  assert.throws(() => extractResources(source.replace('<a id="resource-stable"></a> ', ''), topics[0]), /fixed/);
});

test('GFM tables, Chinese heading IDs, duplicate headings, and Mermaid survive rendering', async () => {
  const rendered = await renderMarkdown(`
# 页面标题

## 中文标题

| 主题 | 说明 |
| --- | --- |
| Agent | **任务执行** |

## 中文标题

\`\`\`mermaid
flowchart TD
  A[任务] --> B[运行时]
\`\`\`

[返回资源导览](README.md) · [返回首页](../README.md)

[返回笔记索引](README.md)
`, 'notes/example.md');
  assert.deepEqual(rendered.headings, [
    { depth: 2, id: '中文标题', text: '中文标题' },
    { depth: 2, id: '中文标题-1', text: '中文标题' },
  ]);
  assert.match(rendered.html, /<table>/u);
  assert.match(rendered.html, /<strong>任务执行<\/strong>/u);
  assert.match(rendered.html, /<code class="language-mermaid">/u);
  assert.match(rendered.html, /flowchart TD/u);
  for (const heading of rendered.headings) assert.ok(rendered.html.includes(`id="${heading.id}"`));
  assert.doesNotMatch(rendered.html, /<h1|返回首页|返回资源导览|返回笔记索引/u);
});

test('raw HTML cannot execute and dangerous URL schemes are removed', async () => {
  const rendered = await renderMarkdown(`
# Safety

<script>alert('raw')</script>

<img src=x onerror="alert('raw')">

[unsafe](javascript:alert%281%29)

[encoded](javascript&#58;alert%281%29)

[data](data:text/html;base64,PHNjcmlwdD4=)

![image](javascript:alert%281%29)

[safe](https://example.com/page.md)

\`\`\`html
<script>example only</script>
\`\`\`
`, 'notes/example.md');
  assert.doesNotMatch(rendered.html, /<script|onerror=|(?:href|src)="(?:javascript|data):/iu);
  assert.match(rendered.html, /href="https:\/\/example.com\/page.md"/u);
  assert.match(rendered.html, /&#x3C;script>example only&#x3C;\/script>/u);
  for (const url of ['javascript:alert(1)', 'java\nscript:alert(1)', 'data:text/html,bad', 'vbscript:msgbox(1)', 'file:///etc/passwd']) {
    assert.equal(rewriteMarkdownUrl(url, 'README.md'), null);
  }
});

test('notes and guide load repository sources with readable summaries and source paths', async () => {
  const notes = await getNotes();
  const guide = await getGuide();
  const sourceFiles = (await readdir(`${repositoryRoot}/notes`, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md')
    .map((entry) => `notes/${entry.name}`)
    .sort();
  assert.deepEqual(notes.map((note) => note.sourcePath).sort(), sourceFiles);
  for (const note of notes) {
    assert.equal(note.sourcePath, `notes/${note.slug}.md`);
    assert.ok(note.title.length > 0);
    assert.ok(note.description.length > 0);
    assert.ok(Number.isInteger(note.readingMinutes) && note.readingMinutes > 0);
    assert.doesNotMatch(note.html, /<h1(?:\s|>)/u);
    assert.doesNotMatch(note.html, /返回首页|返回资源导览|返回笔记索引/u);
    for (const heading of note.headings) {
      assert.ok(heading.depth >= 2 && heading.depth <= 6);
      assert.ok(note.html.includes(`id="${heading.id}"`));
    }
  }
  assert.equal(guide.slug, 'contributing');
  assert.equal(guide.title, '贡献指南');
  assert.equal(guide.sourcePath, 'CONTRIBUTING.md');
  assert.ok((await readFile(`${repositoryRoot}/${guide.sourcePath}`, 'utf8')).length > 0);
  assert.doesNotMatch(guide.html, /<h1(?:\s|>)/u);
});
