import express from 'express';

import { authorization } from '../middlewares/auth.middleware'
import { addReact } from "../controllers/reaction.controller"

const router = express.Router();

router.route('/').post(authorization, addReact);

export default router;
