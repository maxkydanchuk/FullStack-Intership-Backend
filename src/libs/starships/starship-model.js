import Sequelize from 'sequelize';
import {sequelize} from "../../db.js";

const Starships = sequelize.define('starships', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pilots: {
            type: Sequelize.STRING,
        },
        mglt: {
            type: Sequelize.STRING
        },
        starship_class: {
            type: Sequelize.STRING
        },
        hyperdrive_rating: {
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
        tableName: "starships"
    })

export default Starships;