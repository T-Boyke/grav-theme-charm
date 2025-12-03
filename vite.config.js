import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'css-compiled',
    rollupOptions: {
      input: 'css/input.css',
      output: {
        assetFileNames: `charm.[ext]`
      }
    }
  }
});
