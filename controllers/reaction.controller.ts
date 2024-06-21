import Reaction from "../models/reaction.model"
import Post from "../models/post.model"

import { Request, Response } from "express";
import { createNotification } from "./notification.controller"
import { errorResponse, successResponse } from "../utils/response/response.util";
import { UserRequest } from "../entities/request.entity";


export const addReact = async (req: Request, res: Response) => {
    const { postId, commentId } = req.body;

    if (!commentId && !postId) {
        return res.status(400).json(errorResponse(400, "Reaction Error", "commentId or postId must be provided"))
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json(errorResponse(404, "Not Found", "Post not found"))
        }

        const react = await Reaction.findOne({ user: (req as UserRequest).user.id, post: postId, comment: commentId });

        if (react) {
            await react.deleteOne();
            return res.status(200).json(successResponse(200, "", "Reaction removed successfully"));
        } else {
            await Reaction.create({ user: (req as UserRequest).user.id, post: postId, comment: commentId });

            const posterId: string = Object(post.user).toString();

            if (postId) {
                await createNotification(posterId, 'post_like', `${(req as UserRequest).user.name} liked your post`);
            } else {
                await createNotification(posterId, 'comment', `${(req as UserRequest).user.name} liked your comment`);
            }
            return res.status(200).json(successResponse(200, "", "Reaction added successfully"));
        }

    } catch (error) {
        return res.status(400).json(errorResponse(400, "Reaction Error", `${error}`))
    }

};

export default addReact;