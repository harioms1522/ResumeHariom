import { useParams, Link as RouterLink } from "react-router-dom";
import MyCustomProvider from "../../context/MDXProvider";
import { useState, useEffect, useMemo, useRef } from "react";
import React from "react";
import { Box, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Helmet } from "react-helmet-async";
import NotFound from "../../components/NotFound";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary";
import BlogWrapper from "../../components/BlogWrapper";
import ReadingProgressBar from "../../components/ReadingProgressBar";
import TableOfContents from "../../components/TableOfContents";
import manifest from "virtual:content-manifest";

type PostEntry = (typeof manifest)[number];

const contentModules = import.meta.glob<{ default: React.ComponentType }>("../../content/**/*.mdx");

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [Content, setContent] = useState<React.ComponentType | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const post = useMemo(() => (slug ? manifest.find((p) => p.slug === slug) ?? null : null), [slug]);

  useEffect(() => {
    if (!slug || !post?.contentPath) {
      setContent(null);
      return;
    }
    const path = `../../content/${post.contentPath}`;
    const loader = contentModules[path];
    if (!loader) {
      setContent(null);
      return;
    }
    loader()
      .then((mod) => setContent(() => mod.default))
      .catch(() => setContent(null));
  }, [slug, post?.contentPath]);

  const canonicalUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `https://example.com/blog/${slug}`;

  const sortedByDate = useMemo(() => {
    return [...manifest].sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  }, []);

  const currentIndex = useMemo(() => sortedByDate.findIndex((p) => p.slug === slug), [sortedByDate, slug]);
  const prevPost = useMemo<PostEntry | null>(() => {
    if (currentIndex < 0 || currentIndex >= sortedByDate.length - 1) return null;
    return sortedByDate[currentIndex + 1] ?? null;
  }, [sortedByDate, currentIndex]);
  const nextPost = useMemo<PostEntry | null>(() => {
    if (currentIndex <= 0) return null;
    return sortedByDate[currentIndex - 1] ?? null;
  }, [sortedByDate, currentIndex]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const currentTags = new Set(post.tags ?? []);
    const withSharedTag = manifest.filter(
      (p) => p.slug !== post.slug && (p.tags ?? []).some((t) => currentTags.has(t))
    );
    const byDate = [...withSharedTag].sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    if (byDate.length >= 3) return byDate.slice(0, 3);
    const rest = manifest.filter((p) => p.slug !== post.slug && !byDate.includes(p));
    const restSorted = [...rest].sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    return [...byDate, ...restSorted].slice(0, 3);
  }, [post]);

  return (
    <ErrorBoundaryWrapper>
      <MyCustomProvider>
        {post && Content && <ReadingProgressBar />}
        {post && (
          <Helmet>
            <title>{post.title ?? post.slug} | Blog - Hariom Sharma</title>
            <meta name="description" content={post.description ?? ""} />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={post.title ?? post.slug} />
            <meta property="og:description" content={post.description ?? ""} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={canonicalUrl} />
          </Helmet>
        )}
        <BlogWrapper maxWidth="lg" postMeta={post ?? undefined}>
          <Box sx={{ mb: 3 }}>
            <Link
              component={RouterLink}
              to="/blog"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "text.secondary",
                textDecoration: "none",
                fontSize: "0.9375rem",
                "&:hover": { color: "primary.main", textDecoration: "underline" },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} /> Back to Blog
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            <Box ref={contentRef} component="main" sx={{ flex: 1, minWidth: 0 }}>
              {Content ? React.createElement(Content) : <NotFound />}
            </Box>
            {Content && slug && (
              <Box component="aside" sx={{ width: { md: 220 }, flexShrink: 0 }}>
                <TableOfContents key={slug} contentRef={contentRef} />
              </Box>
            )}
          </Box>
          {Content && post && (
            <>
              {(prevPost || nextPost) && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    gap: 2,
                    mt: 5,
                    pt: 3,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  {prevPost ? (
                    <Link
                      component={RouterLink}
                      to={`/blog/${prevPost.slug}`}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        textDecoration: "none",
                        maxWidth: "50%",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <NavigateBeforeIcon /> {prevPost.title ?? prevPost.slug}
                    </Link>
                  ) : (
                    <span />
                  )}
                  {nextPost ? (
                    <Link
                      component={RouterLink}
                      to={`/blog/${nextPost.slug}`}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        textDecoration: "none",
                        maxWidth: "50%",
                        textAlign: "right",
                        ml: "auto",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {nextPost.title ?? nextPost.slug} <NavigateNextIcon />
                    </Link>
                  ) : null}
                </Box>
              )}
              {relatedPosts.length > 0 && (
                <Box sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: "divider" }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Related posts
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {relatedPosts.map((p) => (
                      <Link
                        key={p.slug}
                        component={RouterLink}
                        to={`/blog/${p.slug}`}
                        sx={{
                          color: "text.primary",
                          textDecoration: "none",
                          "&:hover": { color: "primary.main", textDecoration: "underline" },
                        }}
                      >
                        <Typography variant="subtitle2">{p.title ?? p.slug}</Typography>
                        {p.date && (
                          <Typography variant="caption" color="text.secondary">
                            {new Date(p.date).toLocaleDateString()}
                          </Typography>
                        )}
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}
            </>
          )}
        </BlogWrapper>
      </MyCustomProvider>
    </ErrorBoundaryWrapper>
  );
};

export default BlogDetails;
