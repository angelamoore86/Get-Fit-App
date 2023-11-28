import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const updateGoalRoute = {
    path: '/api/updategoals',
    method: 'post',
    handler: async (req, res) => {
        try{
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "No authorization header sent."});
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const email = decodedToken.email;
            const { goalData } = req.body;

            const db = getDbConnection('react-auth-db');

            const result = await db.collection('users').findOneAndUpdate(
                { email: email },
                { $set: { goals: goalData  } },
                { returnDocument: 'after'}
            );

            if (!result.value){
                return res.status(404).json({message: 'Profile not found.'});
            }
            return res.status(200).json({message: 'Goals has been updated.'});
        } catch (error) {
            console.error("Error", error.message);
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
};