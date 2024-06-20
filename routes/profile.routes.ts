import express from "express";
import { createProfile, getProfile, updateProfile, uploadProfilePicture } from "../controllers/profile.controller";
import { authorization } from "../middlewares/auth.middleware";
import { errorResponse } from "../utils/response/response.util";
import uploadMulterFile from "../config/multer.config";
import { profilePicUploadMiddleware } from "../middlewares/profilePic.middleware";
const router = express.Router();

router.route("/").get(authorization, getProfile).put(authorization, updateProfile);
router.route("/user").post(authorization, profilePicUploadMiddleware, uploadMulterFile.single('profilePicture'), createProfile);
router.route("upload").post(authorization, uploadProfilePicture);
export default router;
