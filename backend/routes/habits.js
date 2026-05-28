import express from "express"; //express.js is used to create the router for handling habit-related routes
import {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
    reorderHabits,
} from "../controllers/habitController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); 

router.get("/", getHabits); 
router.post("/", createHabit); 
router.put("/reorder", reorderHabits); 
router.put("/:id", updateHabit); 
router.delete("/:id", deleteHabit); 
router.put("/:id/archive", archiveHabit); 

export default router;