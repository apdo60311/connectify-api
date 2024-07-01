import mongoose, { Document } from "mongoose";

/**
 * Represents a user's profile information.
 * @interface IProfile
 * @extends {mongoose.Document}
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user associated with this profile.
 * @property {string} bio - A brief description of the user.
 * @property {string} location - The user's location.
 * @property {string} website - The user's website URL.
 * @property {Date} birthdate - The user's date of birth.
 * @property {string[]} interests - The user's interests.
 * @property {string[]} education - The user's educational background.
 * @property {string} work - The user's work information.
 * @property {string} profilePicture - The URL of the user's profile picture.
 * @property {string} coverPhoto - The URL of the user's cover photo.
 */
export interface IProfile extends Document {
    user: mongoose.Schema.Types.ObjectId;
    bio: string;
    location: string;
    website: string;
    birthdate: Date;
    interests: String[];
    education: String[];
    work: String;
    profilePicture: String;
    coverPhoto: String;
}
