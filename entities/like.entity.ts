import mongoose from "mongoose";

export interface ILike extends Document {
    user: mongoose.Schema.Types.ObjectId;
    post: mongoose.Schema.Types.ObjectId;
    type: "like" | "love" | "angery";
}