import express from "express";
import { createReport } from "../controllers/report.controller";
import { authorization } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(authorization, createReport);

export default router;
