import { Request, Response } from "express";
import Notification from "../../data/datasources/mongodb/models/Notification";
import { UserRequest } from "../../domain/entities/RequestEntity";
import { errorResponse, successResponse } from "../../core/utils/response/responseUtils";
import { INotification } from "../../domain/entities/NotificationEntity";

/**
 * Creates a new notification for a specific user.
 *
 * @param userId - The ID of the user to send the notification.
 * @param type - The type of the notification.
 * @param message - The message content of the notification.
 * @returns The created notification.
 */
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

/**
 * Retrieves a list of notifications for the current user.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A successful response with the list of notifications for the current user.
 */
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ user: (req as UserRequest).user.id });
        return res.status(200).json(successResponse(200, notifications, "notification listed successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Notifications Error", `${error}`))
    }
};

/**
 * Marks a specific notification as read for the current user.
 *
 * @param req - The Express request object
 * @param req.body.notificationId 
 * @param res - The Express response object.
 * @returns A successful response with the updated notification, or an error response if the notification is not found or an error occurs.
 */
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
/**
 * Marks all notifications for the current user as read.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A successful response indicating that all notifications have been marked as read.
 */
export const markAllAsRead = async (req: Request, res: Response) => {
    try {
        await Notification.updateMany({ user: (req as UserRequest).user.id, read: false }, { read: true });
        return res.status(200).json(successResponse(200, "", "All notifications marked as read"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, "Notifications Error", `${error}`))
    }
};

export default { createNotification, getNotifications, markAsRead, markAllAsRead };
