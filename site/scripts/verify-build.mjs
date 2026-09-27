import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { parse as parseYaml } from 'yaml';
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
    const links = [...(navigation?.querySelectorAll('a[href]') ?? [])];
    assert.deepEqual(links.map((link) => [link.textContent.trim(), link.getAttribute('href')]), [
      ['首页', base], ['主题导航', `${base}#topics`], ['资源库', `${base}resources/`], ['更新日志', `${base}changelog/`],
    ], `${relative}: ${selector} exposes the four resource-focused navigation entries`);
    const changelogLink = links
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
const catalog = await Promise.all((await readdir('../resources/items')).filter((file) => file.endsWith('.md')).map(async (file) => {
  const markdown = await readFile(`../resources/items/${file}`, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/u.exec(markdown);
  assert.ok(match, `${file}: resource metadata must have frontmatter`);
  return { ...parseYaml(match[1]), slug: file.slice(0, -3), hasProfile: Boolean(match[2].trim()) };
}));
const profiles = catalog.filter((resource) => resource.hasProfile);
const detailPages = pages.filter((file) => path.relative(root, file).startsWith(`resources${path.sep}`) && file !== path.join(root, 'resources/index.html'));
assert.equal(detailPages.length, profiles.length, 'Only resources with substantive introductions have detail pages');
assert.equal(pages.filter(p=>path.relative(root,p).startsWith(`topics${path.sep}`)).length,resourceFiles.length,'Each source topic needs a page');
const servingSlug = 'inference-and-model-serving';
const servingPath = `${base}topics/${servingSlug}/`;
const primarySlugs = resourceFiles.map((filename) => filename.slice(0, -3)).filter((slug) => slug !== servingSlug);
assert.equal(primarySlugs.length, 7, 'The collection has seven primary Agent infrastructure topics');
assert.ok(resourceFiles.includes(`${servingSlug}.md`), 'Serving remains a source topic with its existing address');
const primaryTopicPaths = new Set(primarySlugs.map((slug) => `${base}topics/${slug}/`));
const home = documents.get(path.join(root, 'index.html'));
assert.ok(home, 'Homepage must be generated');
const homeTopicCards = [...home.querySelectorAll('.topic-card')];
assert.equal(homeTopicCards.length, 7, 'Homepage highlights seven primary topic cards');
assert.deepEqual(new Set(homeTopicCards.map((card) => card.getAttribute('href'))), primaryTopicPaths, 'Homepage primary cards include all Agent topics and exclude Serving');
const primaryTopicStat = [...home.querySelectorAll('.stats-strip > div')]
  .find((stat) => [...stat.querySelectorAll('span')].some((label) => label.textContent.trim() === '主要主题'));
assert.equal(primaryTopicStat?.querySelector('strong')?.textContent.trim(), '07', 'Homepage reports 07 primary topics');
assert.ok(!home.querySelector('.reading-section'), 'Homepage omits the previous research reading column');
assert.ok(!home.querySelector('.stats-strip').textContent.includes('研究笔记'), 'Homepage statistics describe resources');
assert.ok(home.querySelector(`#related-infrastructure a[href="${servingPath}"]`), 'Homepage retains a Serving entry under related infrastructure');

for (const [groupName, expectedSlugs] of [['primary', primarySlugs], ['related', [servingSlug]]]) {
  const group = explorer.querySelector(`.topic-filter-group[data-topic-group="${groupName}"]`);
  assert.ok(group, `Explorer exposes a ${groupName} filter group`);
  const buttons = [...group.querySelectorAll('button[data-topic]')];
  assert.equal(buttons.length, expectedSlugs.length, `Explorer ${groupName} filter group contains each topic once`);
  assert.deepEqual(new Set(buttons.map((button) => button.getAttribute('data-topic'))), new Set(expectedSlugs), `Explorer ${groupName} filters retain their original topic identifiers`);
}
assert.equal(explorer.querySelectorAll('.topic-filters button[data-topic]').length, resourceFiles.length + 1, 'Explorer keeps every topic and the combined all-topics filter');

function assertTopicNavigation(sidebar, label) {
  assert.ok(sidebar, `${label}: topic sidebar must exist`);
  assert.equal(sidebar.querySelectorAll('.topic-nav-group').length, 2, `${label}: navigation separates primary and related infrastructure`);
  for (const [groupName, expectedPaths] of [['primary', primaryTopicPaths], ['related', new Set([servingPath])]]) {
    const group = sidebar.querySelector(`.topic-nav-group[data-topic-group="${groupName}"]`);
    assert.equal(group?.localName, 'div', `${label}: ${groupName} navigation uses a grouped container`);
    const links = [...group.querySelectorAll(`a[href^="${base}topics/"]`)];
    assert.equal(links.length, expectedPaths.size, `${label}: ${groupName} navigation includes each topic once`);
    assert.deepEqual(new Set(links.map((link) => link.getAttribute('href'))), expectedPaths, `${label}: ${groupName} navigation reaches the original topic pages`);
  }
}
for (const [file, document] of documents) {
  const sidebar = document.querySelector('.reader-sidebar');
  if (sidebar) assertTopicNavigation(sidebar, path.relative(root, file));
}
let sourceCount = 0;
for (const filename of resourceFiles) {
  const topicSlug = filename.slice(0, -3);
  const topic = documents.get(path.join(root, 'topics', topicSlug, 'index.html'));
  assert.ok(topic, `${filename}: topic page must be generated`);
  assertTopicNavigation(topic.querySelector('.topic-sidebar'), filename);
  const currentTopicLinks = [...topic.querySelectorAll('.topic-sidebar a[aria-current="page"]')];
  assert.equal(currentTopicLinks.length, 1, `${filename}: navigation marks only the current topic`);
  assert.equal(currentTopicLinks[0]?.getAttribute('href'), `${base}topics/${topicSlug}/`, `${filename}: the current topic remains active in its group`);
  const tree = parser.parse(await readFile(`../resources/${filename}`, 'utf8'));
  const anchors = new Set();
  const overviewLinks = new Set();
  let inResourceSection = false;
  let inOverviewSection = false;
  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth <= 2) {
      inResourceSection = resourceSections.has(textContent(node));
      inOverviewSection = textContent(node) === '方案总览';
    }
    if (inOverviewSection && node.type === 'list') {
      visit(node, 'link', (link) => {
        const notePath = path.posix.normalize(path.posix.join('resources', link.url.split(/[?#]/u)[0]));
        overviewLinks.add(`${base}${notePath.replace(/\.md$/u, '/')}`);
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
  const renderedOverviewLinks = new Set([...topic.querySelectorAll('.solution-overviews h3 a')].map((link) => link.getAttribute('href')));
  assert.deepEqual(renderedOverviewLinks, overviewLinks, `${filename}: solution overviews must match the Markdown source`);
  assert.equal(Boolean(topic.getElementById('solution-overviews')), overviewLinks.size > 0, `${filename}: omit empty overview sections`);
  if (overviewLinks.size) {
    const sections = [...topic.querySelectorAll('.topic-section')];
    assert.ok(sections.indexOf(topic.querySelector('.reference-section')) < sections.indexOf(topic.querySelector('.overview-section')), `${filename}: resources appear before supplementary overviews`);
  }
  assert.equal(explorer.querySelector(`.topic-filters button[data-topic="${topicSlug}"] [data-topic-count]`)?.textContent, String(anchors.size), `${filename}: the initial topic count must match its resources and be available to the filter script`);
}
assert.equal(sourceCount, catalog.length, 'Generated topic indexes and the single resource catalog have the same count');
assert.equal(explorer.querySelectorAll('.resource-card').length,sourceCount,'Every source resource must appear in the explorer');
const searchItems = JSON.parse(home.getElementById('search-data').textContent);
for (const resource of catalog) {
  const card = explorer.getElementById(`${resource.topic}-${resource.anchor}`);
  assert.ok(card, `${resource.slug}: catalog record has a resource card`);
  const matches = searchItems.filter((item) => item.title === resource.name);
  assert.equal(matches.length, 1, `${resource.slug}: search includes one resource result`);
  const expectedPath = resource.hasProfile ? `${base}resources/${resource.slug}/` : `${base}topics/${resource.topic}/#${resource.anchor}`;
  assert.equal(matches[0].url, expectedPath, `${resource.slug}: search uses the detail page or existing topic anchor`);
  if (!resource.hasProfile) {
    assert.ok(!documents.has(path.join(root, 'resources', resource.slug, 'index.html')), `${resource.slug}: metadata-only entries do not create empty detail pages`);
    continue;
  }
  assert.equal(card.querySelector('h2 a')?.getAttribute('href'), expectedPath, `${resource.slug}: resource title opens its introduction`);
  const topic = documents.get(path.join(root, 'topics', resource.topic, 'index.html'));
  assert.ok(topic.getElementById(resource.anchor).querySelector(`a[href="${expectedPath}"]`), `${resource.slug}: existing topic entry links to its introduction`);
  const page = documents.get(path.join(root, 'resources', resource.slug, 'index.html'));
  assert.ok(page?.querySelector('main.resource-profile'), `${resource.slug}: detail page uses the resource layout`);
  assert.equal(page.querySelector('h1').textContent.trim(), resource.name, `${resource.slug}: detail title uses catalog data`);
  for (const heading of ['背景与目标', '核心能力', '核心概念与工作方式', '使用场景与接入方式']) {
    assert.ok([...page.querySelectorAll('.profile-body h2')].some((node) => node.textContent.trim() === heading), `${resource.slug}: detail includes ${heading}`);
  }
  for (const link of resource.links ?? []) {
    assert.ok([...page.querySelectorAll('.official-links a')].some((node) => node.getAttribute('href') === link.url), `${resource.slug}: official links expose ${link.label}`);
  }
  if (resource.status) {
    assert.ok(page.querySelector('.profile-facts').textContent.includes(resource.status.label), `${resource.slug}: detail displays its sourced status`);
    assert.ok(page.querySelector(`.profile-facts a[href="${resource.status.source}"]`), `${resource.slug}: status links to evidence`);
    assert.equal(page.querySelector('.profile-facts time')?.getAttribute('datetime'), resource.status.checked, `${resource.slug}: status date stays beside the field`);
  }
  assert.equal(page.querySelector(`.desktop-nav a[href="${base}resources/"]`)?.getAttribute('aria-current'), 'page', `${resource.slug}: resource navigation is active`);
}
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
const expectedChanges = entries.flatMap((entry) => [...entry.querySelectorAll('.changelog-body > ul > li, .changelog-body > ol > li')]
  .map((item) => ({ date: entry.querySelector('time').getAttribute('datetime'), text: item.textContent.replace(/\s+/gu, ' ').trim(), links: [...item.querySelectorAll('a[href]')].map((link) => link.getAttribute('href')) }))).slice(0, 3);
const recentChanges = [...home.querySelectorAll('.recent-update')].map((item) => ({
  date: item.querySelector('time').getAttribute('datetime'),
  text: item.querySelector('.recent-update-body').textContent.replace(/\s+/gu, ' ').trim(),
  links: [...item.querySelectorAll('.recent-update-body a[href]')].map((link) => link.getAttribute('href')),
}));
assert.deepEqual(recentChanges, expectedChanges, 'Homepage recent updates preserve the latest three changelog entries, dates, and links');
const guideIndex = documents.get(path.join(root, 'notes/index.html'));
assert.ok(guideIndex?.querySelector('h1')?.textContent.includes('资源导览'), 'The existing notes address is a secondary resource-guide index');
for (const [file, document] of documents) {
  if (path.relative(root, file).startsWith(`notes${path.sep}`)) {
    assert.ok(!document.querySelector('.reading-navigation'), `${file}: resource guides do not have an automatic article sequence`);
    assert.ok(!document.querySelector('main').textContent.includes('研究笔记'), `${file}: guides use the resource-focused positioning`);
  }
}
assert.deepEqual(problems,[],'Generated site link/semantic checks');
console.log(`Verified ${pages.length} HTML pages, ${checkedLinks} internal links/assets, ${sourceCount} resource anchors/cards, ${profiles.length} resource introductions, and ${dates.length} changelog date groups.`);
