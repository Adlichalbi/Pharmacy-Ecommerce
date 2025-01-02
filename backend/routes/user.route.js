import express from "express";
import { protectRoute,adminRoute } from "../middleware/auth.middleware.js";
import { getAllUsers , updateUser ,deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllUsers);
router.patch("/update-user/:d",protectRoute,adminRoute,updateUser)
router.delete("/:id",protectRoute,adminRoute,deleteUser)
export default router;