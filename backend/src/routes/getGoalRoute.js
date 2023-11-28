import { getDbConnection } from '../db.js';
import jwt from 'jsonwebtoken';
import {ObjectId} from "mongodb";

export const getGoalRoute = {
    path: '/api/usergoals',
    method: 'get',
    handler: async (req, res) => {
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];


        if (!token){
            return res.status(401).json({ message: "No authorization header sent."});
        }


        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify token."});

            const { _id: id } = decoded;

            const db = getDbConnection('react-auth-db');

            const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

            if (!user) {
                return res.status(404).json({message: "User not found."});
            }

            const { email, profile, goals } = user;

            res.status(200).json({ email, profile, goals });
        });
    },
};