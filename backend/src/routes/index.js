import { testRoute } from "./testRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";

export const routes = [
    testRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
];