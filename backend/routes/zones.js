// routes/zones.js
import express from "express";
const router = express.Router();

const zones = [
  { id: 1, name: "Zone A" },
  { id: 2, name: "Zone B" },
  { id: 3, name: "Zone C" },
];

// GET all zones
router.get("/", (req, res) => {
  res.json(zones);
});

export default router;
