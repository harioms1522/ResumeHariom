import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import BlogIcon from '@mui/icons-material/Article';
import { ThemeContext } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';

import resumeLogoNavBar from '../assets/images/logo_navbar_ready.png';
import resume from '../assets/Resume.pdf';

const navItems = ['About', 'Experience', 'Skills', 'Contact'];

const Header = () => {
  const navigate = useNavigate();
  const themeCtx = useContext(ThemeContext) as { themeMode: 'light' | 'dark'; toggleTheme: () => void };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

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
    link.download = 'HariomSharma-SoftwareEngineer.pdf';
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
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box
          component="img"
          src={resumeLogoNavBar}
          alt="Hariom Sharma"
          sx={{
            width: { xs: 100, sm: 120 },
            height: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        />

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {navItems.map((item) => (
            <Button
              key={item}
              color="inherit"
              onClick={() => handleScroll(item)}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {item}
            </Button>
          ))}
          <Link to="/blog" style={{ textDecoration: 'none' }}>
            <Button
              color="inherit"
              startIcon={<BlogIcon sx={{ fontSize: '1.1rem' }} />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Blog
            </Button>
          </Link>
          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadResume}
            sx={{
              ml: 1,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: 'text.primary',
              color: 'background.default',
              '&:hover': {
                backgroundColor: 'text.secondary',
              },
            }}
          >
            Resume
          </Button>
          <IconButton
            size="small"
            onClick={themeCtx.toggleTheme}
            sx={{ color: 'text.secondary', ml: 0.5 }}
            aria-label="toggle theme"
          >
            {themeCtx.themeMode === 'dark' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={themeCtx.toggleTheme}
            sx={{ color: 'text.secondary' }}
            aria-label="toggle theme"
          >
            {themeCtx.themeMode === 'dark' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>
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
                mt: 1.5,
                minWidth: 200,
                boxShadow: 2,
                '& .MuiMenuItem-root': {
                  fontSize: '0.95rem',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              },
            }}
          >
            {navItems.map((item) => (
              <MenuItem key={item} onClick={() => handleScroll(item)}>
                {item}
              </MenuItem>
            ))}
            <MenuItem
              component={Link}
              to="/blog"
              onClick={handleClose}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <BlogIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              Blog
            </MenuItem>
            <MenuItem onClick={handleDownloadResume}>
              <DownloadIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              Download Resume
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
