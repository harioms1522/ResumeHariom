import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Box, Tooltip, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useState } from "react";

type CodeBlockProps = {
    code: string;
    language: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const themeCtx = useContext(ThemeContext) as { themeMode: 'light' | 'dark'; toggleTheme: () => void };

    const theme = themeCtx.themeMode === 'dark' ? themes.gruvboxMaterialDark : themes.gruvboxMaterialLight;

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <Box
            sx={{
                position: "relative",
                my: 3,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#1e1e1e",
            }}
        >
            {/* Copy Button */}
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                    <IconButton onClick={handleCopy} size="small" sx={{ color: "white" }}>
                        {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Highlight code={code} language={language} theme={theme}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Box
                        component="pre"
                        className={className}
                        style={{ ...style, padding: "16px", borderRadius: "8px", overflowX: "auto" }}
                    >
                        {tokens.map((line, i) => (
                            <Box key={i} {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </Box>
                        ))}
                    </Box>
                )}
            </Highlight>
        </Box>
    );
};

export default CodeBlock;
