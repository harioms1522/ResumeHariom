import { useState, useMemo, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";
import manifest from "virtual:content-manifest";

type PostTypeFilter = "all" | "blog" | "factoid" | "learned";

type BlogProps = { initialTag?: string };

const Blog = ({ initialTag }: BlogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = (searchParams.get("type") as PostTypeFilter) || "all";
  const tagParam = initialTag ?? searchParams.get("tag") ?? "";
  const [typeFilter, setTypeFilter] = useState<PostTypeFilter>(typeParam);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedTag, setSelectedTag] = useState(tagParam);

  useEffect(() => {
    if (initialTag != null && initialTag !== selectedTag) setSelectedTag(initialTag);
  }, [initialTag]);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const allTags = useMemo(() => {
    const set = new Set<string>();
    manifest.forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = manifest;
    if (typeFilter !== "all") list = list.filter((p) => p.type === typeFilter);
    if (selectedTag) list = list.filter((p) => (p.tags ?? []).includes(selectedTag));
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((p) => {
        const title = (p.title ?? "").toLowerCase();
        const desc = (p.description ?? "").toLowerCase();
        const tags = (p.tags ?? []).join(" ").toLowerCase();
        return title.includes(q) || desc.includes(q) || tags.includes(q);
      });
    }
    return list;
  }, [typeFilter, selectedTag, searchQuery]);

  const handleTypeChange = (_: React.SyntheticEvent, v: PostTypeFilter) => {
    setTypeFilter(v);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (v === "all") next.delete("type");
      else next.set("type", v);
      return next;
    });
  };

  const handleTagClick = (tag: string) => {
    const next = selectedTag === tag ? "" : tag;
    setSelectedTag(next);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (next) p.set("tag", next);
      else p.delete("tag");
      return p;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (e.target.value.trim()) p.set("q", e.target.value.trim());
      else p.delete("q");
      return p;
    });
  };

  const isSmallCard = (type: string) => type === "factoid" || type === "learned";

  return (
    <>
      <Helmet>
        <title>Blog - Hariom Sharma</title>
        <meta name="description" content="Blog for backend engineers - Hariom Sharma" />
        <link rel="canonical" href="/blog" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          ref={ref}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          sx={{ py: { xs: 4, sm: 6 } }}
          id="blog"
        >
          <Typography
            variant="h2"
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            sx={{
              mb: 1,
              textAlign: "center",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Blog
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 1 }}
          >
            For backend engineers, by a backend engineer
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <Typography component="a" href="/feed.xml" variant="caption" color="primary" sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              RSS
            </Typography>
            <Typography component="a" href="/feed.json" variant="caption" color="primary" sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              JSON Feed
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 560, mx: "auto", display: "block", "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Box>

          <Tabs
            value={typeFilter}
            onChange={handleTypeChange}
            sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
            centered
          >
            <Tab label="All" value="all" />
            <Tab label="Blogs" value="blog" />
            <Tab label="Factoids" value="factoid" />
            <Tab label="Learned" value="learned" />
          </Tabs>

          {allTags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3, justifyContent: "center" }}>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagClick(tag)}
                  color={selectedTag === tag ? "primary" : "default"}
                  variant={selectedTag === tag ? "filled" : "outlined"}
                  size="small"
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
          )}

          <Grid container spacing={3}>
            {filtered.map((post, index) => (
              <Grid item xs={12} sm={isSmallCard(post.type) ? 12 : 12} md={isSmallCard(post.type) ? 6 : 12} key={post.slug}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    "&:hover": { boxShadow: 3 },
                    transition: "box-shadow 0.2s ease-in-out",
                  }}
                >
                  <CardActionArea component={Link} to={`/blog/${post.slug}`} sx={{ height: "100%", display: "block", textAlign: "left" }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                        <Chip label={post.type} size="small" sx={{ textTransform: "capitalize", fontSize: "0.75rem" }} />
                        {post.tags?.slice(0, 4).map((t) => (
                          <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                        ))}
                      </Box>
                      <Typography
                        variant={isSmallCard(post.type) ? "h6" : "h5"}
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                          mb: 1,
                          fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {post.title ?? post.slug}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {post.date && new Date(post.date).toLocaleDateString()}
                        {post.author && ` · ${post.author}`}
                      </Typography>
                      {post.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: isSmallCard(post.type) ? 2 : 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.description}
                        </Typography>
                      )}
                      {post.readTime && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                          {post.readTime}
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filtered.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: "center", py: 6 }}>
              No posts match your filters.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Blog;
