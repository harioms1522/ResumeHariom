import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import resume from '../assets/Resume.pdf';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'HariomSharma-SoftwareEngineer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 6, sm: 8 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
      id="about"
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            component={motion.h1}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            sx={{
              fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '-0.02em',
              mb: 0.5,
            }}
          >
            Hariom Sharma
          </Typography>
          <Typography
            variant="h2"
            component={motion.h2}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            sx={{
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              fontWeight: 500,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Full Stack Engineer
          </Typography>
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem' },
              color: 'text.secondary',
              lineHeight: 1.7,
              maxWidth: 540,
              mb: 3,
            }}
          >
            Backend & cloud specialist building scalable systems. Specialist in Go (Golang), Node.js, Python, AWS, and modern DevOps. Deep experience setting up Kubernetes (K8s) for microservices. Focus on order management, CRM, ETL, and microservices.
          </Typography>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadResume}
              sx={{
                px: 2.5,
                py: 1.25,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9375rem',
                backgroundColor: 'text.primary',
                color: 'background.default',
                '&:hover': {
                  backgroundColor: 'text.secondary',
                },
              }}
            >
              Download Resume
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              onClick={scrollToContact}
              sx={{
                px: 2.5,
                py: 1.25,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9375rem',
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'text.secondary',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
