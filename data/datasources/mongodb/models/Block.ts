import mongoose from "mongoose";
import { IBlock } from "../../../../domain/entities/BlockEntity";


/**
 * Mongoose schema and model for a block relationship between two users.
 * 
 * The `blocker` field represents the user who has blocked the `blockee` user.
 * The `blockee` field represents the user who has been blocked by the `blocker` user.
 * 
 * This model is used to store and manage block relationships between users in the application.
 */
const blockSchema = new mongoose.Schema<IBlock>(
    {
        blocker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        blockee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Block = mongoose.model<IBlock>("Block", blockSchema);

export default Block;
