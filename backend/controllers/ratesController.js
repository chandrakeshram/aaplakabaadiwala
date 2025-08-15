import Zone from '../models/Zone.js';
import Rate from '../models/Rate.js';

export const getRatesByPincode = async (req, res) => {
  try {
    const { pincode } = req.query;
    const zone = await Zone.findOne({ pincode });
    if (!zone) return res.status(404).json({ message: "No zone found" });

    const rates = await Rate.find({ zone: zone._id });
    res.json({ zone: zone.name, rates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRate = async (req, res) => {
  try {
    const { rateId, baseRate } = req.body;
    const rate = await Rate.findByIdAndUpdate(rateId, { baseRate }, { new: true });
    res.json(rate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
