import express from 'express';

import { authorization } from '../middlewares/auth.middleware'
import { addReact } from "../controllers/reaction.controller"

/**
 * Defines a route for adding a reaction to a resource.
 *
 * The POST /reaction route is defined, which requires the user to be authorized using the `authorization` middleware. The `addReact` controller function is called to handle the request.
 */
const router = express.Router();

router.route('/').post(authorization, addReact);

export default router;
