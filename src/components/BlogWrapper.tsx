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
                    bgcolor: 'rgba(30, 30, 30, 0.95)', // Dark background for better reading
                    color: 'white', // White text color for dark background
                    borderRadius: { xs: 1, sm: 2 },
                    p: { 
                        xs: 2, 
                        sm: 3, 
                        md: 4, 
                        lg: 5 
                    },
                    mx: { xs: 0, sm: 1 },
                    my: { xs: 1, sm: 2 },
                    
                    // White border for dark background
                    border: '2px solid',
                    borderColor: 'white',
                    
                    // Subtle shadow for depth
                    boxShadow: {
                        xs: '0 4px 12px rgba(0,0,0,0.3)',
                        sm: '0 6px 16px rgba(0,0,0,0.3)',
                        md: '0 8px 20px rgba(0,0,0,0.3)',
                    },
                    
                    // Better typography spacing with Montserrat font
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        mb: { xs: 2, sm: 3 },
                        mt: { xs: 3, sm: 4 },
                        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: 'white', // White headings for dark background
                        '&:first-of-type': {
                            mt: 0,
                        }
                    },
                    
                    '& p': {
                        mb: { xs: 2, sm: 3 },
                        lineHeight: { xs: 1.6, sm: 1.7 },
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        color: 'white', // White paragraphs for dark background
                    },
                    
                    '& ul, & ol': {
                        mb: { xs: 2, sm: 3 },
                        pl: { xs: 2, sm: 3 },
                    },
                    
                    '& li': {
                        mb: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        color: 'white', // White list items for dark background
                    },
                    
                    '& blockquote': {
                        my: { xs: 3, sm: 4 },
                        p: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        borderLeft: { xs: 3, sm: 4 },
                        borderColor: 'primary.main',
                        fontStyle: 'italic',
                        color: 'white', // White blockquotes for dark background
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
                        bgcolor: 'rgba(30, 30, 30, 0.95)',
                        color: 'white',
                        borderCollapse: 'collapse',
                        '@media (min-width: 600px)': {
                            display: 'table',
                            whiteSpace: 'normal',
                        },
                    },
                    
                    '& th, & td': {
                        p: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: 'white', // Always white text for dark table theme
                        border: '1px solid rgba(255, 255, 255, 0.2)', // Always white borders
                    },
                    
                    '& th': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)', // Always light background for headers
                        fontWeight: 'bold',
                        color: 'white', // Always white text
                    },
                    
                    '& tr:nth-of-type(even)': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)', // Always subtle alternating rows
                    },
                    
                    '& tr:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)', // Always hover effect
                    },
                
                    // Enhanced spacing for custom components
                    '& .MuiAlert-root': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        color: 'white',
                        bgcolor: 'rgba(30, 30, 30, 0.95)',
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
                        border: '2px solid white', // White border for dark background
                        borderRadius: 0,
                        p: 2,
                        mx: 0,
                        my: 0,
                        bgcolor: 'rgba(30, 30, 30, 1)', // Dark background for printing
                        color: 'white', // White text for printing
                    },
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default BlogWrapper;
