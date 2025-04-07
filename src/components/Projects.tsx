import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
          <Grid item xs={12} key={index}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.2 }}
              sx={{
                p: { xs: 2, sm: 3 },
                backgroundColor: 'background.paper',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{ 
                  color: 'primary.main', 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                {project.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  mb: { xs: 2, sm: 3 }, 
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: { xs: 1.5, sm: 1.7 }
                }}
              >
                {project.description}
              </Typography>
              <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                {project.highlights.map((highlight, highlightIndex) => (
                  <Typography
                    key={highlightIndex}
                    variant="body2"
                    sx={{ 
                      mb: 1, 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }
                    }}
                  >
                    • {highlight}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.technologies.map((tech, techIndex) => (
                  <Chip
                    key={techIndex}
                    label={tech}
                    size="small"
                    sx={{
                      backgroundColor: 'background.default',
                      color: 'text.primary',
                      fontSize: { xs: '0.75rem', sm: '0.8rem' },
                      height: { xs: 24, sm: 28 },
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'background.default',
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects; 