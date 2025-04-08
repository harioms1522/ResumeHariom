import { Container, List, ListItemText, ListItemButton, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const blogs = [
    {
        "id": 1,
        "title": "Getting Started with React",
        "slug": "getting-started-with-react",
        "author": "Hariom Sharma",
        "content": "React is a JavaScript library for building user interfaces. In this blog, we'll explore the basics of React and how to get started with it.",
        "date": "2024-01-05"
    },
    {
        "id": 2,
        "title": "Understanding React Router",
        "slug": "understanding-react-router",
        "author": "Hariom Sharma",
        "content": "React Router helps in building single-page applications with navigation. Let's learn how to set it up and use dynamic routes.",
        "date": "2024-02-10"
    },
    {
        "id": 3,
        "title": "Dark Mode using MUI",
        "slug": "dark-mode-using-mui",
        "author": "Hariom Sharma",
        "content": "Material UI makes it super easy to implement dark mode using ThemeProvider and context API. Let's implement it step by step.",
        "date": "2024-03-15"
    },
    {
        "id": 4,
        "title": "Optimize React Performance",
        "slug": "optimize-react-performance",
        "author": "Hariom Sharma",
        "content": "React provides hooks like useMemo, useCallback, and React.memo to optimize performance. Learn where and how to use them effectively.",
        "date": "2024-04-01"
    }
]

const Blog = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box
                ref={ref}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                sx={{ py: { xs: 4, sm: 8 } }}
                id="experience"
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
                    // sx={{ py: { xs: 4, sm: 8 } }}
                    id="experience"
                >
                    <List sx={{ width: '100', bgcolor: 'background.paper', borderRadius: 2 }}>
                        {blogs.map((blog) => (
                            <ListItemButton sx={{ borderRadius: 2 }} component={Link} to={`/blog/${blog.slug}`} key={blog.id}>
                                <ListItemText 
                                    primary={blog.title} 
                                    secondary={`By ${blog.author} on ${new Date(blog.date).toLocaleDateString()}`
                                } />
                            </ListItemButton>
                        ))}
                    </List>

                </Box>

            </Box>
        </Container>
    );
}

export default Blog;