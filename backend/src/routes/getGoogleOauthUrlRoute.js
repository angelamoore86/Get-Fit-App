import { getGoogleOauthUrl } from "../getGoogleOauthUrl.js";

export const getGoogleOauthUrlRoute = {
    path: '/api/auth/google/url',
    method: 'get',
    handler: (req, res) => {
        const url = getGoogleOauthUrl();
        res.status(200).json({ url });
    }
};