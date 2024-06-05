import {Router} from 'express';
import * as controller from './product.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './product.role.js';
import reviewRouter from '../review/review.router.js'
import { asyncHandler } from '../../services/errorHandling.js';

const router = Router();

router.use('/:productId/review',reviewRouter)
router.post('/createProduct',auth(endPoints.createProduct),fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5}
]),asyncHandler(controller.createProduct))

router.get('/getDetails/:id',asyncHandler (controller.getDetails))
router.get('/', asyncHandler(controller.getProducts))
export default router;