import { MDXProvider } from "@mdx-js/react";
import { Typography, Box, Alert, Chip, Divider, Paper, List } from "@mui/material";
import CodeBlock from "../components/CodeBlock";

const MyCustomProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <MDXProvider components={{
            // Enhanced typography components
            h1: (props) => <Typography variant="h3" component="h1" sx={{ mb: 3, mt: 4, fontWeight: 'bold', color: 'primary.main' }} {...props} />,
            h2: (props) => <Typography variant="h4" component="h2" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }} {...props} />,
            h3: (props) => <Typography variant="h5" component="h3" sx={{ mb: 2, mt: 2, fontWeight: 'bold' }} {...props} />,
            h4: (props) => <Typography variant="h6" component="h4" sx={{ mb: 1, mt: 2, fontWeight: 'bold' }} {...props} />,
            h5: (props) => <Typography variant="subtitle1" component="h5" sx={{ mb: 1, mt: 1, fontWeight: 'bold' }} {...props} />,
            h6: (props) => <Typography variant="subtitle2" component="h6" sx={{ mb: 1, mt: 1, fontWeight: 'bold' }} {...props} />,
            p: (props) => <Typography variant="body1" component="p" sx={{ mb: 2, lineHeight: 1.7 }} {...props} />,
            
            // Enhanced list components
            ul: (props) => <Box component="ul" sx={{ mb: 2, pl: 3 }} {...props} />,
            ol: (props) => <Box component="ol" sx={{ mb: 2, pl: 3 }} {...props} />,
            li: (props) => <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.6 }} {...props} />,
            
            // Enhanced blockquote
            blockquote: (props) => (
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
            
            // Enhanced code components
            code: (props) => (
                <Box 
                    component="code" 
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
            ),
            pre: (props) => <Box component="pre" sx={{ mb: 2 }} {...props} />,
            
            // Enhanced table components
            table: (props) => (
                <Box 
                    component="table" 
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
            List
        }}>
            {children}
        </MDXProvider>
    );
}

export default MyCustomProvider;