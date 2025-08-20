import Zone from '../models/Zone.js';
import Rate from '../models/Rate.js';

// GET rates by pincode
export const getRatesByPincode = async (req, res) => {
  try {
    const { pincode } = req.query;

    if (!pincode) return res.status(400).json({ message: "Pincode is required" });

    const zone = await Zone.findOne({ pincode });
    if (!zone) return res.status(404).json({ message: "No zone found for this pincode" });

    const rates = await Rate.find({ zone: zone._id });

    res.json({ zone: zone.name, rates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update rate
export const updateRate = async (req, res) => {
  try {
    const { rateId, rate } = req.body;

    if (!rateId || rate === undefined) {
      return res.status(400).json({ message: "rateId and rate are required" });
    }

    const updatedRate = await Rate.findByIdAndUpdate(
      rateId,
      { rate, lastUpdated: Date.now() },
      { new: true }
    );

    if (!updatedRate) return res.status(404).json({ message: "Rate not found" });

    res.json(updatedRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
