import mongoose, { Document } from "mongoose";
import { ILike } from "../entities/like.entity";


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
