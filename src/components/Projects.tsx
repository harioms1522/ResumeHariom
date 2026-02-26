import { Box, Typography, Grid, Paper, Chip, Link, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  links?: ProjectLink[];
}

const projects: Project[] = projectsData as Project[];

const Projects = () => {
  const navigate = useNavigate();
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
      sx={{ py: { xs: 4, sm: 8 }, width: '100%' }}
      id="projects"
    >
      <Typography
        variant="h2"
        component={motion.h2}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        sx={{
          mb: { xs: 3, sm: 5 },
          textAlign: 'left',
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        Projects
      </Typography>
      <Grid container spacing={{ xs: 2.5, sm: 3 }} sx={{ alignItems: 'stretch' }}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * (index + 1), duration: 0.4 }}
              elevation={0}
              onClick={() => navigate(`/projects/${project.slug}`)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2.5, sm: 3 },
                backgroundColor: 'background.paper',
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: 'primary.main',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                },
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 24px -8px rgba(0,0,0,0.12), 0 4px 12px -4px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)',
                  '&::before': { opacity: 1 },
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  mb: 1.5,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  color: 'text.secondary',
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {project.description}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 2 }}>
                {project.highlights.map((highlight, highlightIndex) => (
                  <Typography
                    key={highlightIndex}
                    component="li"
                    variant="body2"
                    sx={{
                      mb: 0.75,
                      color: 'text.secondary',
                      fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      lineHeight: 1.5,
                    }}
                  >
                    {highlight}
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
                      backgroundColor: 'action.hover',
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      height: 26,
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      },
                    }}
                  />
                ))}
              </Box>
              {project.links && project.links.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 'auto' }} onClick={(e) => e.stopPropagation()}>
                  {project.links.map((link, linkIndex) => (
                    <Button
                      key={linkIndex}
                      component={Link}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 1.5,
                        px: 1.5,
                      }}
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