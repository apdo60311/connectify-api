import mongoose, { Document } from "mongoose";
import { IFriendRequest } from "../../../../domain/entities/FriendRequestEntity";


/**
 * Defines the schema for a friend request document in the database.
 * A friend request document represents a request from one user to become friends with another user.
 * The document contains the following fields:
 * - `requester`: the ObjectId of the user who sent the friend request
 * - `recipient`: the ObjectId of the user who received the friend request
 * - `status`: the status of the friend request, which can be 'pending', 'accepted', or 'rejected'
 * - `createdAt` and `updatedAt`: timestamps for when the document was created and last updated
 */
const friendRequestSchema = new mongoose.Schema<IFriendRequest>({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;
