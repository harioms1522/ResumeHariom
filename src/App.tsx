import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from './components/Header';
import { CustomThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Blog from './pages/blog/Blog';
import { Routes, Route } from 'react-router-dom';
import BlogDetails from './pages/blog/BlogDetails';

function App() {
  return (
    <CustomThemeProvider>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            {/* Uncomment the following line to enable the Home route for any other paths */}
            {/* <Route path="*" element={<Home />} /> */}
          </Routes>
        </Box>
    </CustomThemeProvider>
  );
}

export default App;
