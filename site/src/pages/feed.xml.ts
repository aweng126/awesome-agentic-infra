import type { APIRoute } from 'astro';
import { getChangelog, sitePath } from '../lib/content';
import { absoluteSiteUrl, absoluteFeedHtml, xmlEscape } from '../lib/syndication';
import siteConfig from '../../site.config.json';

export const GET: APIRoute = async () => {
  const batches = (await getChangelog()).flatMap(entry => entry.batches);
  const feedUrl = absoluteSiteUrl(sitePath('feed.xml'));
  const items = batches.map(batch => {
    const link = absoluteSiteUrl(sitePath(`changelog/#${batch.id}`));
    const publication = batch.time ? `<pubDate>${new Date(`${batch.date}T${batch.time}:00+08:00`).toUTCString()}</pubDate>` : '';
    return `<item><title>${xmlEscape(`${batch.date} · ${batch.title}`)}</title><link>${xmlEscape(link)}</link><guid isPermaLink="true">${xmlEscape(link)}</guid>${publication}<description>${xmlEscape(absoluteFeedHtml(batch.html, link))}</description></item>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xmlEscape(siteConfig.title)} 更新</title><link>${absoluteSiteUrl(sitePath())}</link><description>${xmlEscape(siteConfig.description)}</description><language>zh-CN</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
