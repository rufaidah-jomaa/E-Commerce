import {Router} from 'express';
import * as controller from './subcategory.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
const router = Router({mergeParams:true});

router.get('/',controller.testsubCategory)
router.post('/createSubCategory',auth(["Admin"]),fileUpload(fileType.image).single('image'),controller.createSubCategory)
router.get('/getallsub',controller.getAll)
export default router; 