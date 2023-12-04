import express from 'express';
import IntakeLog from '../models/intakeLogModel.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { date, foodIntake, carbohydrates, protein, fats, water } = req.body;
    const newIntakeLog = new IntakeLog({
      date,
      foodIntake,
      carbohydrates,
      protein,
      fats,
      water,
    });

    await newIntakeLog.save();
    res.status(200).json({ message: 'Intake log saved successfully' });
  } catch (error) {
    console.error('Error in /submit route:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
