/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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