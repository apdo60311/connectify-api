import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../entities/user.entity";


/**
 * Defines the schema for the User model in the application.
 * The User model represents a user account and includes the following fields:
 * - `name`: The user's name, required.
 * - `email`: The user's email address, required and unique.
 * - `password`: The user's password, required.
 * - `isAdmin`: A boolean indicating whether the user is an admin, default is false.
 * - `isBanned`: A boolean indicating whether the user is banned, default is false.
 * The schema also includes timestamps for when the user was created and last updated.
 */
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
}, { timestamps: true });

/**
 * Compares the entered password with the user's stored password hash.
 * @param enteredPassword - The password entered by the user.
 * @returns A Promise that resolves to a boolean indicating whether the entered password matches the stored password.
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Middleware function that is executed before a User document is saved to the database.
 * If the `password` field has been modified, this middleware will hash the new password
 * using bcrypt with a salt of 10 rounds before saving the document.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
