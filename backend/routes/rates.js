import express from 'express';
import { getRatesByPincode, updateRate } from '../controllers/ratesController.js';

const router = express.Router();

router.get('/', getRatesByPincode);
router.put('/', updateRate);

export default router;
