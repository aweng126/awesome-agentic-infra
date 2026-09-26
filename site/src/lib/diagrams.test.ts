import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { parseHTML } from 'linkedom';

test('Mermaid diagrams in source notes parse with the installed diagram dependencies', async () => {
  // A DOM is required by Mermaid's text sanitizer, even for syntax-only parsing.
  const { window, document } = parseHTML('<!doctype html><html><head></head><body></body></html>');
  Object.assign(globalThis, { window, document });
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
  const files = (await readdir('../notes')).filter(file => file.endsWith('.md'));
  for (const file of files) {
    const markdown = await readFile(`../notes/${file}`, 'utf8');
    for (const match of markdown.matchAll(/```mermaid\n([\s\S]*?)```/g)) {
      const result = await mermaid.parse(match[1]);
      assert.ok(result && result.diagramType, `Invalid Mermaid diagram in ${file}`);
    }
  }
});
