import {MongoClient} from "mongodb";
import 'dotenv/config.js';

let client;

export const initializeDbConnection = async () => {
    client = await MongoClient.connect(process.env.MONGO_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export const getDbConnection = dbName => {
    return client.db(dbName);
}