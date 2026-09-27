import { appendFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { auditResource, checkAuditLink, deduplicateLinks, pendingFactReviews, renderAuditMarkdown, summarizeAudit,
  unsafeUrlReason, type AuditReport, type LinkResult } from '../src/lib/resource-audit';
import { loadResourceCatalog } from '../src/lib/resource-catalog';

const options = { offline: false, limit: Infinity, concurrency: 4, timeoutMs: 10_000, maxAgeDays: 90, outDir: 'reports/resource-audit' };
const args = process.argv.slice(2);
for (let index = 0; index < args.length; index++) {
  const argument = args[index];
  if (argument === '--offline') { options.offline = true; continue; }
  if (argument === '--help') {
    console.log('resources:audit [--offline] [--limit N] [--concurrency 1..8] [--timeout-ms 1000..30000] [--max-age-days N] [--out-dir PATH]');
    process.exit(0);
  }
  const value = args[++index];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${argument}.`);
  if (argument === '--out-dir') { options.outDir = value; continue; }
  const fields = { '--limit': 'limit', '--concurrency': 'concurrency', '--timeout-ms': 'timeoutMs', '--max-age-days': 'maxAgeDays' } as const;
  if (!Object.hasOwn(fields, argument)) throw new Error(`Unknown option: ${argument}.`);
  const field = fields[argument as keyof typeof fields];
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || (field === 'concurrency' && number > 8)
      || (field === 'timeoutMs' && (number < 1_000 || number > 30_000))) throw new Error(`Invalid value for ${argument}.`);
  options[field] = number;
}

const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
// Reuse the publication schema so malformed resource metadata is a configuration error.
await loadResourceCatalog(repositoryRoot);
const directory = `${repositoryRoot}/resources/items`;
const filenames = (await readdir(directory)).filter(name => name.endsWith('.md')).sort();
if (!filenames.length) throw new Error('No resource documents found.');
const resources = await Promise.all(filenames.map(async filename => auditResource(await readFile(`${directory}/${filename}`, 'utf8'), filename.slice(0, -3))));
const generatedAt = new Date().toISOString();
const reviewDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(generatedAt));
const facts = pendingFactReviews(resources, reviewDate, options.maxAgeDays);
const links = deduplicateLinks(resources);
const selected = Math.min(links.length, options.limit);
const results: LinkResult[] = links.map(link => ({ ...link, state: 'not-checked',
  reason: options.offline ? '离线运行，未发出网络请求' : '未纳入本次 limit 范围', attempts: 0, redirects: [] }));
let next = 0;
const deadline = Date.now() + 15 * 60_000;
await Promise.all(Array.from({ length: options.concurrency }, async () => {
  while (next < selected && Date.now() < deadline) {
    const index = next++;
    const unsafe = unsafeUrlReason(links[index].url);
    if (unsafe) results[index] = { ...results[index], state: 'blocked', reason: unsafe };
    else if (!options.offline) results[index] = await checkAuditLink(links[index], { timeoutMs: options.timeoutMs });
  }
}));
for (let index = next; index < selected; index++) results[index].reason = '巡检时间预算耗尽，本次未请求';
const report: AuditReport = { generatedAt, mode: options.offline ? 'offline' : 'online', maxAgeDays: options.maxAgeDays,
  resources: resources.length, selected, links: results, facts };
const summary = summarizeAudit(report);
const markdown = renderAuditMarkdown(report);
const outDir = resolve(options.outDir);
await mkdir(outDir, { recursive: true });
await writeFile(`${outDir}/report.json`, `${JSON.stringify({ ...report, summary }, null, 2)}\n`);
await writeFile(`${outDir}/report.md`, markdown);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);
console.log(JSON.stringify({ ...summary, mode: report.mode, reports: outDir }));
if (summary['needs-review'] || summary['suspect-broken'] || summary.blocked) {
  console.warn('Audit completed with link findings. Review report.md; these results do not certify link health or block deployment.');
}
if (!options.offline && selected > 0 && summary.ok + summary.redirected === 0) {
  console.error('No selected link was confirmed reachable. Reports were saved, but the online audit cannot be considered successful.');
  process.exitCode = 2;
}
