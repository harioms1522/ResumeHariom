import React from 'react';
import { Container, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface BlogWrapperProps {
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    enableAnimations?: boolean;
}

const BlogWrapper: React.FC<BlogWrapperProps> = ({ 
    children, 
    maxWidth = 'lg',
    enableAnimations = true 
}) => {
    return (
        <Container 
            maxWidth={maxWidth}
            sx={{
                py: { xs: 2, sm: 3, md: 4 },
                px: { xs: 2, sm: 3, md: 4 },
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            <Box
                component={motion.div}
                initial={enableAnimations ? { opacity: 0, y: 20 } : {}}
                animate={enableAnimations ? { opacity: 1, y: 0 } : {}}
                transition={enableAnimations ? { duration: 0.6, ease: 'easeOut' } : {}}
                sx={{
                    // Enhanced content wrapper with responsive spacing
                    borderRadius: { xs: 1, sm: 2 },
                    p: { 
                        xs: 2, 
                        sm: 3, 
                        md: 4, 
                        lg: 5 
                    },
                    mx: { xs: 0, sm: 1 },
                    my: { xs: 1, sm: 2 },
                    
                    // Better typography spacing with Montserrat font
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        mb: { xs: 2, sm: 3 },
                        mt: { xs: 3, sm: 4 },
                        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        '&:first-of-type': {
                            mt: 0,
                        }
                    },
                    
                    '& p': {
                        mb: { xs: 2, sm: 3 },
                        lineHeight: { xs: 1.6, sm: 1.7 },
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                    },
                    
                    '& ul, & ol': {
                        mb: { xs: 2, sm: 3 },
                        pl: { xs: 2, sm: 3 },
                    },
                    
                    '& li': {
                        mb: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                    },
                    
                    '& blockquote': {
                        my: { xs: 3, sm: 4 },
                        p: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        borderLeft: { xs: 3, sm: 4 },
                        borderColor: 'primary.main',
                        fontStyle: 'italic',
                    },
                    
                    '& pre': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        overflow: 'auto',
                    },
                    
                    '& code': {
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        px: { xs: 0.5, sm: 1 },
                        py: { xs: 0.25, sm: 0.5 },
                    },
                    
                    '& table': {
                        my: { xs: 2, sm: 3 },
                        width: '100%',
                        overflow: 'auto',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        '@media (min-width: 600px)': {
                            display: 'table',
                            whiteSpace: 'normal',
                        },
                    },
                    
                    '& th, & td': {
                        p: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                    },
                    
                    // Enhanced spacing for custom components
                    '& .MuiAlert-root': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                    },
                    
                    '& .MuiChip-root': {
                        mr: { xs: 0.5, sm: 1 },
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    
                    '& .MuiDivider-root': {
                        my: { xs: 3, sm: 4 },
                    },
                    
                    // Better spacing for code blocks
                    '& .code-block-wrapper': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        overflow: 'hidden',
                    },
                    
                    // Enhanced mobile experience
                    '@media (max-width: 600px)': {
                        // Reduce padding on very small screens
                        p: 1.5,
                        mx: 0,
                        my: 0.5,
                        
                        // Better touch targets
                        '& button, & .MuiIconButton-root': {
                            minHeight: 44,
                            minWidth: 44,
                        },
                        
                        // Improved readability
                        '& h1': {
                            fontSize: '1.75rem',
                        },
                        '& h2': {
                            fontSize: '1.5rem',
                        },
                        '& h3': {
                            fontSize: '1.25rem',
                        },
                    },
                    
                    // Print styles
                    '@media print': {
                        boxShadow: 'none',
                        border: 'none',
                        borderRadius: 0,
                        p: 2,
                        mx: 0,
                        my: 0,
                    },
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default BlogWrapper;
