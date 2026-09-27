import { lookup } from 'node:dns/promises';
import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { isIP } from 'node:net';
import { parseDocument } from 'yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

export type AuditState = 'ok' | 'redirected' | 'suspect-broken' | 'needs-review' | 'blocked' | 'not-checked';
export interface LinkReference { slug: string; name: string; source: string }
export interface AuditLink { url: string; references: LinkReference[] }
export interface LinkResult extends AuditLink {
  state: AuditState;
  reason: string;
  attempts: number;
  statusCode?: number;
  finalUrl?: string;
  redirects: { from: string; to: string; statusCode: number }[];
}
export interface FactReview {
  slug: string;
  name: string;
  field: 'reviewedAt' | 'status.checked';
  state: 'missing' | 'stale';
  checked?: string;
  ageDays?: number;
}
export interface AuditResource {
  slug: string;
  name: string;
  reviewedAt?: string;
  statusChecked?: string;
  links: { url: string; source: string }[];
}
export interface AuditReport {
  generatedAt: string;
  mode: 'online' | 'offline';
  maxAgeDays: number;
  resources: number;
  selected: number;
  links: LinkResult[];
  facts: FactReview[];
}

const parser = unified().use(remarkParse).use(remarkGfm);

function date(value: unknown, field: string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(value)
      || !Number.isFinite(Date.parse(`${value}T00:00:00Z`))
      || new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value) {
    throw new Error(`${field}: expected a real YYYY-MM-DD date.`);
  }
  return value;
}

/** Extract every HTTP(S) source in metadata, summary and Markdown, including references. */
export function auditResource(markdown: string, slug: string): AuditResource {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/u.exec(markdown);
  if (!match) throw new Error(`${slug}: YAML frontmatter is required.`);
  const document = parseDocument(match[1], { uniqueKeys: true });
  if (document.errors.length) throw new Error(`${slug}: ${document.errors[0].message}`);
  const data = document.toJS({ maxAliasCount: 100 });
  if (!data || typeof data !== 'object' || Array.isArray(data) || typeof data.name !== 'string'
      || typeof data.summary !== 'string' || typeof data.url !== 'string') {
    throw new Error(`${slug}: metadata needs name, summary and url.`);
  }
  if (!/^https?:\/\//iu.test(data.url)) throw new Error(`${slug}.url: expected an HTTP(S) source.`);
  const links: AuditResource['links'] = [];
  const add = (url: string, source: string) => {
    if (!/^https?:\/\//iu.test(url)) return;
    let parsed: URL;
    try { parsed = new URL(url); } catch { throw new Error(`${slug}.${source}: invalid URL.`); }
    parsed.hash = '';
    links.push({ url: parsed.href, source });
  };
  const walk = (value: unknown, field: string) => {
    if (typeof value === 'string') add(value, field);
    else if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${field}[${index}]`));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => walk(item, field ? `${field}.${key}` : key));
  };
  walk(data, '');
  for (const [source, text] of [['summary', data.summary], ['body', match[2]]]) {
    visit(parser.parse(text), (node) => {
      if (node.type === 'link' || node.type === 'image' || node.type === 'definition') add(node.url, source);
    });
  }
  return { slug, name: data.name, reviewedAt: date(data.reviewedAt, `${slug}.reviewedAt`),
    statusChecked: date(data.status?.checked, `${slug}.status.checked`), links };
}

export function deduplicateLinks(resources: AuditResource[]): AuditLink[] {
  const links = new Map<string, AuditLink>();
  for (const resource of resources) for (const link of resource.links) {
    const record = links.get(link.url) ?? { url: link.url, references: [] };
    if (!record.references.some(reference => reference.slug === resource.slug && reference.source === link.source)) {
      record.references.push({ slug: resource.slug, name: resource.name, source: link.source });
    }
    links.set(link.url, record);
  }
  return [...links.values()];
}

export function pendingFactReviews(resources: AuditResource[], today: string, maxAgeDays: number): FactReview[] {
  const now = Date.parse(`${date(today, 'today')}T00:00:00Z`);
  const reviews: FactReview[] = [];
  for (const resource of resources) {
    for (const [field, checked] of [['reviewedAt', resource.reviewedAt], ['status.checked', resource.statusChecked]] as const) {
      if (!checked) {
        if (field === 'reviewedAt') reviews.push({ slug: resource.slug, name: resource.name, field, state: 'missing' });
        continue;
      }
      const ageDays = Math.floor((now - Date.parse(`${checked}T00:00:00Z`)) / 86_400_000);
      if (ageDays < 0) throw new Error(`${resource.slug}.${field}: review date cannot be in the future.`);
      if (ageDays >= maxAgeDays) reviews.push({ slug: resource.slug, name: resource.name, field, state: 'stale', checked, ageDays });
    }
  }
  return reviews;
}

/** Only public unicast addresses are requestable; mapped/tunnel IPv6 is excluded. */
export function isPublicAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 4) {
    const [a, b, c] = address.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224
      || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)
      || (a === 192 && b === 0 && (c === 0 || c === 2)) || (a === 192 && b === 88 && c === 99)
      || (a === 198 && (b === 18 || b === 19)) || (a === 198 && b === 51 && c === 100)
      || (a === 203 && b === 0 && c === 113));
  }
  if (family === 6) {
    const canonical = new URL(`http://[${address}]/`).hostname.slice(1, -1);
    const [first, second = '0'] = canonical.split(':').map(part => part || '0');
    const a = parseInt(first, 16), b = parseInt(second, 16);
    return a >= 0x2000 && a < 0x4000 && a !== 0x2002
      && !(a === 0x2001 && (b < 0x0200 || b === 0x0db8))
      && !(a === 0x3fff && b < 0x1000);
  }
  return false;
}

export function unsafeUrlReason(value: string): string | undefined {
  let url: URL;
  try { url = new URL(value); } catch { return 'URL 格式无效'; }
  if (!['http:', 'https:'].includes(url.protocol)) return '只巡检 HTTP(S) 链接';
  if (url.username || url.password) return '不访问带凭据的 URL';
  if (/[\s\u0000-\u001f\u007f]/u.test(value)) return 'URL 含空白或控制字符';
  const host = url.hostname.replace(/^\[|\]$/gu, '').replace(/\.$/u, '').toLowerCase();
  if (isIP(host)) return isPublicAddress(host) ? undefined : '不访问本地、私有或保留地址';
  if (!host.includes('.') || /(?:^|\.)(?:localhost|local|internal|lan|home|corp|intranet|test|invalid|example)$/u.test(host)) {
    return '不访问本地、内部或保留主机名';
  }
  return undefined;
}

class BlockedTarget extends Error {}
interface HopResponse { statusCode: number; location?: string }
export type AuditRequest = (url: URL, timeoutMs: number) => Promise<HopResponse>;

/** Resolve, check every answer, and pin the connection to a checked address. */
const requestPublic: AuditRequest = async (url, timeoutMs) => {
  const started = Date.now();
  const hostname = url.hostname.replace(/^\[|\]$/gu, '');
  let timer: ReturnType<typeof setTimeout> | undefined;
  const addresses = await Promise.race([
    lookup(hostname, { all: true }),
    new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('DNS 查询超时')), timeoutMs); }),
  ]).finally(() => clearTimeout(timer));
  if (!addresses.length) throw new Error('DNS 未返回地址');
  if (addresses.some(item => !isPublicAddress(item.address))) throw new BlockedTarget('DNS 返回本地、私有或保留地址');
  const target = addresses.find(item => item.family === 4) ?? addresses[0];
  return new Promise((resolve, reject) => {
    const request = (url.protocol === 'https:' ? httpsRequest : httpRequest)(url, {
      method: 'GET', family: target.family,
      lookup: (_hostname, _options, callback) => callback(null, target.address, target.family),
      headers: { 'User-Agent': 'Awesome-Agentic-Infra-Link-Audit/1.0', Accept: '*/*' },
    }, response => {
      clearTimeout(timeout);
      resolve({ statusCode: response.statusCode ?? 0, location: response.headers.location });
      // Only response headers are needed; do not download papers or repository archives.
      response.destroy();
      request.destroy();
    });
    const timeout = setTimeout(() => request.destroy(new Error('HTTP 请求超时')), Math.max(1, timeoutMs - (Date.now() - started)));
    request.on('error', error => { clearTimeout(timeout); reject(error); });
    request.end();
  });
};

export async function checkAuditLink(link: AuditLink, options: {
  timeoutMs?: number; request?: AuditRequest; sleep?: (ms: number) => Promise<void>;
} = {}): Promise<LinkResult> {
  const request = options.request ?? requestPublic;
  const sleep = options.sleep ?? (ms => new Promise(resolve => setTimeout(resolve, ms)));
  const result: LinkResult = { ...link, state: 'needs-review', reason: '', attempts: 0, redirects: [] };
  let current = link.url;
  const seen = new Set<string>();
  for (let hop = 0; hop <= 5; hop++) {
    const unsafe = unsafeUrlReason(current);
    if (unsafe) return { ...result, state: 'blocked', reason: unsafe, finalUrl: current };
    if (seen.has(current)) return { ...result, reason: '重定向循环，需人工复核', finalUrl: current };
    seen.add(current);
    let response: HopResponse | undefined;
    for (let retry = 0; retry <= 1; retry++) {
      result.attempts++;
      try {
        response = await request(new URL(current), options.timeoutMs ?? 10_000);
        if (response.statusCode < 500 || retry === 1) break;
      } catch (error) {
        if (error instanceof BlockedTarget) return { ...result, state: 'blocked', reason: error.message, finalUrl: current };
        if (retry === 1) return { ...result, reason: `访问异常，需人工复核：${error instanceof Error ? error.message : String(error)}`, finalUrl: current };
      }
      await sleep(350);
    }
    const statusCode = response!.statusCode;
    result.statusCode = statusCode;
    result.finalUrl = current;
    if (statusCode >= 300 && statusCode < 400) {
      if (!response!.location) return { ...result, reason: `HTTP ${statusCode} 未提供跳转地址` };
      let destination: URL;
      try { destination = new URL(response!.location, current); } catch { return { ...result, reason: '重定向地址无效，需人工复核' }; }
      destination.hash = '';
      result.redirects.push({ from: current, to: destination.href, statusCode });
      current = destination.href;
      continue;
    }
    if (statusCode >= 200 && statusCode < 300) return { ...result,
      state: result.redirects.length ? 'redirected' : 'ok', reason: result.redirects.length ? '链接可达；检查是否采用新的官方入口' : '链接可达' };
    if (statusCode === 404 || statusCode === 410) return { ...result, state: 'suspect-broken', reason: `HTTP ${statusCode}，疑似失效；确认迁移或替代入口` };
    return { ...result, reason: `HTTP ${statusCode}，可能为访问限制或临时故障；需人工复核` };
  }
  return { ...result, reason: '超过 5 次重定向，需人工复核', finalUrl: current };
}

export function summarizeAudit(report: AuditReport) {
  const states = Object.fromEntries((['ok', 'redirected', 'suspect-broken', 'needs-review', 'blocked', 'not-checked'] as const)
    .map(state => [state, report.links.filter(link => link.state === state).length])) as Record<AuditState, number>;
  return { resources: report.resources, uniqueLinks: report.links.length, selected: report.selected,
    requested: report.links.filter(link => link.attempts > 0).length, ...states, facts: report.facts.length };
}

export function renderAuditMarkdown(report: AuditReport): string {
  const totals = summarizeAudit(report);
  const text = (value: string) => value.replace(/[&<>|\[\]`]/gu, character => `&#${character.charCodeAt(0)};`).replace(/[\r\n]+/gu, ' ');
  const names = (link: AuditLink) => [...new Set(link.references.map(reference => reference.name))].map(text).join('、');
  const rows = report.links.filter(link => !['ok', 'not-checked'].includes(link.state));
  const labels: Record<AuditState, string> = { ok: '可达', redirected: '重定向', 'suspect-broken': '疑似失效', 'needs-review': '待复核', blocked: '安全限制', 'not-checked': '未巡检' };
  return [
    '# 资源维护报告', '', `生成时间：${report.generatedAt}。模式：${report.mode === 'offline' ? '离线（未发出网络请求）' : '在线'}。`, '',
    `资源 ${totals.resources} 项；去重链接 ${totals.uniqueLinks} 个；本次选择 ${totals.selected} 个；实际请求 ${totals.requested} 个。`,
    `可达 ${totals.ok}，重定向 ${totals.redirected}，疑似失效 ${totals['suspect-broken']}，待复核 ${totals['needs-review']}，安全限制 ${totals.blocked}，未巡检 ${totals['not-checked']}。`, '',
    '403、429、超时和其他访问异常只进入待复核，不据此删除资源。重定向和疑似失效也需要检查官方新入口。', '',
    '## 链接复核', '',
    ...(rows.length ? ['| 结果 | 资源 | 链接 | 说明 |', '| --- | --- | --- | --- |', ...rows.map(link =>
      `| ${labels[link.state]} | ${names(link)} | ${text(link.url)} | ${text(link.reason)}${link.redirects.length ? `；跳转至 ${text(link.finalUrl ?? link.redirects.at(-1)!.to)}` : ''} |`)]
      : [report.mode === 'offline' ? '本次未联网，不能据此判断外部链接是否健康。' : '已请求的链接没有需要复核的结果；未巡检链接不计为通过。']), '',
    '## 事实复核', '',
    `复核周期：${report.maxAgeDays} 天。reviewedAt 表示整条介绍的人工事实复核；status.checked 只对应状态声明。链接可达不会更新这些日期。`, '',
    ...(report.facts.length ? ['| 资源 | 字段 | 上次核验 | 待办 |', '| --- | --- | --- | --- |', ...report.facts.map(fact =>
      `| ${text(fact.name)} | ${fact.field} | ${fact.checked ?? '尚未建档'} | ${fact.state === 'missing' ? '人工核验后建立记录，不回填推测日期' : `已过 ${fact.ageDays} 天，复核后按实际日期更新`} |`)]
      : ['没有达到复核周期的条目。']), '',
    'JSON 报告保留全部结果、跳转链及引用位置。未巡检、访问异常和事实待办不等于内容错误；本报告不自动修改资源。', '',
  ].join('\n');
}
