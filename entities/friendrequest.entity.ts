import mongoose from "mongoose";

export interface IFriendRequest extends Document {
    requester: mongoose.Schema.Types.ObjectId;
    recipient: mongoose.Schema.Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
}