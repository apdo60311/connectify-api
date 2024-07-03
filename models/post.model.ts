import mongoose, { Schema, model } from "mongoose";
import { IPost } from "../entities/post.entity";

/**
 * Defines the schema for a Post document in the MongoDB database.
 * 
 * The Post schema includes the following fields:
 * - `user`: The ID of the User who created the Post, which is a required reference to the User model.
 * - `content`: The text content of the Post, which is a required String.
 * - `media`: An array of Strings representing media (e.g. image URLs) associated with the Post.
 * - `mentions`: An array of User IDs representing users mentioned in the Post.
 * 
 * The schema also includes timestamps for when the Post was created and last updated.
 */
const postSchema = new Schema<IPost>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        media: [
            {
                type: String,
            }
        ],
        mentions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
