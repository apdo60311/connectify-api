import { Document } from "mongoose";

/**
 * Represents a user in the application.
 * 
 * @interface IUser
 * @extends {Document}
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The hashed password of the user.
 * @property {boolean} isAdmin - Indicates if the user is an administrator.
 * @property {boolean} isBanned - Indicates if the user is banned.
 * @property {Date} createdAt - The date and time the user was created.
 * @property {Date} updatedAt - The date and time the user was last updated.
 * @method {Promise<boolean>} matchPassword - Compares the entered password with the user's hashed password.
 */
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}
