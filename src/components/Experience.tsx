import { Box, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    title: 'Lead Backend Engineer',
    company: 'Tech Solutions Inc.',
    period: '2020 - Present',
    description: 'Leading a team of backend developers in designing and implementing scalable microservices architecture. Spearheading the migration to cloud-native infrastructure and implementing CI/CD pipelines.',
    technologies: ['Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'MongoDB'],
  },
  {
    title: 'Senior Backend Engineer',
    company: 'Digital Innovations Ltd',
    period: '2018 - 2020',
    description: 'Developed and maintained high-performance REST APIs and microservices. Implemented robust authentication and authorization systems.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ'],
  },
  {
    title: 'Backend Engineer',
    company: 'Web Solutions Co',
    period: '2016 - 2018',
    description: 'Built and optimized database schemas, implemented caching strategies, and developed API endpoints for various client applications.',
    technologies: ['Python', 'Django', 'MySQL', 'Elasticsearch', 'Nginx'],
  },
];

const Experience = () => {
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
        Experience
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {experiences.map((exp, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
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
                  mb: 1,
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                {exp.title}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                {exp.company}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {exp.period}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: { xs: 1.5, sm: 1.7 }
                }}
              >
                {exp.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {exp.technologies.map((tech, techIndex) => (
                  <Paper
                    key={techIndex}
                    sx={{
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.5, sm: 1 },
                      backgroundColor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}
                    >
                      {tech}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience; 