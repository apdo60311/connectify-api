import { UserRequest } from "../entities/request.entity";
import Profile from "../models/profile.model";
import User from "../models/user.model";

import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/response.util";
import { storage } from "../config/firbase.config"
import { buildStorageReference, deleteFile, uploadFile, uploadFromStringFormat, uploadMulterFile, uploadProfilePicAsMulterfile } from "../utils/storage.utils"
import mongoose from "mongoose";


export const getProfile = async (req: Request, res: Response) => {
    try {

        if (!(req as UserRequest).user || !(req as UserRequest).user.id) {
            return res.status(400).json(errorResponse(400, "Incomplete Data", "The provided data is not complete"));
        }

        const profile = await Profile.findOne({ user: (req as UserRequest).user.id }).populate('user', 'name email');
        if (!profile) {
            return res.status(404).json(errorResponse(404, "Not Found", "User profile not found"));
        }
        return res.status(200).json(successResponse(200, profile, "user profile found successfully"));

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Not Found", `${error}`));
    }

};

export const updateProfile = async (req: Request, res: Response) => {
    const { bio, location, birthdate, interests, education, work, coverPhoto } = req.body;

    if (!bio && !location && !birthdate && !interests && !education && !work && !coverPhoto) {
        return res.status(400).json(errorResponse(400, "Incomplete Data", "Nothing to change!"));
    }

    try {
        const userId = (req as UserRequest).user.id;
        const profile = await Profile.findOne({ user: userId });

        if (profile) {
            profile.bio = bio || profile.bio;
            profile.location = location || profile.location;
            profile.birthdate = birthdate || profile.birthdate;
            profile.interests = interests || profile.interests;
            profile.education = education || profile.education;
            profile.work = work || profile.work;
            profile.coverPhoto = coverPhoto || profile.coverPhoto;

            if (req.file) {
                await deleteProfilePicture(userId);
                const profilePicUrl = await uploadProfilePicAsMulterfile(req);
                profile.profilePicture = profilePicUrl;
            }

            const updatedProfile = await profile.save();

            return res.status(200).json(successResponse(200, updatedProfile, "Profile updated successfully"));
        } else {
            return res.status(404).json(errorResponse(404, "Not Found", "Profile Not Found!"));
        }

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Error Updating profile", `${error}`));
    }

};

export const createProfile = async (req: Request, res: Response) => {
    const { bio, location, birthdate, interests, education, website, work, profilePicture } = req.body;
    const { user } = req.params;

    if (!user) {
        return res.status(400).json(errorResponse(400, "InComplete data", "user id is required"))
    }

    try {

        const newProfile = new Profile({ user, bio, location, website, birthdate, interests, education, work, profilePicture })


        if (req.file) {
            const coverPicUrl = await uploadProfilePicAsMulterfile(req);
            newProfile.coverPhoto = coverPicUrl;
        }


        const savedProfile = await newProfile.save();

        return res.status(200).json(successResponse(200, `${savedProfile}`, "profile saved successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, `${error}`, "error occurred while creating profile"))
    }

}

export const uploadProfilePicture = async (res: Response, req: Request) => {

    const profilePic = req.file;
    const userId: string = (req as UserRequest).user.id;

    const ref = buildStorageReference(storage, 'profileImages', `PROFILEPIC-${userId}.png`);

    try {
        let url = ''

        if (profilePic) {
            url = await uploadMulterFile(ref, profilePic);
        }

        return url;
    } catch (error) {
        throw Error(`Error while uploading profile picture ${error}`);
    }
}

export const deleteProfilePicture = async (userId: string) => {
    const ref = buildStorageReference(storage, 'profileImages', `PROFILEPIC-${userId}.png`);
    try {
        await deleteFile(ref);
    } catch (error) {
        throw Error(`Error while deleting profile picture ${error}`);
    }
}


export default { getProfile, updateProfile };

