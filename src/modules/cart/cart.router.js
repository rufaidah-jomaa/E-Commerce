import { Router } from "express";
import * as controller from './cart.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./cart.role.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as schema from './cart.validation.js'
import { asyncHandler } from "../../services/errorHandling.js";
const router = Router();

router.get('/',controller.test)
router.post('/create',auth(endPoints.create),validation(schema.addToCartSchema),asyncHandler(controller.create))
router.patch('/remove/:productId',auth(endPoints.remove),validation(schema.removeItemSchema),asyncHandler(controller.remove))
router.patch('/clear',auth(endPoints.clear),asyncHandler(controller.clear))
router.patch('/updateQ/:productId',auth(endPoints.quantity),validation(schema.updateQuantitySchema),asyncHandler(controller.updateQuantity))
export default router;