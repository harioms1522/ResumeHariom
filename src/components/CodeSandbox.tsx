import React from "react";
import { Box, Typography } from "@mui/material";

type CodeSandboxProps = {
  id: string;
  title?: string;
  view?: "preview" | "editor";
};

const CodeSandbox: React.FC<CodeSandboxProps> = ({ id, title = "CodeSandbox", view = "preview" }) => {
  const embedUrl = `https://codesandbox.io/embed/${id}?view=${view}`;
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
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </Box>
  );
};

export default CodeSandbox;
