import express from 'express';
import { getRatesByPincode, updateRate } from '../controllers/ratesController.js';
import { protect } from '../middlewares/auth.js'; // only protect, no admin

const router = express.Router();

// GET /api/rates?pincode=XXXXX
router.get('/', protect, getRatesByPincode);

// PUT /api/rates - optional, admin only if needed
// router.put('/', protect, updateRate);

export default router;
