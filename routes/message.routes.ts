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

const router = express.Router();

router.route("/").post(authorization, sendMessage);
router.route("/:userId").get(authorization, getMessages);
router.route('/read').put(authorization, markAsRead);
router.route('/typing').put(authorization, markAsTyping);
router.route("/group").post(authorization, createGroupChat);
router.route("/group/:groupId").get(authorization, getGroupMessages);
router.route("/group/message").post(authorization, sendGroupMessage);

export default router;
