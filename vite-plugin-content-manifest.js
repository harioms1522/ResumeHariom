import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIRS = ['blog', 'factoids', 'learned'];
const virtualId = 'virtual:content-manifest';
const resolvedId = '\0' + virtualId;

function buildManifest(root) {
  const contentRoot = path.join(root, 'src', 'content');
  const posts = [];
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(contentRoot, dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter((f) => /\.(mdx?|md)$/.test(f));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const ext = path.extname(file);
      const slugFromFile = path.basename(file, ext);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(raw);
      const slug = frontmatter.slug ?? slugFromFile;
      const type = frontmatter.type ?? dir;
      const published = frontmatter.published !== false;
      if (!published) continue;
      posts.push({
        ...frontmatter,
        slug,
        type,
        contentPath: `${dir}/${path.basename(file)}`,
      });
    }
  }
  posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return posts;
}

function escapeXml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default function contentManifestPlugin() {
  return {
    name: 'content-manifest',
    resolveId(id) {
      if (id === virtualId) return resolvedId;
      return null;
    },
    load(id) {
      if (id !== resolvedId) return null;
      const root = process.cwd();
      const posts = buildManifest(root);
      return `export const manifest = ${JSON.stringify(posts)};
export default manifest;`;
    },
    writeBundle(_, bundle) {
      const root = process.cwd();
      const posts = buildManifest(root);
      const baseUrl = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '');
      const publicDir = path.join(root, 'dist');
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

      const rssItems = posts
        .map((p) => {
          const link = `${baseUrl}/blog/${p.slug}`;
          const title = escapeXml(p.title || p.slug);
          const desc = escapeXml(p.description || '');
          const date = p.date ? new Date(p.date).toUTCString() : '';
          const author = escapeXml(p.author || '');
          const categories = (p.tags || []).map((t) => `    <category>${escapeXml(t)}</category>`).join('\n');
          return `  <item>
    <title>${title}</title>
    <link>${link}</link>
    <description>${desc}</description>
    <pubDate>${date}</pubDate>
    <author>${author}</author>
${categories}
  </item>`;
        })
        .join('\n');

      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hariom Sharma - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Blog for backend engineers</description>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;
      fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss, 'utf8');

      const jsonFeed = {
        version: 'https://jsonfeed.org/version/1.1',
        title: 'Hariom Sharma - Blog',
        home_page_url: `${baseUrl}/blog`,
        feed_url: `${baseUrl}/feed.json`,
        description: 'Blog for backend engineers',
        items: posts.map((p) => ({
          id: `${baseUrl}/blog/${p.slug}`,
          url: `${baseUrl}/blog/${p.slug}`,
          title: p.title || p.slug,
          content_text: p.description || '',
          date_published: p.date || null,
          authors: p.author ? [{ name: p.author }] : undefined,
          tags: p.tags || [],
        })),
      };
      fs.writeFileSync(path.join(publicDir, 'feed.json'), JSON.stringify(jsonFeed, null, 2), 'utf8');
    },
  };
}
