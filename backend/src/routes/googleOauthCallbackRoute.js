import jwt from 'jsonwebtoken';
import { getGoogleUser } from "../getGoogleUser.js";
import { updateOrCreateUserFromOauth} from "../updateOrCreateUserFromOauth.js";
import 'dotenv/config.js';

export const googleOauthCallbackRoute = {
    path: '/api/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {

        const { code } = req.query;

        const oauthUserInfo = await getGoogleUser({ code });

        const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo }) || {};

        const { _id: id, isVerified, email, profile, goals } = updatedUser;

        jwt.sign({
                id, isVerified, email, profile, goals
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d'},
            (err, token) => {
                if (err) return res.sendStatus(500);
                res.redirect(`/login?token=${token}`);
            });
    }
}