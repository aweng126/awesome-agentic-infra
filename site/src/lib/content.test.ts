import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  extractResources,
  getGuide,
  getNotes,
  getResources,
  getTopics,
  renderMarkdown,
  repoUrl,
  rewriteMarkdownUrl,
  sitePath,
  topics,
} from './content';

const repositoryRoot = fileURLToPath(new URL('../../../', import.meta.url));

function assertRecordedDate(date: string, source: string): void {
  assert.match(date, /^\d{4}-\d{2}-\d{2}$/u);
  assert.equal(new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10), date);
  assert.ok(source.includes(date), 'the update date must come from the source document');
}

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
    assertRecordedDate(topic.updated, source);
    for (const resource of topic.entries) {
      assert.ok(resource.name.length > 0);
      assert.ok(resource.description.length > 0);
      assert.ok(source.includes(resource.url), 'each primary URL must exist in its source document');
      assert.equal(resource.topicSlug, topic.slug);
      assert.equal(resource.topicTitle, topic.title);
      assert.equal(resource.topicZhTitle, topic.zhTitle);
    }
    assert.doesNotMatch(topic.html, /<h1(?:\s|>)/u);
    assert.doesNotMatch(topic.html, /返回首页/u);
  }
});

test('resource sections classify all four types without counting implementation or related links', () => {
  const resources = extractResources(`
# Test
## Projects & Platforms
- [Project](https://example.org/project) — A project.
## Papers
- [Paper](https://example.org/paper)（2026，SOSP）— A **useful** result. 附 [实现](https://example.org/code)。
## Specifications
- [Specification](https://example.org/specification) — A specification.
## Articles & Documentation
- [Article](https://example.org/article) — An article.
## Related Topics
- [Other topic](https://example.org/other) — not a resource.
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
  assert.equal(rewriteMarkdownUrl('../CONTRIBUTING.md#notes', 'notes/overview.md'), sitePath('contributing/#notes'));
  assert.equal(rewriteMarkdownUrl('LICENSE', 'CONTRIBUTING.md'), `${repoUrl}/blob/main/LICENSE`);
  assert.equal(rewriteMarkdownUrl('../../outside.md', 'notes/overview.md'), null);
  for (const url of ['https://example.com/README.md#scope', '//example.com/a.md', 'mailto:hello@example.com', '#本地标题']) {
    assert.equal(rewriteMarkdownUrl(url, 'notes/overview.md'), url);
  }
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

[返回笔记索引](README.md) · [返回首页](../README.md)
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
  assert.doesNotMatch(rendered.html, /<h1|返回首页|返回笔记索引/u);
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
    const source = await readFile(`${repositoryRoot}/${note.sourcePath}`, 'utf8');
    assert.equal(note.sourcePath, `notes/${note.slug}.md`);
    assert.ok(note.title.length > 0);
    assert.ok(note.description.length > 0);
    assert.doesNotMatch(note.description, /^(?:整理日期|最近整理)\s*[：:]/u);
    assert.ok(Number.isInteger(note.readingMinutes) && note.readingMinutes > 0);
    if (note.updated) assertRecordedDate(note.updated, source);
    assert.doesNotMatch(note.html, /<h1(?:\s|>)/u);
    assert.doesNotMatch(note.html, /返回首页|返回笔记索引/u);
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
