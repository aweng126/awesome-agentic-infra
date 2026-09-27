import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReadingContext } from './reading-context';
import { absoluteFeedHtml, xmlEscape } from './syndication';

test('resource return context retains filters and scroll position only for local library routes', () => {
  const origin = 'https://example.org';
  const library = '/infra/resources/';
  const context = { from: `${library}?q=沙箱&type=project#result`, target: `${library}e2b/`, scrollY: 500 };
  assert.deepEqual(parseReadingContext(context, origin, library), { ...context, from: `${library}?q=%E6%B2%99%E7%AE%B1&type=project#result` });
  for (const value of [null, 'bad', { ...context, from: 'https://other.org/infra/resources/' }, { ...context, target: '//other.org/infra/resources/e2b/' }, { ...context, from: '/infra/' }, { ...context, target: library }, { ...context, target: '/infra/resources-old/e2b/' }, { ...context, scrollY: -1 }, { ...context, scrollY: Infinity }]) {
    assert.equal(parseReadingContext(value, origin, library), null);
  }
});

test('feed content preserves query separators and makes local and fragment links absolute', () => {
  const html = '<p><a href="/infra/resources/?q=a&amp;type=spec">工具</a><a href="#section">范围</a><img src="/infra/image.png"></p>';
  const converted = absoluteFeedHtml(html, 'https://example.org/infra/changelog/#batch');
  assert.ok(converted.includes('href="https://example.org/infra/resources/?q=a&amp;type=spec"'));
  assert.ok(converted.includes('href="https://example.org/infra/changelog/#section"'));
  assert.ok(converted.includes('src="https://example.org/infra/image.png"'));
  assert.equal(xmlEscape('<&>"\''), '&lt;&amp;&gt;&quot;&apos;');
});
