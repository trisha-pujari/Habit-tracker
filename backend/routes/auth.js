import express from "express";
import {
    register,
    login,
    me,
    updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register); //public
router.post("/login", login); //public
router.get("/me", protect, me); //protected route, user must be logged in to access their profile info
router.put("/me", protect, updateProfile); //protected

export default router;
