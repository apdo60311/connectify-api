import express from "express";
import { addComment } from "../controllers/comment.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").post(authorization, addComment);

export default router;
