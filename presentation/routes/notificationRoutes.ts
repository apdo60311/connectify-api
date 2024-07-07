import express from "express";
import {
    getNotifications,
    markAllAsRead,
    markAsRead,
} from "../controllers/notificationController";
import { authorization } from "../../middlewares/authMiddleware";

/**
 * Defines the routes for handling notification-related functionality.
 * 
 * The following routes are defined:
 * 
 * - GET /: Retrieves the user's notifications.
 * - PUT /: Marks a specific notification as read.
 * - PUT /mark-all-read: Marks all of the user's notifications as read.
 * 
 * All routes require the user to be authorized using the `authorization` middleware.
 */
const router = express.Router();

router.route("/").get(authorization, getNotifications).put(authorization, markAsRead);
router.route('/mark-all-read').put(authorization, markAllAsRead);

export default router;
