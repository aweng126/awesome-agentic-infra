import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

test('topic counts track type and query filters through URL initialization and explorer interactions', async (context) => {
  const { document, window } = parseHTML(`<!doctype html><html><body>
    <main data-resource-explorer>
      <input id="resource-search" />
      <aside>
        <button data-topic="all">全部主题 <span data-topic-count>5</span></button>
        <button data-topic="tools">工具 <span data-topic-count>2</span></button>
        <button data-topic="runtime">运行时 <span data-topic-count>3</span></button>
      </aside>
      <nav>
        <button data-type="all">全部类型</button>
        <button data-type="project">项目与平台</button>
        <button data-type="paper">论文</button>
        <button data-type="spec">协议规范</button>
        <button data-type="article">文章与文档</button>
      </nav>
      <p id="resource-count">共 5 条资源</p>
      <button id="reset-filters" hidden>清除筛选</button>
      <article id="tool-agent" class="resource-card" data-topic="tools" data-type="project" data-search="Agent 工具"></article>
      <article id="tool-spec" class="resource-card" data-topic="tools" data-type="spec" data-search="工具 协议"></article>
      <article id="runtime-agent" class="resource-card" data-topic="runtime" data-type="project" data-search="Agent 运行时"></article>
      <article id="runtime-paper" class="resource-card" data-topic="runtime" data-type="paper" data-search="Agent 调度论文"></article>
      <article id="runtime-sandbox" class="resource-card" data-topic="runtime" data-type="project" data-search="隔离 沙箱"></article>
      <section id="no-results" hidden><button data-reset-all>查看全部资源</button></section>
    </main>
  </body></html>`);
  let currentUrl = new URL('https://example.test/awesome-agentic-infra/resources/?topic=tools&type=article&q=agent&ref=notes');
  const globals = ['document', 'location', 'history'] as const;
  const originalDescriptors = globals.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const);
  context.after(() => {
    for (const [key, descriptor] of originalDescriptors) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  });
  Object.assign(globalThis, {
    document,
    location: currentUrl,
    history: {
      replaceState(_data: unknown, _unused: string, url: string | URL) {
        currentUrl = new URL(url, currentUrl);
        Object.assign(globalThis, { location: currentUrl });
      },
    },
  });
  const input = document.querySelector<HTMLInputElement>('#resource-search')!;
  const click = (selector: string) => document.querySelector<HTMLButtonElement>(selector)!.click();
  const search = (value: string) => {
    input.value = value;
    input.dispatchEvent(new window.Event('input'));
  };
  const assertState = (counts: Record<string, number>, visibleIds: string[], selectedTopic: string, selectedType: string) => {
    for (const [topic, count] of Object.entries(counts)) {
      assert.equal(document.querySelector(`button[data-topic="${topic}"] [data-topic-count]`)!.textContent, String(count), `${topic} count`);
    }
    assert.deepEqual(
      [...document.querySelectorAll<HTMLElement>('.resource-card')].filter(card => !card.hidden).map(card => card.id),
      visibleIds,
    );
    assert.equal(counts[selectedTopic], visibleIds.length, 'selected topic count equals the visible result count');
    assert.equal(counts.all, counts.tools + counts.runtime, 'all topics sums the filtered topic counts');
    assert.equal(document.querySelector('#resource-count')!.textContent, `共 ${visibleIds.length} 条资源`);
    assert.equal(document.querySelector<HTMLElement>('#no-results')!.hidden, visibleIds.length !== 0);
    assert.equal(document.querySelector('button[data-topic][aria-pressed="true"]')!.getAttribute('data-topic'), selectedTopic);
    assert.equal(document.querySelector('button[data-type][aria-pressed="true"]')!.getAttribute('data-type'), selectedType);
    assert.equal(currentUrl.searchParams.get('topic'), selectedTopic === 'all' ? null : selectedTopic);
    assert.equal(currentUrl.searchParams.get('type'), selectedType === 'all' ? null : selectedType);
    assert.equal(currentUrl.searchParams.get('q'), input.value || null);
    assert.equal(currentUrl.searchParams.get('ref'), 'notes', 'unrelated URL parameters are preserved');
    assert.equal(document.querySelector<HTMLButtonElement>('#reset-filters')!.hidden, !input.value && selectedTopic === 'all' && selectedType === 'all');
  };

  await import('../scripts/explorer');
  assert.equal(input.value, 'agent');
  assertState({ all: 0, tools: 0, runtime: 0 }, [], 'tools', 'article');

  click('button[data-type="project"]');
  assertState({ all: 2, tools: 1, runtime: 1 }, ['tool-agent'], 'tools', 'project');
  click('button[data-topic="runtime"]');
  assertState({ all: 2, tools: 1, runtime: 1 }, ['runtime-agent'], 'runtime', 'project');

  search('隔离 沙箱');
  assertState({ all: 1, tools: 0, runtime: 1 }, ['runtime-sandbox'], 'runtime', 'project');
  click('button[data-topic="all"]');
  assertState({ all: 1, tools: 0, runtime: 1 }, ['runtime-sandbox'], 'all', 'project');
  search('不存在');
  assertState({ all: 0, tools: 0, runtime: 0 }, [], 'all', 'project');

  const allIds = ['tool-agent', 'tool-spec', 'runtime-agent', 'runtime-paper', 'runtime-sandbox'];
  click('#reset-filters');
  assertState({ all: 5, tools: 2, runtime: 3 }, allIds, 'all', 'all');
  click('button[data-type="paper"]');
  click('button[data-topic="tools"]');
  assertState({ all: 1, tools: 0, runtime: 1 }, [], 'tools', 'paper');
  click('[data-reset-all]');
  assertState({ all: 5, tools: 2, runtime: 3 }, allIds, 'all', 'all');
});
