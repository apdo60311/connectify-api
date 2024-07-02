import express from "express";
import {
    getUsers,
    banUser,
    unbanUser,
    getReports,
} from "../controllers/admin.controller";
import { authorization } from "../middlewares/auth.middleware";

/**
 * Defines the admin routes for the application.
 * 
 * The following routes are available:
 * - GET /admin/users - Retrieves a list of all users
 * - POST /admin/ban - Bans a user
 * - POST /admin/unban - Unbans a user
 * - GET /admin/reports - Retrieves a list of all reports
 * 
 * All routes require the `authorization` middleware to be authenticated as an admin.
 */
const router = express.Router();

router.route("/users").get(authorization, getUsers);
router.route("/ban").post(authorization, banUser);
router.route("/unban").post(authorization, unbanUser);
router.route("/reports").get(authorization, getReports);

export default router;
