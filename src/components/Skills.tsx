import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Go', level: 80 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 95 },
      { name: 'MongoDB', level: 90 },
      { name: 'Redis', level: 85 },
      { name: 'Elasticsearch', level: 80 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Docker', level: 95 },
      { name: 'Kubernetes', level: 85 },
      { name: 'CI/CD', level: 90 },
    ],
  },
  {
    title: 'Architecture & Design',
    skills: [
      { name: 'Microservices', level: 95 },
      { name: 'System Design', level: 90 },
      { name: 'API Design', level: 95 },
      { name: 'Security', level: 85 },
    ],
  },
];

const Skills = () => {
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
      id="skills"
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
        Skills
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {skillCategories.map((category, categoryIndex) => (
          <Grid item xs={12} md={6} key={categoryIndex}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + categoryIndex * 0.2 }}
              sx={{
                p: { xs: 2, sm: 3 },
                backgroundColor: 'background.paper',
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                sx={{ 
                  color: 'primary.main', 
                  mb: { xs: 2, sm: 3 },
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                {category.title}
              </Typography>
              {category.skills.map((skill, skillIndex) => (
                <Box key={skillIndex} sx={{ mb: { xs: 1.5, sm: 2 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography 
                      variant="body1"
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                    >
                      {skill.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}
                    >
                      {skill.level}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: 6, sm: 8 },
                      backgroundColor: 'background.default',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.6 + categoryIndex * 0.2 + skillIndex * 0.1,
                      }}
                      sx={{
                        height: '100%',
                        backgroundColor: 'primary.main',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills; 