import { NextFunction, Request, Response } from 'express';

type ErrorWithStack = Error & { stack: string };

const errorHandler = (err: ErrorWithStack, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler; 
