import {Router} from 'express';
import * as controller from './auth.controller.js'
const router = Router();

router.get('/',controller.testAuth)
router.post('/register',controller.register)
router.post('/login',controller.login)
export default router;