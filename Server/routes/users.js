import express from "express";
import { getMyPosts } from "../controllers/post.js"; 

const router = express.Router();

router.get("/me/posts", getMyPosts);

export default router;