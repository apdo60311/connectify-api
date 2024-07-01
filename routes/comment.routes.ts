import express from "express";
import { addComment, deleteComment, updateComment } from "../controllers/comment.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

/**
 * Defines the routes for managing comments.
 *
 * @route POST /
 * @function addComment
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @middleware authorization
 *
 * @route PUT /
 * @function updateComment
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @middleware authorization
 *
 * @route DELETE /
 * @function deleteComment
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @middleware authorization
 */
router.route("/").post(authorization, addComment)
    .put(authorization, updateComment)
    .delete(authorization, deleteComment);;

export default router;
