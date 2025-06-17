import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.googletagmanager.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https: https://ssl.gstatic.com https://www.gstatic.com;
        connect-src 'self' https://sheets.googleapis.com https://www.googleapis.com https://content.googleapis.com https://accounts.google.com;
        frame-src 'self' https://accounts.google.com https://content.googleapis.com https://content-sheets.googleapis.com https://*.google.com;
        frame-ancestors 'self' https://accounts.google.com https://content.googleapis.com https://content-sheets.googleapis.com https://*.google.com;
        report-uri /api/report-csp-violation;
      `.replace(/\s+/g, ' ').trim()
    }
  }
});
