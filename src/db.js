import Sequelize from 'sequelize';
import {POSTGRES_HOST, POSTGRES_URI} from "./config/config.js";

export const sequelize = new Sequelize(
    POSTGRES_URI, {
        host: POSTGRES_HOST,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 1000,
        },
        logging: false,
    });
// import { MongoClient } from "mongodb";
//
// const url = 'mongodb://localhost:27017/';
// const mongoClient = new MongoClient(url);
//
// mongoClient.connect()
//     .then((db) => db)
//     .catch((err) => console.log(err))
//
// export default mongoClient;
