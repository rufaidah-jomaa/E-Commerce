import {Router} from 'express'
import * as controller from './order.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './order.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router=Router();

router.post('/create',auth(endPoints.create),asyncHandler( controller.create))
router.get('/getAll',auth(endPoints.getOrders),asyncHandler (controller.getOrders))
router.get('/myOrders',auth(endPoints.myOrders),asyncHandler (controller.getMyOrders))
router.patch('/changeStatus/:orderId',auth(endPoints.changeStatus),asyncHandler (controller.changeStatus))
export default router;