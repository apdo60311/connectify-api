import mongoose from "mongoose";

export interface IPost {
    user: mongoose.Schema.Types.ObjectId;
    content: string;
    media: string[];
    mentions: mongoose.Schema.Types.ObjectId[];
}
