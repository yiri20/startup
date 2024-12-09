import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Proxy backend API requests
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'ws://localhost:4000', // Proxy WebSocket requests
        ws: true,
        changeOrigin: true,
      },
    },
  },
  historyApiFallback: true, // Ensure React Router works
});
