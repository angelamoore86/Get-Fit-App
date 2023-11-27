import { getDbConnection } from '../db.js';
import jwt from 'jsonwebtoken';

export const getProfileRoute = {
    path: '/api/profile',
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

            const db = getDbConnection('react-auth-db');
            
            const user = await db.collection('users').findOne({ email });

            if (!user) {
                return res.status(404).json({message: "User not found."});
            }
            const {profile, goals} = user;

            res.status(200).json({ 
                    email,
                    profile,
                    goals
                });
        } catch (error){
            console.error("Error:", error.message);
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
};
