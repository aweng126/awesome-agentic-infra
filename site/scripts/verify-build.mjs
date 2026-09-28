import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { DOMParser, parseHTML } from 'linkedom';
import { inflateSync } from 'node:zlib';
import { runInNewContext } from 'node:vm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { parse as parseYaml } from 'yaml';
import { visit } from 'unist-util-visit';

const root = path.resolve('dist');
const siteConfig = JSON.parse(await readFile(new URL('../site.config.json', import.meta.url), 'utf8'));
const { base, origin } = siteConfig;
assert.ok(typeof base === 'string' && base.startsWith('/') && base.endsWith('/'), 'Configured base must begin and end with a slash');
assert.equal(new URL(origin).origin, origin, 'Configured origin must not include a path');
const absolute = (sitePath) => new URL(sitePath, origin).href;
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
}
const files = await walk(root);
const pages = files.filter(file=>file.endsWith('.html'));
const topicRedirectFile = path.join(root, 'topics/index.html');
const defaultTopicPath = `${base}topics/runtime-and-orchestration/`;
let checkedLinks = 0;
const documents = new Map();
for (const page of pages) documents.set(page,parseHTML(await readFile(page,'utf8')).document);
const problems=[];
async function verifyLocalUrl(raw, label) {
  const url = new URL(raw, origin);
  assert.equal(url.origin, origin, `${label}: local URL uses the configured origin`);
  assert.ok(url.pathname.startsWith(base), `${label}: local URL stays under the configured base`);
  let target = path.join(root, decodeURIComponent(url.pathname.slice(base.length)));
  try {
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    await stat(target);
  } catch {
    assert.fail(`${label}: missing local target: ${raw}`);
  }
  if (url.hash && target.endsWith('.html')) {
    assert.ok(documents.get(target)?.getElementById(decodeURIComponent(url.hash.slice(1))), `${label}: missing local anchor: ${raw}`);
  }
  checkedLinks++;
  return target;
}
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
  const pagePath=base+relative.replace(/index\.html$/,'');
  if (file !== topicRedirectFile) {
    for (const selector of ['.desktop-nav', '.mobile-nav']) {
      const navigation = document.querySelector(selector);
      const links = [...(navigation?.querySelectorAll('a[href]') ?? [])];
      assert.deepEqual(links.map((link) => [link.textContent.trim(), link.getAttribute('href')]), [
        ['首页', base], ['资源导览', `${base}notes/`], ['主题导航', defaultTopicPath], ['资源库', `${base}resources/`], ['更新日志', `${base}changelog/`],
      ], `${relative}: ${selector} exposes the five resource-focused navigation entries`);
      if (relative.startsWith(`notes${path.sep}`)) {
        assert.deepEqual(links.filter(link => link.getAttribute('aria-current') === 'page').map(link => link.getAttribute('href')), [`${base}notes/`], `${relative}: guides have their own active navigation entry in ${selector}`);
      }
      if (relative.startsWith(`topics${path.sep}`)) {
        assert.deepEqual(links.filter(link => link.getAttribute('aria-current') === 'page').map(link => link.getAttribute('href')), [defaultTopicPath], `${relative}: topic pages keep the topic navigation active in ${selector}`);
      }
      const changelogLink = links
        .find((link) => link.getAttribute('href') === `${base}changelog/`);
      if (!changelogLink) problems.push(`${relative}: missing changelog link in ${selector}`);
      if (relative === path.join('changelog', 'index.html') && changelogLink?.getAttribute('aria-current') !== 'page') {
        problems.push(`${relative}: changelog must be active in ${selector}`);
      }
    }
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    assert.ok(canonical, `${relative}: canonical URL is present`);
    if (relative !== '404.html') assert.equal(canonical, absolute(pagePath), `${relative}: canonical uses the configured page URL`);
    assert.equal(document.querySelector('meta[property="og:url"]')?.getAttribute('content'), canonical, `${relative}: Open Graph URL matches the canonical`);
    assert.equal(document.querySelector('meta[property="og:image"]')?.getAttribute('content'), absolute(`${base}social-card.png`), `${relative}: Open Graph uses the shared absolute PNG URL`);
    assert.equal(document.querySelector('meta[property="og:image:width"]')?.getAttribute('content'), '1200', `${relative}: sharing image width is declared`);
    assert.equal(document.querySelector('meta[property="og:image:height"]')?.getAttribute('content'), '630', `${relative}: sharing image height is declared`);
    assert.equal(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'), 'summary_large_image', `${relative}: sharing card uses the large image`);
    assert.equal(document.querySelector('link[rel="alternate"][type="application/rss+xml"]')?.getAttribute('href'), `${base}feed.xml`, `${relative}: RSS autodiscovery uses the project base`);
  }
  for(const element of document.querySelectorAll('a[href],link[href],script[src],img[src]')){
    const raw=element.getAttribute('href')||element.getAttribute('src');
    if(!raw||/^(https?:|mailto:|data:)/.test(raw))continue;
    const url=new URL(raw,absolute(pagePath));
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
  const bodyHeadings = parser.parse(match[2]).children.filter((node) => node.type === 'heading' && node.depth === 2).map(textContent);
  return { ...parseYaml(match[1]), slug: file.slice(0, -3), hasProfile: Boolean(match[2].trim()), bodyHeadings };
}));
const profiles = catalog.filter((resource) => resource.hasProfile);
const detailPages = pages.filter((file) => path.relative(root, file).startsWith(`resources${path.sep}`) && file !== path.join(root, 'resources/index.html'));
assert.equal(detailPages.length, profiles.length, 'Only resources with substantive introductions have detail pages');
assert.equal(pages.filter(p=>path.relative(root,p).startsWith(`topics${path.sep}`) && p !== path.join(root, 'topics/index.html')).length,resourceFiles.length,'Each source topic needs a detail page');
const servingSlug = 'inference-and-model-serving';
const servingPath = `${base}topics/${servingSlug}/`;
const primarySlugs = resourceFiles.map((filename) => filename.slice(0, -3)).filter((slug) => slug !== servingSlug);
assert.equal(primarySlugs.length, 7, 'The collection has seven primary Agent infrastructure topics');
assert.ok(resourceFiles.includes(`${servingSlug}.md`), 'Serving remains a source topic with its existing address');
const primaryTopicPaths = new Set(primarySlugs.map((slug) => `${base}topics/${slug}/`));
const topicRedirect = documents.get(topicRedirectFile);
assert.ok(topicRedirect, 'The previous topic index keeps a compatibility page');
assert.equal(topicRedirect.querySelector('meta[name="robots"]')?.getAttribute('content'), 'noindex, follow', 'The compatibility page is not indexed as duplicate content');
assert.equal(topicRedirect.querySelector('link[rel="canonical"]')?.getAttribute('href'), absolute(defaultTopicPath), 'The compatibility page points to the default topic');
assert.equal(topicRedirect.querySelectorAll('.topic-directory-card').length, 0, 'The intermediate topic-card index has been removed');
const redirectScript = topicRedirect.querySelector('#topic-redirect')?.textContent;
assert.ok(redirectScript, 'The compatibility page redirects readers to topic content');
const legacyTargets = new Map([
  ['', defaultTopicPath],
  ['#agent-core', defaultTopicPath],
  ['#cross-cutting', `${base}topics/deployment-and-scheduling/`],
  ['#related-infrastructure', servingPath],
]);
for (const [hash, target] of legacyTargets) {
  let destination;
  runInNewContext(redirectScript, { location: { hash, search: '', replace: url => { destination = url; } } }, { timeout: 1000 });
  assert.equal(destination, target, `Old topic entry ${hash || '/topics/'} reaches the matching content`);
  await verifyLocalUrl(target, 'Topic compatibility destination');
  if (hash) assert.equal(topicRedirect.querySelector(`${hash} a`)?.getAttribute('href'), target, 'Readers without JavaScript can follow the matching topic link');
}
let preservedDestination;
runInNewContext(redirectScript, { location: { hash: '#resource-langgraph', search: '?from=bookmark', replace: url => { preservedDestination = url; } } }, { timeout: 1000 });
assert.equal(preservedDestination, `${defaultTopicPath}?from=bookmark#resource-langgraph`, 'Compatibility navigation preserves query parameters and content anchors');
const home = documents.get(path.join(root, 'index.html'));
assert.ok(home, 'Homepage must be generated');
const homeTopicCards = [...home.querySelectorAll('.topic-card')];
assert.equal(homeTopicCards.length, 7, 'Homepage highlights seven primary topic cards');
assert.deepEqual(new Set(homeTopicCards.map((card) => card.getAttribute('href'))), primaryTopicPaths, 'Homepage primary cards include all Agent topics and exclude Serving');
assert.equal(home.querySelector('[data-stat="topics"] strong')?.textContent.trim(), String(primarySlugs.length), 'Homepage reports the primary topic count');
assert.equal(home.querySelector('[data-stat="topics"]')?.getAttribute('href'), defaultTopicPath, 'Homepage topic count opens the default topic content');
assert.equal(home.querySelector('#topics .section-heading .inline-link')?.getAttribute('href'), defaultTopicPath, 'Homepage topic browsing opens content directly');
assert.equal(home.querySelector('[data-stat="resources"] strong')?.textContent.trim(), String(catalog.length), 'Homepage resource count comes from the catalog');
assert.equal(home.querySelector('[data-stat="projects"] strong')?.textContent.trim(), String(profiles.filter(resource => resource.type === 'project').length), 'Homepage project count excludes other resource guides');
assert.equal(home.querySelector('[data-stat="projects"]')?.getAttribute('href'), `${base}resources/?type=project`, 'Project count opens the project resource filter');
assert.ok(!home.querySelector('.reading-section'), 'Homepage omits the previous research reading column');
const featuredGuides = [...home.querySelectorAll('#guides .guide-card')];
assert.deepEqual(featuredGuides.map(guide => guide.getAttribute('href')), [`${base}notes/agentic-infra-overview/`, `${base}notes/agent-runtime-landscape/`], 'Homepage exposes both existing guides directly');
for (const guide of featuredGuides) {
  const guideFile = path.join(root, guide.getAttribute('href').slice(base.length), 'index.html');
  assert.equal(guide.querySelector('h3')?.textContent, documents.get(guideFile)?.querySelector('h1')?.textContent, 'Homepage guide titles match their source articles');
}
assert.equal(home.querySelector('.hero-buttons .primary')?.getAttribute('href'), `${base}notes/`, 'Primary homepage entry opens all resource guides');
const homeSections = [...home.querySelectorAll('section')];
assert.ok(homeSections.indexOf(home.getElementById('guides')) < homeSections.indexOf(home.getElementById('topics')), 'Resource guides precede topic browsing');
assert.ok(home.getElementById('scope'), 'Homepage keeps the existing scope anchor');
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
  assert.deepEqual([...topic.querySelectorAll('.breadcrumbs a')].map(link => link.getAttribute('href')), [base], `${filename}: only the actual homepage is linked in the breadcrumb`);
  assert.ok(topic.querySelector('.breadcrumbs')?.textContent.includes(topicSlug === servingSlug ? '关联基础设施' : '主题导航'), `${filename}: breadcrumb preserves the topic grouping`);
  assert.equal(topic.querySelector('.topic-menu summary > span')?.textContent, `切换主题 · ${topic.querySelector('h1').textContent}`, `${filename}: mobile topic switcher identifies the current topic`);
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
assert.equal(searchItems.find(item => item.title === '主题导航')?.url, defaultTopicPath, 'Search opens topic content directly');
assert.equal(searchItems.find(item => item.title === '关联基础设施')?.url, servingPath, 'Related-infrastructure search opens the Serving content directly');
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
  assert.ok(resource.bodyHeadings.length > 0, `${resource.slug}: introduction declares substantive sections`);
  assert.deepEqual([...page.querySelectorAll('.profile-body h2')].map((node) => node.textContent.trim()), resource.bodyHeadings,
    `${resource.slug}: detail preserves its own ${resource.type} sections in source order`);
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
const changelogMarkdown = await readFile('../CHANGELOG.md', 'utf8');
const changelogSource = parser.parse(changelogMarkdown);
const dateHeadings = changelogSource.children.filter((node) => node.type === 'heading' && node.depth === 2);
const dates = dateHeadings.map(textContent);
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
const normalizeText = (text) => text.replace(/\s+/gu, ' ').trim();
const linkHrefs = (node) => [...node.querySelectorAll('a[href]')].map((link) => link.getAttribute('href'));
const legacyChangelog = JSON.parse(await readFile(new URL('../src/lib/changelog-legacy.json', import.meta.url), 'utf8'));
const sourceDays = new Map(dateHeadings.map((heading, index) => {
  const date = textContent(heading);
  const body = changelogMarkdown.slice(heading.position.end.offset, dateHeadings[index + 1]?.position.start.offset ?? changelogMarkdown.length);
  const tree = parser.parse(body);
  const items = tree.children.flatMap(node => node.type === 'list' ? node.children : []);
  assert.ok(items.length, `${date}: daily source contains changes`);
  assert.ok(!tree.children.some(node => node.type === 'heading' && /^\d{1,2}:\d{2}/u.test(textContent(node))), `${date}: no timed batch headings remain`);
  return [date, items];
}));
assert.equal(changelog.querySelectorAll('.changelog-batch').length, 0, 'Changelog renders daily lists without batch sections');
const dailyUpdates = entries.map(entry => {
  const date = entry.querySelector('.changelog-date time').getAttribute('datetime');
  assert.equal(entry.querySelectorAll('time').length, 1, `${date}: only the day is displayed`);
  const details = entry.querySelector('.changelog-body');
  const items = [...details.querySelectorAll(':scope > ul > li, :scope > ol > li')];
  assert.deepEqual(items.map(item => normalizeText(item.textContent)), sourceDays.get(date).map(item => normalizeText(textContent(item))), `${date}: daily list preserves source order and content`);
  assert.equal(entry.querySelector('.changelog-date-meta')?.textContent.replace(/最新/u, '').trim(), `${items.length} 项更新`, `${date}: count reflects the merged points`);
  for (const id of legacyChangelog[date]?.legacyIds ?? []) {
    const alias = changelog.getElementById(id);
    assert.ok(alias && entry.contains(alias), `${id}: old bookmarks still locate the corresponding day`);
  }
  return { id: entry.id, date, items, details };
});
const expectedChanges = dailyUpdates.slice(0, 3).map(day => ({ date: day.date,
  href: `${base}changelog/#${day.id}`,
  text: normalizeText(day.items.slice(0, 2).map(item => item.textContent).join(' ')),
  links: day.items.slice(0, 2).flatMap(linkHrefs),
  count: Math.min(2, day.items.length),
}));
const recentChanges = [...home.querySelectorAll('.recent-update')].map(item => {
  const summary = item.querySelector('.recent-update-summary');
  assert.equal(item.querySelectorAll('time').length, 1, 'Homepage shows one date per daily summary');
  assert.equal(item.querySelector('time').textContent, item.querySelector('time').getAttribute('datetime'), 'Homepage date omits time');
  assert.equal(item.querySelector('.recent-update-date').getAttribute('href'), item.querySelector('.recent-update-link').getAttribute('href'), 'Date and read-more link reach the same daily update');
  return { date: item.querySelector('time').getAttribute('datetime'),
    href: item.querySelector('.recent-update-link').getAttribute('href'),
    text: normalizeText(summary.textContent), links: linkHrefs(summary),
    count: summary.querySelectorAll(':scope > ul > li, :scope > ol > li').length,
  };
});
assert.deepEqual(recentChanges, expectedChanges, 'Homepage shows the latest three distinct dates with two complete, linked points per day');

const feedSource = await readFile(path.join(root, 'feed.xml'), 'utf8');
assert.match(feedSource, /^<\?xml version="1\.0" encoding="UTF-8"\?>/u, 'RSS declares its encoding');
const feed = new DOMParser().parseFromString(feedSource, 'application/xml');
assert.equal(feed.documentElement.localName, 'rss', 'RSS root is present');
assert.equal(feed.documentElement.getAttribute('version'), '2.0', 'Feed uses RSS 2.0');
assert.equal(feed.querySelector('channel > link')?.textContent, absolute(base), 'RSS channel links to the configured homepage');
assert.equal(feed.getElementsByTagName('atom:link')[0]?.getAttribute('href'), absolute(`${base}feed.xml`), 'RSS self-link uses the configured feed URL');
const feedItems = [...feed.querySelectorAll('channel > item')];
assert.equal(feedItems.length, dailyUpdates.length, 'RSS includes one item per day');
const feedGuids = new Set();
for (const [index, item] of feedItems.entries()) {
  const day = dailyUpdates[index];
  const permalink = absolute(`${base}changelog/#${day.id}`);
  assert.equal(item.querySelector('title')?.textContent, `${day.date} · 资源与站点更新`, `${day.id}: RSS uses a daily title`);
  assert.equal(item.querySelector('link')?.textContent, permalink, `${day.id}: RSS links directly to the daily update`);
  const guid = item.querySelector('guid');
  const expectedGuid = absolute(`${base}changelog/#${legacyChangelog[day.date]?.feedId ?? day.id}`);
  assert.equal(guid?.textContent, expectedGuid, `${day.id}: RSS reuses published identity or the stable daily ID`);
  assert.equal(guid?.getAttribute('isPermaLink'), 'true', `${day.id}: RSS GUID remains a permalink`);
  assert.ok(!feedGuids.has(guid.textContent), `${day.id}: RSS GUID is unique`);
  feedGuids.add(guid.textContent);
  assert.equal(item.querySelector('pubDate'), null, `${day.id}: date-only records do not invent a publication time`);
  await verifyLocalUrl(permalink, `${day.id}: RSS permalink`);
  await verifyLocalUrl(guid.textContent, `${day.id}: RSS GUID bookmark`);
  const description = item.querySelector('description')?.textContent;
  assert.ok(description, `${day.id}: RSS contains readable details`);
  const body = parseHTML(`<main>${description}</main>`).document.querySelector('main');
  assert.equal(normalizeText(body.textContent), normalizeText(day.details.textContent), `${day.id}: RSS preserves all daily updates`);
  for (const element of body.querySelectorAll('a[href],img[src]')) {
    const raw = element.getAttribute('href') ?? element.getAttribute('src');
    const url = new URL(raw);
    assert.ok(['https:', 'http:'].includes(url.protocol), `${day.id}: feed links are absolute HTTP(S) URLs`);
    if (url.origin === origin && url.pathname.startsWith(base)) await verifyLocalUrl(raw, `${day.id}: RSS content`);
  }
}

const sitemapSource = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.match(sitemapSource, /^<\?xml version="1\.0" encoding="UTF-8"\?>/u, 'Sitemap declares its encoding');
const sitemap = new DOMParser().parseFromString(sitemapSource, 'application/xml');
assert.equal(sitemap.documentElement.localName, 'urlset', 'Sitemap root is present');
assert.equal(sitemap.documentElement.getAttribute('xmlns'), 'http://www.sitemaps.org/schemas/sitemap/0.9', 'Sitemap declares the standard namespace');
const sitemapUrls = [...sitemap.querySelectorAll('url > loc')].map(node => node.textContent);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Sitemap URLs are unique');
const expectedSitemapUrls = pages.filter(file => path.relative(root, file) !== '404.html' && file !== topicRedirectFile)
  .map(file => absolute(base + path.relative(root, file).replace(/index\.html$/u, ''))).sort();
assert.deepEqual([...sitemapUrls].sort(), expectedSitemapUrls, 'Sitemap lists content pages and excludes error and compatibility pages');
for (const url of sitemapUrls) {
  const parsed = new URL(url);
  assert.ok(!parsed.search && !parsed.hash, 'Sitemap lists canonical pages without filters or anchors');
  await verifyLocalUrl(url, 'Sitemap');
}

const socialImage = await readFile(await verifyLocalUrl(absolute(`${base}social-card.png`), 'Open Graph image'));
assert.deepEqual(socialImage.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), 'Sharing image has a PNG signature');
assert.equal(socialImage.toString('ascii', 12, 16), 'IHDR', 'Sharing image has a PNG header');
assert.equal(socialImage.readUInt32BE(16), 1200, 'Sharing image is 1200 pixels wide');
assert.equal(socialImage.readUInt32BE(20), 630, 'Sharing image is 630 pixels high');
const compressedImage = [];
let imageEnd = false;
for (let offset = 8; offset < socialImage.length;) {
  const size = socialImage.readUInt32BE(offset);
  const kind = socialImage.toString('ascii', offset + 4, offset + 8);
  assert.ok(offset + size + 12 <= socialImage.length, 'PNG chunks are complete');
  if (kind === 'IDAT') compressedImage.push(socialImage.subarray(offset + 8, offset + 8 + size));
  offset += size + 12;
  if (kind === 'IEND') { imageEnd = true; assert.equal(offset, socialImage.length, 'PNG terminates after IEND'); }
}
assert.ok(imageEnd && compressedImage.length, 'PNG contains image data and its terminating chunk');
assert.ok(inflateSync(Buffer.concat(compressedImage)).length > 0, 'PNG image data can be decompressed');
const guideIndex = documents.get(path.join(root, 'notes/index.html'));
assert.ok(guideIndex?.querySelector('h1')?.textContent.includes('资源导览'), 'The existing notes address remains the resource-guide index');
for (const [file, document] of documents) {
  if (path.relative(root, file).startsWith(`notes${path.sep}`)) {
    assert.ok(!document.querySelector('.reading-navigation'), `${file}: resource guides do not have an automatic article sequence`);
    assert.ok(!document.querySelector('main').textContent.includes('研究笔记'), `${file}: guides use the resource-focused positioning`);
  }
}
assert.deepEqual(problems,[],'Generated site link/semantic checks');
console.log(`Verified ${pages.length} HTML pages, ${checkedLinks} internal links/assets, ${sourceCount} resource anchors/cards, ${profiles.length} resource introductions, ${dailyUpdates.length} daily updates, RSS, sitemap, and the sharing PNG.`);
