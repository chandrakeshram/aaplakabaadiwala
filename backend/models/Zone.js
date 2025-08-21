import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pincodes: [
    {
      type: String, // store pincode as string for flexibility
      required: true,
    },
  ],
});

export default mongoose.model("Zone", zoneSchema);
