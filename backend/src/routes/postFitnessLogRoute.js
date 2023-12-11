import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const postFitnessLogRoute = {
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
      const email = decodedToken.email;

      const { date, cardioData, strengthTrainingData } = req.body;

      const db = getDbConnection('Get-Fit-DB');

      const user = await db.collection('fitnessLogs').findOne({email});

      if(!user) {
        await db.collection('fitnessLogs').insertOne({email, fitnesslogs: []});
      }
      const result = await db.collection('fitnessLogs').updateOne(
        {email: email },
        { $push: { fitnesslogs: 
          {date, cardioData, strengthTrainingData},
        },
        },
          { upsert: true}
        );

      if (result.modifiedCount === 0) {
        return res.status(500).json({ message: 'Failed to insert fitness log.' });
      }

      return res.status(200).json({ message: 'Fitness log saved successfully.' });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
