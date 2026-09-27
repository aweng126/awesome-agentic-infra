import siteConfig from '../../site.config.json';

export function xmlEscape(value: string): string {
  return value.replace(/[<>&"']/gu, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]!));
}

export function absoluteSiteUrl(path: string): string {
  return new URL(path, siteConfig.origin).href;
}

/** Feed readers need absolute URLs, including links to anchors within a batch. */
export function absoluteFeedHtml(html: string, permalink: string): string {
  return html.replace(/\b(href|src)="([^"]*)"/gu, (_match, attribute, value: string) => {
    const decoded = value.replace(/&amp;/gu, '&');
    const url = new URL(decoded, permalink);
    return `${attribute}="${xmlEscape(url.href)}"`;
  });
}
