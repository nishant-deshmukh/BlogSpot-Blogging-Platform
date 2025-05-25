import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Stack,
  CardActionArea,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";

function Home() {
  const [posts, setposts] = useState([]);
  const location = useLocation();
  const queryParams = location.search;
  const [isHovered, setIsHovered] = useState(false);

  const fabBottom = { xs: 48, md: 70 };
  const fabRight = { xs: 56, md: 80 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts${queryParams}`);
        setposts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.search, location.key]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: "poppins",
              fontWeight: "500",
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
              cursor: "default",
              marginTop: "25px",
              textAlign: 'center',
              color: '#333',
            }}
          >
            Latest Blog Posts
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {posts.map((value) => (
              <Grid
                item
                key={value.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card sx={{
                  width: "100%",
                  maxWidth: 345,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                  }
                }} elevation={2}>
                  <CardActionArea component={Link} to={`/post/${value.id}`}>
                    <CardMedia
                      component="img"
                      image={value.img || 'https://placehold.co/600x400/EEEEEE/333333?text=No+Image'}
                      alt={value.title}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 'bold',
                          minHeight: '3em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {value.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{
                        minHeight: '4.5em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        <div dangerouslySetInnerHTML={{ __html: value.desc ? value.desc.substring(0, 150) + '...' : 'No description available.' }} />
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions sx={{ justifyContent: 'space-between', p: 2, borderTop: '1px solid #eee' }}>
                    <Button size="small" sx={{ color: theme => theme.palette.text.secondary, fontSize: '0.75rem' }}>
                      {moment(value.date).fromNow()}
                    </Button>
                    <Button size="small" sx={{ color: theme => theme.palette.primary.main, fontWeight: 'medium', fontSize: '0.75rem' }}>
                      {value.username}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Fab
        aria-label="add"
        component={Link}
        to="/write"
        sx={{
          position: 'fixed',
          bottom: fabBottom,
          right: fabRight,
          backgroundColor: '#ffffff',
          color: '#000000',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          border: '1px solid #e0e0e0',
          transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out',
          zIndex: 1001,
          '&:hover': {
            backgroundColor: '#f5f5f5',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AddIcon />
      </Fab>

      <Typography
        variant="caption"
        sx={{
          position: 'fixed',
          right: fabRight,
          bottom: {
            xs: `calc(${fabBottom.xs}px - 40px)`,
            md: `calc(${fabBottom.md}px - 40px)`
          },
          transform: isHovered ? 'translate(-50%, 0px)' : 'translate(-50%, -10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#ffffff',
          px: 1,
          py: 0.5,
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
          zIndex: 1000,
        }}
      >
        New Post
      </Typography>
    </div>
  );
}

export default Home;
