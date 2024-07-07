import { NextFunction, Request, Response } from 'express';

type ErrorWithStack = Error & { stack: string };

/**
 * Handles errors that occur during the processing of an Express.js request.
 *
 * This middleware function is responsible for handling any errors that occur
 * during the processing of an Express.js request. It sets the appropriate
 * HTTP status code and returns a JSON response containing the error message
 * and, if the environment is not production, the stack trace.
 *
 * @param err - The error object that was thrown.
 * @param req - The Express.js request object.
 * @param res - The Express.js response object.
 * @param next - The Express.js next middleware function.
 */
const errorHandler = (err: ErrorWithStack, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler; 
