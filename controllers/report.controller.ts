import { Request, Response } from "express";
import Report from "../models/report.model";
import { errorResponse, successResponse } from "../utils/response/response.util";
import { UserRequest } from "../entities/request.entity";

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
