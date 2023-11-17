import { google } from "googleapis";
import 'dotenv/config.js';

export const oauthClient = new google.auth.OAuth2 (
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:8000/auth/google/callback',
)