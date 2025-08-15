import mongoose from 'mongoose';
import Zone from '../models/Zone.js';
import Rate from '../models/Rate.js';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Zone.deleteMany();
  await Rate.deleteMany();

  const zone1 = await Zone.create({ name: "Pune Central", pincode: "411001" });
  const zone2 = await Zone.create({ name: "Pune West", pincode: "411021" });

  await Rate.create([
    { scrapType: "Iron", baseRate: 25, zone: zone1._id },
    { scrapType: "Copper", baseRate: 350, zone: zone1._id },
    { scrapType: "Iron", baseRate: 20, zone: zone2._id },
    { scrapType: "Copper", baseRate: 320, zone: zone2._id }
  ]);

  console.log("Seed data inserted");
  process.exit();
};

seed();
