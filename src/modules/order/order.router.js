import {Router} from 'express'
import * as controller from './order.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { endPoints } from './order.roles.js';
import { asyncHandler } from '../../services/errorHandling.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as schema from './order.validation.js'
const router=Router();

router.post('/create',auth(endPoints.create),validation(schema.createOrderSchema),asyncHandler( controller.create))
router.get('/getAll',auth(endPoints.getOrders),asyncHandler (controller.getOrders))
router.get('/myOrders',auth(endPoints.myOrders),asyncHandler (controller.getMyOrders))
router.patch('/changeStatus/:orderId',auth(endPoints.changeStatus),validation(schema.changeStatusSchema),asyncHandler (controller.changeStatus))
export default router;