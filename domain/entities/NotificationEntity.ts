import mongoose from "mongoose";


/**
 * Represents a notification for a user.
 * 
 * @interface INotification
 * @extends {mongoose.Document}
 * @property {mongoose.Types.ObjectId} user - The ID of the user who received the notification.
 * @property {"friend_request" | "post_like" | "comment" | "mention" | "other"} type - The type of notification.
 * @property {string} message - The message content of the notification.
 * @property {boolean} read - Indicates whether the notification has been read by the user.
 */
export interface INotification extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    type: "friend_request" | "post_like" | "comment" | "mention" | "other";
    message: string;
    read: boolean;
}