import mongoose from "mongoose";

export interface IFriend {
    user1: mongoose.Schema.Types.ObjectId;
    user2: mongoose.Schema.Types.ObjectId;
}
