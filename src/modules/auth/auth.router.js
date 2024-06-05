import {Router} from 'express';
import * as controller from './auth.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { checkEmail } from '../../middleware/checkEmail.js';

const router = Router();

router.get('/',controller.testAuth)
router.post('/register',checkEmail,asyncHandler(controller.register))
router.get('/confirmEmail/:token',asyncHandler(controller.confirmEmail))
router.post('/login',asyncHandler(controller.login))
router.patch('/sendCode',asyncHandler(controller.sendCode))
router.patch('/forgotPassword',asyncHandler(controller.forgotPassword))
export default router;