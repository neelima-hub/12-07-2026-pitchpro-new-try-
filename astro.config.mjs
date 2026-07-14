// @ts-check - force reload 1
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});