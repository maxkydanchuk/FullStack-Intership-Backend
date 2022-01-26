import pkg from 'mongoose';
const {Schema, model} = pkg;

const messageSchema = new Schema({
    username: String,
    message: String,
    time: String
})

const Message = model('Message', messageSchema, 'chat');

export default Message;