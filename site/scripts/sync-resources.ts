import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { assertResourceIndexes, loadResourceCatalog, syncTopicMarkdown } from '../src/lib/resource-catalog';
import { topics } from '../src/lib/topic-metadata';

const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
const check = process.argv.includes('--check');
const catalog = await loadResourceCatalog(repositoryRoot);
if (check) {
  await assertResourceIndexes(repositoryRoot, catalog);
} else {
  for (const topic of topics) {
    const path = `${repositoryRoot}/resources/${topic.slug}.md`;
    const source = await readFile(path, 'utf8');
    const updated = syncTopicMarkdown(source, catalog.filter(item => item.topic === topic.slug));
    if (source !== updated) await writeFile(path, updated);
  }
}
console.log(`${check ? 'Verified' : 'Synchronized'} ${catalog.length} resources and ${catalog.filter(item => item.hasProfile).length} profiles across ${topics.length} topic indexes.`);
