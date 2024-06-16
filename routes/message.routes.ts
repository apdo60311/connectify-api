import express from "express";
import {
    sendMessage,
    getMessages,
    createGroupChat,
    sendGroupMessage,
    getGroupMessages,
} from "../controllers/message.controller";
import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(authorization, sendMessage);
router.route("/:userId").get(authorization, getMessages);

router.route("/group").post(authorization, createGroupChat);
router.route("/group/:groupId").get(authorization, getGroupMessages);
router.route("/group/message").post(authorization, sendGroupMessage);

export default router;
