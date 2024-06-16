import express from "express";
import {
    getPrivacySettings,
    updatePrivacySettings,
    blockUser,
    unblockUser,
} from "../controllers/privacy.controller";
import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router
    .route("/")
    .get(authorization, getPrivacySettings)
    .put(authorization, updatePrivacySettings);
router.route("/block").post(authorization, blockUser).delete(authorization, unblockUser);

export default router;
