import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import BlogIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeContext } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';

import resumeLogoNavBar from '../assets/images/logo_navbar_ready.png';
import resume from '../assets/Resume.pdf';

const SECTION_IDS = ['about', 'experience', 'skills', 'contact'] as const;

const navItems = [
  { label: 'About', id: 'about', icon: <PersonIcon /> },
  { label: 'Experience', id: 'experience', icon: <WorkIcon /> },
  { label: 'Skills', id: 'skills', icon: <CodeIcon /> },
  { label: 'Contact', id: 'contact', icon: <MailIcon /> },
];

const drawerWidth = 280;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeCtx = useContext(ThemeContext) as { themeMode: 'light' | 'dark'; toggleTheme: () => void };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHome = location.pathname === '/';

  const handleScrollTo = (id: string) => {
    setScrollTarget(id);
    setMobileOpen(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'HariomSharma-SoftwareEngineer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMobileOpen(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlight: which section is in the "trigger zone" (top ~30% of viewport)
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    const triggerTop = 120;
    const updateActive = () => {
      const sections = SECTION_IDS.map((id) => ({
        id,
        top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity,
      }));
      const passed = sections.filter((s) => s.top <= triggerTop);
      const active = passed.length > 0 ? passed[passed.length - 1].id : SECTION_IDS[0];
      setActiveSection(active);
    };

    updateActive();
    const observer = new IntersectionObserver(
      () => updateActive(),
      { root: null, rootMargin: '-100px 0px -50% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActive);
    };
  }, [isHome]);

  const navLinkSx = (active?: boolean) => ({
    textTransform: 'none',
    fontWeight: active ? 600 : 500,
    fontSize: '0.9375rem',
    color: active ? 'text.primary' : 'text.secondary',
    px: 1.5,
    py: 0.75,
    borderRadius: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: active ? 0 : '50%',
      width: active ? '100%' : 0,
      height: 2,
      bgcolor: 'text.primary',
      transition: 'width 0.2s ease, left 0.2s ease',
    },
    '&:hover': {
      color: 'text.primary',
      backgroundColor: 'action.hover',
      '&::after': { width: '100%', left: 0 },
    },
  });

  const desktopNav = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {isHome &&
        navItems.map((item) => (
          <Button
            key={item.id}
            color="inherit"
            onClick={() => handleScrollTo(item.id)}
            sx={{ ...navLinkSx(activeSection === item.id), position: 'relative' }}
          >
            {item.label}
          </Button>
        ))}
      {!isHome && (
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            color="inherit"
            sx={{ ...navLinkSx(), position: 'relative' }}
          >
            Resume
          </Button>
        </Link>
      )}
      <Link to="/blog" style={{ textDecoration: 'none' }}>
        <Button
          color="inherit"
          sx={{ ...navLinkSx(), position: 'relative' }}
          startIcon={<BlogIcon sx={{ fontSize: '1.1rem' }} />}
        >
          Blog
        </Button>
      </Link>
      <Link to="/projects" style={{ textDecoration: 'none' }}>
        <Button
          color="inherit"
          sx={{ ...navLinkSx(), position: 'relative' }}
          startIcon={<FolderIcon sx={{ fontSize: '1.1rem' }} />}
        >
          Projects
        </Button>
      </Link>
      {/* <Button
        variant="contained"
        onClick={handleDownloadResume}
        startIcon={<DownloadIcon />}
        sx={{
          ml: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          px: 2,
          py: 1,
          borderRadius: 10,
          boxShadow: 0,
          backgroundColor: 'text.primary',
          color: 'background.default',
          '&:hover': {
            backgroundColor: 'text.secondary',
            boxShadow: 0,
          },
        }}
      >
        Resume
      </Button> */}
      <IconButton
        onClick={themeCtx.toggleTheme}
        sx={{
          color: 'text.secondary',
          ml: 0.5,
          '&:hover': { color: 'text.primary', backgroundColor: 'action.hover' },
        }}
        aria-label="toggle theme"
      >
        {themeCtx.themeMode === 'dark' ? (
          <LightModeIcon fontSize="small" />
        ) : (
          <DarkModeIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );

  const mobileDrawer = (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: drawerWidth,
          backgroundColor: 'background.paper',
          borderLeft: 1,
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ py: 2, px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="span" variant="subtitle1" fontWeight={600}>
          Menu
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)} aria-label="close menu" size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 1 }}>
        {isHome &&
          navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleScrollTo(item.id)}
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: isActive ? 'action.selected' : 'transparent',
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? 'text.primary' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        {!isHome && (
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to="/"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Resume" primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={Link}
            to="/blog"
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <BlogIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={Link}
            to="/projects"
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ px: 2, py: 2 }}>
        {/* <Button
          fullWidth
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadResume}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            py: 1.25,
            borderRadius: 2,
            backgroundColor: 'text.primary',
            color: 'background.default',
            '&:hover': { backgroundColor: 'text.secondary' },
          }}
        >
          Download Resume
        </Button> */}
        <IconButton
          onClick={themeCtx.toggleTheme}
          sx={{
            mt: 2,
            color: 'text.secondary',
            border: 1,
            borderColor: 'divider',
            '&:hover': { color: 'text.primary', borderColor: 'text.secondary' },
          }}
          aria-label="toggle theme"
        >
          {themeCtx.themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            isHome && !scrolled
              ? 'transparent'
              : theme.palette.mode === 'dark'
                ? 'rgba(15, 23, 42, 0.82)'
                : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: isHome && !scrolled ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: isHome && !scrolled ? 'none' : 'blur(12px)',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: isHome && !scrolled ? 'transparent' : 'divider',
          transition: 'background-color 0.2s ease, border-color 0.2s ease, backdrop-filter 0.2s ease',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: scrolled ? 64 : { xs: 64, sm: 72 },
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
            px: { xs: 2, sm: 3 },
            transition: 'min-height 0.2s ease',
          }}
        >
          <Box
            component="img"
            src={resumeLogoNavBar}
            alt="Hariom Sharma"
            sx={{
              width: { xs: 110, sm: 130 },
              height: 'auto',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.85 },
            }}
            onClick={() => navigate('/')}
          />

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>{desktopNav}</Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', gap: 0.5 }}>
            <IconButton
              onClick={themeCtx.toggleTheme}
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              aria-label="toggle theme"
            >
              {themeCtx.themeMode === 'dark' ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                color: 'text.primary',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {mobileDrawer}
    </>
  );
};

export default Header;
