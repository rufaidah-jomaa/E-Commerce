import {Router} from 'express';
import * as controller from './subcategory.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
import { auth } from '../../middleware/auth.middleware.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router({mergeParams:true});

router.get('/',controller.testsubCategory)
router.post('/createSubCategory',auth(["Admin"]),fileUpload(fileType.image).single('image'),asyncHandler(controller.createSubCategory))
router.get('/getallsub',asyncHandler(controller.getAll))
export default router; 