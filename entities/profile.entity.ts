import mongoose, { Document } from "mongoose";

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
