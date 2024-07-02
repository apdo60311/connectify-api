import express from "express";
import { addComment, deleteComment, updateComment } from "../controllers/comment.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

/**
 * Defines the routes for handling comments.
 * - POST /: Adds a new comment with authorization.
 * - PUT /: Updates an existing comment with authorization.
 * - DELETE /: Deletes an existing comment with authorization.
 */
router.route("/").post(authorization, addComment)
    .put(authorization, updateComment)
    .delete(authorization, deleteComment);;

export default router;
