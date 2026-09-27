const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase().trim();

export function matchesQuery(text: string, query: string): boolean {
  const haystack = normalize(text);
  return normalize(query).split(/\s+/).filter(Boolean).every(word => haystack.includes(word));
}

/** Rank names ahead of incidental mentions, keeping the original order for ties. */
export function searchRank(title: string, query: string): number {
  const name = normalize(title);
  const needle = normalize(query);
  if (!needle) return 0;
  if (name === needle) return 3;
  if (name.startsWith(needle)) return 2;
  return name.includes(needle) ? 1 : 0;
}

export function matchesResource(resource: {search:string;topic:string;type:string;role?:string;delivery?:string}, filters: {query:string;topic:string;type:string;role?:string;delivery?:string}): boolean {
  return (filters.topic === 'all' || resource.topic === filters.topic)
    && (filters.type === 'all' || resource.type === filters.type)
    && (!filters.role || filters.role === 'all' || resource.role === filters.role)
    && (!filters.delivery || filters.delivery === 'all' || resource.delivery === filters.delivery)
    && matchesQuery(resource.search, filters.query);
}
