import express from "express";
import { searchUsers } from "../controllers/user.controller";
import { authorization } from "../middlewares/auth.middleware";

/**
 * Defines a route for searching users.
 * 
 * The route is mounted at `/search` and requires the `authorization` middleware to be executed before the `searchUsers` controller function.
 */
const router = express.Router();

router.route("/search").get(authorization, searchUsers);

export default router;
