import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'E-commerce Microservices Platform',
    description: 'Designed and implemented a scalable e-commerce platform using microservices architecture. Handles 100k+ daily transactions with 99.9% uptime.',
    technologies: ['Node.js', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    highlights: [
      'Implemented distributed caching system',
      'Built real-time inventory management',
      'Developed order processing pipeline',
    ],
    githubLink: "https://github.com/massgravel/Microsoft-Activation-Scripts",
    demoLink: "https://github.com/massgravel/Microsoft-Activation-Scripts"
  },
  {
    title: 'Financial Data Processing System',
    description: 'Created a high-performance system for processing and analyzing financial data in real-time. Processes 1M+ records per second.',
    technologies: ['Python', 'PostgreSQL', 'Apache Kafka', 'Elasticsearch', 'GCP'],
    highlights: [
      'Real-time data processing pipeline',
      'Advanced analytics engine',
      'Automated reporting system',
    ],
    githubLink: "https://github.com/massgravel/Microsoft-Activation-Scripts",
    demoLink: "https://github.com/massgravel/Microsoft-Activation-Scripts"
  },
  {
    title: 'API Gateway & Authentication Service',
    description: 'Developed a secure and scalable API gateway with centralized authentication. Serves 50+ microservices with 99.99% availability.',
    technologies: ['Go', 'JWT', 'OAuth2', 'Redis', 'Prometheus', 'Grafana'],
    highlights: [
      'JWT-based authentication',
      'Rate limiting and throttling',
      'Request/Response transformation',
    ],
    githubLink: "https://github.com/massgravel/Microsoft-Activation-Scripts",
    demoLink: "https://github.com/massgravel/Microsoft-Activation-Scripts"
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      sx={{ py: { xs: 4, sm: 8 } }}
      id="projects"
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
        Projects
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProjectCard
              title={project.title}
              description={project.description}
              githubLink={project.githubLink || '#'}
              demoLink={project.demoLink || '#'}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects; 