import { readFile, readdir } from 'node:fs/promises';
import { parseDocument } from 'yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { topics } from './topic-metadata';

export type ResourceType = 'project' | 'paper' | 'spec' | 'article';
export interface ResourceLink { label: string; url: string }
export interface ResourceStatus { label: string; source: string; checked: string }
export interface CatalogResource {
  slug: string;
  name: string;
  summary: string;
  type: ResourceType;
  topic: string;
  url: string;
  anchor: string;
  order: number;
  publication?: string;
  maintainer?: string;
  form?: string;
  license?: string;
  status?: ResourceStatus;
  links: ResourceLink[];
  body: string;
  hasProfile: boolean;
  sourcePath: string;
}

export const profileSections = ['背景与目标', '核心能力', '核心概念与工作方式', '使用场景与接入方式'] as const;
export const resourceIndexStart = '<!-- resources:start -->';
export const resourceIndexEnd = '<!-- resources:end -->';
const sectionTitles: Record<ResourceType, string> = {
  project: 'Projects & Platforms', paper: 'Papers', spec: 'Specifications', article: 'Articles & Documentation',
};
const markdownParser = unified().use(remarkParse).use(remarkGfm);

function object(value: unknown, field: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${field} must be a mapping.`);
  return value as Record<string, unknown>;
}

function text(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} must be nonempty text.`);
  return value.trim();
}

function officialUrl(value: unknown, field: string): string {
  const url = text(value, field);
  let parsed: URL;
  try { parsed = new URL(url); } catch { throw new Error(`${field} must be an absolute HTTP(S) URL.`); }
  if (!['http:', 'https:'].includes(parsed.protocol) || /[\s\u0000-\u001f\u007f]/u.test(url) || parsed.username || parsed.password) {
    throw new Error(`${field} must be an absolute HTTP(S) URL without credentials or whitespace.`);
  }
  return url;
}

function plainHeading(node: { type: string; value?: string; children?: { type: string }[] }): string {
  return node.value ?? (node.children ?? []).map(child => plainHeading(child)).join('');
}

export function parseResourceDocument(markdown: string, slug: string): CatalogResource {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug)) throw new Error(`Invalid resource slug: ${slug}`);
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(markdown);
  if (!frontmatter) throw new Error(`${slug}: YAML frontmatter is required.`);
  const document = parseDocument(frontmatter[1], { uniqueKeys: true });
  if (document.errors.length) throw new Error(`${slug}: ${document.errors[0].message}`);
  const data = object(document.toJS({ maxAliasCount: 100 }), slug);
  const name = text(data.name, `${slug}.name`);
  const summary = text(data.summary, `${slug}.summary`);
  if (/[\r\n]/u.test(name)) throw new Error(`${slug}.name must be a single line.`);
  const summaryTree = markdownParser.parse(summary);
  if (/[\r\n]/u.test(summary) || summaryTree.children.length !== 1 || summaryTree.children[0].type !== 'paragraph') {
    throw new Error(`${slug}.summary must be one inline paragraph.`);
  }
  const type = text(data.type, `${slug}.type`) as ResourceType;
  if (!Object.hasOwn(sectionTitles, type)) throw new Error(`${slug}: unknown resource type ${type}.`);
  const topic = text(data.topic, `${slug}.topic`);
  if (!topics.some(item => item.slug === topic)) throw new Error(`${slug}: unknown topic ${topic}.`);
  const url = officialUrl(data.url, `${slug}.url`);
  const anchor = text(data.anchor, `${slug}.anchor`);
  if (!/^resource-[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(anchor)) throw new Error(`${slug}: invalid fixed resource anchor.`);
  if (!Number.isInteger(data.order) || Number(data.order) < 1) throw new Error(`${slug}.order must be a positive integer.`);
  const links = data.links === undefined ? [{ label: '官方来源', url }] : (() => {
    if (!Array.isArray(data.links) || !data.links.length) throw new Error(`${slug}.links must be a nonempty list.`);
    return data.links.map((value, index) => {
      const link = object(value, `${slug}.links[${index}]`);
      return { label: text(link.label, `${slug}.links[${index}].label`), url: officialUrl(link.url, `${slug}.links[${index}].url`) };
    });
  })();
  let status: ResourceStatus | undefined;
  if (data.status !== undefined) {
    const value = object(data.status, `${slug}.status`);
    const checked = text(value.checked, `${slug}.status.checked`);
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(checked) || !Number.isFinite(Date.parse(`${checked}T00:00:00Z`))
      || new Date(`${checked}T00:00:00Z`).toISOString().slice(0, 10) !== checked) throw new Error(`${slug}: invalid status check date.`);
    status = { label: text(value.label, `${slug}.status.label`), source: officialUrl(value.source, `${slug}.status.source`), checked };
  }
  const optionalText = Object.fromEntries(['publication', 'maintainer', 'form', 'license']
    .filter(field => data[field] !== undefined).map(field => [field, text(data[field], `${slug}.${field}`)]));
  visit(summaryTree, node => {
    if (node.type === 'link' || node.type === 'image' || node.type === 'definition') officialUrl(node.url, `${slug}.summary link`);
  });
  const body = markdown.slice(frontmatter[0].length).trim();
  if (body) {
    const tree = markdownParser.parse(body);
    const headings = tree.children.filter(node => node.type === 'heading' && node.depth === 2);
    for (const section of profileSections) {
      const heading = headings.find(node => plainHeading(node) === section);
      if (!heading) throw new Error(`${slug}: profile needs the "${section}" section.`);
      const position = tree.children.indexOf(heading);
      const next = tree.children.slice(position + 1).find(node => node.type !== 'html');
      if (!next || next.type === 'heading') throw new Error(`${slug}: profile section "${section}" is empty.`);
    }
  }
  return { slug, name, summary, type, topic, url, anchor, order: Number(data.order), ...optionalText,
    status, links, body, hasProfile: Boolean(body), sourcePath: `resources/items/${slug}.md` };
}

export function validateResourceCatalog(records: CatalogResource[]): void {
  const slugs = new Set<string>();
  const anchors = new Set<string>();
  const orders = new Set<string>();
  for (const item of records) {
    if (slugs.has(item.slug)) throw new Error(`Duplicate resource slug: ${item.slug}`);
    slugs.add(item.slug);
    const anchor = `${item.topic}:${item.anchor}`;
    if (anchors.has(anchor)) throw new Error(`Duplicate resource anchor: ${anchor}`);
    anchors.add(anchor);
    const order = `${item.topic}:${item.order}`;
    if (orders.has(order)) throw new Error(`Duplicate resource order: ${order}`);
    orders.add(order);
  }
}

export async function loadResourceCatalog(repositoryRoot: string): Promise<CatalogResource[]> {
  const directory = `${repositoryRoot}/resources/items`;
  const filenames = (await readdir(directory)).filter(filename => filename.endsWith('.md')).sort();
  const records = await Promise.all(filenames.map(async filename => parseResourceDocument(await readFile(`${directory}/${filename}`, 'utf8'), filename.slice(0, -3))));
  validateResourceCatalog(records);
  const topicOrder = new Map(topics.map((topic, index) => [String(topic.slug), index]));
  return records.sort((a, b) => topicOrder.get(a.topic)! - topicOrder.get(b.topic)! || a.order - b.order);
}

function escapedLabel(label: string): string {
  return label.replace(/[\\[\]]/gu, '\\$&');
}

export function renderResourceIndex(records: CatalogResource[]): string {
  const groups = new Map<ResourceType, CatalogResource[]>();
  for (const item of [...records].sort((a, b) => a.order - b.order)) {
    if (!groups.has(item.type)) groups.set(item.type, []);
    groups.get(item.type)!.push(item);
  }
  const sections = [...groups].map(([type, items]) => `## ${sectionTitles[type]}\n\n${items.map(item => {
    const publication = item.publication ? `（${item.publication}）— ` : ' — ';
    const profile = item.hasProfile ? ` [项目介绍](items/${item.slug}.md)` : '';
    return `- <a id="${item.anchor}"></a> [${escapedLabel(item.name)}](${item.url})${publication}${item.summary}${profile}`;
  }).join('\n')}`);
  return `${resourceIndexStart}\n\n${sections.join('\n\n')}\n\n${resourceIndexEnd}`;
}

/** Replace only the generated resource lists; introductions and guide links stay authored. */
export function syncTopicMarkdown(markdown: string, records: CatalogResource[]): string {
  const generated = renderResourceIndex(records);
  const starts = markdown.split(resourceIndexStart).length - 1;
  const ends = markdown.split(resourceIndexEnd).length - 1;
  if (starts || ends) {
    if (starts !== 1 || ends !== 1 || markdown.indexOf(resourceIndexStart) > markdown.indexOf(resourceIndexEnd)) {
      throw new Error('Resource index must have exactly one ordered start/end marker pair.');
    }
    return `${markdown.slice(0, markdown.indexOf(resourceIndexStart))}${generated}${markdown.slice(markdown.indexOf(resourceIndexEnd) + resourceIndexEnd.length)}`;
  }
  // One-time migration: recognize the existing resource headings and lists,
  // leaving the final return navigation and any solution overview untouched.
  const tree = markdownParser.parse(markdown);
  const resourceSections = tree.children.filter(node => node.type === 'heading' && node.depth === 2 && Object.values(sectionTitles).includes(plainHeading(node)));
  if (!resourceSections.length) throw new Error('Topic has no resource sections to synchronize.');
  const first = resourceSections[0];
  const last = resourceSections.at(-1)!;
  const lastIndex = tree.children.indexOf(last);
  let lastList = last;
  for (const node of tree.children.slice(lastIndex + 1)) {
    if (node.type === 'heading') break;
    if (node.type === 'list') lastList = node;
  }
  return `${markdown.slice(0, first.position!.start.offset!)}${generated}${markdown.slice(lastList.position!.end.offset!)}`;
}

export async function assertResourceIndexes(repositoryRoot: string, catalog?: CatalogResource[]): Promise<void> {
  const records = catalog ?? await loadResourceCatalog(repositoryRoot);
  for (const topic of topics) {
    const path = `resources/${topic.slug}.md`;
    const markdown = await readFile(`${repositoryRoot}/${path}`, 'utf8');
    if (syncTopicMarkdown(markdown, records.filter(item => item.topic === topic.slug)) !== markdown) {
      throw new Error(`${path} is out of sync with resources/items. Run npm run resources:sync from site/.`);
    }
  }
}
