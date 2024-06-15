import express from 'express';

import { authorization } from '../middlewares/auth.middleware'
import { likePost } from "../controllers/like.controller"

const router = express.Router();

router.route('/').post(authorization, likePost);

export default router;
