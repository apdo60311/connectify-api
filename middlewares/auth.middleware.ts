import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response/response.util";
import logger from "../utils/logger";

export interface UserRequest extends Request {
    token: JwtPayload | String;
    user: Object;
}

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