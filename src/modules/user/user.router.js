import {Router} from 'express';
import * as controller from './user.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.get('/',asyncHandler(controller.testUser))
export default router;