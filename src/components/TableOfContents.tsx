import { useState, useEffect, useRef } from "react";
import { Box, Link, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export type TocItem = { id: string; text: string; level: number };

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

const TableOfContents = ({ contentRef }: TableOfContentsProps) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observedRef = useRef(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || observedRef.current) return;
    observedRef.current = true;

    const collect = () => {
      const headings = el.querySelectorAll("h2, h3");
      const list: TocItem[] = [];
      headings.forEach((node, i) => {
        const text = (node.textContent ?? "").trim();
        if (!text) return;
        let id = node.id;
        if (!id) {
          id = slugify(text) || `heading-${i}`;
          node.id = id;
        }
        list.push({
          id,
          text,
          level: node.tagName === "H2" ? 2 : 3,
        });
      });
      setItems(list);
    };

    collect();
    const t = setTimeout(collect, 100);
    const observer = new MutationObserver(collect);
    observer.observe(el, { childList: true, subtree: true });
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [contentRef]);

  if (items.length === 0) return null;

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          mb: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          component="button"
          onClick={() => setMobileOpen((o) => !o)}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            border: 0,
            bgcolor: "action.hover",
            cursor: "pointer",
            font: "inherit",
            color: "text.primary",
          }}
        >
          <Typography variant="subtitle2">On this page</Typography>
          <IconButton size="small" aria-label={mobileOpen ? "Collapse" : "Expand"}>
            {mobileOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={mobileOpen}>
          <Box sx={{ p: 1.5, pt: 0 }}>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                sx={{
                  display: "block",
                  py: 0.5,
                  pl: item.level === 3 ? 2 : 0,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {item.text}
              </Link>
            ))}
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: 24,
          alignSelf: "flex-start",
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          On this page
        </Typography>
        <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              sx={{
                pl: item.level === 3 ? 2 : 0,
                fontSize: "0.8125rem",
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {item.text}
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TableOfContents;
