import express from 'express';

import { authorization } from '../../middlewares/authMiddleware'
import { addReact } from "../controllers/reactionController"

/**
 * Defines a route for adding a reaction to a resource.
 *
 * The POST /reaction route is defined, which requires the user to be authorized using the `authorization` middleware. The `addReact` controller function is called to handle the request.
 */
const router = express.Router();

router.route('/').post(authorization, addReact);

export default router;
