export function matchesQuery(text: string, query: string): boolean {
  const normalize = (s: string) => s.normalize('NFKC').toLocaleLowerCase().trim();
  const haystack = normalize(text);
  return normalize(query).split(/\s+/).filter(Boolean).every(word => haystack.includes(word));
}

export function matchesResource(resource: {search:string;topic:string;type:string}, filters: {query:string;topic:string;type:string}): boolean {
  return (filters.topic === 'all' || resource.topic === filters.topic)
    && (filters.type === 'all' || resource.type === filters.type)
    && matchesQuery(resource.search, filters.query);
}
