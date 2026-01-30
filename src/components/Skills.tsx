import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: 'Backend Development',
    skills: [
      { name: 'Go (Golang)', level: 95 },
      { name: 'Node.js', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'Express', level: 90 },
      { name: 'ETL', level: 90 },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Tailwind CSS', level: 50 },
      { name: 'Bootstrap', level: 50 },
      { name: 'jQuery', level: 80 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', level: 95 },
      { name: 'MongoDB DBA', level: 95 },
      { name: 'MySQL', level: 90 },
      { name: 'AWS Redshift', level: 75 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Docker', level: 95 },
      { name: 'Kubernetes (K8s)', level: 95 },
      { name: 'K8s for Microservices', level: 95 },
      { name: 'CI/CD', level: 90 },
    ],
  },
];

const SectionTitle = ({ children }: { children: string }) => (
  <Typography
    variant="h2"
    sx={{
      fontSize: { xs: '1.5rem', sm: '1.75rem' },
      fontWeight: 600,
      color: 'text.primary',
      mb: { xs: 3, sm: 4 },
      pb: 1,
      borderBottom: 2,
      borderColor: 'divider',
      display: 'inline-block',
    }}
  >
    {children}
  </Typography>
);

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
      transition={{ duration: 0.5 }}
      sx={{ py: { xs: 5, sm: 6 } }}
      id="skills"
    >
      <SectionTitle>Skills</SectionTitle>
      <Grid container spacing={{ xs: 3, sm: 4 }}>
        {skillCategories.map((category, categoryIndex) => (
          <Grid item xs={12} sm={6} md={3} key={categoryIndex}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + categoryIndex * 0.1 }}
              sx={{
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                {category.title}
              </Typography>
              {category.skills.map((skill, skillIndex) => (
                <Box key={skillIndex} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {skill.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      {skill.level}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 6,
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      sx={{
                        height: '100%',
                        backgroundColor: 'text.secondary',
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;
