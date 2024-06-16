import express from "express";
import {
    getUsers,
    banUser,
    unbanUser,
    getReports,
} from "../controllers/admin.controller";
import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/users").get(authorization, getUsers);
router.route("/ban").post(authorization, banUser);
router.route("/unban").post(authorization, unbanUser);
router.route("/reports").get(authorization, getReports);

export default router;
