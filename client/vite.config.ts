/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/real-estate-smart-agent',
  plugins: [react()],
  test: {
    includeSource: ["src/**/*.{ts,tsx}"],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    css: true,
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],

      }
    }
  }
})