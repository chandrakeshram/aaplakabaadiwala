import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  scrapType: String,
  baseRate: Number,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' }
});

export default mongoose.model('Rate', rateSchema);
