import mongoose from "mongoose";

/**
 * Represents a friend relationship between two users.
 * @interface IFriend
 * @property {mongoose.Schema.Types.ObjectId} user1 - The ObjectId of the first user in the friend relationship.
 * @property {mongoose.Schema.Types.ObjectId} user2 - The ObjectId of the second user in the friend relationship.
 */

export interface IFriend {
    user1: mongoose.Schema.Types.ObjectId;
    user2: mongoose.Schema.Types.ObjectId;
}
