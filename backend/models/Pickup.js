import mongoose from 'mongoose';

const pickupSchema = new mongoose.Schema({
  address: String,
  pincode: String,
  scrapItems: [String],
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" }
});

export default mongoose.model('Pickup', pickupSchema);
