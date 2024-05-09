import {Router} from 'express';
import * as controller from './category.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth} from '../../middleware/auth.middleware.js';
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { endPoints } from './category.roles.js';
const router = Router({caseSensitive:true});



router.use('/:id/subcategory',subCategoryRouter)//use :سواء كان جت او بوست او اي اشي 
router.get('/',controller.testCategory)
router.post('/createCategory',auth(endPoints.create),fileUpload(fileType.image).single('image'),controller.createCategory)
router.get('/getAll',auth(endPoints.getAll),controller.getAll)
router.get('/getActive',controller.getActive)
router.get('/getDetails/:id',controller.getDetails)
router.patch('/update/:id',auth(endPoints.update),fileUpload(fileType.image).single('image'),controller.update)
router.delete('/delete/:id',auth(endPoints.delete),controller.destroy)
export default router; 