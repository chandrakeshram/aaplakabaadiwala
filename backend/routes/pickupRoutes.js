// backend/routes/pickupRoutes.js
import express from 'express';
import { getPickups, createPickup } from '../controllers/pickupController.js'; // Note the .js extension

const router = express.Router();

// GET request to fetch all pickups
router.get('/', getPickups);

// POST request to create a new pickup
router.post('/', createPickup);

export default router; // This is the default export your server is looking for