import mongoose, { Schema, model } from "mongoose";
import { IPost } from "../entities/post.entity";

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
