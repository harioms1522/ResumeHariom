import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from './components/Header';
import { CustomThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Blog from './pages/blog/Blog';
import BlogDetails from './pages/blog/BlogDetails';
import BlogTag from './pages/blog/BlogTag';
import ProjectsPage from './pages/ProjectsPage';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
  return (
    <CustomThemeProvider>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Box
            component="a"
            href="#main-content"
            sx={{
              position: 'absolute',
              left: -9999,
              zIndex: 9999,
              py: 1.5,
              px: 2.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 600,
              borderRadius: '0 0 4px 0',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              '&:focus': { left: 0, top: 0 },
              '&:focus-visible': { left: 0, top: 0, outline: '2px solid', outlineColor: 'primary.dark', outlineOffset: 2 },
            }}
          >
            Skip to main content
          </Box>
          <Header />
          <Box
            component="main"
            id="main-content"
            tabIndex={-1}
            sx={{ outline: 'none' }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/tag/:tag" element={<BlogTag />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
    </CustomThemeProvider>
  );
}

export default App;
