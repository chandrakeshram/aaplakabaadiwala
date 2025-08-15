import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema({
  name: String,
  pincode: String
});

export default mongoose.model('Zone', zoneSchema);
