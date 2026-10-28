// Portafolio JAJA.DEV — sitio raíz de usuario en GitHub Pages.
// Sin servidores, sin servicios de pago: CDN estático (ADR-001).
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  site: 'https://julianjuarezmx01.github.io',
  base: '/',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  vite: { resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } } },
});
