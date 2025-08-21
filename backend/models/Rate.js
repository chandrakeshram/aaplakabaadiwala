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
  district: {
    type: String,
    required: true,
    enum: [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", 
      "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
      "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
      "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar",
      "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
      "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ]
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Rate', rateSchema);
