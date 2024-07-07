import { Schema, model } from "mongoose";

/**
 * Represents a comment on a post in the application.
 * @interface IComment
 * @property {Schema.Types.ObjectId} post - The ID of the post the comment is associated with.
 * @property {Schema.Types.ObjectId} user - The ID of the user who made the comment.
 * @property {string} content - The text content of the comment.
 * @property {Schema.Types.ObjectId} parentComment - The ID of the parent comment, if this is a reply to another comment.
 * @property {Schema.Types.ObjectId[]} mentions - The IDs of any users mentioned in the comment.
 */
export interface IComment extends Document {
    post: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    content: string;
    parentComment: Schema.Types.ObjectId;
    mentions: Schema.Types.ObjectId[];
}
