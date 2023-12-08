import { testRoute } from "./testRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { updateProfileRoute } from "./updateProfileRoute.js";
import { getProfileRoute } from "./getProfileRoute.js";
import { updateGoalRoute } from "./updateGoalRoute.js";
import { intakeLogRoute } from './intakeLogRoute.js';
import { postFitnessLogRoute } from "./postFitnessLogRoute.js";
import { getFitnessLogRoute } from "./getFitnessLogRoute.js";
import { getLogDatesRoute } from "./getLogDatesRoute.js";
 
export const routes = [
    testRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    getProfileRoute,
    updateProfileRoute,
    updateGoalRoute,
    intakeLogRoute,
    postFitnessLogRoute,
    getFitnessLogRoute,
    getLogDatesRoute,
];