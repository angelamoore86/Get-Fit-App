import { getDbConnection } from '../db.js';
import jwt from 'jsonwebtoken';

export const getIntakeLogDatesRoute = {
    path: '/api/getintakelogdates',
    method: 'get',
    handler: async (req, res) => {
        try{
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];

            if (!token){
                return res.status(401).json({ message: "No authorization header sent." });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.email;

            const db = getDbConnection('Get-Fit-DB');

            const logDates = await db.collection('intakeLogs').distinct('intakelogs.date', {email});

            res.status(200).json({ dates: logDates });
        } catch (error) {
            console.error('Error getting the log dates.', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
};