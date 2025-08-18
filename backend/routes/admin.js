// backend/routes/admin.js
import express from 'express';
import { getRates, updateRate } from '../controllers/adminController.js';

const router = express.Router();

// GET request to fetch rates
router.get('/rates', getRates);

// PUT request to update a specific rate
router.put('/rates/:material', updateRate);

export default router;