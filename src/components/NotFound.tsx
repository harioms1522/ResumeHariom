import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h4" sx={{ mt: 2 }}>
        Oops! Page not found.
      </Typography>

      <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
        The page you are looking for might have been removed or does not exist.
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
