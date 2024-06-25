import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "matthew-ozuna",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "matthew-ozuna",
    project: "exercis-armory"
  })],

  build: {
    sourcemap: true
  }
})