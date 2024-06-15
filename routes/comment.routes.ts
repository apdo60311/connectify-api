import express from "express";
import { addComment, deleteComment, updateComment } from "../controllers/comment.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").post(authorization, addComment)
    .put(authorization, updateComment)
    .delete(authorization, deleteComment);;

export default router;
