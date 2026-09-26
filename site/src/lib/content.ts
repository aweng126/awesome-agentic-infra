import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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

export const repoUrl = 'https://github.com/aweng126/awesome-agentic-infra';
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
const basePath = '/awesome-agentic-infra/';

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
  name: string;
  url: string;
  description: string;
  type: 'project' | 'paper' | 'spec' | 'article';
  topicSlug: string;
  topicTitle: string;
  topicZhTitle: string;
}

export const topics = [
  {
    slug: 'runtime-and-orchestration',
    title: 'Runtime & Orchestration',
    zhTitle: '运行时与编排',
    description: '让 Agent 任务持续推进，在协作、中断与失败之后恢复执行。',
    icon: 'workflow',
  },
  {
    slug: 'sandbox-and-execution',
    title: 'Sandbox & Execution',
    zhTitle: '沙箱与执行环境',
    description: '为代码、命令和浏览器操作提供可管理、可隔离的执行环境。',
    icon: 'sandbox',
  },
  {
    slug: 'memory-and-context',
    title: 'Memory & Context',
    zhTitle: '记忆与上下文',
    description: '保存任务所需的状态与记忆，为下一次模型调用组织上下文。',
    icon: 'memory',
  },
  {
    slug: 'tools-and-protocols',
    title: 'Tools & Protocols',
    zhTitle: '工具与协议',
    description: '连接外部工具与独立 Agent，统一能力发现、调用和通信接口。',
    icon: 'plug',
  },
  {
    slug: 'inference-and-model-serving',
    title: 'Inference & Model Serving',
    zhTitle: '推理与模型服务',
    description: '承载多轮模型请求，组织路由、批处理与推理缓存。',
    icon: 'model',
  },
  {
    slug: 'deployment-and-scheduling',
    title: 'Deployment & Scheduling',
    zhTitle: '部署与调度',
    description: '让工作负载在合适的资源上运行，并按需求部署与伸缩。',
    icon: 'server',
  },
  {
    slug: 'observability-and-evaluation',
    title: 'Observability & Evaluation',
    zhTitle: '可观测性与评估',
    description: '追踪任务执行过程，衡量质量、可靠性、延迟与资源消耗。',
    icon: 'activity',
  },
  {
    slug: 'security-and-governance',
    title: 'Security & Governance',
    zhTitle: '安全与治理',
    description: '确认操作主体与权限，让身份、策略与审计贯穿执行过程。',
    icon: 'shield',
  },
] as const;

type TopicMetadata = (typeof topics)[number];

export interface Topic {
  slug: string;
  title: string;
  zhTitle: string;
  description: string;
  icon: string;
  html: string;
  headings: Heading[];
  entries: Resource[];
  updated: string;
  sourcePath: string;
}

export interface Note {
  slug: string;
  title: string;
  description: string;
  html: string;
  headings: Heading[];
  updated: string;
  sourcePath: string;
  readingMinutes: number;
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
  if (/^notes\/README\.md$/iu.test(localPath)) return `${sitePath('notes/')}${suffix}`;

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
    return child.type === 'link' && /^返回(?:首页|笔记索引|索引)$/u.test(readableText(child));
  });
}

export async function renderMarkdown(
  markdown: string,
  sourcePath: string,
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(() => (tree: MarkdownRoot) => {
      tree.children = tree.children.filter(
        (node) => !(node.type === 'heading' && node.depth === 1) && !isReturnNavigation(node),
      );
      visit(tree, (node) => {
        if (node.type === 'link' || node.type === 'image' || node.type === 'definition') {
          const rewritten = rewriteMarkdownUrl(node.url, sourcePath);
          node.url = rewritten ?? '';
        }
      });
    })
    .use(remarkRehype) // Raw HTML is deliberately not passed through.
    .use(rehypeSlug)
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

export function extractResources(markdown: string, topic: TopicMetadata): Resource[] {
  const resources: Resource[] = [];
  let type: Resource['type'] | undefined;
  for (const node of parse(markdown).children) {
    if (node.type === 'heading' && node.depth <= 2) {
      type = sectionTypes[readableText(node)];
    }
    if (node.type !== 'list' || !type) continue;
    const sectionType = type;
    visit(node, 'listItem', (item) => {
      const link = firstResourceLink(item);
      if (!link || !/^https?:\/\//iu.test(link.url) || !isSafeUrl(link.url)) return;
      const name = readableText(link);
      const nameSlug = name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/gu, '');
      resources.push({
        id: `${topic.slug}-${nameSlug}`,
        name,
        url: link.url,
        description: readableText(item, link).replace(/^[\s—–:：-]+/u, ''),
        type: sectionType,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        topicZhTitle: topic.zhTitle,
      });
    });
  }
  return resources;
}

function updatedDate(markdown: string): string {
  return markdown.match(/(?:最近整理|整理日期)\s*[：:]\s*(\d{4}-\d{2}-\d{2})/u)?.[1] ?? '';
}

function noteDescription(tree: MarkdownRoot): string {
  for (const node of tree.children) {
    if (node.type !== 'paragraph' || isReturnNavigation(node)) continue;
    const text = readableText(node);
    if (!text || /^(?:整理日期|最近整理)\s*[：:]/u.test(text)) continue;
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
    updated: updatedDate(markdown),
    sourcePath,
    readingMinutes: Math.max(1, Math.ceil(cjkCharacters / 350 + otherWords / 220)),
  };
}

export async function getTopics(): Promise<Topic[]> {
  return Promise.all(topics.map(async (topic) => {
    const sourcePath = `resources/${topic.slug}.md`;
    const markdown = await readFile(`${repositoryRoot}/${sourcePath}`, 'utf8');
    return {
      ...topic,
      ...(await renderMarkdown(markdown, sourcePath)),
      entries: extractResources(markdown, topic),
      updated: updatedDate(markdown),
      sourcePath,
    };
  }));
}

export async function getResources(): Promise<Resource[]> {
  return (await getTopics()).flatMap((topic) => topic.entries);
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
