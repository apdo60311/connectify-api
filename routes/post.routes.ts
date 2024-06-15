import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").post(authorization, createPost)
    .get(authorization, getPosts)
    .put(authorization, updatePost)
    .delete(authorization, deletePost);

export default router;
