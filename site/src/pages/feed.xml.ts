import type { APIRoute } from 'astro';
import { getChangelog, sitePath } from '../lib/content';
import { absoluteSiteUrl, absoluteFeedHtml, xmlEscape } from '../lib/syndication';
import siteConfig from '../../site.config.json';

export const GET: APIRoute = async () => {
  const updates = await getChangelog();
  const feedUrl = absoluteSiteUrl(sitePath('feed.xml'));
  const items = updates.map(update => {
    const link = absoluteSiteUrl(sitePath(`changelog/#${update.id}`));
    const guid = absoluteSiteUrl(sitePath(`changelog/#${update.feedId}`));
    return `<item><title>${xmlEscape(`${update.date} · 资源与站点更新`)}</title><link>${xmlEscape(link)}</link><guid isPermaLink="true">${xmlEscape(guid)}</guid><description>${xmlEscape(absoluteFeedHtml(update.html, link))}</description></item>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xmlEscape(siteConfig.title)} 更新</title><link>${absoluteSiteUrl(sitePath())}</link><description>${xmlEscape(siteConfig.description)}</description><language>zh-CN</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
