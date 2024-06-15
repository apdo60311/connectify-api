import mongoose, { Schema, model, Document } from "mongoose";

interface IComment extends Document {
    post: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    content: string;
    parentComment: Schema.Types.ObjectId;
}

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
    },
    { timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
