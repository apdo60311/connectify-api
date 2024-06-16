import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface UserObject extends Object {
    id: string;
    name: string;
    isAdmin: boolean;
}

export interface UserRequest extends Request {
    token: JwtPayload | String;
    user: UserObject;
}