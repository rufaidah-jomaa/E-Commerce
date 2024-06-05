import {Router} from 'express'
import * as controller from './review.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './review.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router =  Router({mergeParams:true});

router.post('/',auth(endPoints.create),asyncHandler(controller.create))

export default router;