import { readFile, readdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, posix, resolve } from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root as MarkdownRoot, Link, ListItem } from 'mdast';
import type { Root as HtmlRoot } from 'hast';
import { topics } from './topic-metadata';
import siteConfig from '../../site.config.json';
import changelogLegacy from './changelog-legacy.json';
import type { ResourceRole, ResourceDelivery } from './resource-taxonomy';
export { resourceIntroLabel } from './resource-taxonomy';
import { loadResourceCatalog, parseResourceDocument, syncTopicMarkdown, type CatalogResource, type ResourceLink, type ResourceStatus } from './resource-catalog';
export { topics } from './topic-metadata';
export type { ResourceLink, ResourceStatus } from './resource-catalog';

export const repoUrl = siteConfig.repository;
function findRepositoryRoot(): string {
  // Astro relocates bundled modules, so import.meta.url is not a reliable path
  // to the source repository during the production build.
  let candidate = resolve(process.cwd());
  while (true) {
    if (['resources', 'notes', 'CONTRIBUTING.md'].every((path) => existsSync(`${candidate}/${path}`))) {
      return candidate;
    }
    const parent = dirname(candidate);
    if (parent === candidate) throw new Error('Run the site from inside the awesome-agentic-infra repository.');
    candidate = parent;
  }
}
const repositoryRoot = findRepositoryRoot();
const basePath = siteConfig.base;

export function sitePath(path = ''): string {
  return `${basePath}${path.replace(/^\/+/, '')}`;
}

export interface Heading {
  depth: number;
  id: string;
  text: string;
}

export interface Resource {
  id: string;
  slug: string;
  anchor: string;
  name: string;
  url: string;
  description: string;
  type: 'project' | 'paper' | 'spec' | 'article';
  topicSlug: string;
  topicTitle: string;
  topicZhTitle: string;
  hasProfile: boolean;
  maintainer?: string;
  form?: string;
  license?: string;
  status?: ResourceStatus;
  aliases: string[];
  keywords: string[];
  role?: ResourceRole;
  delivery?: ResourceDelivery;
  links: ResourceLink[];
}

export interface ResourceProfile extends Resource {
  html: string;
  headings: Heading[];
  sourcePath: string;
}

export function resourcePath(resource: Pick<Resource, 'topicSlug' | 'anchor'> & Partial<Pick<Resource, 'slug' | 'hasProfile'>>): string {
  if (resource.hasProfile && resource.slug) return sitePath(`resources/${resource.slug}/`);
  return sitePath(`topics/${resource.topicSlug}/#${resource.anchor}`);
}

export interface ChangelogEntry {
  id: string;
  date: string;
  html: string;
  changes: string[];
  changeCount: number;
  summaryHtml: string;
  legacyIds: string[];
  feedId: string;
}

export const topicScopeLabels = {
  core: 'Agentic 核心能力',
  crossCutting: '跨领域能力 · Agent 场景',
  serving: '关联基础设施 · LLM Serving',
} as const;

type TopicMetadata = (typeof topics)[number];

export function groupTopics<T extends Pick<TopicMetadata, 'scope'>>(items: readonly T[]) {
  return [
    { id: 'primary', title: '主要主题', topics: items.filter((topic) => topic.scope !== 'serving') },
    { id: 'related', title: '关联基础设施', topics: items.filter((topic) => topic.scope === 'serving') },
  ] as const;
}

export interface Topic {
  slug: string;
  title: string;
  zhTitle: string;
  scope: TopicMetadata['scope'];
  description: string;
  icon: string;
  html: string;
  headings: Heading[];
  entries: Resource[];
  introHtml: string;
  resourceHtml: string;
  learningNotes: Note[];
  sourcePath: string;
}

export interface Note {
  slug: string;
  title: string;
  description: string;
  html: string;
  headings: Heading[];
  sourcePath: string;
  readingMinutes: number;
}

export function resourceGuideLabel(slug: string): '领域导览' | '方案总览' {
  return slug === 'agentic-infra-overview' ? '领域导览' : '方案总览';
}

type TextNode = {
  type: string;
  value?: string;
  alt?: string | null;
  children?: TextNode[];
};

function plainText(node: TextNode, excluded?: TextNode): string {
  if (node === excluded || node.type === 'html') return '';
  if (node.type === 'image') return node.alt ?? '';
  if (node.type === 'break') return ' ';
  if (node.value !== undefined) return node.value;
  const separator = ['list', 'listItem', 'root'].includes(node.type) ? ' ' : '';
  return (node.children ?? []).map((child) => plainText(child, excluded)).join(separator);
}

function readableText(node: TextNode, excluded?: TextNode): string {
  return plainText(node, excluded).replace(/\s+/gu, ' ').trim();
}

function parse(markdown: string): MarkdownRoot {
  return unified().use(remarkParse).use(remarkGfm).parse(markdown);
}

function isSafeUrl(url: string): boolean {
  // Markdown entity decoding happens before this check. Strip controls so that
  // obfuscated schemes cannot become executable after browser normalization.
  const normalized = url.replace(/[\u0000-\u0020\u007f]/gu, '');
  const scheme = normalized.match(/^([a-z][a-z0-9+.-]*):/iu)?.[1]?.toLowerCase();
  return !scheme || ['http', 'https', 'mailto', 'tel', 'ftp'].includes(scheme);
}

/** Resolve repository-relative Markdown links without changing external URLs. */
export function rewriteMarkdownUrl(url: string, sourcePath: string): string | null {
  if (!isSafeUrl(url)) return null;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\?)/iu.test(url)) return url;

  const match = url.match(/^([^?#]*)(.*)$/u);
  if (!match) return url;
  let pathname: string;
  try {
    pathname = decodeURIComponent(match[1]);
  } catch {
    return url;
  }
  const suffix = match[2];
  const localPath = posix.normalize(
    pathname.startsWith('/') ? pathname.slice(1) : posix.join(posix.dirname(sourcePath), pathname),
  );

  // A path escaping the repository is never transformed into a site URL.
  if (localPath === '..' || localPath.startsWith('../')) return null;
  if (/^README\.md$/iu.test(localPath)) return `${sitePath()}${suffix}`;
  if (/^CONTRIBUTING\.md$/iu.test(localPath)) return `${sitePath('contributing/')}${suffix}`;
  if (/^CHANGELOG\.md$/iu.test(localPath)) return `${sitePath('changelog/')}${suffix}`;
  if (/^notes\/README\.md$/iu.test(localPath)) return `${sitePath('notes/')}${suffix}`;

  const profile = localPath.match(/^resources\/items\/([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/u);
  if (profile) {
    const path = `${repositoryRoot}/${localPath}`;
    if (!existsSync(path)) throw new Error(`Unknown resource document: ${localPath}`);
    const item = parseResourceDocument(readFileSync(path, 'utf8'), profile[1]);
    if (item.hasProfile) return `${sitePath(`resources/${item.slug}/`)}${suffix}`;
    const query = suffix.startsWith('?') ? suffix.split('#')[0] : '';
    return `${sitePath(`topics/${item.topic}/`)}${query}#${item.anchor}`;
  }

  const topic = localPath.match(/^resources\/([^/]+)\.md$/u);
  if (topic && topics.some(({ slug }) => slug === topic[1])) {
    return `${sitePath(`topics/${topic[1]}/`)}${suffix}`;
  }
  const note = localPath.match(/^notes\/([^/]+)\.md$/u);
  if (note) return `${sitePath(`notes/${encodeURIComponent(note[1])}/`)}${suffix}`;

  const encodedPath = localPath.split('/').map(encodeURIComponent).join('/');
  if (localPath === 'LICENSE' || /\.md$/iu.test(localPath)) {
    return `${repoUrl}/blob/main/${encodedPath}${suffix}`;
  }
  // Root documentation assets stay at their single source in the repository.
  if (localPath.startsWith('assets/')) {
    return `${repoUrl.replace('github.com', 'raw.githubusercontent.com')}/main/${encodedPath}${suffix}`;
  }
  return url;
}

function isReturnNavigation(node: MarkdownRoot['children'][number]): boolean {
  if (node.type !== 'paragraph') return false;
  return node.children.every((child) => {
    if (child.type === 'text') return /^[\s·|]*$/u.test(child.value);
    return child.type === 'link' && /^返回(?:首页|资源导览|笔记索引|索引)$/u.test(readableText(child));
  });
}

export async function renderMarkdown(
  markdown: string,
  sourcePath: string,
  headingPrefix = '',
  headingOffset = 0,
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree: MarkdownRoot) => {
      tree.children = tree.children.filter(
        (node) => !(node.type === 'heading' && node.depth === 1) && !isReturnNavigation(node),
      );
      if (/^resources\/[^/]+\.md$/u.test(sourcePath)) {
        for (const { item, anchor } of resourceItems(tree)) {
          // Only the fixed, empty anchor is promoted to an HTML property.
          // All source HTML, including the original anchor tags, is discarded.
          item.data = { ...item.data, hProperties: { id: anchor } };
        }
      }
      visit(tree, (node) => {
        if (node.type === 'heading' && headingOffset) {
          node.depth = Math.min(6, node.depth + headingOffset) as typeof node.depth;
        }
        if (node.type === 'link' || node.type === 'image' || node.type === 'definition') {
          const rewritten = rewriteMarkdownUrl(node.url, sourcePath);
          node.url = rewritten ?? '';
        }
      });
    })
    .use(remarkRehype) // Raw HTML is deliberately not passed through.
    .use(rehypeSlug, { prefix: headingPrefix })
    .use(() => (tree: HtmlRoot) => {
      visit(tree, 'element', (node) => {
        if (/^h[2-6]$/u.test(node.tagName)) {
          headings.push({
            depth: Number(node.tagName.slice(1)),
            id: String(node.properties.id ?? ''),
            text: readableText(node),
          });
        }
        if (node.tagName === 'a') {
          const href = String(node.properties.href ?? '');
          if (!href || !isSafeUrl(href)) delete node.properties.href;
        }
        if (node.tagName === 'img') {
          const src = String(node.properties.src ?? '');
          if (!src || !isSafeUrl(src)) delete node.properties.src;
        }
      });
    })
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(result), headings };
}

const sectionTypes: Record<string, Resource['type']> = {
  'Projects & Platforms': 'project',
  Papers: 'paper',
  Specifications: 'spec',
  'Articles & Documentation': 'article',
  'Articles & Talks': 'article',
};

function firstResourceLink(item: ListItem): Link | undefined {
  // Restrict the primary link to this item's own first paragraph. Nested lists
  // and a paper's implementation links must not create duplicate main entries.
  const paragraph = item.children.find((node) => node.type === 'paragraph');
  let first: Link | undefined;
  if (paragraph) {
    visit(paragraph, 'link', (node) => {
      first ??= node;
    });
  }
  return first;
}

function resourceItems(tree: MarkdownRoot) {
  const items: { item: ListItem; link: Link; type: Resource['type']; anchor: string }[] = [];
  const seen = new Set<string>();
  let type: Resource['type'] | undefined;
  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth <= 2) {
      type = sectionTypes[readableText(node)];
    }
    if (node.type !== 'list' || !type) continue;
    for (const item of node.children) {
      const link = firstResourceLink(item);
      if (!link || !/^https?:\/\//iu.test(link.url) || !isSafeUrl(link.url)) continue;
      const paragraph = item.children.find(child => child.type === 'paragraph');
      const [open, close] = paragraph?.children ?? [];
      const anchor = open?.type === 'html' && close?.type === 'html' && close.value === '</a>'
        ? /^<a id="(resource-[a-z0-9]+(?:-[a-z0-9]+)*)">$/u.exec(open.value)?.[1]
        : undefined;
      if (!anchor) throw new Error(`Resource "${readableText(link)}" needs a fixed <a id="resource-name"></a> anchor.`);
      if (seen.has(anchor)) throw new Error(`Duplicate resource anchor: ${anchor}`);
      seen.add(anchor);
      items.push({ item, link, type, anchor });
    }
  }
  return items;
}

export function extractResources(markdown: string, topic: TopicMetadata): Resource[] {
  return resourceItems(parse(markdown)).map(({ item, link, type, anchor }) => ({
    id: `${topic.slug}-${anchor}`,
    slug: anchor.replace(/^resource-/u, ''),
    anchor,
    name: readableText(link),
    url: link.url,
    description: readableText(item, link).replace(/^[\s—–:：-]+/u, ''),
    type,
    topicSlug: topic.slug,
    topicTitle: topic.title,
    topicZhTitle: topic.zhTitle,
    hasProfile: false,
    aliases: [],
    keywords: [],
    links: [{ label: '官方来源', url: link.url }],
  }));
}

function catalogResource(item: CatalogResource): Resource {
  const topic = topics.find(topic => topic.slug === item.topic)!;
  return {
    id: `${topic.slug}-${item.anchor}`,
    slug: item.slug,
    anchor: item.anchor,
    name: item.name,
    url: item.url,
    description: `${item.publication ? `（${item.publication}）— ` : ''}${readableText(parse(item.summary))}`,
    type: item.type,
    topicSlug: topic.slug,
    topicTitle: topic.title,
    topicZhTitle: topic.zhTitle,
    hasProfile: item.hasProfile,
    maintainer: item.maintainer,
    form: item.form,
    license: item.license,
    status: item.status,
    aliases: item.aliases,
    keywords: item.keywords,
    role: item.role,
    delivery: item.delivery,
    links: item.links,
  };
}

export async function getResourceProfiles(): Promise<ResourceProfile[]> {
  const catalog = await loadResourceCatalog(repositoryRoot);
  return Promise.all(catalog.filter(item => item.hasProfile).map(async item => ({
    ...catalogResource(item),
    ...(await renderMarkdown(item.body, item.sourcePath)),
    sourcePath: item.sourcePath,
  })));
}

export async function parseChangelog(markdown: string): Promise<ChangelogEntry[]> {
  const sections = parse(markdown).children.filter(node => node.type === 'heading' && node.depth === 2);
  const seen = new Set<string>();
  const entries = await Promise.all(sections.map(async (heading, index) => {
    const date = readableText(heading);
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(date)
      || !Number.isFinite(Date.parse(`${date}T00:00:00Z`))
      || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
      throw new Error(`Invalid changelog date: ${date}. Use a real YYYY-MM-DD publication date.`);
    }
    if (seen.has(date)) throw new Error(`Duplicate changelog date: ${date}. Combine same-day changes.`);
    seen.add(date);
    const body = markdown.slice(heading.position!.end.offset!, sections[index + 1]?.position?.start.offset ?? markdown.length);
    const tree = parse(body);
    const items = tree.children.flatMap((node) => node.type === 'list' ? node.children : []);
    if (!items.length) throw new Error(`Changelog ${date} needs at least one change.`);
    visit(tree, 'heading', (node) => {
      if (/^\d{1,2}:\d{2}/u.test(readableText(node))) {
        throw new Error(`Changelog ${date} uses a timed batch. Combine changes in the daily list.`);
      }
    });
    const id = `update-${date}`;
    const changeMarkdown = items.map(item => body.slice(item.position!.start.offset!, item.position!.end.offset!));
    const [rendered, changes, summary] = await Promise.all([
      renderMarkdown(body, 'CHANGELOG.md', `${id}-`),
      Promise.all(changeMarkdown.map(async (markdown, itemIndex) =>
        (await renderMarkdown(markdown, 'CHANGELOG.md', `${id}-change-${itemIndex}-`)).html)),
      renderMarkdown(changeMarkdown.slice(0, 2).join('\n\n'), 'CHANGELOG.md'),
    ]);
    // Preserve published bookmarks and reuse one existing feed identity per day.
    // New dates need no migration metadata or artificial publication time.
    const legacy = changelogLegacy[date as keyof typeof changelogLegacy];
    const headingIds = new Set(rendered.headings.map(heading => heading.id));
    return { id, date, html: rendered.html, changes, changeCount: changes.length,
      summaryHtml: summary.html,
      legacyIds: (legacy?.legacyIds ?? []).filter(anchor => !headingIds.has(anchor)),
      feedId: legacy?.feedId ?? id,
    };
  }));
  if (!entries.length) throw new Error('CHANGELOG.md needs at least one dated update.');
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getChangelog(): Promise<ChangelogEntry[]> {
  return parseChangelog(await readFile(`${repositoryRoot}/CHANGELOG.md`, 'utf8'));
}

function noteDescription(tree: MarkdownRoot): string {
  for (const node of tree.children) {
    if (node.type !== 'paragraph' || isReturnNavigation(node)) continue;
    const text = readableText(node);
    if (!text) continue;
    return text.length > 128 ? `${text.slice(0, 128)}…` : text;
  }
  return '';
}

async function loadNote(sourcePath: string, slug: string, titleOverride?: string): Promise<Note> {
  const markdown = await readFile(`${repositoryRoot}/${sourcePath}`, 'utf8');
  const tree = parse(markdown);
  const h1 = tree.children.find((node) => node.type === 'heading' && node.depth === 1);
  const text = readableText(tree);
  const cjkCharacters = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) ?? []).length;
  const otherWords = text.replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu, ' ').split(/\s+/u).filter(Boolean).length;
  return {
    slug,
    title: titleOverride ?? (h1 ? readableText(h1) : slug),
    description: noteDescription(tree),
    ...(await renderMarkdown(markdown, sourcePath)),
    sourcePath,
    readingMinutes: Math.max(1, Math.ceil(cjkCharacters / 350 + otherWords / 220)),
  };
}

export async function getTopics(): Promise<Topic[]> {
  const [notes, catalog] = await Promise.all([getNotes(), loadResourceCatalog(repositoryRoot)]);
  return Promise.all(topics.map(async (topic) => {
    const sourcePath = `resources/${topic.slug}.md`;
    const entries = catalog.filter(item => item.topic === topic.slug);
    const markdown = syncTopicMarkdown(await readFile(`${repositoryRoot}/${sourcePath}`, 'utf8'), entries);
    return {
      ...topic,
      ...(await renderMarkdown(markdown, sourcePath)),
      entries: entries.map(catalogResource),
      ...(await getTopicSections(markdown, sourcePath, notes)),
      sourcePath,
    };
  }));
}

/** Derive a topic's introduction, resource list and solution overviews from one Markdown source. */
export async function getTopicSections(markdown: string, sourcePath: string, notes: Note[]) {
  const tree = parse(markdown);
  const sections = tree.children.filter(node => node.type === 'heading' && node.depth === 2);
  const title = tree.children.find(node => node.type === 'heading' && node.depth === 1);
  const intro = markdown.slice(title?.position?.end.offset ?? 0, sections[0]?.position?.start.offset ?? markdown.length);
  const resourceSections: string[] = [];
  const learningNotes: Note[] = [];
  for (const [index, section] of sections.entries()) {
    const sectionMarkdown = markdown.slice(section.position!.start.offset!, sections[index + 1]?.position?.start.offset ?? markdown.length);
    const name = readableText(section);
    if (sectionTypes[name]) resourceSections.push(sectionMarkdown);
    if (name !== '方案总览') continue;
    const overviewTree = parse(sectionMarkdown);
    overviewTree.children = overviewTree.children.filter((node) => !isReturnNavigation(node));
    visit(overviewTree, 'link', link => {
      const localPath = posix.normalize(posix.join(posix.dirname(sourcePath), decodeURIComponent(link.url.split(/[?#]/u)[0])));
      const note = notes.find(note => note.sourcePath === localPath);
      if (!note) throw new Error(`${sourcePath}: solution overview must link to an existing notes/*.md guide: ${link.url}`);
      if (!learningNotes.some(existing => existing.slug === note.slug)) learningNotes.push(note);
    });
  }
  const [introduction, references] = await Promise.all([
    renderMarkdown(intro, sourcePath),
    renderMarkdown(resourceSections.join('\n'), sourcePath, '', 1),
  ]);
  return { introHtml: introduction.html, resourceHtml: references.html, learningNotes };
}

export async function getResources(): Promise<Resource[]> {
  return (await loadResourceCatalog(repositoryRoot)).map(catalogResource);
}

export async function getNotes(): Promise<Note[]> {
  const filenames = (await readdir(`${repositoryRoot}/notes`))
    .filter((filename) => filename.endsWith('.md') && filename.toLowerCase() !== 'readme.md')
    .sort();
  return Promise.all(filenames.map((filename) => loadNote(`notes/${filename}`, filename.slice(0, -3))));
}

export function getGuide(): Promise<Note> {
  return loadNote('CONTRIBUTING.md', 'contributing', '贡献指南');
}
