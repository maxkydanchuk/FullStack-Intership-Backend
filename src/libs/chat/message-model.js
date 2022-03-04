import Sequelize from 'sequelize';
import {sequelize} from "../../db.js";

const Message = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
        },
        message: {
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
        tableName: "messages"
    })

export default Message;


// import pkg from 'mongoose';
//
// const {Schema, model} = pkg;
//
// const messageSchema = new Schema({
//     username: String,
//     message: String,
//     time: String
// });
//
// const Message = model('Message', messageSchema, 'chat');
//
// export default Message;