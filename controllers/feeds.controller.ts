import { Request, Response } from 'express';
import Post from '../models/post.model';
import Friend from '../models/friend.model';
import { successResponse, errorResponse } from '../utils/response/response.util';
import { UserRequest } from '../entities/request.entity';

/**
 * Fetches the feed of posts for the logged in user and their friends.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A response containing the fetched posts, or an error response if an error occurred.
 */

export const getFeed = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const pageSize = 10;

    const userId = (req as UserRequest).user.id;

    try {
        const friends = await Friend.find({
            $or: [
                { user1: userId },
                { user2: userId },
            ],
        });

        const friendIds = friends.map(friend =>
            friend.user1.toString() === userId.toString() ? friend.user2 : friend.user1
        );

        const posts = await Post.find({
            user: { $in: [userId, ...friendIds] },
        }).populate('user', 'name').sort({ createdAt: -1 }).skip(pageSize * (page - 1)).limit(pageSize);

        return res.json(successResponse(200, posts, 'Posts fetched successfully'));
    } catch (error) {
        return res.status(500).json(errorResponse(500, JSON.stringify(error), "Error fetching posts"));
    }
};
