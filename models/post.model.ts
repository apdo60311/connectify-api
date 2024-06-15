import mongoose, { Schema, model } from "mongoose";

interface IPost {
    user: mongoose.Schema.Types.ObjectId;
    content: string;
}

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
    },
    { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
