// backend/routes/pickupRoutes.js
import express from 'express';
import { getPickups, createPickup, updatePickupStatus, deletePickup } from '../controllers/pickupController.js';
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();

// Route for a normal user to create a pickup (protected)
router.post('/create', protect, createPickup);

// Routes for admin to manage pickups (protected by admin middleware)
router.get('/', protect, admin, getPickups);
router.put('/:id/status', protect, admin, updatePickupStatus);
router.delete('/:id', protect, admin, deletePickup);

export default router;