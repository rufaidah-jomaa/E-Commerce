import {Router} from 'express';
import * as controller from './category.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
const router = Router({caseSensitive:true});

router.get('/',controller.testCategory)
router.post('/createCategory',fileUpload(fileType.image).single('image'),controller.createCategory)
router.get('/getAll',controller.getAll)
router.get('/getActive',controller.getActive)
router.get('/getDetails/:id',controller.getDetails)
router.patch('/update/:id',fileUpload(fileType.image).single('image'),controller.update)
router.delete('/delete/:id',controller.destroy)
export default router; 