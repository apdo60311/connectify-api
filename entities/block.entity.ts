import mongoose, { Document } from "mongoose";

/**
 * Represents a block relationship between two users.
 * @interface IBlock
 * @extends {mongoose.Document}
 * @property {mongoose.Schema.Types.ObjectId} blocker - The ID of the user who initiated the block.
 * @property {mongoose.Schema.Types.ObjectId} blockee - The ID of the user who was blocked.
 */
export interface IBlock extends Document {
    blocker: mongoose.Schema.Types.ObjectId;
    blockee: mongoose.Schema.Types.ObjectId;
}