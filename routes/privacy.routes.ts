import express from "express";
import {
    getPrivacySettings,
    updatePrivacySettings,
    blockUser,
    unblockUser,
} from "../controllers/privacy.controller";
import { authorization } from "../middlewares/auth.middleware";

/**
 * Defines the routes for privacy-related functionality in the application.
 * 
 * The following routes are defined:
 * 
 * - GET /: Retrieves the current privacy settings for the authenticated user.
 * - PUT /: Updates the privacy settings for the authenticated user.
 * - POST /block: Blocks the specified user for the authenticated user.
 * - DELETE /block: Unblocks the specified user for the authenticated user.
 * 
 * All routes require the user to be authenticated using the `authorization` middleware.
 */
const router = express.Router();

router
    .route("/")
    .get(authorization, getPrivacySettings)
    .put(authorization, updatePrivacySettings);
router.route("/block").post(authorization, blockUser).delete(authorization, unblockUser);

export default router;
