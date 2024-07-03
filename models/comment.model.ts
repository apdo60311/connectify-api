import mongoose, { Schema, model, Document } from "mongoose";
import { IComment } from "../entities/comment.entity";

/**
 * Defines the schema for a comment document in the database.
 * 
 * The comment schema includes the following fields:
 * - `post`: The ID of the post that the comment is associated with.
 * - `user`: The ID of the user who made the comment.
 * - `content`: The text content of the comment.
 * - `parentComment`: The ID of the parent comment, if this is a reply to another comment.
 * - `mentions`: An array of user IDs that were mentioned in the comment.
 * 
 * The schema also includes timestamps for when the comment was created and last updated.
 */
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
