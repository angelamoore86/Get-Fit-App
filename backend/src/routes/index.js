import { testRoute } from "./testRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { updateProfileRoute } from "./updateProfileRoute.js";
import { getProfileRoute } from "./getProfileRoute.js";
import { updateGoalRoute } from "./updateGoalRoute.js";

export const routes = [
    testRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    getProfileRoute,
    updateProfileRoute,
    updateGoalRoute,
];