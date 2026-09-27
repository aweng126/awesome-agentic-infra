export const readingContextKey = 'agentic-infra-reading-context';
export interface ReadingContext { from: string; target: string; scrollY: number; }

export function parseReadingContext(value: unknown, origin: string, libraryPath: string): ReadingContext | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<ReadingContext>;
  if (typeof candidate.from !== 'string' || typeof candidate.target !== 'string' || typeof candidate.scrollY !== 'number') return null;
  try {
    const from = new URL(candidate.from, origin);
    const target = new URL(candidate.target, origin);
    if (from.origin !== origin || from.pathname !== libraryPath || target.origin !== origin
      || !target.pathname.startsWith(libraryPath) || target.pathname === libraryPath
      || !Number.isFinite(candidate.scrollY) || candidate.scrollY < 0) return null;
    return { from: `${from.pathname}${from.search}${from.hash}`, target: target.pathname, scrollY: candidate.scrollY };
  } catch { return null; }
}
