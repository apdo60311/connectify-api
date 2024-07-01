import { UserRequest } from "../entities/request.entity";
import Profile from "../models/profile.model";
import User from "../models/user.model";

import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/response.util";
import { storage } from "../config/firbase.config"
import { buildStorageReference, deleteFile, uploadFile, uploadFromStringFormat, uploadMulterFile, uploadProfilePicAsMulterfile } from "../utils/storage.utils"
import mongoose from "mongoose";

/**
 * Retrieves the user's profile from the database.
 *
 * @param req - The Express request object
 * @param res - The Express response object, used to send the profile data.
 * @returns - A JSON response containing the user's profile data, or an error message if the profile is not found.
 */
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

/**
 * Updates the user's profile in the database.
 *
 * @param req - The Express request object, containing the updated profile data.
 * @param res - The Express response object, used to send the updated profile data or an error message.
 * @returns - A JSON response containing the updated profile data, or an error message if the profile is not found or the update fails.
 */
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

/**
 * Creates a new user profile in the database.
 *
 * @param req - The Express request object, containing the new profile data.
 * @param req.body.profileData
 * @param res - The Express response object, used to send the saved profile data or an error message.
 * @returns - A JSON response containing the saved profile data, or an error message if the profile creation fails.
 */
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

/**
 * Uploads a profile picture to the Firebase Storage and returns the download URL.
 *
 * @param req - The Express request object
 * @param req.file - the profile picture file
 * @param res - The Express response object, not used in this function.
 * @returns - The download URL of the uploaded profile picture.
 * @throws {Error} - If there is an error while uploading the profile picture.
 */
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

/**
 * Deletes the profile picture for the specified user from the Firebase Storage.
 *
 * @param userId - The ID of the user whose profile picture should be deleted.
 * @throws {Error} - If there is an error while deleting the profile picture.
 */
export const deleteProfilePicture = async (userId: string) => {
    const ref = buildStorageReference(storage, 'profileImages', `PROFILEPIC-${userId}.png`);
    try {
        await deleteFile(ref);
    } catch (error) {
        throw Error(`Error while deleting profile picture ${error}`);
    }
}


export default { getProfile, updateProfile };

