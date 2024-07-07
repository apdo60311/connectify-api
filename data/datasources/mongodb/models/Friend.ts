import mongoose, { Schema, model } from "mongoose";
import { IFriend } from "../../../../domain/entities/FriendEntity";


/**
 * Defines the schema for a friend relationship between two users in the database.
 * 
 * The friend schema includes the following fields:
 * - `user1`: The ID of the first user in the friend relationship.
 * - `user2`: The ID of the second user in the friend relationship.
 * 
 * The schema also includes timestamps for when the friend relationship was created and last updated.
 */
const friendSchema = new Schema<IFriend>(
    {
        user1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        user2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Friend = model<IFriend>("Friend", friendSchema);

export default Friend;
