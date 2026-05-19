import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-env-plugin',
      transformIndexHtml(html) {
        return html
          .replace(/%VITE_GOOGLE_VERIFICATION%/g, process.env.VITE_GOOGLE_VERIFICATION || 'your_code_here')
          .replace(/%VITE_BING_VERIFICATION%/g, process.env.VITE_BING_VERIFICATION || 'your_code_here');
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});