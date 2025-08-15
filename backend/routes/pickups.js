import express from 'express';
import { createPickup, getPickups } from '../controllers/pickupsController.js';

const router = express.Router();

router.post('/', createPickup);
router.get('/', getPickups);

export default router;
