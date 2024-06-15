import mongoose, { Schema, model, Document } from "mongoose";

interface IProfile extends Document {
    user: mongoose.Schema.Types.ObjectId;
    bio: string;
    location: string;
    birthdate: Date;
    interests: String;
    education: String;
    work: String;
    profilePicture: String;
    coverPhoto: String;
}

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
        birthdate: {
            type: Date,
        },
        interests: {
            type: String,
        },
        education: { type: String, },
        work: { type: String, },
        profilePicture: { type: String, },
        coverPhoto: { type: String, },

    },
    { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
