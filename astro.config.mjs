import { defineConfig } from 'astro/config';

// The Pages workflow sets SITE and BASE; local runs serve from /.
export default defineConfig({ site: process.env.SITE, base: process.env.BASE || '/' });
