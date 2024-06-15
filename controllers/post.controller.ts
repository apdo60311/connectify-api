import { Request, Response } from "express";
import Post from "../models/post.model";
import { UserRequest } from "../entities/request.entity";
import { errorResponse, successResponse } from "../utils/response/response.util";

const createPost = async (req: Request, res: Response) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json(errorResponse(400, "Create Post Error", "Content is required"));
    }

    try {
        const post = new Post({
            user: (req as UserRequest).user.id,
            content,
        });

        const createdPost = await post.save();


        return res.status(200).json(successResponse(200, createdPost, "Post created successfully"));

    } catch (error) {
        return res.status(400).json(errorResponse(400, "Create Post Error", `${error}`));
    }
};

const getPosts = async (req: Request, res: Response) => {
    const posts = await Post.find({}).populate("user", "name");
    res.json(posts);
};

export { createPost, getPosts };
