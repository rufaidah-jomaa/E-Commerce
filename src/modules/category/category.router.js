import {Router} from 'express';
import * as controller from './category.controller.js'
import fileUpload, { fileType } from '../../services/multer.js';
const router = Router({caseSensitive:true});

router.get('/',controller.testCategory)
router.post('/createCategory',fileUpload(fileType.image).single('image'),controller.createCategory)
export default router;