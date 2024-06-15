import express from "express";
import {
    sendFriendRequest,
    respondToFriendRequest,
    getFriendRequests,
    removeFriend,
} from "../controllers/friendrequest.controller";

import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router
    .route("/")
    .post(authorization, sendFriendRequest)
    .get(authorization, getFriendRequests)
    .delete(authorization, removeFriend);
router.route("/respond").post(authorization, respondToFriendRequest);
export default router;
