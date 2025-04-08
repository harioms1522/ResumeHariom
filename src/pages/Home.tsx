import { Container } from "@mui/material"
import Hero from "../components/Hero"
import Experience from "../components/Experience"
import Skills from "../components/Skills"
import Contact from "../components/Contact"
// import Projects from "../components/Projects"

const Home = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Hero />
            <Experience />
            <Skills />
            {/* <Projects /> */}
            <Contact />
        </Container>
    )
}

export default Home;