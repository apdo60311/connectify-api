import express from "express";
import {
    getUsers,
    banUser,
    unbanUser,
    getReports,
} from "../controllers/admin.controller";
import { authorization } from "../middlewares/auth.middleware";

/**
 * Defines the admin routes for managing users and reports.
 * 
 * @route GET /admin/users
 * @function getUsers
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * 
 * @route POST /admin/ban
 * @function banUser
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * 
 * @route POST /admin/unban
 * @function unbanUser
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * 
 * @route GET /admin/reports
 * @function getReports
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
const router = express.Router();

router.route("/users").get(authorization, getUsers);
router.route("/ban").post(authorization, banUser);
router.route("/unban").post(authorization, unbanUser);
router.route("/reports").get(authorization, getReports);

export default router;
