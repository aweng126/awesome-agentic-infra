import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aweng126.github.io',
  base: '/awesome-agentic-infra',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
