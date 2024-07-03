import mongoose, { Schema, model, Document } from "mongoose";
import { IProfile } from "../entities/profile.entity";


/**
 * Defines the schema for a user profile document in the MongoDB database.
 * The profile schema includes the following fields:
 * - `user`: the ObjectId reference to the associated user document
 * - `bio`: a string field for the user's biography
 * - `location`: a string field for the user's location
 * - `website`: a string field for the user's website
 * - `birthdate`: a date field for the user's birthdate
 * - `interests`: an array of strings for the user's interests
 * - `education`: an array of strings for the user's education history
 * - `work`: a string field for the user's work information
 * - `profilePicture`: a string field for the user's profile picture
 * - `coverPhoto`: a string field for the user's cover photo
 * The schema also includes timestamps for when the profile was created and last updated.
 */
const profileSchema = new mongoose.Schema<IProfile>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bio: {
            type: String,
        },
        location: {
            type: String,
        },
        website: {
            type: String,
        },
        birthdate: {
            type: Date,
        },
        interests: {
            type: [String],
        },
        education: { type: [String], },
        work: { type: String, },
        profilePicture: { type: String, },
        coverPhoto: { type: String, },

    },
    { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
