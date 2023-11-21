import express from 'express';
import { routes } from './routes/index.js';
import { initializeDbConnection } from "./db.js";
import cors from 'cors';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000' }));

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });