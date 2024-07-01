import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

/**
 * Defines the routes for user authentication, including registration and login.
 * 
 * @route POST /register
 * @function registerUser
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * 
 * @route POST /login
 * @function loginUser
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;