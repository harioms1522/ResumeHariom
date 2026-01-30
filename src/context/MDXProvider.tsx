import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Typography, Box, Alert, Chip, Divider, Paper } from "@mui/material";
import CodeBlock from "../components/CodeBlock";
import CodeSandbox from "../components/CodeSandbox";
import StackBlitz from "../components/StackBlitz";
import RunnableSnippet from "../components/RunnableSnippet";

const MyCustomProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <MDXProvider components={{
            // Enhanced typography components with Montserrat font
            h1: (props: any) => <Typography variant="h3" sx={{ mb: 3, mt: 4, fontWeight: 600, color: 'primary.main', fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: '-0.02em' }} {...props} />,
            h2: (props: any) => <Typography component="h2" variant="h4" sx={{ mb: 2, mt: 3, fontWeight: 600, fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: '-0.02em' }} {...props} />,
            h3: (props: any) => <Typography component="h3" variant="h5" sx={{ mb: 2, mt: 2, fontWeight: 600, fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: '-0.02em' }} {...props} />,
            h4: (props: any) => <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 600, fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: '-0.02em' }} {...props} />,
            h5: (props: any) => <Typography variant="subtitle1" sx={{ mb: 1, mt: 1, fontWeight: 600, fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: '-0.02em' }} {...props} />,
            h6: (props: any) => <Typography variant="subtitle2" sx={{ mb: 1, mt: 1, fontWeight: 600, fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', letterSpacing: '-0.02em' }} {...props} />,
            p: (props: any) => <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }} {...props} />,
            
            // Enhanced list components
            ul: (props: any) => <Box sx={{ mb: 2, pl: 3 }} {...props} />,
            ol: (props: any) => <Box sx={{ mb: 2, pl: 3 }} {...props} />,
            li: (props: any) => <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6 }} {...props} />,
            
            // Enhanced blockquote
            blockquote: (props: any) => (
                <Paper 
                    elevation={1} 
                    sx={{ 
                        p: 2, 
                        mb: 2, 
                        borderLeft: 4, 
                        borderColor: 'primary.main',
                        bgcolor: 'background.paper',
                        fontStyle: 'italic'
                    }} 
                    {...props} 
                />
            ),
            
            // Enhanced code components: inline code
            code: (props: any) => {
                const isBlock = props.className?.startsWith('language-');
                if (isBlock) return null;
                return (
                    <Box
                        sx={{
                            bgcolor: 'grey.100',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontFamily: 'monospace',
                            fontSize: '0.875rem'
                        }}
                        {...props}
                    />
                );
            },
            pre: (props: any) => {
                const child = React.Children.toArray(props.children)?.[0];
                if (React.isValidElement(child) && child.type === 'code') {
                    const className = (child.props as { className?: string }).className ?? '';
                    const lang = className.replace(/^language-/, '') || 'text';
                    const code = (child.props as { children?: string }).children;
                    const codeStr = typeof code === 'string' ? code : (Array.isArray(code) ? code.join('') : String(code ?? ''));
                    return <CodeBlock code={codeStr} language={lang} showLineNumbers />;
                }
                return <Box component="pre" sx={{ mb: 2 }} {...props} />;
            },
            
            // Enhanced table components
            table: (props: any) => (
                <Box 
                    sx={{ 
                        width: '100%', 
                        borderCollapse: 'collapse', 
                        mb: 2,
                        '& th, & td': {
                            border: 1,
                            borderColor: 'divider',
                            p: 1,
                            textAlign: 'left'
                        },
                        '& th': {
                            bgcolor: 'grey.50',
                            fontWeight: 'bold'
                        }
                    }} 
                    {...props} 
                />
            ),
            
            // Custom components for enhanced content
            Alert,
            Chip,
            Divider,
            CodeBlock,
            CodeSandbox,
            StackBlitz,
            RunnableSnippet,
        }}>
            {children}
        </MDXProvider>
    );
}

export default MyCustomProvider;