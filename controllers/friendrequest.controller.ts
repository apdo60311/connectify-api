import { UserRequest } from "../entities/request.entity";
import FriendRequest from "../models/friendrequest.model";
import User from "../models/user.model";
import { createNotification } from "../controllers/notification.controller"
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/response.util";

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

        // TODO: add user to friends
        return res.status(200).json(successResponse(200, friendRequest, "Friend request responded"));

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Friend Request Error", `${error}`));
    }
};

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

export default { sendFriendRequest, respondToFriendRequest, getFriendRequests };
