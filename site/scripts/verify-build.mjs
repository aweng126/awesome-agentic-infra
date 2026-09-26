import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

const root = path.resolve('dist');
const base = '/awesome-agentic-infra/';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
}
const files = await walk(root);
const pages = files.filter(file=>file.endsWith('.html'));
let checkedLinks = 0;
const documents = new Map();
for (const page of pages) documents.set(page,parseHTML(await readFile(page,'utf8')).document);
const problems=[];
for(const [file,document] of documents){
  const relative=path.relative(root,file);
  if(document.querySelectorAll('h1').length!==1)problems.push(`${relative}: expected one H1`);
  if(!document.querySelector('main#main-content'))problems.push(`${relative}: missing main target`);
  const ids = new Set();
  for (const element of document.querySelectorAll('[id]')) {
    const id = element.getAttribute('id');
    if (ids.has(id)) problems.push(`${relative}: duplicate ID: ${id}`);
    ids.add(id);
  }
  for (const selector of ['.desktop-nav', '.mobile-nav']) {
    const navigation = document.querySelector(selector);
    const changelogLink = [...(navigation?.querySelectorAll('a[href]') ?? [])]
      .find((link) => link.getAttribute('href') === `${base}changelog/`);
    if (!changelogLink) problems.push(`${relative}: missing changelog link in ${selector}`);
    if (relative === path.join('changelog', 'index.html') && changelogLink?.getAttribute('aria-current') !== 'page') {
      problems.push(`${relative}: changelog must be active in ${selector}`);
    }
  }
  const pagePath=base+relative.replace(/index\.html$/,'');
  for(const element of document.querySelectorAll('a[href],link[href],script[src],img[src]')){
    const raw=element.getAttribute('href')||element.getAttribute('src');
    if(!raw||/^(https?:|mailto:|data:)/.test(raw))continue;
    const url=new URL(raw,`https://aweng126.github.io${pagePath}`);
    if(!url.pathname.startsWith(base)){problems.push(`${relative}: URL outside project base: ${raw}`);continue;}
    let target=path.join(root,decodeURIComponent(url.pathname.slice(base.length)));
    try {if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);}
    catch{problems.push(`${relative}: missing local target: ${raw}`);continue;}
    if(url.hash&&target.endsWith('.html')){
      const doc=documents.get(target);
      if(!doc?.getElementById(decodeURIComponent(url.hash.slice(1))))problems.push(`${relative}: missing anchor: ${raw}`);
    }
    checkedLinks++;
  }
}
const explorer=documents.get(path.join(root,'resources/index.html'));
assert.ok(explorer,'Resource explorer must be generated');
const parser = unified().use(remarkParse).use(remarkGfm);
const textContent = (node) => node.value ?? (node.children ?? []).map(textContent).join('');
const resourceSections = new Set([
  'Projects & Platforms', 'Papers', 'Specifications', 'Articles & Documentation', 'Articles & Talks',
]);
const resourceFiles=(await readdir('../resources')).filter((file) => file.endsWith('.md'));
assert.equal(pages.filter(p=>path.relative(root,p).startsWith(`topics${path.sep}`)).length,resourceFiles.length,'Each source topic needs a page');
let sourceCount = 0;
for (const filename of resourceFiles) {
  const topicSlug = filename.slice(0, -3);
  const topic = documents.get(path.join(root, 'topics', topicSlug, 'index.html'));
  assert.ok(topic, `${filename}: topic page must be generated`);
  const tree = parser.parse(await readFile(`../resources/${filename}`, 'utf8'));
  const anchors = new Set();
  const learningLinks = new Set();
  let inResourceSection = false;
  let inLearningSection = false;
  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth <= 2) {
      inResourceSection = resourceSections.has(textContent(node));
      inLearningSection = textContent(node) === '学习笔记';
    }
    if (inLearningSection) {
      visit(node, 'link', (link) => {
        const notePath = path.posix.normalize(path.posix.join('resources', link.url.split(/[?#]/u)[0]));
        learningLinks.add(`${base}${notePath.replace(/\.md$/u, '/')}`);
      });
    }
    if (node.type !== 'list' || !inResourceSection) continue;
    // Only a top-level item's own first paragraph is a resource. Related
    // topics, nested lists and implementation links are not extra entries.
    for (const item of node.children) {
      const paragraph = item.children.find((child) => child.type === 'paragraph');
      if (!paragraph) continue;
      let primaryLink;
      visit(paragraph, 'link', (link) => { primaryLink ??= link; });
      if (!primaryLink || !/^https?:\/\//iu.test(primaryLink.url)) continue;
      sourceCount++;
      const rawAnchor = paragraph.children.slice(0, 2).filter((child) => child.type === 'html').map((child) => child.value).join('');
      const anchor = rawAnchor.match(/^<a id="(resource-[a-z0-9-]+)"><\/a>$/u)?.[1];
      assert.ok(anchor, `${filename}: ${textContent(primaryLink)} needs a stable resource anchor`);
      assert.ok(!anchors.has(anchor), `${filename}: duplicate source resource anchor ${anchor}`);
      anchors.add(anchor);
      const target = topic.getElementById(anchor);
      assert.equal(target?.localName, 'li', `${filename}: #${anchor} must locate the resource list item`);
      assert.ok([...target.querySelectorAll('a[href]')].some((link) => link.getAttribute('href') === primaryLink.url), `${filename}: #${anchor} must contain its original source link`);
      const card = explorer.getElementById(`${topicSlug}-${anchor}`);
      assert.ok(card?.matches('article.resource-card'), `${filename}: ${anchor} must have a directly addressable resource card`);
      assert.equal(card.querySelector('.resource-source-link')?.getAttribute('href'), primaryLink.url, `${filename}: ${anchor} must expose its original source explicitly`);
      assert.equal(card.querySelector('.resource-topic-link')?.getAttribute('href'), `${base}topics/${topicSlug}/`, `${filename}: ${anchor} must distinguish its topic guide from the external source`);
    }
  }
  assert.equal(topic.querySelectorAll('li[id^="resource-"]').length, anchors.size, `${filename}: every rendered resource anchor must match the source`);
  assert.ok(topic.querySelector(`a[href="${base}resources/?topic=${topicSlug}"]`), `${filename}: topic must lead to its filtered resource index`);
  assert.ok(!topic.querySelector('.reading-navigation'), `${filename}: topic navigation must not imitate article pagination`);
  const renderedLearningLinks = new Set([...topic.querySelectorAll('.learning-notes h3 a')].map((link) => link.getAttribute('href')));
  assert.deepEqual(renderedLearningLinks, learningLinks, `${filename}: learning notes must match the Markdown source`);
  assert.equal(Boolean(topic.getElementById('learning-notes')), learningLinks.size > 0, `${filename}: omit empty learning sections`);
  assert.equal(explorer.querySelector(`.topic-filters button[data-topic="${topicSlug}"] [data-topic-count]`)?.textContent, String(anchors.size), `${filename}: the initial topic count must match its resources and be available to the filter script`);
}
assert.equal(explorer.querySelectorAll('.resource-card').length,sourceCount,'Every source resource must appear in the explorer');
assert.equal(explorer.querySelector('.topic-filters button[data-topic="all"] [data-topic-count]')?.textContent, String(sourceCount), 'The initial all-topics count must match the full explorer');

const changelog = documents.get(path.join(root, 'changelog', 'index.html'));
assert.ok(changelog, 'Changelog page must be generated');
const changelogSource = parser.parse(await readFile('../CHANGELOG.md', 'utf8'));
const dates = changelogSource.children
  .filter((node) => node.type === 'heading' && node.depth === 2)
  .map(textContent);
assert.ok(dates.length > 0, 'Changelog must include a dated update');
assert.ok(dates.every((date) => /^\d{4}-\d{2}-\d{2}$/u.test(date)), 'Changelog H2 headings must be release dates');
assert.equal(new Set(dates).size, dates.length, 'Changelog dates must be unique');
const expectedDates = [...dates].sort().reverse();
const entries = [...changelog.querySelectorAll('main article[id^="update-"]')];
assert.deepEqual(entries.map((entry) => entry.id), expectedDates.map((date) => `update-${date}`), 'Every changelog date must render once, newest first');
for (const [index, entry] of entries.entries()) {
  assert.equal(entry.querySelector('time')?.getAttribute('datetime'), expectedDates[index], `Changelog ${expectedDates[index]} must expose its date semantically`);
  assert.ok(entry.contains(changelog.getElementById(expectedDates[index])), 'Markdown date links must locate the same published update');
}
assert.deepEqual(problems,[],'Generated site link/semantic checks');
console.log(`Verified ${pages.length} HTML pages, ${checkedLinks} internal links/assets, ${sourceCount} resource anchors/cards, and ${dates.length} changelog date groups.`);
