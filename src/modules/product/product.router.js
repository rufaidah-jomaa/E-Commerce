import {Router} from 'express';
import * as controller from './product.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './product.role.js';
import reviewRouter from '../review/review.router.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as schema from './product.validation.js'
const router = Router();

router.use('/:productId/review',reviewRouter)
router.post('/createProduct',auth(endPoints.createProduct),fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),validation(schema.createProductSchema),asyncHandler(controller.createProduct))

router.get('/getDetails/:id',validation(schema.getDetailsSchema),asyncHandler (controller.getDetails))
router.get('/', asyncHandler(controller.getProducts))
export default router;