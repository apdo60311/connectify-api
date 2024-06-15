import mongoose, { Schema, model, Document } from "mongoose";

interface IProfile extends Document {
    user: mongoose.Schema.Types.ObjectId,
    bio: string,
    location: string,
    birthdate: Date
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
    },
    { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
