import mongoose from "mongoose";

export interface IMessage extends Document {
    sender: mongoose.Schema.Types.ObjectId;
    receiver: mongoose.Schema.Types.ObjectId;
    content: string;
    read: boolean;
    typing: boolean;
}

export interface IGroupMessage extends Document {
    sender: mongoose.Schema.Types.ObjectId;
    content: string;
    readBy: mongoose.Schema.Types.ObjectId[];
}

