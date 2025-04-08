import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
const BlogDetails = () => {

    const prams = useParams<{ id: string }>();
    const { id } = prams;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <h1>Blog Details</h1>
            <p>This is the blog details page.</p>
            <p>Blog ID: {id}</p>
            <p>More details about the blog will be displayed here.</p>
        </Container>
    );
}

export default BlogDetails;