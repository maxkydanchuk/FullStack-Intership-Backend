import Sequelize from 'sequelize';
import {sequelize} from "../../db.js";

const Movie = sequelize.define('movie', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producer: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING
        },
        episode_id: {
            type: Sequelize.INTEGER
        },
        director: {
            type: Sequelize.STRING
        },
        release_date: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },
        opening_crawl: {
            type: Sequelize.STRING
        },
        length: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    },
    {
        tableName: "movies"
    })

export default Movie;
