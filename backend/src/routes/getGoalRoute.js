import { getDbConnection } from '../db.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export const getGoalRoute = {
    path: '/api/usergoals/:userId',
    method: 'get', 
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        if (!authorization){
            return res.status(401).json({ message: "No authorization header sent."});
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify token."});

            const {id, isVerified } = decoded;

            if (id !== userId) return res.status(403).json({ message: "Not allowed to access user profile."});
            if (!isVerified) return res.status(403).json({message: "Email must be verfied before access."});

            const db = getDbConnection('react-auth-db');
        
            try {
                const user = await db.collection('users').findOne({ _id: ObjectId(userId) });

                if (!user) {
                    return res.status(404).json({message: "User not found."});
                }

                const { goals } = user;

                res.status(200).json({  goals });
            } catch (error){
                console.error('Error occured fetching user profile data:', error);
                res.status(500).json({message: "Internal Server Error."});
            }
        });
    },
};