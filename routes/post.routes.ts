import express from "express";
import { createPost, getPosts } from "../controllers/post.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").post(authorization, createPost).get(authorization, getPosts);

export default router;
