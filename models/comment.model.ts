import mongoose, { Schema, model, Document } from "mongoose";
import { IComment } from "../entities/comment.entity";

const commentSchema = new Schema<IComment>(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
        mentions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    { timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
