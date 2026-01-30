import React from "react";
import { Box, Typography } from "@mui/material";

type StackBlitzProps = {
  id?: string;
  projectId?: string;
  url?: string;
  title?: string;
};

const StackBlitz: React.FC<StackBlitzProps> = ({
  id,
  projectId,
  url,
  title = "StackBlitz",
}) => {
  const embedId = id ?? projectId;
  const embedUrl = embedId
    ? `https://stackblitz.com/edit/${embedId}?embed=1`
    : url
      ? `${url}${url.includes("?") ? "&" : "?"}embed=1`
      : "";
  if (!embedUrl) return null;
  return (
    <Box sx={{ my: 3, borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", px: 1, py: 0.5 }}>
        {title}
      </Typography>
      <Box
        component="iframe"
        src={embedUrl}
        title={title}
        sx={{
          width: "100%",
          height: 400,
          border: 0,
          borderRadius: 0,
        }}
      />
    </Box>
  );
};

export default StackBlitz;
