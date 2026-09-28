import assert from 'node:assert/strict';
import test from 'node:test';
import { parseSources, rewriteMarkdownUrl, sitePath } from './content';

const source = `# 信息源

持续阅读 **Agent 基础设施** 的官方资料与社区整理。

## 常读

- [**工程团队**](https://example.org/blog?tag=agents#latest) — 关注执行系统的工程实践。
- [版本更新](https://example.org/releases) — 跟踪工具与接口变化。

## 研究与论文

- [论文目录](http://papers.example.org/) — 查找系统研究及开源实现。
`;

test('source directories preserve editorial order, readable text, and GitHub-compatible group anchors', () => {
  const directory = parseSources(source);
  assert.equal(directory.title, '信息源');
  assert.equal(directory.description, '持续阅读 Agent 基础设施 的官方资料与社区整理。');
  assert.deepEqual(directory.groups.map(group => [group.id, group.title, group.entries.length]), [
    ['常读', '常读', 2],
    ['研究与论文', '研究与论文', 1],
  ]);
  assert.deepEqual(directory.groups[0].entries[0], {
    name: '工程团队',
    url: 'https://example.org/blog?tag=agents#latest',
    description: '关注执行系统的工程实践。',
  });
  assert.equal(directory.groups[1].entries[0].url, 'http://papers.example.org/');
});

test('source directories reject incomplete structure and entries instead of silently dropping content', () => {
  const invalid = [
    source.replace('# 信息源', ''),
    source.replace('持续阅读 **Agent 基础设施** 的官方资料与社区整理。', ''),
    '# 信息源\n\n介绍。',
    `${source}\n## 工程博客\n`,
    `${source}\n## 常读\n- [另一个](https://other.example.org/) — 描述。`,
    source.replace('## 常读', '## 未知分组'),
    source.replace('[**工程团队**]', '[]'),
    source.replace(' — 关注执行系统的工程实践。', ''),
    source.replace('关注执行系统的工程实践。', '   '),
    source.replace('关注执行系统的工程实践。', '[另一入口](https://other.example.org/)'),
    source.replace('- [版本更新]', '  - [版本更新]'),
  ];
  for (const markdown of invalid) assert.throws(() => parseSources(markdown), /SOURCES\.md/u);
});

test('source URLs must be valid HTTP(S) and unique across groups after URL normalization', () => {
  for (const url of ['javascript:alert%281%29', 'javascript&#58;alert%281%29', 'data:text/html,bad', 'file:///tmp/source', '//example.org/blog', '/blog', 'https://']) {
    assert.throws(() => parseSources(source.replace('https://example.org/blog?tag=agents#latest', url)), /HTTP\(S\)/u);
  }
  assert.throws(() => parseSources(source.replace('http://papers.example.org/', 'https://EXAMPLE.org:443/releases')), /duplicate URL/u);
});

test('source directory Markdown routes preserve queries and Chinese section fragments', () => {
  assert.equal(rewriteMarkdownUrl('SOURCES.md', 'README.md'), sitePath('sources/'));
  assert.equal(rewriteMarkdownUrl('../SOURCES.md#常读', 'notes/overview.md'), sitePath('sources/#常读'));
  assert.equal(rewriteMarkdownUrl('/SOURCES.md?from=guide#产品与版本更新', 'notes/overview.md'), sitePath('sources/?from=guide#产品与版本更新'));
});
