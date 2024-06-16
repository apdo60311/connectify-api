import mongoose, { Document } from "mongoose";

export interface IBlock extends Document {
    blocker: mongoose.Schema.Types.ObjectId;
    blockee: mongoose.Schema.Types.ObjectId;
}