import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Box } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

type CodeBlockProps = {
    code: string;
    language: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const themeCtx = useContext(ThemeContext) as { themeMode: 'light' | 'dark'; toggleTheme: () => void };
    
    const theme = themeCtx.themeMode === 'dark' ? themes.gruvboxMaterialDark : themes.gruvboxMaterialLight;

    return (
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
    );
};

export default CodeBlock;
