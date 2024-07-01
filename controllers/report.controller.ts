import { Request, Response } from "express";
import Report from "../models/report.model";
import { errorResponse, successResponse } from "../utils/response/response.util";
import { UserRequest } from "../entities/request.entity";

/**
 * Creates a new report in the system.
 *
 * @param req - The Express request object, containing the report data in the request body.
 * @param res - The Express response object, used to send the response back to the client.
 * @returns - A JSON response with the created report data, or an error response if the request is invalid or an error occurs.
 */
export const createReport = async (req: Request, res: Response) => {
    const { postId, commentId, description } = req.body;

    if (!postId && !commentId) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "postId or commentId is required"));
    }
    if (!description) {
        return res.status(400).json(errorResponse(400, "Incomplete data", "description is required"));
    }

    try {
        const report = new Report({
            reportedBy: (req as UserRequest).user?.id,
            postId,
            commentId,
            description,
        });


        const createdReport = await report.save();
        return res.status(201).json(successResponse(200, JSON.stringify(createdReport), "Report created successfully"));

    } catch (error) {
        return res.status(500).json(errorResponse(500, JSON.stringify(error), "Error creating report"));
    }

};

export default { createReport };
