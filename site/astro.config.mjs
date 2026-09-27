import { defineConfig } from 'astro/config';
import siteConfig from './site.config.json' with { type: 'json' };

export default defineConfig({
  site: siteConfig.origin,
  base: siteConfig.base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
