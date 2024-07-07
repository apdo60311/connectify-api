import mongoose from "mongoose";

/**
 * Represents a user's reaction to a post or comment.
 * 
 * @interface IReaction
 * @extends {mongoose.Document}
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who created the reaction.
 * @property {mongoose.Schema.Types.ObjectId} [post] - The ID of the post the reaction is associated with.
 * @property {mongoose.Schema.Types.ObjectId} [comment] - The ID of the comment the reaction is associated with.
 * @property {string} type - The type of reaction, which can be "like", "love", "haha", or "angery".
 */
export interface IReaction extends Document {
    user: mongoose.Schema.Types.ObjectId;
    post?: mongoose.Schema.Types.ObjectId;
    comment?: mongoose.Schema.Types.ObjectId;
    type: "like" | "love" | "haha" | "angery";
}