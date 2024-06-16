import { Request, Response } from "express";
import User from "../models/user.model";
import Report from "../models/report.model";
import { UserRequest } from "../entities/request.entity";
import { errorResponse, successResponse } from "../utils/response/response.util";

export const getUsers = async (req: Request, res: Response) => {
    if (!(req as UserRequest).user.isAdmin) {
        return res.status(400).json(errorResponse(400, "Access denied", "unauthroized"))
    }

    try {
        const users = await User.find();
        return res.status(200).json(successResponse(200, users, "users fetched successfully"));
    } catch (error) {
        return res.status(500).json(errorResponse(500, JSON.stringify(error), "Error fetching users"))
    }

};

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
