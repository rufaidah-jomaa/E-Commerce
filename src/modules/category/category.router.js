import {Router} from 'express';
import * as controller from './category.controller.js'
const router = Router();

router.get('/',controller.testCategory)
export default router;