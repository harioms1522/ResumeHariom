import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Link, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import projectsData from '../data/projects.json';
import NotFound from '../components/NotFound';
import K8sQuizGame from '@harioms1522/k8s-quiz-game';

interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  links?: Array<{ label: string; url: string }>;
}

const projects: Project[] = projectsData as Project[];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const renderProjectContent = () => {
    if (slug === 'k8s-quiz-game') {
      return (
        <Box sx={{ mt: 4 }}>
          <K8sQuizGame />
        </Box>
      );
    }
    // For other projects, you can add custom content here
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          {project.description}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
          Highlights
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 2 }}>
          {project.highlights.map((highlight, index) => (
            <Typography
              key={index}
              component="li"
              variant="body2"
              sx={{
                mb: 0.75,
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                lineHeight: 1.6,
              }}
            >
              {highlight}
            </Typography>
          ))}
        </Box>
        {project.links && project.links.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            {project.links.map((link, index) => (
              <Button
                key={index}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  px: 2,
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      <Helmet>
        <title>{project.title} - Projects - Hariom Sharma</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`/projects/${project.slug}`} />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Box sx={{ mb: 3 }}>
          <Link
            component={RouterLink}
            to="/projects"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              '&:hover': { color: 'primary.main', textDecoration: 'underline' },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} /> Back to Projects
          </Link>
        </Box>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </Typography>
        {renderProjectContent()}
      </Container>
    </>
  );
};

export default ProjectDetail;

