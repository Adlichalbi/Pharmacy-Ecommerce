import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({ message: "No users found" });
        }else{
            return res.json({ users });
        }
    } catch (error) {
        console.log("Error in getUser controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }

}
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (error) {
        console.log("Error in getUser controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }else {
            return res.json({ message: "User deleted successfully" });
        }
    } catch (error) {

        console.log("error in deleteUser controller");
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const updateUser = async(req,res) => {
    try {
        const {id} = req.params;
        const {name,email,role} = req.body
        const user = await User.findByIdAndUpdate(id,{name,email,role},{new:true});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }else {
            return res.json({ message: "User updated successfully" });
        }
    } catch (error) {

        console.log("error in updateUser controller");
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

