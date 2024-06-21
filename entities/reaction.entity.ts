import mongoose from "mongoose";

export interface IReaction extends Document {
    user: mongoose.Schema.Types.ObjectId;
    post?: mongoose.Schema.Types.ObjectId;
    comment?: mongoose.Schema.Types.ObjectId;
    type: "like" | "love" | "haha" | "angery";
}