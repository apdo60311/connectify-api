import express from "express";
import {
    getNotifications,
    markAllAsRead,
    markAsRead,
} from "../controllers/notification.controller";
import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").get(authorization, getNotifications).put(authorization, markAsRead);
router.route('/mark-all-read').put(authorization, markAllAsRead);

export default router;
