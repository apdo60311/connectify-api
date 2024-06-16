import mongoose, { Document } from "mongoose";


export interface IPrivacySetting extends Document {
    user: mongoose.Schema.Types.ObjectId;
    canSeePosts: "everyone" | "friends" | "only_me";
    canSeeProfile: "everyone" | "friends" | "only_me";
    canSendFriendRequest: "everyone" | "friends_of_friends";
}