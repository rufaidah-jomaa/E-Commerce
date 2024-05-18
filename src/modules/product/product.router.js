import {Router} from 'express';
import * as controller from './product.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './product.role.js';
const router = Router();

router.get('/',controller.testProduct)
router.post('/createProduct',auth(endPoints.createProduct),fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5}
]),controller.createProduct)
export default router;