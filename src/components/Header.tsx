import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
// import resumeLogoTrans from '../assets/images/logo_transparent.png';
import resumeLogoNavBar from '../assets/images/logo_navbar_ready.png';
import resume from '../assets/Resume.pdf';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  // const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];
  const navItems = ['About', 'Experience', 'Skills', 'Contact'];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = (section: string) => {
    setScrollTarget(section.toLowerCase());
    handleClose();
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollTarget(null);
    }
  }, [scrollTarget]);

  return (
    <AppBar 
      position="sticky" 
      sx={{ boxShadow: 'none' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={resumeLogoNavBar}
          alt="Resume Logo"
          sx={{
            width: { xs: '120px', sm: '150px' },
            height: 'auto',
          }}
          onClick={() => handleScroll('About')}
        />
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              color="inherit"
              onClick={() => handleScroll(item)}
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
                fontSize: { sm: '0.9rem', md: '1rem' }
              }}
            >
              {item}
            </Button>
          ))}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadResume}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            sx={{
              ml: 2,
              borderRadius: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Resume
          </Button>
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: 'background.paper',
                color: 'text.primary',
                mt: 1,
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: 'background.default',
                  },
                },
              },
            }}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item}
                onClick={() => handleScroll(item)}
                sx={{
                  fontSize: '1rem',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item}
              </MenuItem>
            ))}
            <MenuItem
              onClick={handleDownloadResume}
              sx={{
                fontSize: '1rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <DownloadIcon sx={{ mr: 1 }} /> Resume
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 