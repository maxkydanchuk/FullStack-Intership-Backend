import Sequelize from 'sequelize';
import {sequelize} from "../../db.js";

const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
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
        tableName: "users"
    })

export default User;
