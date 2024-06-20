import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response/response.util";

export const profilePicUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json(errorResponse(400, 'File upload error', 'No file uploaded or invalid file type.'));
    }
    next();
}