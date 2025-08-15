import Pickup from '../models/Pickup.js';

export const createPickup = async (req, res) => {
  try {
    const pickup = await Pickup.create(req.body);
    res.status(201).json(pickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find();
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
