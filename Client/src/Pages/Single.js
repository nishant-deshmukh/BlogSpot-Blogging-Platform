import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";

function Single() {
  const [post, setPost] = useState(null);
  const location = useLocation().search;
  const pathname = window.location.pathname;
  const postId = pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePostDelete = async () => {
    const currentPostId = postId.split("%")[0];
    try {
      await axios.delete(`http://localhost:3000/posts/${currentPostId}`);
      toast.success("Post Deleted Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete post");
      console.log(error);
    }
  };

  const handlePostUpdate = () => {
    const currentPostId = postId.split("%")[0];
    setTimeout(() => {
      navigate(`/write`, {
        state: {
          post: post,
          postid: currentPostId,
        },
      });
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <Container
        // ADDED paddingTop (pt) HERE along with paddingBottom (pb)
        sx={{ display: "flex", alignItems: "center", flexDirection: "column", pt: 4, pb: 4 }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <img style={{ height: "45vh" }} src={post?.img} alt={post.title} />
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.desc }}></p>
          <p style={{ marginTop: "1vh", fontWeight: "500" }}>
            {moment(post.date).fromNow()}
          </p>

          <p style={{ fontWeight: "500" }}>Written By : {post.username}</p>

          {currentUser && currentUser.username === post.username && (
            <Box sx={{ marginTop: "2vh" }}>
              <Button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginRight: "1vw",
                }}
                variant="contained"
                onClick={handlePostUpdate}
              >
                Edit Post
              </Button>
              <Button
                onClick={handlePostDelete}
                color="error"
                variant="contained"
              >
                Delete Post
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Single;