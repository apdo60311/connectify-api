import mongoose, { Schema, model } from "mongoose";
import { INotification } from "../../../../domain/entities/NotificationEntity";



/**
 * Defines the schema for a Notification document in the MongoDB database.
 * A Notification represents a message or event that is sent to a user, such as a friend request, post like, comment, or mention.
 * The schema includes the following fields:
 * - `user`: The ObjectId of the user who received the notification.
 * - `type`: The type of notification, which can be one of "friend_request", "post_like", "comment", "mention", or "other".
 * - `message`: The text message of the notification.
 * - `read`: A boolean indicating whether the notification has been read by the user.
 * The schema also includes timestamps for when the notification was created and updated.
 */
const notificationSchema = new mongoose.Schema<INotification>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["friend_request", "post_like", "comment", "mention", "other"],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
