import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function nodemailerPlugin() {
  return {
    name: 'nodemailer-api',
    configureServer(server: any) {
      server.middlewares.use('/api/send-mail', async (req: any, res: any) => {
        if (req.method === 'POST') {
          try {
            const { handleSendMail } = await import('./server/mailHandler.js')
            await handleSendMail(req, res)
          } catch (err: any) {
            res.statusCode = 500
            res.end(JSON.stringify({ success: false, error: err.message }))
          }
        } else {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), nodemailerPlugin()],

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
        // Split vendor chunks for better caching and smaller main bundle
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-three':  ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
    // Chunk size warning limit in kB
    chunkSizeWarningLimit: 2000,
  },

  // ── CSS ───────────────────────────────────────────────────────
  css: {
    devSourcemap: true,
  },
})
