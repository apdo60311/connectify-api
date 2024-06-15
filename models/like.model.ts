import mongoose, { Document } from "mongoose";

interface ILike extends Document {
    user: mongoose.Schema.Types.ObjectId;
    post: mongoose.Schema.Types.ObjectId;
    type: "like" | "love" | "angery";
}

const likeSchema = new mongoose.Schema<ILike>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        type: {
            type: String,
            enum: ["like", "love", "angery"],
            default: "like"
        }
    },
    { timestamps: true }
);

const Like = mongoose.model<ILike>("Like", likeSchema);

export default Like;
