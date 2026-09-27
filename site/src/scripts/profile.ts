import { parseReadingContext, readingContextKey } from '../lib/reading-context';

const profile = document.querySelector<HTMLElement>('[data-resource-profile]');
if (profile) {
  const libraryPath = profile.dataset.libraryPath!;
  let context = parseReadingContext(history.state?.resourceReturn, location.origin, libraryPath);
  try {
    const stored = parseReadingContext(JSON.parse(sessionStorage.getItem(readingContextKey) || 'null'), location.origin, libraryPath);
    const referrer = document.referrer ? new URL(document.referrer) : null;
    if (!context && stored?.target === location.pathname && referrer?.origin === location.origin && referrer.pathname === libraryPath) {
      context = stored;
      history.replaceState({ ...history.state, resourceReturn: context }, '');
      sessionStorage.removeItem(readingContextKey);
    }
  } catch { /* Direct navigation keeps the ordinary library link. */ }
  if (context?.target === location.pathname) {
    for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-library-return]')) {
      link.href = context.from;
      link.addEventListener('click', () => {
        try { sessionStorage.setItem(readingContextKey, JSON.stringify(context)); } catch { /* Query remains in the link. */ }
      });
    }
  }
}
