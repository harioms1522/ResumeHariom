/// <reference types="vite/client" />

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
}
