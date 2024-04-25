import {Router} from 'express';
import * as controller from './auth.controller.js'
const router = Router();

router.get('/',controller.testAuth)
export default router;