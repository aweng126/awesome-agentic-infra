import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesQuery, matchesResource } from './search';

test('search supports Chinese, case-insensitive text, full-width and multiple terms', () => {
  assert.equal(matchesQuery('MCP 工具协议 Model Context Protocol', 'ｍｃｐ 工具'), true);
  assert.equal(matchesQuery('长期记忆与上下文', '记忆'), true);
  assert.equal(matchesQuery('MCP 工具协议', 'mcp sandbox'), false);
  assert.equal(matchesQuery('anything', '   '), true);
});
test('topic, type, and text constraints intersect instead of overriding each other', () => {
  const resource = {search:'MemGPT memory 记忆',topic:'memory-and-context',type:'paper'};
  assert.equal(matchesResource(resource,{query:'记忆',topic:'memory-and-context',type:'paper'}),true);
  assert.equal(matchesResource(resource,{query:'记忆',topic:'all',type:'project'}),false);
  assert.equal(matchesResource(resource,{query:'',topic:'sandbox-and-execution',type:'paper'}),false);
  assert.equal(matchesResource(resource,{query:'',topic:'all',type:'all'}),true);
});
