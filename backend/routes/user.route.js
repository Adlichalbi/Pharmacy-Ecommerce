import express from "express";
import { protectRoute,adminRoute } from "../middleware/auth.middleware.js";
import { getAllUsers , updateUser ,deleteUser , createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/createUser/",protectRoute,adminRoute,createUser)
router.get("/", protectRoute, adminRoute, getAllUsers);
router.patch("/update-user/:id",protectRoute,adminRoute,updateUser)
router.delete("/:id",protectRoute,adminRoute,deleteUser)
export default router;