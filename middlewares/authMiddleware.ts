import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../data/datasources/mongodb/models/User";

import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../core/utils/response/responseUtils";
import logger from "../core/utils/logger";
import { UserRequest } from "../domain/entities/RequestEntity";



/**
 * Middleware function that handles authorization for incoming requests.
 *
 * This middleware checks if the request has a valid authorization token in the
 * `Authorization` header. If the token is valid, it extracts the user information
 * from the token and attaches it to the `req.user` property. If the token is
 * missing or invalid, it returns an error response.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the chain.
 */
export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(400).json(errorResponse(400, "Access Denied", 'Missing authorization token'));
    }

    if (token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];

            if (!token || token === 'null') {
                return res.status(400).json(errorResponse(400, "Access Denied", 'Invalid authorization token'));
            }

            const verifyToken: any = jwt.verify(token, process.env.JWT_SECRET ?? 'Secret');

            if (!verifyToken) {
                return res.status(400).json(errorResponse(400, "Access Denied", 'Invalid authorization token'));
            }
            (req as UserRequest).user = verifyToken;
            // (req as UserRequest).user = await User.findById(verifyToken.id.toString()).select('-password');
            next();
        } catch (error) {
            logger.error(`${error}`);
            return res.status(500).json(errorResponse(500, "Server Error", `${error}`));
        }
    }
};

export default authorization