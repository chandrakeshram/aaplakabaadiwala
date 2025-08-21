import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import pickupRoutes from './routes/pickupRoutes.js';
import adminRoutes from './routes/admin.js';
import { protect, admin } from './middlewares/auth.js';
import ratesRoutes from './routes/rates.js';
import zonesRouter from "./routes/zones.js";
import path from "path";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://chandrakeshram31:6R0011a7g0aeotqQ@cluster0.uusbtfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/kabaadiwalaDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Public routes
app.use('/api/auth', authRoutes);
// Protected routes
app.use('/api/pickups', protect, pickupRoutes);
app.use('/api/admin', protect, admin, adminRoutes);
app.use('/api/rates', protect,ratesRoutes); 
app.use("/api/zones", zonesRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
