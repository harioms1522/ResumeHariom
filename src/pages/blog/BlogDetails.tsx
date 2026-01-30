import { useParams } from "react-router-dom";
import MyCustomProvider from "../../context/MDXProvider";
import { useState, useEffect } from "react";
import React from "react";
import NotFound from "../../components/NotFound";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary";
import BlogWrapper from "../../components/BlogWrapper";
import manifest from "virtual:content-manifest";

const contentModules = import.meta.glob<{ default: React.ComponentType }>("../../content/**/*.mdx");

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [Content, setContent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!slug) {
      setContent(null);
      return;
    }
    const post = manifest.find((p) => p.slug === slug);
    if (!post?.contentPath) {
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
  }, [slug]);

  return (
    <ErrorBoundaryWrapper>
      <MyCustomProvider>
        <BlogWrapper maxWidth="lg">
          {Content ? React.createElement(Content) : <NotFound />}
        </BlogWrapper>
      </MyCustomProvider>
    </ErrorBoundaryWrapper>
  );
};

export default BlogDetails;
