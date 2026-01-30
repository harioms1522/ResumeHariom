import { Box, Typography, Grid, Link, IconButton, TextField, Button, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import { useState, FormEvent, useEffect } from 'react';
import resume from '../assets/Resume.pdf';

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

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    if (formSubmitted) {
      const element = document.getElementById('about');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/mzzekjyo', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
        (e.target as HTMLFormElement).reset();
        setFormSubmitted(true);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to send message. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'HariomSharma-SoftwareEngineer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      sx={{ py: { xs: 5, sm: 6 }, pb: 8 }}
      id="contact"
    >
      <SectionTitle>Contact</SectionTitle>

      <Grid container spacing={{ xs: 4, sm: 6 }} alignItems="flex-start">
        <Grid item xs={12} md={7}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
          >
            Send a message
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Have a question or want to work together? Drop me a message.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />
            <TextField
              required
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                alignSelf: 'flex-start',
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: 'text.primary',
                color: 'background.default',
                '&:hover': { backgroundColor: 'text.secondary' },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box
            sx={{
              p: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Connect
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Reach out on socials or email.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Link href="https://github.com/harioms1522" target="_blank" rel="noopener noreferrer" sx={{ color: 'text.secondary' }}>
                <IconButton size="small" sx={{ color: 'inherit', '&:hover': { color: 'text.primary' } }}>
                  <GitHubIcon />
                </IconButton>
              </Link>
              <Link href="https://linkedin.com/in/harioms152" target="_blank" rel="noopener noreferrer" sx={{ color: 'text.secondary' }}>
                <IconButton size="small" sx={{ color: 'inherit', '&:hover': { color: 'text.primary' } }}>
                  <LinkedInIcon />
                </IconButton>
              </Link>
              <Link href="mailto:harioms1522@gmail.com" sx={{ color: 'text.secondary' }}>
                <IconButton size="small" sx={{ color: 'inherit', '&:hover': { color: 'text.primary' } }}>
                  <EmailIcon />
                </IconButton>
              </Link>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadResume}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'text.secondary', backgroundColor: 'action.hover' },
              }}
            >
              Download Resume
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
