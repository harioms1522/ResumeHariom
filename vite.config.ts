import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
}

export default defineConfig({
  base: '/ResumeHariom/',
  plugins: [react(), , mdx()],
})