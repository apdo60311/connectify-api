import mongoose from "mongoose";


export interface INotification extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    type: "friend_request" | "post_like" | "comment" | "mention" | "other";
    message: string;
    read: boolean;
}