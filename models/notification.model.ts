import mongoose, { Schema, model } from "mongoose";

export interface INotification extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    type: "friend_request" | "post_like" | "comment" | "mention" | "other";
    message: string;
    read: boolean;
}

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
