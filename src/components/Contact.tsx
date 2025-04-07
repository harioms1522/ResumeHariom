import { Box, Typography, Paper, Grid, Link, IconButton, TextField, Button, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { useState, FormEvent } from 'react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success'
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Grid container spacing={{ xs: 4, sm: 6 }} alignItems="center">
          {/* Form Column */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h5"
              sx={{ 
                color: 'primary.main', 
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                textAlign: 'center'
              }}
            >
              Send a Message
            </Typography>
            <Typography
              variant="body1"
              sx={{ 
                mb: { xs: 3, sm: 4 }, 
                color: 'text.secondary',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                lineHeight: { xs: 1.5, sm: 1.7 },
                textAlign: 'center'
              }}
            >
              Have a question or want to work together? Drop me a message!
            </Typography>
            
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
                mb: { xs: 3, sm: 4 }
              }}
            >
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                required
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  alignSelf: 'flex-start'
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Social Links Column */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: { xs: 3, sm: 4 },
                p: { xs: 2, sm: 3 },
                borderLeft: { md: 1, xs: 'none' },
                borderTop: { xs: 1, md: 'none' },
                borderColor: 'divider',
                mt: { xs: 3, md: 0 },
                ml: { md: 3, xs: 0 },
                pt: { xs: 3, md: 0 },
              }}
            >
              <Typography
                variant="h5"
                sx={{ 
                  color: 'primary.main', 
                  mb: { xs: 2, sm: 3 },
                  fontSize: { xs: '1.3rem', sm: '1.5rem' },
                  textAlign: 'center'
                }}
              >
                Connect With Me
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  mb: { xs: 1, sm: 1 }, 
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: { xs: 1.5, sm: 1.7 },
                  textAlign: 'center'
                }}
              >
                Let's connect on social media or reach out directly via email.
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: { xs: 3, sm: 4 },
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  href="https://github.com/harioms1522"
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
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                    }}
                  >
                    <GitHubIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                  </IconButton>
                </Link>
                <Link
                  href="https://linkedin.com/in/harioms152"
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
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                  </IconButton>
                </Link>
                <Link
                  href="mailto:harioms1522@gmail.com"
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
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                    }}
                  >
                    <EmailIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                  </IconButton>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 