import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
// import resumeLogo from '../assets/images/resume_logo.png';
// import resumeLogoTrans from '../assets/images/logo_transparent.png';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const summaryPoints = [
    {
      icon: <CodeIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />,
      text: "Results-driven Backend Engineer and Cloud Infrastructure Specialist with hands-on experience in designing, building, and managing scalable backend systems and cloud infrastructure for e-commerce and social commerce platforms."
    },
    {
      icon: <SettingsIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />,
      text: "Experienced in end-to-end ownership of Order Management Systems (OMS), CRM, Warehouse Management System (WMS) integrations, and backend architecture."
    },
    {
      icon: <StorageIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />,
      text: "Proven expertise in backend development using Node.js, Python, and SQL/NoSQL databases like MongoDB, MySQL, and Redshift."
    },
    {
      icon: <CloudIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />,
      text: "Skilled in AWS Cloud ecosystem with strong exposure to AWS Glue, AWS DMS, Redshift DB, EKS, ECS, and Terraform for infrastructure automation."
    },
    {
      icon: <SpeedIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />,
      text: "Experienced in ETL development, data pipeline management, and collaboration with BI teams for data-driven solutions."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />,
      text: "Proficient in Docker, Docker Compose, and Kubernetes for containerization and orchestration of microservices-based architecture."
    }
  ];

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: { xs: '60vh', sm: '80vh' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, sm: 8 },
        backgroundColor: 'background.default',
      }}
      id="about"
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, sm: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mb: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="h1"
                component={motion.h1}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 'bold',
                  color: 'primary.main',
                  lineHeight: 1.2,
                }}
              >
                Full Stack Engineer
              </Typography>
              <Typography
                variant="h5"
                component={motion.h5}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                sx={{
                  color: 'text.secondary',
                  mb: { xs: 3, sm: 4 },
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  lineHeight: 1.5,
                }}
              >
                Crafting innovative solutions as a Full Stack Engineer, specializing in backend systems, cloud infrastructure, and scalable architectures to empower modern applications.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
              }}
            >
              {summaryPoints.map((point, index) => (
                <Paper
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: { xs: 2, sm: 3 },
                    // backgroundColor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      borderRadius: 1
                    }}
                  >
                    {point.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    {point.text}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 