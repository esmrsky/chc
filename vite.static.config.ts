import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Static build for GitHub Pages (esmrsky.github.io/chc/).
// The Revival page is a pure client component, so it ships as a plain SPA —
// no RSC, no Worker. Asset paths in the source are relative, so they resolve
// correctly under the /chc/ sub-path as well as at a domain root.
export default defineConfig({
  base: '/chc/',
  plugins: [react()],
  root: 'static',
  publicDir: false,
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
});
