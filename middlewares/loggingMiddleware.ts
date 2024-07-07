import { Request, Response, NextFunction } from "express"
import logger from "../core/utils/logger";

/**
 * Middleware function that logs the HTTP method and URL for each incoming request.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}

