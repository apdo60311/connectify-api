import express from "express";
import { createProfile, getProfile, updateProfile, uploadProfilePicture } from "../controllers/profileController";
import { authorization } from "../../middlewares/authMiddleware";
import { errorResponse } from "../../core/utils/response/responseUtils";
import uploadMulterFile from "../../core/config/multer.config";
import { profilePicUploadMiddleware } from "../../middlewares/profilePicMiddleware";

/**
 * Defines the routes for handling profile-related functionality.
 * 
 * The following routes are defined:
 * 
 * - GET /: Retrieves the user's profile.
 * - PUT /: Updates the user's profile.
 * - POST /user: Creates a new user profile.
 * - POST /upload: Uploads a new profile picture for the user.
 * 
 * All routes require the user to be authorized using the `authorization` middleware.
 * The `profilePicUploadMiddleware` and `uploadMulterFile.single('profilePicture')` middleware are used to handle the profile picture upload.
 */

const router = express.Router();

router.route("/").get(authorization, getProfile).put(authorization, updateProfile);
router.route("/user").post(authorization, profilePicUploadMiddleware, uploadMulterFile.single('profilePicture'), createProfile);
router.route("upload").post(authorization, uploadProfilePicture);

export default router;
