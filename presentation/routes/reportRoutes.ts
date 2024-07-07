import express from "express";
import { createReport } from "../controllers/reportController";
import { authorization } from "../../middlewares/authMiddleware";

/**
 * Defines a route for creating a new report.
 *
 * The POST /report route is protected by the `authorization` middleware, which ensures that only authenticated users can access this endpoint.
 * When a request is made to this route, the `createReport` controller function is executed to handle the report creation logic.
 */
const router = express.Router();

router.route("/").post(authorization, createReport);

export default router;
