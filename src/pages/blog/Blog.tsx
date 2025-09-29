import { List, ListItemText, ListItemButton, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet-async";
import BlogWrapper from "../../components/BlogWrapper";


const blogs = [
    {
        "id": 6,
        "title": "Node.js Event Loop vs Python asyncio: A Comprehensive Comparison",
        "slug": "nodejs-vs-python-asyncio-comparison",
        "author": "Hariom Sharma",
        "content": "Compare Node.js Event Loop with Python's asyncio. Understand their architectures, performance characteristics, error handling patterns, and when to use each for optimal results.",
        "date": "2024-03-25",
        "tags": ["Node.js", "Python", "asyncio", "Performance", "Comparison"],
        "readTime": "12 min read"
    },
    {
        "id": 5,
        "title": "Understanding Node.js Event Loop: A Deep Dive",
        "slug": "nodejs-event-loop-deep-dive",
        "author": "Hariom Sharma",
        "content": "Master the Node.js Event Loop - the heart of Node.js's non-blocking I/O operations. Learn about the six phases, microtasks vs macrotasks, and performance optimization techniques.",
        "date": "2024-03-20",
        "tags": ["Node.js", "JavaScript", "Performance", "Asynchronous"],
        "readTime": "8 min read"
    }
]

const Blog = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return (
        <>
            <Helmet>
                <title>Blog - Hariom Sharma</title>
                <meta name="description" content="Hriom Sharma's Blog" />
                <link rel="canonical" href="/" />
                <meta name="keywords" content="Blog, Portfolio, Hariom Sharma, Web Developer" />
                <meta name="author" content="Hariom Sharma" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#1976d2" />
                <meta property="og:title" content="Blog - Hariom Sharma" />
                <meta property="og:description" content="Hriom Sharma's Blog" />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Hariom Sharma" />
                <meta property="og:locale" content="en_US" />
            </Helmet>
            <BlogWrapper maxWidth="lg">
                <Box
                    ref={ref}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    sx={{ py: { xs: 2, sm: 4 } }}
                    id="blog"
                >
                    <Typography
                        variant="h2"
                        component={motion.h2}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        sx={{
                            mb: { xs: 3, sm: 6 },
                            textAlign: 'center',
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Blog
                    </Typography>
                    <Box
                        ref={ref}
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <List sx={{ width: '100%', borderRadius: 2 }}>
                            {blogs.map((blog) => (
                                <ListItemButton 
                                    sx={{ 
                                        borderRadius: 2, 
                                        margin: { xs: 1, sm: 2 },
                                        p: { xs: 2, sm: 3 },
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                            transform: 'translateY(-2px)',
                                            boxShadow: 2,
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                    }} 
                                    component={Link} 
                                    to={`/blog/${blog.slug}`} 
                                    key={blog.id}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography 
                                                variant="h5" 
                                                sx={{ 
                                                    fontWeight: 'bold', 
                                                    color: 'primary.main',
                                                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                                    mb: 1
                                                }}
                                            >
                                                {blog.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box sx={{ mt: 1 }}>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ mb: 1 }}
                                                >
                                                    By {blog.author} on {new Date(blog.date).toLocaleDateString()}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ 
                                                        fontSize: '0.9rem',
                                                        lineHeight: 1.4,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {blog.content}
                                                </Typography>
                                                {blog.readTime && (
                                                    <Typography 
                                                        variant="caption" 
                                                        color="text.secondary"
                                                        sx={{ 
                                                            display: 'block',
                                                            mt: 1,
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'medium'
                                                        }}
                                                    >
                                                        {blog.readTime}
                                                    </Typography>
                                                )}
                                            </Box>
                                        }
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Box>
            </BlogWrapper>
        </>
    );
}

export default Blog;