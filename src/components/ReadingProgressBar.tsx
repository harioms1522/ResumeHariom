import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, (scrollTop / docHeight) * 100);
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        bgcolor: "action.hover",
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${progress}%`,
          bgcolor: "primary.main",
          transition: "width 0.1s ease-out",
        }}
      />
    </Box>
  );
};

export default ReadingProgressBar;
