import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  material: {
    type: String,
    required: true,
    trim: true
  },
  rate: {
    type: Number,
    required: true
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Rate', rateSchema);
