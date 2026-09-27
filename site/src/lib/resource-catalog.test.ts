import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';
import { assertResourceIndexes, loadResourceCatalog, parseResourceDocument, profileSections, syncTopicMarkdown, validateResourceCatalog } from './resource-catalog';
import { topics } from './topic-metadata';

const repositoryRoot = fileURLToPath(new URL('../../../', import.meta.url));
const metadata = {
  name: 'Example', summary: '运行平台，提供任务执行。参考 [文档](https://example.org/docs)。',
  type: 'project', topic: 'runtime-and-orchestration', url: 'https://example.org/',
  anchor: 'resource-example', order: 1,
};
function document(overrides = {}, body = '') {
  return `---\n${stringify({ ...metadata, ...overrides })}---\n${body}`;
}

test('catalog metadata rejects malformed classification, URLs, duplicate identifiers and injected sections', () => {
  const entry = parseResourceDocument(document(), 'example');
  assert.equal(entry.hasProfile, false);
  for (const type of ['unknown', '__proto__', 'constructor', 'toString']) {
    assert.throws(() => parseResourceDocument(document({ type }), 'example'), /unknown resource type/);
  }
  assert.throws(() => parseResourceDocument(document({ topic: 'not-a-topic' }), 'example'), /unknown topic/);
  for (const url of ['javascript:alert(1)', '//example.org', 'https://user:password@example.org', 'https://example.org/\npath']) {
    assert.throws(() => parseResourceDocument(document({ url }), 'example'), /HTTP\(S\) URL/);
  }
  assert.throws(() => parseResourceDocument(document({ summary: '[x](javascript:alert%281%29)' }), 'example'), /HTTP\(S\) URL/);
  assert.throws(() => parseResourceDocument(document({ links: [{ label: '文档', url: 'data:text/html,test' }] }), 'example'), /HTTP\(S\) URL/);
  assert.throws(() => parseResourceDocument(document({ name: 'Project\n## Injected' }), 'example'), /single line/);
  assert.throws(() => parseResourceDocument(document({ summary: 'Intro\n\n## Injected' }), 'example'), /inline paragraph/);
  assert.throws(() => parseResourceDocument(document({ status: { label: 'Preview', source: 'https://example.org/', checked: '2026-02-30' } }), 'example'), /check date/);
  assert.throws(() => validateResourceCatalog([entry, entry]), /Duplicate resource slug/);
  assert.throws(() => validateResourceCatalog([entry, { ...entry, slug: 'second' }]), /Duplicate resource anchor/);
  assert.throws(() => validateResourceCatalog([entry, { ...entry, slug: 'second', anchor: 'resource-second' }]), /Duplicate resource order/);
});

test('only substantive complete introductions become detail pages', () => {
  assert.equal(parseResourceDocument(document(), 'example').hasProfile, false);
  assert.throws(() => parseResourceDocument(document({}, '# Example\n\nComing soon'), 'example'), /profile needs/);
  const body = profileSections.map(heading => `## ${heading}\n\n具体介绍内容。`).join('\n\n');
  const complete = parseResourceDocument(document({}, body), 'example');
  assert.equal(complete.hasProfile, true);
  assert.throws(() => parseResourceDocument(document({}, body.replace('## 核心能力\n\n具体介绍内容。', '## 核心能力')), 'example'), /is empty/);
});

test('index synchronization preserves authored scope and overviews, stable anchors, ordering and official URLs', () => {
  const intro = '# Topic\n\n主题范围。\n\n';
  const tail = '\n\n## 方案总览\n\n- [总览](../notes/overview.md)\n\n[返回首页](../README.md)\n';
  const original = `${intro}## Projects & Platforms\n\n- Old entry${tail}`;
  const entry = parseResourceDocument(document(), 'example');
  const generated = syncTopicMarkdown(original, [entry]);
  assert.ok(generated.startsWith(intro));
  assert.ok(generated.endsWith(tail));
  assert.match(generated, /id="resource-example"/u);
  assert.ok(generated.includes('[Example](https://example.org/)'));
  assert.ok(generated.includes('[文档](https://example.org/docs)'));
  assert.doesNotMatch(generated, /项目介绍/u);
  assert.equal(syncTopicMarkdown(generated, [entry]), generated);
  const profile = { ...entry, hasProfile: true };
  assert.ok(syncTopicMarkdown(generated, [profile]).includes('[项目介绍](items/example.md)'));
  assert.throws(() => syncTopicMarkdown(generated.replace('<!-- resources:end -->', ''), [entry]), /marker pair/);
});

test('published topic indexes match catalog data and drift fails verification', async () => {
  const catalog = await loadResourceCatalog(repositoryRoot);
  await assertResourceIndexes(repositoryRoot, catalog);
  const directory = await mkdtemp(`${tmpdir()}/agent-infra-index-`);
  try {
    await mkdir(`${directory}/resources`);
    for (const topic of topics) {
      await writeFile(`${directory}/resources/${topic.slug}.md`, await readFile(`${repositoryRoot}/resources/${topic.slug}.md`, 'utf8'));
    }
    const source = `${directory}/resources/${topics[0].slug}.md`;
    await writeFile(source, (await readFile(source, 'utf8')).replace('<!-- resources:start -->', '<!-- resources:start -->\nEdited generated content'));
    await assert.rejects(assertResourceIndexes(directory, catalog), /out of sync/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
