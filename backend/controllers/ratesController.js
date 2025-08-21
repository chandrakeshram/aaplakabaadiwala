import Rate from '../models/Rate.js';

// Get all rates
export const getRates = async (req, res) => {
  try {
    const rates = await Rate.find().sort({ lastUpdated: -1 });
    res.json({rates});
  } catch (error) {
    res.status(500).json({ message: "Error fetching rates", error });
  }
};

// Add a new rate
// Add a new rate
export const addRate = async (req, res) => {
  try {
    const { material, rate, district } = req.body; // ⬅️ Change 'rate' to 'price'

    if (!material || !rate || !district) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ⬅️ Make sure the new Rate object uses 'price'
    const newRate = new Rate({ material, rate, district });
    await newRate.save();
    res.status(201).json(newRate);
  } catch (error) {
    res.status(500).json({ message: "Error adding rate", error });
  }
};

// Update a rate
export const updateRate = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Rate.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating rate", error });
  }
};

// Delete a rate
export const deleteRate = async (req, res) => {
  try {
    const { id } = req.params;
    await Rate.findByIdAndDelete(id);
    res.json({ message: "Rate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rate", error });
  }
};
