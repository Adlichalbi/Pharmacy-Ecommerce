import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                 message: "Unauthorized - No access token provided" 
                });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next(); // Move to the next middleware
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - Access token expired" });
            }
            return res.status(401).json({ message: "Unauthorized - Invalid access token" });
        }
    } catch (error) {
        console.error("Error in protect route middleware:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const adminRoute =(req,res,next) => {
    if(req.user && req.user.role ==="admin"){
        next()
    }else {
        return res.status(403).json({message:"Forbidden - User is not an admin"})
    }
}