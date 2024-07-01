import { UserRequest } from "../entities/request.entity";
import FriendRequest from "../models/friendrequest.model";
import User from "../models/user.model";
import { createNotification } from "../controllers/notification.controller"
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/response.util";
import Friend from "../models/friend.model";

/**
 * send friend request to a user.
 *
 * @param req - The Express request object, containing the `recipientId`.
 * @param res - The Express response object, used to send the response.
 * @returns - A success or error response with the sent friend request.
 */
export const sendFriendRequest = async (req: Request, res: Response) => {
    const { recipientId } = req.body;

    if (!recipientId) {
        return res.status(400).json(errorResponse(400, "Incomplete Data", "The provided data is not complete"));
    }

    try {
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json(errorResponse(404, "Not Found", "User Not Found"));
        }


        const existingFriend = await FriendRequest.findOne({
            $or: [
                { user1: (req as UserRequest).user.id, user2: recipientId },
                { user1: recipientId, user2: (req as UserRequest).user.id },
            ],
        });

        if (existingFriend) {
            return res.status(400).json(errorResponse(400, "Friend Request Error", "Already friends or friend request is already sent"));
        }

        const friendRequest = await FriendRequest.create({
            requester: (req as UserRequest).user.id,
            recipient: recipientId,
        });

        await friendRequest.save();

        await createNotification(recipientId, 'friend_request', `${(req as UserRequest).user.name} sent you a friend request`);
        return res.status(200).json(successResponse(200, friendRequest, "Friend request sent"));

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Friend Request Error", `${error}`));
    }

};

/**
 * Responds to a friend request by updating the status of the request and creating a new friend relationship if the request is accepted.
 *
 * @param req - The Express request object, containing the `requestId` and `status` in the request body.
 * @param res - The Express response object, used to send the response.
 * @returns - A success or error response with the updated friend request.
 */

export const respondToFriendRequest = async (req: Request, res: Response) => {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
        return res.status(400).json(errorResponse(400, "Incomplete Data", "The provided data is not complete"));
    }

    try {
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json(errorResponse(404, "Not Found", "Friend request not found"))
        }

        const recipientId = friendRequest.recipient.toString();
        const userId = (req as UserRequest).user.id.toString();
        if (recipientId !== userId) {
            return res.status(403).json(errorResponse(403, "Forbidden", "You are not authorized to respond to this friend request"));
        }

        friendRequest.status = status;
        await friendRequest.save();

        const requesterId: string = Object(friendRequest.requester).toString();

        await createNotification(requesterId, 'friend_request', `${(req as UserRequest).user.name} ${status} your friend request`);

        if (status === 'accepted') {
            await Friend.create({ user1: userId, user2: requesterId });
        }

        return res.status(200).json(successResponse(200, friendRequest, "Friend request responded"));

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Friend Request Error", `${error}`));
    }
};

/**
 * Retrieves all friend requests
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A success or error response with the friend requests.
 */

export const getFriendRequests = async (req: Request, res: Response) => {
    const userId = (req as UserRequest).user.id;
    try {
        const friendRequests = await FriendRequest.find({
            recipient: userId,
            status: 'pending',
        }).populate('requester', 'name email');

        return res.status(200).json(successResponse(200, friendRequests, "Friend requests found"));

    } catch (error) {
        res.status(404).json(errorResponse(404, "Friend Request Error", `${error}`))
    }
};

/**
 * retrieve all friends.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A success or error response with the friend list.
 */
export const getFriendsList = async (req: Request, res: Response) => {

    try {
        const friends = await Friend.find({
            $or: [
                { user1: (req as UserRequest).user.id },
                { user2: (req as UserRequest).user.id },
            ],
        }).populate('user1 user2', 'name email');

        return res.status(200).json(successResponse(200, friends, "Friends found"));
    } catch (error) {
        res.status(404).json(errorResponse(404, "Friend Request Error", `${error}`))
    }
};
/**
 * Unfriend a user.
 *
 * @param req - The Express request object
 * @param req.body.friendId - The id of the friend to remove
 * @param res - The Express response object, used to send the response.
 * @returns - A success or error response with the updated friend request.
 */

export const removeFriend = async (req: Request, res: Response) => {
    const { friendId } = req.body;

    if (!friendId) {
        return res.status(400).json(errorResponse(400, "Incomplete Data", "Friend Id is required"));
    }

    try {
        const friend = await Friend.findById(friendId);

        if (!friend) {
            return res.status(404).json(errorResponse(404, "Not Found", "Friend not found"));
        }

        if (
            friend.user1.toString() !== (req as UserRequest).user.id.toString() &&
            friend.user2.toString() !== (req as UserRequest).user.id.toString()
        ) {
            return res.status(403).json(errorResponse(403, "Forbidden", "You are not authorized to remove this friend"));
        }

        await friend.deleteOne();
        return res.status(200).json(successResponse(200, friend, "Friend removed"));

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Friend Request Error", `${error}`));
    }
};

export default { sendFriendRequest, respondToFriendRequest, getFriendRequests, getFriendsList, removeFriend };
