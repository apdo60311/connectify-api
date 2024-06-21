import mongoose, { Document } from "mongoose";
import { IReaction } from "../entities/reaction.entity";


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
