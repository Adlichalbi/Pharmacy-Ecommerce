import express from "express";
import { protectRoute,adminRoute } from "../middleware/auth.middleware.js";
import { getAllOrders , updateOrderStatus ,getMyOrders} from "../controllers/orders.controller.js";

const router = express.Router()

router.get("/",protectRoute,adminRoute,getAllOrders)
router.put("/:id/status",protectRoute,adminRoute,updateOrderStatus)
router.get("/my-orders",protectRoute,getMyOrders)
export default router