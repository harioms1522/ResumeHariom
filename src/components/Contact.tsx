import { Box, Typography, Paper, Grid, Link, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
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
      id="contact"
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
        Contact
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            sx={{
              p: { xs: 2, sm: 4 },
              backgroundColor: 'background.paper',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{ 
                color: 'primary.main', 
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '1.3rem', sm: '1.5rem' }
              }}
            >
              Let's Connect
            </Typography>
            <Typography
              variant="body1"
              sx={{ 
                mb: { xs: 3, sm: 4 }, 
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                lineHeight: { xs: 1.5, sm: 1.7 }
              }}
            >
              I'm always interested in hearing about new projects and opportunities.
              Feel free to reach out through any of the following channels.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 3 } }}>
              <Link
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <IconButton
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: { xs: '1.8rem', sm: '2rem' } }} />
                </IconButton>
              </Link>
              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <IconButton
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: { xs: '1.8rem', sm: '2rem' } }} />
                </IconButton>
              </Link>
              <Link
                href="mailto:your.email@example.com"
                sx={{ textDecoration: 'none' }}
              >
                <IconButton
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                >
                  <EmailIcon sx={{ fontSize: { xs: '1.8rem', sm: '2rem' } }} />
                </IconButton>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact; 