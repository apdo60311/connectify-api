import Like from "../models/like.model"
import Post from "../models/post.model"

import { Request, Response } from "express";
import { createNotification } from "./notification.controller"
import { errorResponse, successResponse } from "../utils/response/response.util";
import { UserRequest } from "../entities/request.entity";


export const likePost = async (req: Request, res: Response) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json(errorResponse(400, "Reaction Error", "postId must be provided"))
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json(errorResponse(404, "Not Found", "Post not found"))
        }

        const like = await Like.findOne({ user: (req as UserRequest).user.id, post: postId });

        if (like) {
            await like.deleteOne();
            res.json({ message: 'Post unliked' });
        } else {
            await Like.create({ user: (req as UserRequest).user.id, post: postId });

            const posterId: string = Object(post.user).toString();

            await createNotification(posterId, 'post_like', `${(req as UserRequest).user.name} liked your post`);
            res.json({ message: 'Post liked' });
        }

    } catch (error) {
        return res.status(400).json(errorResponse(400, "Reaction Error", `${error}`))
    }

};

export default likePost;