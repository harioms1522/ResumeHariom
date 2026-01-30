import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Zeno Health',
    period: 'Feb 2024 – Present',
    description: `Owner of order processing pipelines, CRM, and servers for e-commerce and social commerce. Deep experience designing and setting up Kubernetes (K8s) for microservices. Work closely with BI on ETL using AWS Redshift, DMS, and Glue. Lead backend architecture and server management; drive migration to AWS and warehouse management system integrations.`,
    technologies: ['Node.js', 'MongoDB', 'MySQL', 'Python', 'AWS', 'AWS Glue', 'Redshift', 'Docker', 'Kubernetes', 'Terraform', 'EKS', 'ETL', 'OMS', 'CRM', 'WMS'],
  },
  {
    title: 'Software Engineer',
    company: 'Tablt Pharmacy',
    period: 'June 2023 – Feb 2024',
    description: `Managed and developed CRM and order processing pipelines. Collaborated with product on processes including returns and fulfillment.`,
    technologies: ['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'Kubernetes', 'WMS', 'OMS', 'CRM', 'MySQL'],
  },
  {
    title: 'Backend Engineer',
    company: 'Tablt Pharmacy',
    period: 'June 2022 – June 2023',
    description: `Developed and maintained web applications using Node.js, ensuring scalability, reliability, and performance.`,
    technologies: ['Node.js', 'MongoDB', 'Express', 'jQuery', 'Bootstrap', 'Linux'],
  },
  {
    title: 'Process Analyst (Automation)',
    company: 'Ruptok Fintech Pvt Ltd',
    period: 'June 2021 – June 2022',
    description: `Integrated LSQ with the internal Lead Management System (LMS) using Node.js and MySQL for streamlined opportunity and lead management.`,
    technologies: ['Tableau', 'MySQL', 'Python', 'Node.js'],
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
      transition={{ duration: 0.5 }}
      sx={{ py: { xs: 5, sm: 6 } }}
      id="experience"
    >
      <SectionTitle>Experience</SectionTitle>
      <Grid container spacing={{ xs: 3, sm: 4 }}>
        {experiences.map((exp, index) => (
          <Grid item xs={12} key={index}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              sx={{
                pl: { xs: 0, sm: 2 },
                borderLeft: { xs: 0, sm: 3 },
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.2rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                {exp.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  color: 'text.secondary',
                  mb: 0.5,
                }}
              >
                {exp.company}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1.5,
                  fontSize: '0.875rem',
                }}
              >
                {exp.period}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  lineHeight: 1.65,
                  mb: 2,
                }}
              >
                {exp.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {exp.technologies.map((tech, techIndex) => (
                  <Typography
                    key={techIndex}
                    component="span"
                    variant="body2"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      color: 'text.secondary',
                    }}
                  >
                    {tech}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;
