import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions, // Keep CardActions import if you use it for "Read More" or future additions
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Stack,
  CircularProgress,
  Alert,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import { AuthContext } from "../Context/AuthContext"; // Ensure this path is correct

function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext); // Get current user from AuthContext
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Function to fetch user's posts
  const fetchMyPosts = async () => {
    setLoading(true);
    setError(null);

    if (!currentUser) {
      setError("You need to be logged in to view your posts.");
      setLoading(false);
      return;
    }

    try {
      // API endpoint for fetching user's posts
      const response = await axios.get("/users/me/posts", { withCredentials: true });
      setMyPosts(response.data);
    } catch (err) {
      console.error("Error fetching user posts:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          setError("Your session has expired or you are not authorized. Please log in again.");
          // Optionally, redirect to login or clear user context here
        } else {
          setError(`Failed to load posts: ${err.response.data.message || err.message}`);
        }
      } else {
        setError("Network error or server is unreachable. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [currentUser]); // Re-fetch when currentUser changes (e.g., after login/logout)

  // NOTE: handleDeleteClick, handleCloseDeleteDialog, confirmDelete are kept
  // because you might want to move these actions to the single post view page.
  // If not, you can remove them entirely from MyPosts.js if not used.
  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPostToDelete(null);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      await axios.delete(`/api/posts/${postToDelete}`, { withCredentials: true });
      setMyPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      handleCloseDeleteDialog();
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(`Failed to delete post: ${err.response?.data || err.message}`);
      handleCloseDeleteDialog();
    }
  };

  // Helper function to decode HTML entities and truncate for description
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading your posts...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        {!currentUser && (
          <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
            Go to Login
          </Button>
        )}
      </Container>
    );
  }

  if (!myPosts || myPosts.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">You haven't created any posts yet.</Alert>
        <Button component={Link} to="/write" variant="contained" sx={{ mt: 2 }}>
          Create Your First Post
        </Button>
      </Container>
    );
  }

  return (
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
          My Blog Posts
        </Typography>
      </Stack>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {myPosts.map((post) => (
            <Grid
              item
              key={post.id}
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
                {/* CardActionArea for the main post link (image and content) */}
                <CardActionArea component={Link} to={`/post/${post.id}`}>
                  <CardMedia
                    component="img"
                    image={post.img || 'https://placehold.co/600x400/EEEEEE/333333?text=No+Image'}
                    alt={post.title}
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
                      {post.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{
                      minHeight: '4.5em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      <div dangerouslySetInnerHTML={{ __html: getText(post.desc).substring(0, 150) + '...' }} />
                    </Typography>
                  </CardContent>
                </CardActionArea>

                {/* CardActions section - only for date and username, mimicking Home.js */}
                <CardActions sx={{ justifyContent: 'space-between', p: 2, borderTop: '1px solid #eee' }}>
                    <Button size="small" sx={{ color: theme => theme.palette.text.secondary, fontSize: '0.75rem' }}>
                        {moment(post.date).fromNow()}
                    </Button>
                    <Button size="small" sx={{ color: theme => theme.palette.primary.main, fontWeight: 'medium', fontSize: '0.75rem' }}>
                        {post.username} {/* Assuming post object includes username */}
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Delete Confirmation Dialog (kept for potential future use on single post page) */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyPosts;