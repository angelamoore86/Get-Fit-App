import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const updateProfileRoute = {
    path: '/api/updateprofile',
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
            const { profileData } = req.body;

            const db = getDbConnection('Get-Fit-DB');

            const result = await db.collection('users').findOneAndUpdate(
                { email: email },
                { $set: { profile: profileData  } },
                { returnDocument: 'after'}
            );

            if (result.modifiedCount === 0){
                return res.status(404).json({message: 'Profile not found.'});
            }

            return res.status(200).json({message: 'Profile has bee updated.'});
        } catch (error) {
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
};
    