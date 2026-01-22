/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 5173,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NEXT_PUBLIC_USE_MOCK_ELYSIAN': JSON.stringify(env.NEXT_PUBLIC_USE_MOCK_ELYSIAN ?? 'false')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 700,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('react')) return 'vendor_react';
                if (id.includes('gsap')) return 'vendor_gsap';
                if (id.includes('recharts')) return 'vendor_recharts';
                if (id.includes('framer-motion')) return 'vendor_framer';
                if (id.includes('lucide-react')) return 'vendor_icons';
                if (id.includes('zustand')) return 'vendor_state';
                return 'vendor_misc';
              }
            }
          }
        }
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        css: false,
      }
    };
});
