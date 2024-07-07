import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

/**
 * Defines the routes for handling user authentication functionality.
 * 
 * The following routes are defined:
 * 
 * - POST /register: Registers a new user.
 * - POST /login: Authenticates a user and returns a session token.
 */
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;