// backend/controllers/pickupController.js
import Pickup from '../models/Pickup.js'; // Import the default export

export const getPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    res.status(200).json({ pickups });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickups.', error });
  }
};

export const createPickup = async (req, res) => {
  try {
    const { name, address, phone, date, time, status, createdAt } = req.body;
    const newPickup = new Pickup({ name, address, phone, date, time, status, createdAt });
    await newPickup.save();
    res.status(201).json({ message: 'Pickup booked successfully!', pickup: newPickup });
  } catch (error) {
    res.status(400).json({ message: 'Error creating pickup.', error });
  }
};