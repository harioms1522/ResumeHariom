import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Familiar';

const skillCategories: { title: string; skills: { name: string; proficiency: Proficiency }[] }[] = [
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', proficiency: 'Expert' },
      { name: 'Go (Golang)', proficiency: 'Advanced' },
      { name: 'Python', proficiency: 'Advanced' },
      { name: 'Express', proficiency: 'Advanced' },
      { name: 'ETL', proficiency: 'Advanced' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', proficiency: 'Expert' },
      { name: 'MongoDB DBA', proficiency: 'Expert' },
      { name: 'MySQL', proficiency: 'Advanced' },
      { name: 'AWS Redshift', proficiency: 'Proficient' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Docker', proficiency: 'Advanced' },
      { name: 'Kubernetes (K8s)', proficiency: 'Proficient' },
      { name: 'K8s for Microservices', proficiency: 'Proficient' },
      { name: 'AWS', proficiency: 'Advanced' },
      { name: 'CI/CD', proficiency: 'Advanced' },
      // { name: 'Terraform', proficiency: 'Proficient' },
      { name: 'EKS', proficiency: 'Proficient' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', proficiency: 'Proficient' },
      { name: 'jQuery', proficiency: 'Familiar' },
      { name: 'Tailwind CSS', proficiency: 'Proficient' },
      { name: 'Bootstrap', proficiency: 'Familiar' },
    ],
  },
];

const proficiencyColor = (proficiency: Proficiency) => {
  switch (proficiency) {
    case 'Expert':
      return { color: 'text.primary', fontWeight: 600 };
    case 'Advanced':
      return { color: 'text.secondary' };
    case 'Proficient':
      return { color: 'text.secondary' };
    case 'Familiar':
      return { color: 'text.disabled' };
    default:
      return { color: 'text.secondary' };
  }
};

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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, sm: 4 },
        }}
      >
        {skillCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
                mb: 1.5,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {category.title}
            </Typography>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + categoryIndex * 0.08 }}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              {category.skills.map((skill, skillIndex) => (
                <Box
                  key={skillIndex}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 0.25,
                  }}
                >
                  <Chip
                    label={skill.name}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.8125rem',
                      borderColor: 'divider',
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'text.secondary',
                        backgroundColor: 'action.hover',
                      },
                    }}
                  />
                  {/* <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.6875rem',
                      ...proficiencyColor(skill.proficiency),
                    }}
                  >
                    {skill.proficiency}
                  </Typography> */}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Skills;
