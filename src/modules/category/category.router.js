import {Router} from 'express';
import * as controller from './category.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth} from '../../middleware/auth.middleware.js';
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { endPoints } from './category.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router({caseSensitive:true});



router.use('/:id/subcategory',subCategoryRouter)//use :سواء كان جت او بوست او اي اشي 
router.get('/',controller.testCategory)
router.post('/createCategory',auth(endPoints.create),fileUpload(fileType.image).single('image'),asyncHandler( controller.createCategory))
router.get('/getAll',auth(endPoints.getAll),asyncHandler(controller.getAll))
router.get('/getActive',asyncHandler( controller.getActive))
router.get('/getDetails/:id',asyncHandler(controller.getDetails))
router.patch('/update/:id',auth(endPoints.update),fileUpload(fileType.image).single('image'),asyncHandler(controller.update))
router.delete('/delete/:id',auth(endPoints.delete),asyncHandler(controller.destroy))
export default router; 