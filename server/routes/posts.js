import express from "express";

import auth from "../middleware/auth.js";
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, getPost, commentPost } from "../controllers/postsController.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
