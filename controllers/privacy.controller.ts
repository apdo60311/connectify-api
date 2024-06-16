import { Request, Response } from "express";
import { UserRequest } from "../entities/request.entity";
import {
    errorResponse,
    successResponse,
} from "../utils/response/response.util";
import PrivacySetting from "../models/privacy.model";
import Block from "../models/block.model";
import { IPrivacySetting } from "../entities/privacy.entity";

export const getPrivacySettings = async (req: Request, res: Response) => {
    try {
        const privacySettings = await PrivacySetting.findOne({ user: (req as UserRequest).user.id });
        return res.status(200).json(successResponse(200, JSON.stringify(privacySettings), "privacySettings successfully fetched"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, "Something went wrong", "Error occured while fetching privacy settings"));
    }
};

export const updatePrivacySettings = async (req: Request, res: Response) => {
    const { canSeePosts, canSeeProfile, canSendFriendRequest } =
        req.body as IPrivacySetting;

    if (!canSeePosts && !canSeeProfile && !canSendFriendRequest) {
        return res.status(400).json(errorResponse(400, "Bad Request", "Nothing to update"));
    }

    try {
        const privacySettings = await PrivacySetting.findOne({ user: (req as UserRequest).user.id });
        if (privacySettings) {
            privacySettings.canSeePosts = canSeePosts || privacySettings.canSeePosts;
            privacySettings.canSeeProfile =
                canSeeProfile || privacySettings.canSeeProfile;
            privacySettings.canSendFriendRequest =
                canSendFriendRequest || privacySettings.canSendFriendRequest;

            const updatedPrivacySettings = await privacySettings.save();
            return res.status(200).json(successResponse(200, JSON.stringify(updatedPrivacySettings), "Privacy settings updated successfully"));
        } else {
            res.status(404).json(errorResponse(404, "Not Found", "Privacy settings not found"));
        }

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Something went wrong", "Error occured while updating privacy settings"));
    }

};

export const blockUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json(errorResponse(400, "Block Error", "User id is required"));
    }

    if (userId === (req as UserRequest).user.id) {
        return res.status(400).json(errorResponse(400, "Block Error", "You can't block yourself"));
    }

    try {
        const blockedUser = await Block.findOne({ user: userId });
        if (blockedUser) {
            return res.status(400).json(errorResponse(400, "Block Error", "User is already blocked"));
        }

        const block = new Block({
            blocker: (req as UserRequest).user.id,
            blockee: userId,
        });

        const createdBlock = await block.save();
        return res.status(200).json(successResponse(200, JSON.stringify(createdBlock), "user blocked successfully"))

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Something went wrong", "Error occured while blocking user"));
    }

};

export const unblockUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json(errorResponse(400, "Unblock Error", "User id is required"));
    }

    if (userId === (req as UserRequest).user.id) {
        return res.status(400).json(errorResponse(400, "Unblock Error", "You can't unblock yourself"));
    }

    try {
        const block = await Block.findOne({ blocker: (req as UserRequest).user.id, blockee: userId });
        if (block) {
            await block.deleteOne();
            return res.status(400).json(successResponse(200, JSON.stringify(block), "User unblocked successfully"));
        } else {
            return res.status(404).json(errorResponse(404, "Not Found", "User not found"));
        }

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Something went wrong", "Error occured while unblocking user"));
    }

};

export default { getPrivacySettings, updatePrivacySettings, blockUser, unblockUser };
