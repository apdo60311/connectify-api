import express from "express";
import { searchUsers } from "../controllers/user.controller";
import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/search").get(authorization, searchUsers);

export default router;
