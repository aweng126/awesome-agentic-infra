import assert from 'node:assert/strict';
import test from 'node:test';
import { auditResource, checkAuditLink, deduplicateLinks, isPublicAddress, pendingFactReviews, renderAuditMarkdown,
  summarizeAudit, unsafeUrlReason, type AuditLink, type AuditRequest } from './resource-audit';

test('audit deduplicates metadata and Markdown sources while keeping each reference', () => {
  const resource = auditResource(`---
name: Example
summary: 参考 [说明](https://docs.example.org/guide#summary)。
url: https://docs.example.org/guide
links:
  - label: 文档
    url: https://docs.example.org/guide#top
status:
  label: Preview
  source: https://example.org/releases
  checked: '2026-09-01'
reviewedAt: '2026-09-10'
---
正文 [来源][official]；[本地](other.md)。
[official]: https://docs.example.org/guide#body
`, 'example');
  const links = deduplicateLinks([resource]);
  assert.equal(links.length, 2);
  assert.equal(links[0].url, 'https://docs.example.org/guide');
  assert.deepEqual(new Set(links[0].references.map(item => item.source)), new Set(['url', 'links[0].url', 'summary', 'body']));
  assert.equal(links[1].references[0].source, 'status.source');
  assert.throws(() => auditResource('---\nname: x\nsummary: x\nurl: https://example.org\nreviewedAt: 2026-02-30\n---\n', 'bad'), /real YYYY-MM-DD/);
  assert.throws(() => auditResource('---\nname: x\nname: y\n---\n', 'bad'), /Map keys must be unique/);
});

test('audit refuses local/private/reserved hosts including encoded IPv4 and IPv6', () => {
  for (const url of ['http://localhost/', 'http://localhost./', 'https://test.local/', 'http://metadata.google.internal/',
    'http://2130706433/', 'http://0x7f000001/', 'http://127.1/', 'http://[::1]/', 'http://[::ffff:127.0.0.1]/',
    'http://10.0.0.1/', 'http://169.254.169.254/', 'http://100.64.0.1/', 'http://[fc00::1]/',
    'http://[2002:a00:1::]/', 'http://[2001:db8::1]/', 'http://username:password@example.org/', 'file:///etc/passwd']) {
    assert.ok(unsafeUrlReason(url), `${url} must be blocked`);
  }
  for (const ip of ['1.1.1.1', '8.8.8.8', '2606:4700:4700::1111', '2001:4860:4860::8888']) assert.ok(isPublicAddress(ip), ip);
  assert.equal(unsafeUrlReason('https://docs.langchain.com/oss/'), undefined);
});

const link: AuditLink = { url: 'https://docs.example.org/start', references: [{ slug: 'example', name: 'Example', source: 'url' }] };
const noWait = async () => {};

test('audit records redirects, blocks unsafe destinations, and treats restricted responses as reviewable', async () => {
  const requested: string[] = [];
  const redirect: AuditRequest = async url => { requested.push(url.href); return url.pathname === '/start'
    ? { statusCode: 301, location: '/guide' } : { statusCode: 200 }; };
  const moved = await checkAuditLink(link, { request: redirect, sleep: noWait });
  assert.equal(moved.state, 'redirected');
  assert.equal(moved.finalUrl, 'https://docs.example.org/guide');
  assert.equal(moved.redirects[0].statusCode, 301);
  assert.equal(requested.length, 2);
  let calls = 0;
  const blocked = await checkAuditLink(link, { request: async () => { calls++; return { statusCode: 302, location: 'http://127.0.0.1/admin' }; } });
  assert.equal(blocked.state, 'blocked');
  assert.equal(calls, 1, 'the private redirect target is never requested');
  for (const statusCode of [401, 403, 429, 503]) {
    const result = await checkAuditLink(link, { request: async () => ({ statusCode }), sleep: noWait });
    assert.equal(result.state, 'needs-review');
    assert.equal(result.attempts, statusCode === 503 ? 2 : 1);
  }
  assert.equal((await checkAuditLink(link, { request: async () => ({ statusCode: 404 }) })).state, 'suspect-broken');
  const offline = await checkAuditLink(link, { request: async () => { throw new Error('timeout'); }, sleep: noWait });
  assert.equal(offline.state, 'needs-review');
  assert.equal(offline.attempts, 2);
  assert.match(offline.reason, /timeout/);
});

test('fact review separates missing baseline and stale status; reports never count unchecked links as healthy', () => {
  const facts = pendingFactReviews([
    { slug: 'old', name: 'Old', reviewedAt: '2026-06-01', statusChecked: '2026-09-20', links: [] },
    { slug: 'new', name: 'New', statusChecked: '2026-01-01', links: [] },
  ], '2026-09-27', 90);
  assert.deepEqual(facts.map(item => [item.slug, item.field, item.state]), [
    ['old', 'reviewedAt', 'stale'], ['new', 'reviewedAt', 'missing'], ['new', 'status.checked', 'stale'],
  ]);
  assert.throws(() => pendingFactReviews([{ slug: 'future', name: 'Future', reviewedAt: '2026-09-28', links: [] }], '2026-09-27', 90), /future/);
  const report = { generatedAt: '2026-09-27T00:00:00.000Z', mode: 'offline' as const, maxAgeDays: 90, resources: 2, selected: 1, facts,
    links: [{ ...link, state: 'not-checked' as const, reason: 'offline', attempts: 0, redirects: [] }] };
  assert.equal(summarizeAudit(report).ok, 0);
  assert.equal(summarizeAudit(report).requested, 0);
  assert.equal(summarizeAudit(report)['not-checked'], 1);
  const markdown = renderAuditMarkdown(report);
  assert.match(markdown, /不能据此判断外部链接是否健康/);
  assert.match(markdown, /不回填推测日期/);
});
