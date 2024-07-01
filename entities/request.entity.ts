import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * Represents a user object with an id, name, and isAdmin status.
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {boolean} isAdmin - Indicates whether the user has admin privileges.
 */
interface UserObject extends Object {
    id: string;
    name: string;
    isAdmin: boolean;
}

/**
 * Extends the Express Request object with additional properties for a user's JWT payload and user object.
 * 
 * @property {JwtPayload | String} token - The decoded JWT payload, or the raw JWT string if the payload could not be decoded.
 * @property {UserObject} user - An object containing the user's id, name, and isAdmin status.
 */
export interface UserRequest extends Request {
    token: JwtPayload | String;
    user: UserObject;
}