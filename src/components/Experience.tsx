import { Box, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Zeno Health',
    period: 'Feb 2024 - Present',
    description: `As the owner of the order processing pipelines, CRM, and servers, I have been working on the company's e-commerce and social commerce division. I have been working closely with the BI team to support the ETL using AWS Redshift, DMS, and Glue. I have also been in charge of backend architecture and server management. I have overseen numerous significant projects involving the conversion of backend architecture to AWS and the integration of warehouse management systems, among other things`,
    technologies: ['Node.js', 'MongoDB', 'MySQL', 'Python', 'Python Data Pipeline', 'NoSQL', 'Backend', 'React.js', 'AWS', 'AWS Glue', 'Warehouse Management System', 'CRM', 'Redshift DB', 'Docker', 'Docker Compose', 'Kubernetes', 'Terraform', 'EKS', 'EC2', 'ETL Development', 'Order Management System', 'MongoDB DBA', 'AWS Cloud', 'AWS DMS'],
  },
  {
    title: 'Software Engineer',
    company: 'Tablt Pharmacy',
    period: 'June 2023 - Feb 2024',
    description: `Managed and developed the CRM and order processing pipelines. Worked closely with the product to design several processes like the return etc.`,
    technologies: ['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'Docker', 'Docker Compose', 'Kubernetes', 'Warehouse Management System', 'Order Management System', 'CRM', 'MySQL', 'Python Data Pipeline', 'Python Data Analysis'],
  },
  {
    title: 'Backend Engineer',
    company: 'Tablt Pharmacy',
    period: 'June 2022 - June 2023',
    description: `Developed and maintained web applications using Node, ensuring scalability, reliability, and 
performance.`,
    technologies: ['Node.js', 'MongoDB', 'Express', 'jQuery', 'Bootstrap', 'Linux'],
  },
  {
    title: 'Process Analyst (Automation)',
    company: 'Ruptok Fintech Pvt Ltd',
    period: 'June 2021 – June 2022',
    description: `Leveraged Node.js and MySQL to seamlessly integrate LSQ with the organization's internal Lead
 Management System (LMS), enabling streamlined management of all opportunities and leads.`,
    technologies: ['Tableau', 'MySQL', 'Python', 'Node.js'],
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