import mongoose, { Document } from "mongoose";
import { IReaction } from "../entities/reaction.entity";

/**
 * Defines the schema for a reaction document in the MongoDB database.
 * The reaction schema includes the following fields:
 * - `user`: the ObjectId reference to the associated user document
 * - `post`: the ObjectId reference to the associated post document (optional)
 * - `comment`: the ObjectId reference to the associated comment document (optional)
 * - `type`: the type of reaction, which can be "like", "love", or "angery" (default is "like")
 * The schema also includes timestamps for when the reaction was created and last updated.
 */
const reactionSchema = new mongoose.Schema<IReaction>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: false,
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: false,
        },
        type: {
            type: String,
            enum: ["like", "love", "angery"],
            default: "like"
        }
    },
    { timestamps: true }
);

const Reaction = mongoose.model<IReaction>("Reaction", reactionSchema);

export default Reaction;
