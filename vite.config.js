import { defineConfig } from 'vite';
import glob from 'glob';
import eslint from 'vite-plugin-eslint';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  publicDir: 'public',
  root: 'src',
  build: {
    sourcemap: true,

    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          return null;
        },
        entryFileNames: 'commonHelpers.js',
      },
    },
    outDir: '../dist',
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
    injectHTML({
      tagName: 'load', // Default is `load`
      sourceAttr: 'file', // Default is `src`
    }),
  ],
});
