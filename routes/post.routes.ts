import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

/**
 * Defines the routes for managing posts.
 * 
 * - `POST /`: Creates a new post with authorization.
 * - `GET /`: Retrieves all posts with authorization.
 * - `PUT /`: Updates an existing post with authorization.
 * - `DELETE /`: Deletes an existing post with authorization.
 */
router.route("/").post(authorization, createPost)
    .get(authorization, getPosts)
    .put(authorization, updatePost)
    .delete(authorization, deletePost);

export default router;
