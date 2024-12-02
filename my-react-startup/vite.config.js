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
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        ws: true, // proxy websockets if necessary
        onProxyReq: (proxyReq, req, res) => {
          console.log(`Proxying request to: ${req.url}`);
        },
        onError: (err, req, res) => {
          console.error(`Error in proxy: ${err.message}`);
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.end('Something went wrong with the proxy server.');
        },
      },
    },
  },
});
