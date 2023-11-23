import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';
import { ObjectId } from 'mongodb';

export const updateGoalRoute = {
    path: '/api/updategoals/:userId',
    method: 'put', 
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;
        
        const { goal1, goal2, goal3 } = req.body;

        if (!authorization) {
            return res.status(401).json({ message: "No authorization header sent."});
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unable to verify token.'});

            const { id, isVerified } = decoded;

            if (id !== userId) return res.status(403).json({ message: "Not authorized to update user's data."});
            if (!isVerified) return res.status(403).json({message: 'Email must be verified before updating data.'})

            const db = getDbConnection('react-auth-db');

            try {
                const result = await db.collection('users').findOneAndUpdate(
                    { _id: ObjectId(userId) },
                    { $set: { "goals.goal1": goal1, "goals.goal2": goal2, "goals.goal3": goal3  } },
                    { returnOriginal: false }
                );
            
                if(!result.value){
                    return res.status(404).json({ message: "User not found"});
                }
                res.status(200).json(result.value);
            } catch (error){
                console.error("Error updating goals.", error);
                res.status(500).json({message: "Internal server error."});
            }
        });
    }
};