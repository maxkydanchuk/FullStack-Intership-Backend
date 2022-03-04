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

