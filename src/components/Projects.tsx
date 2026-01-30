import { Box, Typography, Grid, Paper, Chip, Link, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import projectsData from '../data/projects.json';

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  links?: ProjectLink[];
}

const projects: Project[] = projectsData as Project[];

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
          <Grid container component="div" key={index}>
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
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: project.links?.length ? 2 : 0 }}>
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
              {project.links && project.links.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.links.map((link, linkIndex) => (
                    <Button
                      key={linkIndex}
                      component={Link}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: 'none' }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects; 