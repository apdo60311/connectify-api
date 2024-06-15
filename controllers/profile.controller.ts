import { UserRequest } from "../entities/request.entity";
import Profile from "../models/profile.model";
import User from "../models/user.model";

import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/response.util";


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
    const { bio, location, birthdate } = req.body;

    if (!bio && !location && !birthdate) {
        return res.status(400).json(errorResponse(400, "Incomplete Data", "Nothing to change!"));
    }

    try {
        const profile = await Profile.findOne({ user: (req as UserRequest).user.id });

        if (profile) {
            profile.bio = bio || profile.bio;
            profile.location = location || profile.location;
            profile.birthdate = birthdate || profile.birthdate;

            const updatedProfile = await profile.save();

            return res.status(200).json(successResponse(200, updatedProfile, "Profile updated successfully"));
        } else {
            return res.status(404).json(errorResponse(404, "Not Found", "Profile Not Found!"));
        }

    } catch (error) {
        return res.status(404).json(errorResponse(404, "Error Updating profile", `${error}`));
    }

};

export default { getProfile, updateProfile };