import { Request, Response } from "express";
import Post from "../../data/datasources/mongodb/models/Post";
import { UserRequest } from "../../domain/entities/RequestEntity";
import { errorResponse, successResponse } from "../../core/utils/response/responseUtils";
import { extractMentions } from "../../core/utils/extractMentions.utilty";
import { uploadPostMediaAsRowMulterfile, uploadProfilePicAsMulterfile } from "../../core/utils/storage.utils";

/**
 * Creates a new post with the provided content and media files.
 *
 * @param req - The Express request object 
 * @param req.body.content - the post content
 * @param res - The Express response object, used to send the created post or an error response.
 * @returns A JSON response with the created post or an error response.
 */
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

/**
 * Updates an existing post with the provided content and media files.
 *
 * @param req - The Express request object
 * @param req.body.postId - the ID of the post to update
 * @param req.body.content - the updated post content
 * @param req.body.media - the updated post media files
 * @param res - The Express response object, used to send the updated post or an error response.
 * @returns A JSON response with the updated post or an error response.
 */
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

/**
 * Deletes an existing post by the authenticated user.
 *
 * @param req - The Express request object
 * @param req.body.postId - the ID of the post to delete
 * @param res - The Express response object, used to send a success or error response.
 * @returns A JSON response indicating whether the post was deleted successfully or an error response.
 */
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

/**
 * Retrieves all posts and populates the user's name.
 *
 * @param req - The Express request object.
 * @param res - The Express response object, used to send the posts.
 * @returns A JSON response containing all the posts.
 */
export const getPosts = async (req: Request, res: Response) => {
    const posts = await Post.find({}).populate("user", "name");
    res.json(posts);
};



export default { createPost, getPosts };
