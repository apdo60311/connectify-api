import express from "express";
import {
    sendMessage,
    getMessages,
    createGroupChat,
    sendGroupMessage,
    getGroupMessages,
    markAsTyping,
} from "../controllers/message.controller";
import { authorization } from "../middlewares/auth.middleware";
import { markAsRead } from "../controllers/notification.controller";


/**
 * Defines the routes for handling message-related functionality.
 * 
 * The following routes are defined:
 * 
 * - POST /: Sends a message.
 * - GET /:userId: Retrieves the messages for the specified user.
 * - PUT /read: Marks a notification as read.
 * - PUT /typing: Marks a user as typing.
 * - POST /group: Creates a new group chat.
 * - GET /group/:groupId: Retrieves the messages for the specified group.
 * - POST /group/message: Sends a message to a group.
 * 
 * All routes require the user to be authorized using the `authorization` middleware.
 */
const router = express.Router();

router.route("/").post(authorization, sendMessage);
router.route("/:userId").get(authorization, getMessages);
router.route('/read').put(authorization, markAsRead);
router.route('/typing').put(authorization, markAsTyping);
router.route("/group").post(authorization, createGroupChat);
router.route("/group/:groupId").get(authorization, getGroupMessages);
router.route("/group/message").post(authorization, sendGroupMessage);

export default router;
