import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.kingwen.cn',
  base: '/awesome-agentic-infra',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
