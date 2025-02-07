// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  css: {
    postcss: './postcss.config.js',  // This tells Vite to use your PostCSS config file
  },plugins: [
    tailwindcss(),
  ],
});

