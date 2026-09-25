import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // ── Path aliases (mirrors tsconfig paths) ─────────────────────
  resolve: {
    alias: {
      '@':            path.resolve(__dirname, './src'),
      '@components':  path.resolve(__dirname, './src/components'),
      '@sections':    path.resolve(__dirname, './src/components/sections'),
      '@common':      path.resolve(__dirname, './src/components/common'),
      '@layout':      path.resolve(__dirname, './src/components/layout'),
      '@hooks':       path.resolve(__dirname, './src/hooks'),
      '@data':        path.resolve(__dirname, './src/data'),
      '@styles':      path.resolve(__dirname, './src/styles'),
      '@utils':       path.resolve(__dirname, './src/utils'),
    },
  },

  // ── Dev server ────────────────────────────────────────────────
  server: {
    port: 5173,
    host: true,
    open: false,
  },

  // ── Build optimizations ───────────────────────────────────────
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
    // Warn if any chunk exceeds 500kb
    chunkSizeWarningLimit: 500,
  },

  // ── CSS ───────────────────────────────────────────────────────
  css: {
    devSourcemap: true,
  },
})
