import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const oldBlog = path.join(root, 'src', 'pages', 'blog', 'blogs', 'nodejs-vs-python-asyncio-comparison.mdx');
const newBlog = path.join(root, 'src', 'content', 'blog', 'nodejs-vs-python-asyncio-comparison.mdx');

const frontmatter = `---
title: Node.js Event Loop vs Python asyncio - A Comprehensive Comparison
slug: nodejs-vs-python-asyncio-comparison
date: 2024-03-25
author: Hariom Sharma
tags: [Node.js, Python, asyncio, Performance, Comparison]
type: blog
description: Compare Node.js Event Loop with Python's asyncio. Understand their architectures, performance characteristics, error handling patterns, and when to use each for optimal results.
readTime: 12 min read
published: true
---

`;

let content = fs.readFileSync(oldBlog, 'utf8');
const alertStart = content.indexOf('<Alert severity="info"');
const body = content.slice(alertStart);
const imports = `import { Typography, Box, Alert, Chip, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CodeBlock from '../../components/CodeBlock';

`;
fs.writeFileSync(newBlog, frontmatter + imports + body, 'utf8');
console.log('Migrated nodejs-vs-python-asyncio-comparison.mdx');
