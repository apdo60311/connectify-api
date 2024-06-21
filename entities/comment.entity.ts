import { Schema, model } from "mongoose";

export interface IComment extends Document {
    post: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    content: string;
    parentComment: Schema.Types.ObjectId;
    mentions: Schema.Types.ObjectId[];
}
