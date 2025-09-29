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
                    bgcolor: 'rgba(255, 255, 255, 0.95)', // Soft white with slight transparency
                    borderRadius: { xs: 1, sm: 2 },
                    p: { 
                        xs: 2, 
                        sm: 3, 
                        md: 4, 
                        lg: 5 
                    },
                    mx: { xs: 0, sm: 1 },
                    my: { xs: 1, sm: 2 },
                    
                    // Enhanced shadows and borders for better visual separation
                    boxShadow: {
                        xs: '0 2px 8px rgba(0,0,0,0.08)',
                        sm: '0 4px 12px rgba(0,0,0,0.08)',
                        md: '0 6px 16px rgba(0,0,0,0.08)',
                    },
                    
                    // Subtle border for definition
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    
                    // Add a subtle gradient for depth
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
                    
                    // Dark mode support
                    '@media (prefers-color-scheme: dark)': {
                        bgcolor: 'rgba(30, 30, 30, 0.95)', // Soft dark background
                        background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.98) 0%, rgba(40, 40, 40, 0.95) 100%)',
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        boxShadow: {
                            xs: '0 2px 8px rgba(0,0,0,0.3)',
                            sm: '0 4px 12px rgba(0,0,0,0.3)',
                            md: '0 6px 16px rgba(0,0,0,0.3)',
                        },
                    },
                    
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
                        bgcolor: 'rgba(248, 250, 252, 0.8)', // Soft, natural background
                        fontStyle: 'italic',
                        color: 'text.primary',
                        '@media (prefers-color-scheme: dark)': {
                            bgcolor: 'rgba(50, 50, 50, 0.8)', // Soft dark background
                        },
                    },
                    
                    '& pre': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            height: 8,
                        },
                        '&::-webkit-scrollbar-track': {
                            bgcolor: 'grey.100',
                            borderRadius: 1,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            bgcolor: 'grey.400',
                            borderRadius: 1,
                            '&:hover': {
                                bgcolor: 'grey.500',
                            },
                        },
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
                        backdropFilter: 'blur(10px)', // Add subtle blur effect
                        '&.MuiAlert-standardInfo': {
                            bgcolor: 'rgba(33, 150, 243, 0.08)', // Soft blue
                            color: 'rgb(25, 118, 210)',
                        },
                        '&.MuiAlert-standardSuccess': {
                            bgcolor: 'rgba(76, 175, 80, 0.08)', // Soft green
                            color: 'rgb(56, 142, 60)',
                        },
                        '&.MuiAlert-standardWarning': {
                            bgcolor: 'rgba(255, 152, 0, 0.08)', // Soft orange
                            color: 'rgb(245, 124, 0)',
                        },
                        '&.MuiAlert-standardError': {
                            bgcolor: 'rgba(244, 67, 54, 0.08)', // Soft red
                            color: 'rgb(211, 47, 47)',
                        },
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
                        bgcolor: 'white', // Clean white for printing
                        background: 'white',
                    },
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default BlogWrapper;
