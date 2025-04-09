import { Container } from "@mui/material"
import Hero from "../components/Hero"
import Experience from "../components/Experience"
import Skills from "../components/Skills"
import Contact from "../components/Contact"
// import Projects from "../components/Projects"
import { Helmet } from "react-helmet-async"
import { Box } from "@mui/system"
import { motion } from "framer-motion"

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Resume - Hariom Sharma</title>
                <meta name="description" content="Hriom Sharma's Resume" />
                <link rel="canonical" href="/" />
                <meta name="keywords" content="Resume, Portfolio, Hariom Sharma, Web Developer" />
                <meta name="author" content="Hariom Sharma" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#1976d2" />
                <meta property="og:title" content="Resume - Hariom Sharma" />
                <meta property="og:description" content="Hriom Sharma's Resume" />
                <meta property="og:image" content="https://example.com/image.jpg" />
                <meta property="og:url" content="/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Hariom Sharma" />
                <meta property="og:locale" content="en_US" />
            </Helmet>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box
                    component={motion.div} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <Hero />
                    <Experience />
                    <Skills />
                    {/* <Projects /> */}
                    <Contact />
                </Box>
            </Container>
        </>
    )
}

export default Home;