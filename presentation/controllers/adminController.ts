import { Request, Response } from "express";
import User from "../../data/datasources/mongodb/models/User";
import Report from "../../data/datasources/mongodb/models/Report";
import { UserRequest } from "../../domain/entities/RequestEntity";
import { errorResponse, successResponse } from "../../core/utils/response/responseUtils";

/**
 * Fetches all users from the database.
 *
 * This function can only be accessed by admin users.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A successful response with the fetched users, or an error response if an error occured.
 */
export const getUsers = async (req: Request, res: Response) => {
    if (!(req as UserRequest).user.isAdmin) {
        return res
            .status(400)
            .json(errorResponse(400, "Access denied", "unauthroized"));
    }

    try {
        const users = await User.find();
        return res
            .status(200)
            .json(successResponse(200, users, "users fetched successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(errorResponse(500, JSON.stringify(error), "Error fetching users"));
    }
};


/**
 * Bans a user from the platform.
 *
 * This function can only be accessed by admin users.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A successful response indicating the user has been banned, or an error response if an error occurred.
 */
export const banUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json(errorResponse(400, "In complete data", "User id is required"));
    }

    if (!(req as UserRequest).user.isAdmin) {
        return res.status(400).json(errorResponse(400, "Access denied", "unauthroized"))
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(errorResponse(404, "Not Found", "User not found"));
    }


    try {
        user.isBanned = true;
        await user.save();
        return res.status(200).json(successResponse(200, "User banned successfully"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, JSON.stringify(error), "Error banning user"))
    }

};
/**
 * Removes Ban from a user.
 *
 * This function can only be accessed by admin users.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A successful response indicating the user has been unbanned, or an error response if an error occurred.
 */
export const unbanUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json(errorResponse(400, "In complete data", "User id is required"));
    }

    if (!(req as UserRequest).user.isAdmin) {
        return res.status(400).json(errorResponse(400, "Access denied", "unauthroized"))
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(errorResponse(404, "Not Found", "User not found"));
    }

    try {
        user.isBanned = false;
        await user.save();
        return res.status(200).json(successResponse(200, "User unbanned successfully"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, JSON.stringify(error), "Error unbanning user"))
    }
};


/**
 * Gets all reports from the database.
 *
 * This function can only be accessed by admin users.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A successful response containing the fetched reports, or an error response if an error occurred.
 */
export const getReports = async (req: Request, res: Response) => {
    if (!(req as UserRequest).user.isAdmin) {
        return res.status(400).json(errorResponse(400, "Access denied", "unauthroized"))
    }

    try {
        const reports = await Report.find({})
            .populate("reportedBy", "name")
            .populate("postId", "content")
            .populate("commentId", "content");

        return res.status(200).json(successResponse(200, JSON.stringify(reports), "reports fetched successfully"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, JSON.stringify(error), "Error fetching reports"))
    }

};



export default { getUsers, banUser, unbanUser, getReports };
