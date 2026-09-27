import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';
import { parseChangelog, sitePath } from './content';

test('updates sort by publication date and retain direct links with unique section anchors', async () => {
  const entries = await parseChangelog(`# 更新日志
介绍。

## 2026-09-25
### 新增内容
- [LangGraph](resources/runtime-and-orchestration.md#resource-langgraph)：首次收录。

## 2026-09-26
### 新增内容
- [概览](notes/agentic-infra-overview.md)：新增分析。
  - [Runtime](resources/runtime-and-orchestration.md)：关联资料。
### 站点改进
- [更新日志](CHANGELOG.md)：查看变化。
`);
  assert.deepEqual(entries.map(entry => entry.date), ['2026-09-26', '2026-09-25']);
  assert.deepEqual(entries.map(entry => entry.changeCount), [2, 1]);
  assert.deepEqual(entries.map(entry => entry.changes.length), [2, 1], 'nested details belong to their top-level update');
  const updates = entries.flatMap(entry => entry.changes).map(html => parseHTML(`<main>${html}</main>`).document);
  assert.deepEqual(updates.map(document => document.querySelector('a')?.textContent), ['概览', '更新日志', 'LangGraph'], 'individual updates retain publication and source order');
  assert.ok(updates.every(document => document.querySelectorAll('main > ul > li').length === 1), 'each update renders independently as one list item');
  assert.deepEqual([...updates[0].querySelectorAll('a')].map(link => link.getAttribute('href')), [
    sitePath('notes/agentic-infra-overview/'),
    sitePath('topics/runtime-and-orchestration/'),
  ], 'standalone updates preserve nested detail links and rewrite them from CHANGELOG.md');
  assert.equal(updates[2].querySelector('a')?.getAttribute('href'), sitePath('topics/runtime-and-orchestration/#resource-langgraph'), 'standalone updates retain resource anchor links');
  const { document } = parseHTML(`<main>${entries.map(entry => entry.html).join('')}</main>`);
  const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length, 'repeated category headings across dates stay unique');
  assert.ok(ids.includes('update-2026-09-25-新增内容'));
  assert.ok(ids.includes('update-2026-09-26-新增内容'));
  const links = [...document.querySelectorAll('a')].map(element => element.getAttribute('href'));
  assert.ok(links.includes(sitePath('topics/runtime-and-orchestration/#resource-langgraph')));
  assert.ok(links.includes(sitePath('notes/agentic-infra-overview/')));
  assert.ok(links.includes(sitePath('changelog/')));
});

test('invalid, duplicate, or empty publication groups fail before deployment', async () => {
  for (const date of ['2026-02-30', '2026-13-01', '2026-9-26', 'Unreleased', '2026-09-26 更新']) {
    await assert.rejects(parseChangelog(`## ${date}\n### 新增内容\n- 测试\n`), /Invalid changelog date/);
  }
  await assert.rejects(parseChangelog('## 2026-09-26\n- 测试\n## 2026-09-26\n- 测试\n'), /Duplicate changelog date/);
  await assert.rejects(parseChangelog('## 2026-09-26\n### 新增内容\n'), /at least one change/);
  await assert.rejects(parseChangelog('# 更新日志\n介绍。\n'), /at least one dated update/);
});
