import mongoose, { Schema, model, Document } from "mongoose";

interface IComment extends Document {
    post: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    content: string;
}

const commentSchema = new Schema<IComment>(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
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

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
