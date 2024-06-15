import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
import { authorization } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/").get(authorization, getProfile).put(authorization, updateProfile);

export default router;
