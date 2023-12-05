import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const fitnessLogRoute = {
  path: '/api/fitnesslog',
  method: 'post',
  handler: async (req, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: "No authorization header sent." });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.id;

      const { date, cardioData, strengthTrainingData } = req.body;

      const db = getDbConnection('Get-Fit-App');

      const result = await db.collection('fitnesslogs').insertOne({
        userId,
        date,
        cardioData,
        strengthTrainingData,
      });

      if (!result.insertedId) {
        return res.status(500).json({ message: 'Failed to insert fitness log.' });
      }

      return res.status(200).json({ message: 'Fitness log saved successfully.' });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
