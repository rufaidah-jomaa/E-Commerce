import {Router} from 'express'
import * as controller from './order.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './order.roles.js';
const router=Router();

router.post('/create',auth(endPoints.create),controller.create)
export default router;