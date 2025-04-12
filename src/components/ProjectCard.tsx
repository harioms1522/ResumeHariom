import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProjectCard({title, description, githubLink, demoLink}: {title: string, description: string, githubLink: string, demoLink: string}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/ResumeHariom/static/images/cards/demo-1.jpg"
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={githubLink} target='blank'>Github</Button>
        <Button size="small" href={demoLink} target='blank'>Live Demo</Button>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
