// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// Canonical origin for canonical tags / sitemap. Override with PUBLIC_SITE_URL
// once the custom domain is live.
const SITE = process.env.PUBLIC_SITE_URL || 'https://illuminate-tuition.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,

  vite: {
    plugins: [tailwindcss()]
  },

  trailingSlash: 'always',
  adapter: vercel()
});
