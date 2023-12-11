import { testRoute } from "./testRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { updateProfileRoute } from "./updateProfileRoute.js";
import { getProfileRoute } from "./getProfileRoute.js";
import { updateGoalRoute } from "./updateGoalRoute.js";
import { postIntakeLogRoute } from './postIntakeLogRoute.js';
import { postFitnessLogRoute } from "./postFitnessLogRoute.js";
import { getFitnessLogRoute } from "./getFitnessLogRoute.js";
import { getFitnessLogDatesRoute } from "./getFitnessLogDatesRoute.js";
import { getIntakeLogRoute } from './getIntakeLogsRoute.js';
import { getIntakeLogDatesRoute } from "./getIntakeLogDatesRoute.js";
 
export const routes = [
    testRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    getProfileRoute,
    updateProfileRoute,
    updateGoalRoute,
    postIntakeLogRoute,
    postFitnessLogRoute,
    getFitnessLogRoute,
    getFitnessLogDatesRoute,
    getIntakeLogRoute,
    getIntakeLogDatesRoute,
];