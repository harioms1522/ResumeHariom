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
    showLineNumbers?: boolean;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, showLineNumbers = true }) => {
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
                        style={{
                            ...style,
                            padding: "16px",
                            paddingLeft: showLineNumbers ? "3.5em" : "16px",
                            borderRadius: "8px",
                            overflowX: "auto",
                            margin: 0,
                        }}
                        sx={{ position: "relative" }}
                    >
                        {showLineNumbers && (
                            <Box
                                component="span"
                                aria-hidden
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: "2.5em",
                                    padding: "16px 0",
                                    borderRight: "1px solid",
                                    borderColor: "rgba(255,255,255,0.15)",
                                    textAlign: "right",
                                    userSelect: "none",
                                    fontFamily: "monospace",
                                    fontSize: "0.9em",
                                    lineHeight: 1.5,
                                    color: "rgba(255,255,255,0.5)",
                                }}
                            >
                                {tokens.map((_, i) => (
                                    <Box key={i} component="span" sx={{ display: "block" }}>
                                        {i + 1}
                                    </Box>
                                ))}
                            </Box>
                        )}
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
