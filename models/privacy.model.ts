import mongoose, { Schema, model } from "mongoose";
import { IPrivacySetting } from "../entities/privacy.entity";



/**
 * Defines the schema for a PrivacySetting document in the MongoDB database.
 * A PrivacySetting document represents the privacy settings for a specific user.
 * The schema includes the following fields:
 * - `user`: The ObjectId of the user that the privacy settings belong to.
 * - `canSeePosts`: Determines who can see the user's posts, with options "everyone", "friends", or "only_me".
 * - `canSeeProfile`: Determines who can see the user's profile, with options "everyone", "friends", or "only_me".
 * - `canSendFriendRequest`: Determines who can send friend requests to the user, with options "everyone" or "friends_of_friends".
 * The schema also includes timestamps for when the document was created and last updated.
 */
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
