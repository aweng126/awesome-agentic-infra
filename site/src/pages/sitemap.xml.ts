import type { APIRoute } from 'astro';
import { getTopics, getResourceProfiles, getNotes, sitePath } from '../lib/content';
import { absoluteSiteUrl, xmlEscape } from '../lib/syndication';

export const GET: APIRoute = async () => {
  const [topics, profiles, notes] = await Promise.all([getTopics(), getResourceProfiles(), getNotes()]);
  const paths = ['', 'resources/', 'notes/', 'sources/', 'changelog/', 'contributing/',
    ...topics.map(item => `topics/${item.slug}/`),
    ...profiles.map(item => `resources/${item.slug}/`),
    ...notes.map(item => `notes/${item.slug}/`),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${xmlEscape(absoluteSiteUrl(sitePath(path)))}</loc></url>`).join('\n')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
