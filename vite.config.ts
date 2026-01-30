import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import contentManifest from './vite-plugin-content-manifest.js'

// https://vite.dev/config/

export default defineConfig({
  base: '/',
  plugins: [contentManifest(), react(), mdx()],
})