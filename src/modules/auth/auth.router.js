import {Router} from 'express';
import * as controller from './auth.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as schema from './auth.validation.js'
import fileUpload, { fileType } from '../../services/multer.js';
const router = Router();

router.get('/',controller.testAuth)
router.post('/register',validation(schema.registerSchema),checkEmail,asyncHandler(controller.register))
router.get('/confirmEmail/:token',asyncHandler(controller.confirmEmail))
router.post('/excel',fileUpload(fileType.excel).single('excel'),asyncHandler(controller.addUsersExcel))
router.post('/login',validation(schema.loginSchema),asyncHandler(controller.login))
router.patch('/sendCode',validation(schema.sendCodeSchema),asyncHandler(controller.sendCode))
router.patch('/forgotPassword',validation(schema.forgotPasswordSchema),asyncHandler(controller.forgotPassword))
export default router;