import { Request, Response } from "express";
import Post from "../models/post.model";
import { UserRequest } from "../entities/request.entity";
import { errorResponse, successResponse } from "../utils/response/response.util";
import { extractMentions } from "../utils/extractMentions.utilty";
import { Multer } from "multer";
import { uploadPostMediaAsRowMulterfile, uploadProfilePicAsMulterfile } from "../utils/storage.utils";

export const createPost = async (req: Request, res: Response) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json(errorResponse(400, "Create Post Error", "Content is required"));
    }

    const mentions = await extractMentions(content);

    try {
        const post = new Post({
            user: (req as UserRequest).user.id,
            content,
            mentions,
        });

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];

        let media: string[] = [];

        if (files) {
            for (const file of files) {
                const profilePicUrl = await uploadPostMediaAsRowMulterfile(file, post.id);
                media.push(profilePicUrl);
            }
        }

        post.media = media;

        const createdPost = await post.save();

        return res.status(200).json(successResponse(200, createdPost, "Post created successfully"));

    } catch (error) {
        return res.status(400).json(errorResponse(400, "Create Post Error", `${error}`));
    }
};


export const updatePost = async (req: Request, res: Response) => {
    const { postId, content, media } = req.body;

    if (!postId) {
        return res.status(400).json(errorResponse(400, "Update Post Error", "PostId is required"));
    }

    if (!content && !media) {
        return res.status(400).json(errorResponse(400, "Update Post Error", "Nothing to update"));
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json(errorResponse(404, "Not Found", "Post not found"));
        }

        const posterId = post.user.toString();
        const userId = (req as UserRequest).user.id.toString();

        if (posterId !== userId) {
            return res.status(400).json(errorResponse(400, "Action denied", "Not authorized"));
        }

        post.content = content || post.content;
        post.media = media || post.media;

        const updatedPost = await post.save();

        return res.status(200).json(successResponse(200, updatedPost, "Post updated successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Update Post Error", `${error}`));
    }

};

export const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json(errorResponse(400, "Delete Post Error", "PostId is required"));
    }

    try {

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json(errorResponse(404, "Not Found", "Post not found"));
        }

        const posterId = post.user.toString();
        const userId = (req as UserRequest).user.id.toString();

        if (posterId !== userId) {
            return res.status(400).json(errorResponse(400, "Action denied", "Not authorized"));
        }

        await Post.findByIdAndDelete(postId);
        return res.status(200).json(successResponse(200, "", "Post deleted successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Delete Post Error", `${error}`));
    }
}

export const getPosts = async (req: Request, res: Response) => {
    const posts = await Post.find({}).populate("user", "name");
    res.json(posts);
};



export default { createPost, getPosts };
