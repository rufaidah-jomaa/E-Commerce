import {Router} from 'express';
import * as controller from './category.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth} from '../../middleware/auth.middleware.js';
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { endPoints } from './category.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as schema from './category.validation .js'
const router = Router({caseSensitive:true});



router.use('/:id/subcategory',subCategoryRouter)//use :سواء كان جت او بوست او اي اشي 
router.get('/',controller.testCategory)
router.post('/createCategory',fileUpload(fileType.image).single('image'),validation(schema.createCategorySchema),auth(endPoints.create),asyncHandler( controller.createCategory))
router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.get('/getActive',asyncHandler( controller.getActive))
router.get('/getDetails/:id',validation(schema.getDetailsSchema),asyncHandler(controller.getDetails))
router.patch('/update/:id',fileUpload(fileType.image).single('image'),validation(schema.updateCategorySchema),auth(endPoints.update),asyncHandler(controller.update))
router.delete('/delete/:id',validation(schema.deleteCategorySchema),auth(endPoints.delete),asyncHandler(controller.destroy))
export default router; 