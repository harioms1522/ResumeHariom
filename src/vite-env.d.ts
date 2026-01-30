/// <reference types="vite/client" />

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
}

declare module 'virtual:content-manifest' {
  const manifest: Array<{
    slug: string
    type: 'blog' | 'factoid' | 'learned'
    title?: string
    description?: string
    date?: string
    author?: string
    tags?: string[]
    readTime?: string
    image?: string
    published?: boolean
    contentPath: string
  }>
  export { manifest }
  export default manifest
}
