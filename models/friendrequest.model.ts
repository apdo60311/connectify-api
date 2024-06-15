import mongoose, { Document } from "mongoose";

interface IFriendRequest extends Document {
    requester: mongoose.Schema.Types.ObjectId,
    recipient: mongoose.Schema.Types.ObjectId,
    status: string,
}

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
