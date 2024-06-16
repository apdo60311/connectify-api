import { Request, Response } from "express";
import { UserRequest } from "../entities/request.entity";
import Message from "../models/message.model";
import GroupChat from "../models/groupchat.model";
import { createNotification } from "./notification.controller";
import { errorResponse, successResponse } from "../utils/response/response.util"
import { IGroupMessage, IMessage } from "../entities/message.entity";
import mongoose from "mongoose";


export const sendMessage = async (req: Request, res: Response) => {
    const { receiverId, content } = req.body;


    if (!receiverId && !content) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "receiverId and content must be provided"))
    }

    try {

        const user = (req as UserRequest).user;

        const message = new Message({
            sender: user.id,
            receiver: receiverId,
            content,
        });

        const createdMessage = await message.save();

        await createNotification(
            receiverId,
            "message",
            `${user.name} sent you a message`
        );

        return res.status(201).json(successResponse(201, createdMessage, "message sent"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, `${error}`, "error while sending messages"))
    }
};

export const getMessages = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "userId is required"));
    }

    try {
        const currentUser = (req as UserRequest).user;

        const messages = await Message.find({
            $or: [
                { sender: currentUser.id, receiver: userId },
                { sender: userId, receiver: currentUser.id },
            ],
        }).populate("sender receiver", "name");

        return res.status(200).json(successResponse(200, messages, "message retrieved successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, `${error}`, "error while getting messages"))
    }
};

export const createGroupChat = async (req: Request, res: Response) => {
    const { name, members } = req.body;

    if (!name && !members) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "name and members are required"));
    }

    try {
        const groupChat = new GroupChat({
            name,
            members,
        });

        const createdGroupChat = await groupChat.save();

        return res.status(200).json(successResponse(200, createdGroupChat, "Chat group created"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, `${error}`, "Error while creating chat group"))
    }

};

export const sendGroupMessage = async (req: Request, res: Response) => {
    const { groupId, content } = req.body;

    if (!groupId && !content) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "groupId and content are required"));
    }

    try {
        const groupChat = await GroupChat.findById(groupId);
        if (!groupChat) {
            return res.status(404).json(errorResponse(404, "Not Found", "Group chat not found"));
        }

        const userId = (req as UserRequest).user.id;

        const message = {
            sender: new mongoose.Schema.Types.ObjectId(userId),
            content,
            readBy: [new mongoose.Schema.Types.ObjectId(userId)],
        };

        groupChat.messages.push(message as IGroupMessage);
        await groupChat.save();

        // notify all group members
        groupChat.members.forEach(async (member) => {
            if (member.toString() !== userId) {
                await createNotification(
                    Object(member).toString(),
                    "group_message",
                    `${(req as UserRequest).user.name} sent a message in ${groupChat.name}`
                );
            }
        });

        return res.status(201).json(successResponse(201, message, "message sent"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, `${error}`, "Error while sending group message"))
    }

};

export const getGroupMessages = async (req: Request, res: Response) => {
    const { groupId } = req.params;

    if (!groupId) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "groupId is required"));
    }

    try {
        const groupChat = await GroupChat.findById(groupId).populate(
            "members",
            "name"
        );
        if (!groupChat) {
            res.status(404);
            throw new Error("Group chat not found");
        }

        return res
            .status(200)
            .json(
                successResponse(
                    200,
                    JSON.stringify(groupChat.messages),
                    "group messages retrieved successfully"
                )
            );
    } catch (error) {
        return res.status(500).json(errorResponse(500, `${error}`, "Error while getting group messages"))
    }

};

export default { sendMessage, getMessages, createGroupChat, sendGroupMessage, getGroupMessages }