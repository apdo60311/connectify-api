import mongoose, { Schema, model } from "mongoose";
import { IFriend } from "../entities/friend.entity";


const friendSchema = new Schema<IFriend>(
    {
        user1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        user2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Friend = model<IFriend>("Friend", friendSchema);

export default Friend;
