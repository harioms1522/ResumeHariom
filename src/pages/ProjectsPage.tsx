import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Projects from "../components/Projects";

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Projects - Hariom Sharma</title>
        <meta name="description" content="Featured projects by Hariom Sharma" />
        <link rel="canonical" href="/projects" />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Projects />
      </Container>
    </>
  );
};

export default ProjectsPage;
