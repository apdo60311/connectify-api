import { Request, Response } from "express";
import User from "../../data/datasources/mongodb/models/User";
import { errorResponse, successResponse } from "../../core/utils/response/responseUtils";

/**
 * Searches for users based on the provided query parameter.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON response with the search results or an error message.
 */
export const searchUsers = async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json(errorResponse(400, "Search Error", "Query parameter is required"))
    }

    try {
        const users = await User.find({
            name: { $regex: query, $options: "i" },
        }).select("name email");

        return res.status(200).json(successResponse(200, users, "users found successfully"))

    } catch (error) {
        return res.status(500).json(errorResponse(500, "Search Error", `${error}`))
    }

};

export default searchUsers;
