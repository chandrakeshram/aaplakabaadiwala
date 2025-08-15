import express from 'express';

const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({ message: "Admin stats placeholder" });
});

export default router;
