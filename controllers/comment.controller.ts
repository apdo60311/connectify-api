import { UserRequest } from "../entities/request.entity";
import Comment from "../models/comment.model";

import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/response.util";

/**
 * handles adding new comment to a post
 *
 * @param {Request} req 
 * @param {mongoose.ObjectId} req.postId - the post id to add comment to
 * @param {String} req.content
 * @param {Response} res
 * @returns {Promise<Response>} A promise that resolves with the HTTP response.
 */
export const addComment = async (req: Request, res: Response) => {
    const { postId, content } = req.body;

    if (!postId || !content) {
        return res.status(400).json(errorResponse(400, "Comment Error", "comment content cannot be empty"));
    }

    try {
        const comment = new Comment({
            post: postId,
            user: (req as UserRequest).user.id,
            content,
        });

        const createdComment = await comment.save();

        return res.status(200).json(successResponse(200, createdComment, "comment created successfully"))

    } catch (error) {
        return res.status(400).json(errorResponse(400, "Comment Error", `${error}`));
    }

};

export default { addComment }