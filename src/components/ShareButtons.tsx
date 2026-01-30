import { useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

const ShareButtons = ({ url: urlProp, title = "" }: ShareButtonsProps) => {
  const [url, setUrl] = useState(urlProp ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.href) {
      setUrl(window.location.href);
    } else if (urlProp) {
      setUrl(urlProp);
    }
  }, [urlProp]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Tooltip title={copied ? "Copied!" : "Copy link"}>
        <IconButton
          size="small"
          onClick={handleCopy}
          aria-label="Copy link"
          sx={{ color: "text.secondary" }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on X">
        <IconButton
          size="small"
          component="a"
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          sx={{ color: "text.secondary" }}
        >
          <TwitterIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on LinkedIn">
        <IconButton
          size="small"
          component="a"
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          sx={{ color: "text.secondary" }}
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShareButtons;
