import 'dotenv/config.js';
console.log("MongoDB Connection String:", process.env.MONGO_CONNECT);
import express from 'express';
import { routes } from './routes/index.js';
import workoutRoutes from './routes/workoutRoutes.js';
import { initializeDbConnection } from "./db.js";
import cors from 'cors';
import intakeLogRoutes from './routes/intakeLogRoutes.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

app.use('/api/workout', workoutRoutes);
app.use('/api/intake-log', intakeLogRoutes);

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });
