import type { Resource } from './content';

/** Describe the existing destination without inventing additional source URLs. */
export function getResourceSource(resource: Pick<Resource, 'url' | 'type'>): { label: string; host: string } {
  const url = new URL(resource.url);
  const host = url.hostname.replace(/^www\./u, '');
  let label: string;
  if (host === 'github.com') label = 'GitHub';
  else if (resource.type === 'paper') label = '论文原文';
  else if (resource.type === 'spec') label = '协议原文';
  else if (host.startsWith('docs.') || /\/(?:docs|documentation)(?:\/|$)/u.test(url.pathname)) label = '官方文档';
  else if (resource.type === 'project') label = '项目官网';
  else label = '阅读原文';
  return { label, host };
}
