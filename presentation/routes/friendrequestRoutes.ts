import express from "express";
import {
    sendFriendRequest,
    respondToFriendRequest,
    getFriendRequests,
    removeFriend,
} from "../controllers/friendrequestController";

import { authorization } from "../../middlewares/authMiddleware";

/**
 * Defines the routes for handling friend request-related functionality.
 * 
 * The following routes are defined:
 * 
 * - POST /: Sends a new friend request.
 * - GET /: Retrieves the user's pending friend requests.
 * - DELETE /: Removes a friend.
 * - POST /respond: Responds to a pending friend request.
 * 
 * All routes require the user to be authorized using the `authorization` middleware.
 */
const router = express.Router();

router
    .route("/")
    .post(authorization, sendFriendRequest)
    .get(authorization, getFriendRequests)
    .delete(authorization, removeFriend);
router.route("/respond").post(authorization, respondToFriendRequest);

export default router;
