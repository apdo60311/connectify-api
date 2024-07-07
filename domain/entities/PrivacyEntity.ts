import mongoose, { Document } from "mongoose";


/**
 * Represents the privacy settings for a user's account.
 * 
 * @interface IPrivacySetting
 * @extends {mongoose.Document}
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user associated with these privacy settings.
 * @property {"everyone" | "friends" | "only_me"} canSeePosts - Determines who can see the user's posts.
 * @property {"everyone" | "friends" | "only_me"} canSeeProfile - Determines who can see the user's profile.
 * @property {"everyone" | "friends_of_friends"} canSendFriendRequest - Determines who can send friend requests to the user.
 */
export interface IPrivacySetting extends Document {
    user: mongoose.Schema.Types.ObjectId;
    canSeePosts: "everyone" | "friends" | "only_me";
    canSeeProfile: "everyone" | "friends" | "only_me";
    canSendFriendRequest: "everyone" | "friends_of_friends";
}