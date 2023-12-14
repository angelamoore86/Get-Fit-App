import express from 'express';
import { routes } from './routes/index.js';
import { initializeDbConnection } from "./db.js";
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';


const PORT = process.env.PORT || 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });
