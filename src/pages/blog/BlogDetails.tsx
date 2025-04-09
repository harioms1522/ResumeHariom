import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import MyCustomProvider from "../../context/MDXProvider";
import { useState, useEffect } from "react";
import React from "react";
import NotFound from "../../components/NotFound";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary";

const BlogDetails = () => {
    const prams = useParams<{ slug: string }>();
    const { slug } = prams;
    
    const [Content , setContent] = useState(null);

    useEffect(()=>{
        const fetchContent = async () =>{
            try {
                const module = await import(`./blogs/${slug}.mdx`);
                setContent(() => module.default);
            } catch (error) {
                console.error("Error loading content:", error);
            }
        }
        fetchContent();
    }, [slug])
    

    return (
        <ErrorBoundaryWrapper>
            <MyCustomProvider>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {Content ? React.createElement(Content) : <NotFound />}
                </Container>
            </MyCustomProvider>        
        </ErrorBoundaryWrapper>
    );
}

export default BlogDetails;