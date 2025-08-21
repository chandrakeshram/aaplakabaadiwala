// backend/routes/rates.js
import express from "express";
import { getRates, addRate, updateRate, deleteRate } from "../controllers/ratesController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

// All logged-in users can view
router.get("/", protect, getRates);

// Only admins can manage
router.post("/", protect, admin, addRate);
router.put("/:id", protect, admin, updateRate);
router.delete("/:id", protect, admin, deleteRate);

export default router;
