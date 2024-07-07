import mongoose from "mongoose";

/**
 * Represents a friend request between two users.
 * 
 * @interface IFriendRequest
 * @extends {mongoose.Document}
 * @property {mongoose.Schema.Types.ObjectId} requester - The user who sent the friend request.
 * @property {mongoose.Schema.Types.ObjectId} recipient - The user who received the friend request.
 * @property {string} status - The status of the friend request, can be "pending", "accepted", or "rejected".
 */
export interface IFriendRequest extends Document {
    requester: mongoose.Schema.Types.ObjectId;
    recipient: mongoose.Schema.Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
}