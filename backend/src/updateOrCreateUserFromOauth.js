import { getDbConnection } from "./db.js";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {

    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo;

    const db = getDbConnection('Get-Fit-DB');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnOriginal: false },
        );

        return { email: result.email, googleId: result.googleId, isVerified: result.isVerified,
             profile: result.profile, goals: result.goals};
    } else {
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isVerified,
            profile: {},
            goals: {},
        });
        return { email: email, googleId: googleId, isVerified: isVerified, profile: {}, goals: {}};
    }
}