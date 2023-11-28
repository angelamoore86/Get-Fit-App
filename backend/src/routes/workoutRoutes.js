import express from 'express';
import FitnessLog from '../models/fitnessLogModel.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  console.log('Received data for /submit:', req.body);

  try {
    const { date, cardioData, strengthTrainingData } = req.body;
    const newFitnessLog = new FitnessLog({
      date,
      cardioData,
      strengthTrainingData
    });

    console.log('Saving fitness log:', newFitnessLog);

    await newFitnessLog.save();
    res.status(200).json({ message: 'Fitness log saved successfully' });
  } catch (error) {

    console.error('Error in /submit route:', error);

    res.status(500).json({ message: error.message });
  }
});

export default router;
