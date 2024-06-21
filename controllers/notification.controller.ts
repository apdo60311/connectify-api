import { Request, Response } from "express";
import Notification from "../models/notification.model";
import { UserRequest } from "../entities/request.entity";
import { errorResponse, successResponse } from "../utils/response/response.util";
import { INotification } from "../entities/notification.entity";

export const createNotification = async (
    userId: string,
    type: string,
    message: string
): Promise<INotification> => {

    try {
        const notification = await Notification.create({
            user: userId,
            type,
            message,
        });

        return notification;

    } catch (error) {
        throw error;
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ user: (req as UserRequest).user.id });
        return res.status(200).json(successResponse(200, notifications, "notification listed successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Notifications Error", `${error}`))
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    const { notificationId } = req.body;

    if (!notificationId) {
        return res.status(400).json(errorResponse(400, "Notifications Error", "Notification ID is required"));
    }

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json(errorResponse(404, "Notifications Error", "Notification not found"));
        }

        notification.read = true;
        await notification.save();

        return res.status(200).json(successResponse(200, notification, "Notification marked as read successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Notification error", `${error}`));
    }

};
export const markAllAsRead = async (req: Request, res: Response) => {
    try {
        await Notification.updateMany({ user: (req as UserRequest).user.id, read: false }, { read: true });
        return res.status(200).json(successResponse(200, "", "All notifications marked as read"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, "Notifications Error", `${error}`))
    }
};

export default { createNotification, getNotifications, markAsRead, markAllAsRead };
