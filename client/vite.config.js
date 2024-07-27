import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: '../server/public', // Ensure your build output goes to the server's public directory
    emptyOutDir: true,
  },
});
