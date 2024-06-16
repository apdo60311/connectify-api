import express from 'express';
import { getFeed } from '../controllers/feeds.controller';
import { authorization } from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get(authorization, getFeed);

export default router;
