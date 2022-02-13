import Sequelize from 'sequelize';
import {sequelize} from "../../db.js";

const Person = sequelize.define('person', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        birth_year: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        eye_color: {
            type: Sequelize.STRING
        },
        height: {
            type: Sequelize.INTEGER
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
    },
    {
        tableName: "people"
    })

export default Person;
