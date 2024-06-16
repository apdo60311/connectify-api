import mongoose, { Document } from "mongoose";

export interface IReport extends Document {
    reportedBy: mongoose.Schema.Types.ObjectId;
    postId?: mongoose.Schema.Types.ObjectId;
    commentId?: mongoose.Schema.Types.ObjectId;
    description: string;
}
