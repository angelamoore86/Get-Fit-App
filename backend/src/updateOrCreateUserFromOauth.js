import { getDbConnection } from "./db.js";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    
    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo;

    const db = getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({ email });
    
    console.log('ExistingUser:', existingUser);

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnOriginal: false },
        );
        console.log('Find One and Update:', result.value);
        return { email: result.email, googleId: result.googleId, isVerified: result.isVerified, info: result.info, profile: result.profile, goals: result.goals};
    } else {
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isVerified,
            info: {},
            profile: {},
            goals: {},
        });
        return { email: email, googleId: googleId, isVerified: isVerified, info: {}, profile: {}, goals: {}};
    }  
}