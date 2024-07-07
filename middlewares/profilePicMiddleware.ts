import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../core/utils/response/responseUtils";

/**
 * Middleware function to handle profile picture uploads.
 *
 * This middleware is responsible for validating that a file has been uploaded in the request. If no file is present, it will return a 400 Bad Request response with an error message.
 *
 * If a file is present, it will call the `next()` middleware function to continue processing the request.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next middleware function.
 */
export const profilePicUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json(errorResponse(400, 'File upload error', 'No file uploaded or invalid file type.'));
    }
    next();
}