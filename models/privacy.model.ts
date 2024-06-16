import mongoose, { Schema, model } from "mongoose";
import { IPrivacySetting } from "../entities/privacy.entity";



const privacySettingSchema = new mongoose.Schema<IPrivacySetting>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        canSeePosts: {
            type: String,
            enum: ["everyone", "friends", "only_me"],
            default: "everyone",
        },
        canSeeProfile: {
            type: String,
            enum: ["everyone", "friends", "only_me"],
            default: "everyone",
        },
        canSendFriendRequest: {
            type: String,
            enum: ["everyone", "friends_of_friends"],
            default: "everyone",
        },
    },
    { timestamps: true }
);

const PrivacySetting = mongoose.model<IPrivacySetting>(
    "PrivacySetting",
    privacySettingSchema
);

export default PrivacySetting;
