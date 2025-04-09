import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
// icon for blog button
import BlogIcon from '@mui/icons-material/Article';

import { ThemeContext } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { Link } from 'react-router-dom';

// import resumeLogoTrans from '../assets/images/logo_transparent.png';
import resumeLogoNavBar from '../assets/images/logo_navbar_ready.png';
import resume from '../assets/Resume.pdf';


const Header = () => {
  const navigate = useNavigate();
  const themeCtx = useContext(ThemeContext) as { themeMode: 'light' | 'dark'; toggleTheme: () => void };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];
  // const navItems = ['About', 'Experience', 'Skills', 'Contact'];

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
          onClick={() => { navigate('/') }} // Navigate to home page on logo click
        />
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              color="inherit"
              onClick={() => handleScroll(item)}
              sx={{
                '&:hover': {
                  color: themeCtx.themeMode === 'dark' ? 'primary.main' : 'text.light'
                },
                fontSize: { sm: '0.8rem', md: '0.8rem' }
              }}
            >
              {item}
            </Button>
          ))}
          <Link to={'/blog'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button
              variant="outlined"
              startIcon={<BlogIcon />}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              color="inherit"
              sx={{
                borderRadius: 2,
                borderWidth: 2,
                fontSize: { sm: '0.8rem', md: '0.8rem' },
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Blog
            </Button>
          </Link>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadResume}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            color="inherit"
            sx={{
              borderRadius: 2,
              borderWidth: 2,
              fontSize: { sm: '0.8rem', md: '0.8rem' },
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Resume
          </Button>
          <Button
            variant="outlined"
            onClick={themeCtx.toggleTheme}
            component={motion.button}
            color="inherit"
          >
            {themeCtx.themeMode === 'dark' ? (
              <LightModeIcon color='inherit' />
            ) : (
              <DarkModeIcon color='inherit' />
            )}
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
              sx={{
                fontSize: '1rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Link to={'/blog'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <BlogIcon sx={{ mr: 1 }} />
                Blog
              </Link>
            </MenuItem>
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
            <MenuItem
              onClick={themeCtx.toggleTheme}
              sx={{
                fontSize: '1rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {themeCtx.themeMode === 'dark' ? (
                <LightModeIcon color='inherit' sx={{ mr: 1 }} />
              ) : (
                <DarkModeIcon color='inherit' sx={{ mr: 1 }} />
              )} Mode
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 