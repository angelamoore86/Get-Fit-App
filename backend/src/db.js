import {MongoClient} from "mongodb";
import 'dotenv/config.js';

let client;

export const initializeDbConnection = async () => {
  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export const getDbConnection = (dbName) => {
  return client.db(dbName);
};