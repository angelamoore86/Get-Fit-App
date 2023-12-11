import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const postIntakeLogRoute = {
  path: '/api/intakelog',
  method: 'post',
  handler: async (req, res) => {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: "No authorization header sent." });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const email = decodedToken.email;

      const { date, foodIntake, carbohydrates, protein, fats, water } = req.body;

      const db = getDbConnection('Get-Fit-DB');

      const user = await db.collection('intakeLogs').findOne({email});

      if(!user) {
        await db.collection('intakeLogs').insertOne({email, intakelogs: []});
      }

      const result = await db.collection('intakeLogs').updateOne(
        { email: email },
        { 
          $push: { intakelogs: 
          {date, foodIntake, carbohydrates, protein, fats, water},
        },
        },
          {upsert: true}
        );

      if (result.modifiedCount === 0) {
        return res.status(500).json({ message: 'Failed to insert intake log.' });
      }

      return res.status(200).json({ message: 'Intake log saved successfully.' });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
