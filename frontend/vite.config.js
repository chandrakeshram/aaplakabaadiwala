import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the proxy configuration
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // The URL of your backend server
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      },
    },
  },
});
