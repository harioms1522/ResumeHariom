import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type RunnableSnippetProps = {
  children: string;
  language?: string;
  title?: string;
};

const RunnableSnippet: React.FC<RunnableSnippetProps> = ({
  children,
  language = "javascript",
  title = "Run in browser",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const run = () => {
    if (!iframeRef.current) return;
    const code = (typeof children === "string" ? children : String(children ?? "")).trim();
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    doc.open();
    const codeJson = JSON.stringify(code);
    doc.write(`
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body>
<pre id="out" style="margin:0;padding:12px;font-family:monospace;font-size:14px;white-space:pre-wrap;"></pre>
<script>
(function() {
  var out = document.getElementById('out');
  var log = function() { out.textContent += Array.prototype.slice.call(arguments).join(' ') + '\\n'; };
  var __code = ${codeJson};
  var orig = console.log;
  console.log = log;
  try {
    ${language === "javascript" ? "eval(__code);" : "log('Only JavaScript is runnable here.');"}
  } catch (e) { log('Error:', e.message); }
  console.log = orig;
})();
</script>
</body></html>
`);
    doc.close();
  };

  return (
    <Box sx={{ my: 3, borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, py: 0.5, bgcolor: "action.hover" }}>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
        <Button size="small" startIcon={<PlayArrowIcon />} onClick={run} sx={{ textTransform: "none", minWidth: 0 }}>
          Run
        </Button>
      </Box>
      <Box component="iframe" ref={iframeRef} title={title} sx={{ width: "100%", height: 120, border: 0, display: "block", bgcolor: "grey.100" }} />
    </Box>
  );
};

export default RunnableSnippet;
