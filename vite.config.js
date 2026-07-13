import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Vite 8 bundles with Rolldown, which only accepts the function form of
        // manualChunks (the old object form throws "Expected Function"). Match on
        // the module's node_modules path and route it to a named chunk.
        manualChunks(id) {
          // Heavy 3D libs get their own chunk so they don't bloat the main bundle.
          if (/[\\/]node_modules[\\/](three|@react-three)[\\/]/.test(id)) {
            return 'three'
          }
          // Core React + routing/animation libs share a vendor chunk.
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom|framer-motion)[\\/]/.test(id)) {
            return 'vendor'
          }
        },
      },
    },
  },
})
