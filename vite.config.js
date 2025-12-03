import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '', // Use relative paths
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', // Output to dist folder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        charm: 'css/input.css',
        site: 'js/site.js'
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});
