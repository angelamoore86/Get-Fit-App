import { getDbConnection } from '../db.js';
import jwt from 'jsonwebtoken';

export const getFitnessLogRoute = {
    path: '/api/fitnesslog/:date',
    method: 'get',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        if (!token){
            return res.status(401).json({ message: "No authorization header sent."});
        }
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const email = decodedToken.email;

            const { date } = req.params;

            const db = getDbConnection('Get-Fit-DB');

            const user = await db.collection('fitnessLogs').findOne({ email });
            if (!user) {
                return res.status(404).json({message: "User not found."});
            }

            const fitnessLogs = user.fitnesslogs || [];
            const logForDate = fitnessLogs.find(log => log.date === date);

            if (!logForDate){
                return res.status(404).json({message: "No logs found for user and date."});
            }

            res.status(200).json(logForDate);

        } catch (error){
            console.error("Error:", error.message);
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
};