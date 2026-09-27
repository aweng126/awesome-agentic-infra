import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesQuery, matchesResource, searchRank } from './search';
import { getResources } from './content';

test('search supports Chinese, case-insensitive text, full-width and multiple terms', () => {
  assert.equal(matchesQuery('MCP 工具协议 Model Context Protocol', 'ｍｃｐ 工具'), true);
  assert.equal(matchesQuery('长期记忆与上下文', '记忆'), true);
  assert.equal(matchesQuery('MCP 工具协议', 'mcp sandbox'), false);
  assert.equal(matchesQuery('anything', '   '), true);
});

test('exact names rank before mentions and catalog aliases expose Chinese discovery terms', async () => {
  const names = ['E2B integration', 'Using E2B', 'E2B', 'Sandbox'];
  assert.deepEqual(names.sort((a, b) => searchRank(b, 'ｅ２ｂ') - searchRank(a, 'ｅ２ｂ')), ['E2B', 'E2B integration', 'Using E2B', 'Sandbox']);
  const resources = await getResources();
  for (const [slug, term] of [['volcengine-agentkit-runtime', '字节'], ['e2b', '沙盒'], ['langgraph', '检查点']]) {
    const resource = resources.find(item => item.slug === slug)!;
    assert.ok(matchesQuery([resource.name, ...resource.aliases, ...resource.keywords].join(' '), term), `${slug}: ${term}`);
  }
  const resource = { search: 'Sandbox 沙箱', topic: 'sandbox', type: 'project', role: 'sandbox-service', delivery: 'managed' };
  const filters = { query: '沙箱', topic: 'sandbox', type: 'project', role: 'sandbox-service', delivery: 'managed' };
  assert.equal(matchesResource(resource, filters), true);
  assert.equal(matchesResource(resource, { ...filters, delivery: 'self-hosted' }), false);
  assert.equal(matchesResource(resource, { ...filters, role: 'isolation-runtime' }), false);
});
test('topic, type, and text constraints intersect instead of overriding each other', () => {
  const resource = {search:'MemGPT memory 记忆',topic:'memory-and-context',type:'paper'};
  assert.equal(matchesResource(resource,{query:'记忆',topic:'memory-and-context',type:'paper'}),true);
  assert.equal(matchesResource(resource,{query:'记忆',topic:'all',type:'project'}),false);
  assert.equal(matchesResource(resource,{query:'',topic:'sandbox-and-execution',type:'paper'}),false);
  assert.equal(matchesResource(resource,{query:'',topic:'all',type:'all'}),true);
});
