import React, { useContext } from 'react';
import { Container, Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import ShareButtons from './ShareButtons';

export type PostMeta = {
    slug: string;
    type: 'blog' | 'factoid' | 'learned';
    title?: string;
    description?: string;
    date?: string;
    author?: string;
    tags?: string[];
    readTime?: string;
    image?: string;
    published?: boolean;
    contentPath: string;
};

interface BlogWrapperProps {
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    enableAnimations?: boolean;
    postMeta?: PostMeta | null;
}

const BlogWrapper: React.FC<BlogWrapperProps> = ({
    children,
    maxWidth = 'lg',
    enableAnimations = true,
    postMeta,
}) => {
    const themeCtx = useContext(ThemeContext) as { themeMode: 'light' | 'dark'; toggleTheme: () => void } | undefined;
    const isDark = themeCtx?.themeMode === 'dark';

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
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderRadius: { xs: 1, sm: 2 },
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                        lg: 5,
                    },
                    mx: { xs: 0, sm: 1 },
                    my: { xs: 1, sm: 2 },
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: isDark
                        ? '0 4px 12px rgba(0,0,0,0.3)'
                        : '0 1px 3px rgba(0,0,0,0.08)',

                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        mb: { xs: 2, sm: 3 },
                        mt: { xs: 3, sm: 4 },
                        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: 'text.primary',
                        '&:first-of-type': {
                            mt: 0,
                        },
                    },

                    '& p': {
                        mb: { xs: 2, sm: 3 },
                        lineHeight: { xs: 1.6, sm: 1.7 },
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        color: 'text.primary',
                    },

                    '& ul, & ol': {
                        mb: { xs: 2, sm: 3 },
                        pl: { xs: 2, sm: 3 },
                    },

                    '& li': {
                        mb: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        color: 'text.primary',
                    },

                    '& blockquote': {
                        my: { xs: 3, sm: 4 },
                        p: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        borderLeft: { xs: 3, sm: 4 },
                        borderColor: 'primary.main',
                        fontStyle: 'italic',
                        color: 'text.primary',
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
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        borderCollapse: 'collapse',
                        '@media (min-width: 600px)': {
                            display: 'table',
                            whiteSpace: 'normal',
                        },
                    },

                    '& th, & td': {
                        p: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'divider',
                    },

                    '& th': {
                        bgcolor: 'action.hover',
                        fontWeight: 'bold',
                        color: 'text.primary',
                    },

                    '& tr:nth-of-type(even)': {
                        bgcolor: 'action.selected',
                    },

                    '& tr:hover': {
                        bgcolor: 'action.hover',
                    },

                    '& .MuiAlert-root': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        color: 'text.primary',
                        bgcolor: 'background.paper',
                    },

                    '& .MuiChip-root': {
                        mr: { xs: 0.5, sm: 1 },
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },

                    '& .MuiDivider-root': {
                        my: { xs: 3, sm: 4 },
                    },

                    '& .code-block-wrapper': {
                        my: { xs: 2, sm: 3 },
                        borderRadius: { xs: 1, sm: 2 },
                        overflow: 'hidden',
                    },

                    '@media (max-width: 600px)': {
                        p: 1.5,
                        mx: 0,
                        my: 0.5,
                        '& button, & .MuiIconButton-root': {
                            minHeight: 44,
                            minWidth: 44,
                        },
                        '& h1': { fontSize: '1.75rem' },
                        '& h2': { fontSize: '1.5rem' },
                        '& h3': { fontSize: '1.25rem' },
                    },

                    '@media print': {
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 0,
                        p: 2,
                        mx: 0,
                        my: 0,
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                    },
                }}
            >
                {postMeta && (
                    <Box component="header" sx={{ mb: 4, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
                                letterSpacing: '-0.02em',
                                color: 'primary.main',
                                mb: 2,
                            }}
                        >
                            {postMeta.title ?? postMeta.slug}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            {postMeta.date && (
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(postMeta.date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Typography>
                            )}
                            {postMeta.author && (
                                <Typography variant="body2" color="text.secondary">
                                    {postMeta.author}
                                </Typography>
                            )}
                            {postMeta.readTime && (
                                <Typography variant="body2" color="text.secondary">
                                    {postMeta.readTime}
                                </Typography>
                            )}
                        </Box>
                        {postMeta.tags && postMeta.tags.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {postMeta.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        component={Link}
                                        to={`/blog/tag/${encodeURIComponent(tag)}`}
                                        clickable
                                        variant="outlined"
                                        sx={{ textDecoration: 'none', fontSize: '0.75rem' }}
                                    />
                                ))}
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <ShareButtons title={postMeta.title ?? postMeta.slug} />
                        </Box>
                    </Box>
                )}
                {children}
            </Box>
        </Container>
    );
};

export default BlogWrapper;
