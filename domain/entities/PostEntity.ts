import mongoose from "mongoose";

/**
 * Represents the structure of a post in the application.
 * @interface IPost
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who created the post.
 * @property {string} content - The content of the post.
 * @property {string[]} media - An array of media file paths associated with the post.
 * @property {mongoose.Schema.Types.ObjectId[]} mentions - An array of user IDs mentioned in the post.
 */
export interface IPost {
    user: mongoose.Schema.Types.ObjectId;
    content: string;
    media: string[];
    mentions: mongoose.Schema.Types.ObjectId[];
}
