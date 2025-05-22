import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Container, MenuItem, Select, TextField, Typography, Paper } from "@mui/material";

function Write() {
  const navigate = useNavigate();
  const location = useLocation();

  const postIdToEdit = location?.state?.postid;
  const postEdit = location?.state?.post;

  const [categorySelect, setCategorySelect] = useState("");
  const userData = JSON.parse(localStorage.getItem("user"));

  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    img: "",
    date: null,
    uid: null,
    category: "",
  });

  // Initialize form fields when editing
  useEffect(() => {
    if (postIdToEdit && postEdit) {
      setInputs({
        title: postEdit.title || "",
        desc: postEdit.desc || "",
        img: postEdit.img || "",
        date: postEdit.date || null,
        uid: postEdit.uid || null,
        category: postEdit.category || "",
      });
      setCategorySelect(postEdit.category || "");
    }
  }, [postIdToEdit, postEdit]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setCategorySelect(e.target.value);
    setInputs((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const updatedInputs = {
      ...inputs,
      date: newDate,
      uid: userData?.id,
      category: categorySelect,
    };

    try {
      if (postIdToEdit) {
        await axios.put(`/posts/${postIdToEdit}`, updatedInputs);
        toast.success("Post Updated!");
        setTimeout(() => {
          navigate(`/post/${postIdToEdit}`);
        }, 1000);
      } else {
        const res = await axios.post(`/posts`, updatedInputs);
        toast.success("Post Added!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save post");
    }
  };

  if (!userData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          You need to be logged in to create or edit posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          {postIdToEdit ? "Edit Post" : "Create New Post"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 3, height: 400 }}>
            <ReactQuill
              theme="snow"
              value={inputs.desc}
              onChange={(content) => setInputs((prev) => ({ ...prev, desc: content }))}
              style={{ height: "300px" }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            name="img"
            value={inputs.img}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Select
            fullWidth
            value={categorySelect}
            onChange={handleCategoryChange}
            displayEmpty
            sx={{ mb: 3 }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="News">News</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Career">Career</MenuItem>
          </Select>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {postIdToEdit ? "Update Post" : "Publish Post"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Write;