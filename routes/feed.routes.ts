import express from 'express';
import { getFeed } from '../controllers/feeds.controller';
import { authorization } from '../middlewares/auth.middleware';


/**
 * Defines the route for retrieving the user's feed.
 * 
 * The route is mounted at `/` and requires the 'authorization' middleware to be executed before the 'getFeed' controller function.
 */
const router = express.Router();

router.route('/').get(authorization, getFeed);

export default router;
