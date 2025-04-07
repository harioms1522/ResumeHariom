import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: { xs: '60vh', sm: '80vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: { xs: 2, sm: 4 },
      }}
      id="about"
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          maxWidth: 800,
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          component={motion.h1}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
            mb: { xs: 1, sm: 2 },
            background: 'linear-gradient(45deg, #64ffda 30%, #ff64da 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Software Engineer
        </Typography>
        <Typography
          variant="h5"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          sx={{ 
            mb: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.5rem' },
            color: 'text.secondary' 
          }}
        >
          Crafting robust and scalable backend solutions with modern technologies
        </Typography>
        <Typography
          variant="body1"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: { xs: 1.6, sm: 1.8 }
          }}
        >
          Specialized in building high-performance, secure, and maintainable backend systems
          that power modern applications. Experienced in microservices architecture,
          cloud-native development, and leading engineering teams to deliver exceptional results.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Hero; 