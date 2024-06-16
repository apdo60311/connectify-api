import mongoose from "mongoose";
import { IBlock } from "../entities/block.entity";


const blockSchema = new mongoose.Schema<IBlock>(
    {
        blocker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        blockee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Block = mongoose.model<IBlock>("Block", blockSchema);

export default Block;
