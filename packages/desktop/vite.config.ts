import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/renderer',
  base: process.env.NODE_ENV !== 'production' ? '/' : './',
  server: {
    port: +process.env.RENDERER_PORT || 7000
  },
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
})
