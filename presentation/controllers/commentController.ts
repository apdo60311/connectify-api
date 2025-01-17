import { UserRequest } from "../../domain/entities/RequestEntity";
import Comment from "../../data/datasources/mongodb/models/Comment";

import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../core/utils/response/responseUtils";
import { createNotification } from "./notificationController";
/**
 *  Adds a new comment to a post
 *
 * @param  req 
 * @param req.postId - the post id to add comment to
 * @param req.content
 * @param res
 * @returns A promise that resolves with the HTTP response.
 */
export const addComment = async (req: Request, res: Response) => {
    const { postId, content, parentComment } = req.body;

    if (!postId || !content) {
        return res.status(400).json(errorResponse(400, "Comment Error", "comment content cannot be empty"));
    }

    try {

        const post = await Comment.findById(postId);
        if (!post) {
            return res.status(404).json(errorResponse(404, "Comment Error", "post not found"));
        }

        const comment = new Comment({
            post: postId,
            user: (req as UserRequest).user.id,
            content,
            parentComment,
        });


        let parentCommentObject;

        if (parentComment) {
            parentCommentObject = await Comment.findById(parentComment);
        }

        await comment.save();

        const posterId: string = Object(post.user).toString();

        // send notification to the poster
        await createNotification(posterId, 'comment', `${(req as UserRequest).user.id} has recenetly commentted on your post`);

        // send notification to mentioned user
        if (parentCommentObject) {
            const parentCommentUserId = parentCommentObject.id;
            await createNotification(parentCommentUserId, 'mention', `${(req as UserRequest).user.id} has mentioned you in comments`);
        }

        return res.status(200).json(successResponse(200, comment, "comment created successfully"))

    } catch (error) {
        return res.status(400).json(errorResponse(400, "Comment Error", `${error}`));
    }

};

/**
 *  Updatess exisiting comment on a post
 *
 * @param req 
 * @param req.commentId - the comment id to edit
 * @param req.content
 * @param res
 * @returns A promise that resolves with the HTTP response.
 */
export const updateComment = async (req: Request, res: Response) => {
    const { commentId, content } = req.body;

    if (!content) {
        return res.status(400).json(errorResponse(400, "Comment Update Error", "comment content cannot be empty"));
    }

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json(errorResponse(404, "Comment Error", "comment not found"));
        }

        const commenterId = comment.user.toString();
        const userId = (req as UserRequest).user.id.toString();

        if (commenterId !== userId) {
            return res.status(400).json(errorResponse(400, "Action denied", "Not authorized"));
        }

        comment.content = content || comment.content;

        const updatedComment = await comment.save();
        return res.status(200).json(successResponse(200, updatedComment, "comment updated successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Update Comment Error", `${error}`));
    }

};

/**
 *  Deletes exisiting comment from a post
 *
 * @param req 
 * @param req.commentId - the comment id to delete.
 * @param res
 * @returns A promise that resolves with the HTTP response.
 */
export const deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.body;

    if (!commentId) {
        return res.status(400).json(errorResponse(400, "Delete Comment Error", "comment id is required"));
    }


    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json(errorResponse(404, "Comment Error", "comment not found"));
        }

        const commenterId = comment.user.toString();
        const userId = (req as UserRequest).user.id.toString();

        if (commenterId !== userId) {
            return res.status(400).json(errorResponse(400, "Action denied", "Not authorized"));
        }

        const deletedComment = await comment.deleteOne();
        return res.status(200).json(successResponse(200, deletedComment, "Comment deleted successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Delete Comment Error", `${error}`));
    }

};

export default { addComment, updateComment, deleteComment }